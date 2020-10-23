module.exports = {
    "src_folders": ["test/nightwatch"],

    "webdriver": {
        "start_process": true,
        //"server_path": "./node_modules/chromedriver/bin",
        "port": 9515
    },

    "test_settings": {
        "default": {
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "chromeOptions": {
                    "args": ["--headless", "--no-sandbox", "--disable-gpu"]
                }
            }
        }
    }
}