const express = require('express');
// const {secure, getJwksService} = require("../configs/auth");
const router = express.Router();

// import the instance of keycloak from the index.js file
const {getKeycloak} = require('../configs/auth.keycloak');
const KeycloakService = getKeycloak();

// router.get('/',secure(getJwksService()), // This will protect the route with another library than keycloak-connect which is deprecated

router.get('/',
    (req, res) =>
    {
      return res.status(200).json(
          {
            success: true,
            message: {
                message: 'Welcome to the blog api',
                documentation: `${req.originalUrl}api-doc`
            },
        });
    }
);

// Mounting each route under the right path
router.use('/users', KeycloakService.protect(), require('./user.route'));
router.use('/categories', KeycloakService.protect(), require('./category.route'));
router.use('/articles', KeycloakService.protect(), require('./article.route'));
router.use('/comments', KeycloakService.protect(), require('./comment.route'));
router.use('/likes', KeycloakService.protect(), require('./like.route'));
router.use('/tags', KeycloakService.protect(), require('./tag.route'));
router.use('/article-tags', KeycloakService.protect(), require('./article_tag.route'));


//Dealing with images upload & fetch
router.use('/uploads', require('./upload.route'));

module.exports = router;
