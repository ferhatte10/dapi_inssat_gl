const {
  article: ArticleModel,
  user: UserModel,
  tag: TagModel,
  article_tag: Article_tagModel,
  category: CategoryModel,
  Sequelize
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

// Get articles by category ID
ArticleController.getArticlesByCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    // Recherchez la catégorie par son ID
    const category = await CategoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Recherchez les articles associés à la catégorie
    const articles = await ArticleModel.findAll({
      where: { category_id: categoryId },
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get articles by tag Id
ArticleController.getArticlesByTag = async (req, res) => {
  const tagId = parseInt(req.params.tagId);

  try {
    // Recherchez le tag par son ID
    const tag = await TagModel.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    // Recherchez les articles associés à ce tag en utilisant la table de liaison article_tag
    const articles = await ArticleModel.findAll({
      include: [
        {
          model: Article_tagModel,
          as: 'article_tags',
          where: { tag_id: tagId },
        },
      ],
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get articles by multiple tags id
ArticleController.getArticlesByTags = async (req, res) => {
  const tagIds = req.query.tagIds;

  try {
    // Recherchez les tags correspondants par leurs IDs
    const tags = await TagModel.findAll({
      where: { id: tagIds },
    });

    if (!tags || tags.length === 0) {
      return res.status(404).json({ error: 'Tags not found' });
    }

    // Recherchez les articles associés à ces tags en utilisant la table de liaison article_tag
    const articles = await ArticleModel.findAll({
      include: [
        {
          model: ArticleTagModel,
          as: 'article_tags',
          where: {
            tag_id: {
              [Sequelize.Op.in]: tagIds,
            },
          },
        },
      ],
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get articles by author id
ArticleController.getArticlesByAuthor = async (req, res) => {
  const authorId = parseInt(req.params.authorId);

  try {
    // Recherchez les articles de l'auteur spécifié
    const articles = await ArticleModel.findAll({
      where: { author_id: authorId },
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get articles by time period
ArticleController.getArticlesByTimePeriod = async (req, res) => {
  const dateStart = new Date(req.query.dateStart);
  const dateEnd = new Date(req.query.dateEnd);

  try {
    // Recherchez les articles publiés dans la période de temps spécifiée
    const articles = await ArticleModel.findAll({
      where: {
        published_at: {
          [Sequelize.Op.between]: [dateStart, dateEnd],
        },
      },
    });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get articles by category name
ArticleController.getArticlesByCategoryName = async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    const category = await Category.findOne({
      where: { title: categoryName },
      include: {
        model: Article,
        as: 'articles',
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category.articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get articles by author name
ArticleController.getArticlesByAuthorName = async (req, res) => {
  const authorName = req.params.authorName;

  try {
    const author = await Author.findOne({
      where: { name: authorName },
      include: {
        model: Article,
        as: 'articles',
      },
    });

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author.articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// TODO: Add More controllers methods to manage the additional routes 

module.exports = ArticleController;
