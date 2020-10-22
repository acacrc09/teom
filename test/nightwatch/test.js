module.exports = {
    'Demo test Teom' : function(browser) {

      let locator = "//*[contains(text(),'Banco')]";

      browser
        .url('http://nodejs-teom-develop-teom.apps.okd.soft1.xyz/')
        .waitForElementVisible('body')
      
        .assert.visible('input[name=value]')
        .setValue('input[name=value]', '2000')

        .assert.visible('select[name=initial]')
        .setValue('select[name=initial]', '20')

        .assert.visible('select[name=years]')
        .setValue('select[name=years]', '20')

        .useXpath().click("//*[contains(text(),'Buscar Oferta')]")

        .useXpath().waitForElementPresent(locator).assert.elementPresent(locator)

        .end();
    }
  };