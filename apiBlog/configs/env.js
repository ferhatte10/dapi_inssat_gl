const dotenv = require("dotenv")
const assert = require("assert")

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env' })
} else {
    dotenv.config({ path: '.env.development' })
}

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_NAME_AUTH,
    PORT,
    CORS_ORIGIN,
    JWKS_URI,
    DB_LOGGING,
    UPLOADS_PATH,
    SEED_ACTIVATED,
    TOKEN_REFRESH_URL,
    REALM,
    AUTH_SERVER_URL,
    SSL_REQUIRED,
    RESOURCE,
    BEARER_ONLY,
    SECRET
} = process.env

assert(DB_HOST, "DB_HOST (database host) is required")
assert(DB_PORT, "DB_PORT (database port) is required")
assert(DB_USER, "DB_USER (database user) is required")
assert(DB_PASS, "DB_PASS (database password) is required")
assert(DB_NAME, "DB_NAME (database name) is required")
assert(DB_NAME_AUTH, "DB_NAME_AUTH (database name) is required")
assert(CORS_ORIGIN, "CORS_ORIGIN () is required")
assert(UPLOADS_PATH, "UPLOADS_PATH is required")
assert(SEED_ACTIVATED, "UPLOADS_PATH is required")
assert(JWKS_URI, "AUTH JWKS_URI (jwks uri) is required")
assert(TOKEN_REFRESH_URL,"AUTH TOKEN_REFRESH_URL is required")
assert(REALM,"AUTH REALM is required")
assert(AUTH_SERVER_URL,"AUTH AUTH_SERVER_URL is required")
assert(SSL_REQUIRED,"AUTH SSL_REQUIRED is required")
assert(RESOURCE,"AUTH RESOURCE is required")
assert(BEARER_ONLY,"AUTH BEARER_ONLY is required")
assert(SECRET,"AUTH SECRET is required")

module.exports = {
    SQL: {
        DB_HOST,
        DB_PORT,
        DB_USER,
        DB_PASS,
        DB_NAME,
        DB_NAME_AUTH,
        DB_LOGGING
    },
    AUTH : {
        TOKEN_REFRESH_URL,
        JWKS_URI,
        KEYCLOAK_CONFIG : {
            'confidential-port': 0,
            'auth-server-url': AUTH_SERVER_URL,
            'ssl-required': SSL_REQUIRED,
            'resource': RESOURCE,
            'bearer-only': BEARER_ONLY,
            realm: REALM
        }
    },
    PORT,
    CORS_ORIGIN: CORS_ORIGIN.split(","),
    UPLOADS_PATH,
    SEED_ACTIVATED
}
