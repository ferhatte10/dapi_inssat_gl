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
        auth: false,
        // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 10
        // },
        proxy: {
            target: "http://blog.enssat.fr/feeds/posts/default",
            changeOrigin: true,
            headers: {
                "Connection": "keep-alive"
            },
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            },
            // followRedirects: true,
            pathRewrite: {
                [`^/blogs_enssat`]: '',
            },
        }
    },
    {
        url: '/ade',
        auth: false,
        // rateLimit: {
        //     windowMs: 15 * 60 * 1000,
        //     max: 10
        // },
        proxy: {
            target: "https://planning.univ-rennes1.fr/jsp/custom/modules/plannings",
            changeOrigin: true,
            headers: {
                "Connection": "keep-alive"
            },
            onProxyRes: function (proxyRes, req, res) {
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            },
            // followRedirects: true,
            pathRewrite: {
                [`^/ade`]: '',
            },
        }
    }
    
]
