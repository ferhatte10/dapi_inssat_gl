const express = require('express');
const {secure, getJwksService} = require("../configs/auth");
const router = express.Router();

// import the instance of keycloak from the index.js file
// const {getKeycloak} = require('../configs/auth.keycloak');
// const KeycloakService = getKeycloak();


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
// TODO : add , create functions to handle the claims object in the request created but the alternative keycloak middleware
router.use('/users', secure(getJwksService()), require('./user.route'));
router.use('/categories',secure(getJwksService()), require('./category.route'));
router.use('/articles', secure(getJwksService()), require('./article.route'));
router.use('/comments', secure(getJwksService()), require('./comment.route'));
router.use('/likes', secure(getJwksService()), require('./like.route'));
router.use('/tags', secure(getJwksService()), require('./tag.route'));
router.use('/article-tags', secure(getJwksService()), require('./article_tag.route'));
router.use('/followers', secure(getJwksService()), require('./follower.route'));

//Dealing with images upload & fetch
router.use('/uploads', secure(getJwksService()), require('./upload.route'));

module.exports = router;
