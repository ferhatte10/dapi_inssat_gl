const {
  article : ArticleModel,
  user : UserModel,
  tag : TagModel,
  article_tag : Article_tagModel,
  category : CategoryModel
} = require('../configs/db/config/db'); 

const ArticleController = {};

// Get all articles
ArticleController.getAll = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll();
    res.json(articles);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get article by ID
ArticleController.getByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const article = await ArticleModel.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete article by ID
ArticleController.deleteByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const article = await ArticleModel.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await ArticleModel.destroy({
      where: { id: id },
    });

    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new article
ArticleController.create = async (req, res) => {
  const newArticle = req.body;

  try {
    const createdArticle = await ArticleModel.create(newArticle);
    res.status(201).json(createdArticle);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update article by ID
ArticleController.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const article = await ArticleModel.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await ArticleModel.update(updatedData, {
      where: { id: id },
    });

    // Fetch the updated article data
    const updatedArticle = await ArticleModel.findByPk(id);
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Retrieve a list of articles with extended details, including tags
ArticleController.getArticlesWithDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    // Step 1: Retrieve articles, including tags and categories
    const articles = await ArticleModel.findAndCountAll({
      attributes: ['id', 'title', 'description', 'thumbnail', 'author_id', 'published_at'],
      include: [
        {
          model: Article_tagModel,
          as: 'article_tags',
          attributes: ['createdAt'],
          include: {
            model: TagModel,
            as: 'tag',
            attributes: ['title'],
          },
        },
        {
          model: CategoryModel,
          as: 'category',
          attributes: ['title'],
        },
      ],
      limit: perPage,
      offset,
    });

    // Step 2: Retrieve the list of authors (USER_ENTITY data)
    const authorIds = articles.rows.map((article) => article.author_id);
    const authors = await UserModel.findAll({
      attributes: ['ID', 'FIRST_NAME', 'LAST_NAME'],
      where: { ID: authorIds },
    });

    // Step 3: Merge the authors with the corresponding articles
    const articlesWithAuthors = articles.rows.map((article) => ({
      ...article.toJSON(), // Convert to plain object
      author: authors.find((author) => author.ID === article.author_id),
    }));

    const totalArticles = articles.count;
    const totalPages = Math.ceil(totalArticles / perPage);

    res.json({
      articles: articlesWithAuthors,
      pagination: { page, perPage, totalArticles, totalPages },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// TODO: Add More controllers methods to manage the additional routes 

module.exports = ArticleController;
