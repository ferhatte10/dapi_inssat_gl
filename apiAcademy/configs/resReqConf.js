const express = require('express')
const nocache = require('nocache')


exports.setupBasics = (app) => {

    app.use('/api_blog',express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.disable('etag')
    app.set('trust proxy', true)
    app.use(nocache())
}