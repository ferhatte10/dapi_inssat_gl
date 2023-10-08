const db = require('../configs/db/config/db')


module.exports.getAllBlogs = async () => {
    return await db.blogs.findAll()
}

module.exports.getBlogByUuid = async (uuid) => {
    return await db.blogs.findOne({where: {uuid: uuid}})
}

module.exports.createBlog = async (blog) => {
    return await db.blogs.create(blog)
}