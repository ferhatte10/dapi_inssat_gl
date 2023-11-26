const dotenv = require("dotenv")
const assert = require("assert");

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.development' });
}

const {
    PORT,
    API_BLOG_URL,
    ENSSAT_BLOG_URL,
    ADE_URL
} = process.env

assert(API_BLOG_URL, "API_BLOG_URL is required to proxy to blog api")
assert(ENSSAT_BLOG_URL, "ENSSAT_BLOG_URL is required to proxy to ensat blog")
assert(ADE_URL, "ADE_URL is required to proxy to ade")

module.exports = {
    PORT,
    API_BLOG_URL,
    ENSSAT_BLOG_URL,
    ADE_URL
}
