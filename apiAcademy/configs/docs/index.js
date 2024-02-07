const basicInfo = require('./basicInfo')
const servers = require('./servers')
const components = require('./academy/components')
const tags = require('./tags')
const academy = require('./academy')
const security = require('./security')

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...academy,
    ...security
}