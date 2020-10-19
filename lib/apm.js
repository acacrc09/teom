require('dotenv').config();

const apm = async() => {
    require('elastic-apm-node').start()
}

module.exports = apm;