const {createRemoteJWKSet} = require("jose")
const { secure } = require('express-oauth-jwt')
const {JWKS_URI} = require("./env")

let _jwksService

function initJwksService() {
    if (_jwksService) {
        return _jwksService
    }
    else {
        try {
            _jwksService = createRemoteJWKSet(new URL(JWKS_URI))
        } catch (e) {
            throw new Error("error while connecting to the auth server")
        }
        return _jwksService
    }
}

function getJwksService() {
    if (!_jwksService){
        initJwksService()
    }
    return _jwksService
}

module.exports = {
    getJwksService,
    secure
}