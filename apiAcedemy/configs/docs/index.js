const basicInfo = require('./basicInfo')
const servers = require('./servers')
const components = require('./blog/components')
const tags = require('./tags')
const blogs = require('./blog')
const security = require('./security')

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...blogs,
    ...security
}