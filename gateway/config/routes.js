const {API_BLOG_URL} = require("./env")

exports.ROUTES = [

    {
        url: '/api_blog',
        auth: false,
        // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 10
        // },
        proxy: {
            target: API_BLOG_URL,
            changeOrigin: true,
            headers: {
                "Connection": "keep-alive"
            },
            followRedirects: true,
            pathRewrite: {
                //[`^/api_blog`]: '',
            },
        }
    }
    
]
