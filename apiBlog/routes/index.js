const express = require('express');
// const {secure, getJwksService} = require("../configs/auth");
const router = express.Router();

// import the instance of keycloak from the index.js file
const {keycloak} = require('../index');
const {GrantManager} = require("keycloak-connect");
const KeycloakService = keycloak.getKeycloak();

// router.get('/',secure(getJwksService()), // This will protect the route with another library than keycloak-connect which is deprecated

router.get('/',
    (req, res) =>
    {
      return res.status(200).json(
          {
            success: true,
            message: {
                message: 'Welcome to the blog api',
                documentation: `${req.originalUrl}api-doc`,
                claims : req.claims
            },
        });
    }
);

// Mounting each route under the right path
router.use('/users', require('./user.route'));
router.use('/categories', require('./category.route'));
router.use('/articles', require('./article.route'));
router.use('/comments', require('./comment.route'));
router.use('/likes', require('./like.route'));
router.use('/tags', require('./tag.route'));
router.use('/article-tags', require('./article_tag.route'));

module.exports = router;
