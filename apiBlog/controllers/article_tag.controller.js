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
    const { tag_id:tagId, article_id:articleId } = req.body;

    // Check if the tag and article exist before creating the association
    const tagExists = await TagModel.findByPk(tagId);
    const articleExists = await ArticleModel.findByPk(articleId);

    if (!tagExists || !articleExists) {
      return res.status(404).json({ error: 'Tag or Article not found' });
    }

    // Check if the association already exists
    const existingAssociation = await Article_tagModel.findOne({
      where: {
        tag_id: tagId,
        article_id: articleId,
      },
    });

    if (existingAssociation) {
      return res.status(400).json({ error: 'Association already exists' });
    }

    // Both tag and article exist, and association doesn't exist, create the association
    const articleTag = await Article_tagModel.create({ tag_id: tagId, article_id: articleId });

    res.status(201).json(articleTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = controller;
