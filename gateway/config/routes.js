const {API_BLOG_URL,ENSSAT_BLOG_URL,ADE_URL} = require("./env")

exports.ROUTES = [

    {
        url: '/api_blog',
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
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            },
            //followRedirects: true,
            pathRewrite: {
                //[`^/api_blog`]: '',
            },
        }
    },
    {
        url: '/blogs_enssat',
        proxy: {
            target: ENSSAT_BLOG_URL,
            changeOrigin: true,
            headers: {
                "Connection": "keep-alive"
            },
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            },
            pathRewrite: {
                [`^/blogs_enssat`]: '',
            },
        }
    },
    {
        url: '/ade',
        proxy: {
            target: ADE_URL,
            changeOrigin: true,
            headers: {
                "Connection": "keep-alive"
            },
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            },
            pathRewrite: {
                [`^/ade`]: '',
            },
        }
    }
    
]
