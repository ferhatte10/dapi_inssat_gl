const router = require('express').Router();
const blogQueries = require('../models/blog.queries')
const {createBlog} = require('../controllers/blog.controller')
const {uuid} = require('../configs/data_validator')

router.get('/', (req, res) => {

    blogQueries.getAllBlogs().then((blogs) => {

        if(blogs.length === 0){
            res.status(404).json({"success": false, "message": "No blogs found", "data": []})
        }else{
            res.status(200).json({"success": true, "message": "No blogs found", "data": blogs})
        }

    }).catch((err) => {
        res.status(500).json({"success": false, "message": 'Internal server error', data:[]})
    })

})

router.get('/:uuid',(req, res) => {

    let checkUuid = uuid.validate(req.params)
    if(checkUuid.error){
        res.status(400).json({"success": false, "message": checkUuid.error["details"][0]["message"].replace(/"/g, "'"), "data": []})
    }else {
        blogQueries.getBlogByUuid(req.params.uuid).then((blog) => {

            if(blog === null){
                res.status(404).json({"success": false, "message": "No blog found", "data": []})
            }else{
                res.status(200).json({"success": true, "message": "No blog found", "data": blog})
            }
    
        }).catch((err) => {
            res.status(500).json({"success": false, "message": 'Internal server error', data:[]})
        })
    }
})


router.post('/', createBlog)  


module.exports = router;