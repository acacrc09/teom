const cheerio = require('cheerio');
const axios = require('axios');

const siteUrl = 'https://www.rankia.cl';
const siteHeaders = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
  },
};

const getImage = (name) => {
  const urlBase =
    'https://d31dn7nfpuwjnm.cloudfront.net/images/productos/banco';
  if (name.toLowerCase().includes('estado'))
    return `${urlBase}/18065-bancoestado.png?1489068774`;
  else if (name.toLowerCase().includes('santander'))
    return `${urlBase}/18063-banco-santander-chile.png?1488546314`;
  else if (name.toLowerCase().includes('inversiones'))
    return `${urlBase}/18069-banco-credito-inversiones.png?1489137256`;
  else if (name.toLowerCase().includes('falabella'))
    return `${urlBase}/18071-banco-falabella-chile.png?1489134964`;
  else if (name.toLowerCase().includes('scotiabank'))
    return `${urlBase}/18068-scotiabank-chile.png?1489070034`;
  else if (name.toLowerCase().includes('itaú'))
    return `${urlBase}/18070-banco-itau.png?1489134536`;
  else if (name.toLowerCase().includes('security'))
    return `${urlBase}/18137-banco-security[cl]_1528196578.png?1528196578`;
  else if (name.toLowerCase().includes('bice'))
    return `${urlBase}/18136-banco-bice[cl]_1521026250.png?1521026250`;
  else if (name.toLowerCase().includes('consorcio'))
    return `${urlBase}/18144-banco-consorcio[cl]_1528206656.png?1528206656`;
  else return `${urlBase}/18064-banco-chile.png?1489064910`;
};

const fetchDataPerPage = async (pages) => {
  let array = [];
  const pagesUrls = Promise.all(
    pages.map(async (page, index) => {
      const url = `${siteUrl}/comparador/creditos-hipotecarios?orden=destacados-desc&page=${page}&q=&tab%5B%5D=fijo`;
      const { data } = await axios.get(url, siteHeaders);
      const $ = cheerio.load(data);
      const pageData = $(
        '.rnk-ProductComparer_Items .rnk-ProductComparerCard_Pane > a:not(.rnk-Button-cta)'
      )
        .map((_, element) => $(element).attr('href'))
        .toArray();
      array.push(...pageData);
      if (pages.length === index + 1) return array;
    })
  );
  return (await pagesUrls)[pages.length - 1];
};

const fetchData = async () => {
  try {
    const detalUrls = await fetchDataPerPage([1, 2, 3]);
    let array = [];
    const detail = Promise.all(
      detalUrls.map(async (detailUrl, index) => {
        const selectors = {
          type: '.rnk-Hero_Heading h1',
          name: '.rnk-Hero_Heading h2 > a',
          tin:
            '.rnk-IconizedFeatures > li:nth-child(1) .rnk-IconizedFeature_Value',
          cae:
            '.rnk-IconizedFeatures > li:nth-child(2) .rnk-IconizedFeature_Value',
        };
        const url = `${siteUrl}${detailUrl}`;
        const { data } = await axios.get(url, siteHeaders);
        const $ = cheerio.load(data);
        const info = {
          image: getImage($(selectors.name).text().replace(/\n/g, '')),
          type: $(selectors.type)
            .text()
            .replace(/\n/g, '')
            .replace('BancoEstado', 'Banco Estado'),
          name: $(selectors.name).text().replace(/\n/g, ''),
          tin: Number(
            $(selectors.tin)
              .text()
              .replace(/\n/g, '')
              .replace(',', '.')
              .split('%')[0]
          ),
          term: Number(
            $(selectors.tin)
              .text()
              .replace(/\n/g, '')
              .replace('TIN a', '')
              .replace('años', '')
              .split('%')[1]
              .trim()
          ),
          cae: Number(
            $(selectors.cae)
              .text()
              .replace(/\n/g, '')
              .replace(',', '.')
              .replace('%', '')
          ),
        };
        array.push(info);
        if (detalUrls.length === index + 1) return array;
      })
    );
    return (await detail)[detalUrls.length - 1];
  } catch (err) {
    console.log(err);
  }
};

module.exports = fetchData;
