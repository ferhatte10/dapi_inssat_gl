const { blogCreate } = require('../configs/data_validator')
const blogQueries = require('../models/blog.queries')

module.exports.createBlog = (req,res,next) => {

    const blog_data = req.body
    let checkBlogData = blogCreate.validate(blog_data)
    
    if(checkBlogData.error){

        res.status(400).json({"success": false, "message": checkBlogData.error["details"][0]["message"].replace(/"/g, "'"), "data": []})

    }else {

        blogQueries.createBlog(checkBlogData.value).then((blog) => {

            res.status(201).json({"success": true, "message": "Blog created", "data": blog})

        }).catch((err) => {
            if(err.name === "SequelizeUniqueConstraintError"){
                res.status(409).json({"success": false, "message": "Blog already exists", "data": []})
            }else {
                console.log(err);
                res.status(500).json({"success": false, "message": 'Internal server error', data:[]})
            }

        })
    }

}