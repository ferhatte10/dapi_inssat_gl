const {
  comment : CommentModel,
  article : ArticleModel,
  Sequelize
} = require('../configs/db/config/db');


const CommentController = {};

// Get all comments
CommentController.getAll = async (req, res) => {
  try {
    const comments = await CommentModel.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get comment by ID
CommentController.getByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const comment = await CommentModel.findByPk(id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a comment by ID
CommentController.deleteByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const comment = await CommentModel.findByPk(id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const articleId = comment.article_id;

    await CommentModel.destroy({
      where: { id: id },
    });

    // Update comment_count on the article
    const article = await ArticleModel.findByPk(articleId);

    if (article) {
      article.comment_count = Math.max((article.comment_count || 0) - 1, 0);
      await article.save();
    } else {
      console.error(`Article with id ${articleId} not found.`);
    }

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Create a new comment
CommentController.create = async (req, res) => {
  const newComment = req.body;

  try {
    const createdComment = await CommentModel.create(newComment);
    
    const articleId = newComment.article_id;
    const article = await ArticleModel.findByPk(articleId);

    if (article) {
      // Update comment_count on the article
      article.comment_count = (article.comment_count || 0) + 1;

      // Save the updated article
      await article.save();
    } else {
      console.error(`Article with id ${articleId} not found.`);
    }

    res.status(201).json(createdComment);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update comment by ID
CommentController.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const comment = await CommentModel.findByPk(id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await CommentModel.update(updatedData, {
      where: { id: id },
    });

    // Fetch the updated comment data
    const updatedComment = await CommentModel.findByPk(id);
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = CommentController;
