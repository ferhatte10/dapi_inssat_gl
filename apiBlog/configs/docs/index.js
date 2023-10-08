const basicInfo = require('./basicInfo')
const servers = require('./servers')
const components = require('./components')
const tags = require('./tags')
const blogs = require('./blogs')
const security = require('./security')

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...blogs,
    ...security
}