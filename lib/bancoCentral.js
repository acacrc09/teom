const cheerio = require('cheerio');
const axios = require('axios');

const siteUrl = 'https://www.bcentral.cl/';
const siteHeaders = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
  },
};

const fetchData = async () => {
  try {
    const selectors = {
      uf: '.datos-day > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)',
    };
    const { data } = await axios.get(siteUrl, siteHeaders);
    const $ = cheerio.load(data);
    const info = {
      uf: Number(
        $(selectors.uf)
          .text()
          .replace(/\n/g, '')
          .replace('$', '')
          .replace('.', '')
          .replace(',', '.')
          .trim()
      ),
    };
    return info;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { fetchData };
