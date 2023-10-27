const {
  article : ArticleModel,
  tag : TagModel,
  article_tag : Article_tagModel,
} = require('../configs/db/config/db'); 

// Define controller methods
const controller = {};

// Create a new article_tag association
controller.createArticleTag = async (req, res) => {
  try {
    const { tagId, articleId } = req.body;
    const articleTag = await Article_tagModel.create({ tag_id: tagId, article_id: articleId });

    res.status(201).json(articleTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = controller;
