const dotenv = require("dotenv")
const assert = require("assert");

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.development' });
}

const {
    PORT,
    API_BLOG_URL
} = process.env

assert(API_BLOG_URL, "API_BLOG_URL is required to proxy to blog api")

module.exports = {
    PORT,
    API_BLOG_URL
}
