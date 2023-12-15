const {
  article: ArticleModel,
  user: UserModel,
  tag: TagModel,
  article_tag: Article_tagModel,
  category: CategoryModel,
  Sequelize
} = require('../configs/db/config/db');

const uploadManager = require('../utils/imageUploadManager');


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
    const article = await ArticleModel.findByPk(id, { include: 'article_tags' });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Delete associated ArticleTags first
    if (article.article_tags && article.article_tags.length > 0) {
      await Article_tagModel.destroy({
        where: { article_id: id },
      });
    }

    // Then delete the Article
    await ArticleModel.destroy({
      where: { id: id },
    });

    res.json({ message: 'Article and associated tags deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//delete articles by a list of Ids
ArticleController.deleteMultipleByIds = async (req, res) => {
  const ids  = req.query.ids
  try {
    // Find all articles based on the provided IDs
    const articles = await ArticleModel.findAll({
      where: { id: ids },
      include: 'article_tags',
    });

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No articles found with the provided IDs' });
    }

    for (const article of articles) {
      // Delete associated ArticleTags first for each article
      if (article.article_tags && article.article_tags.length > 0) {

        await Article_tagModel.destroy({
          where: { article_id: article.id },
        });
      }
    }

    // Then delete all articles
    await ArticleModel.destroy({
      where: { id: ids },
    });

    res.json({ message: 'Articles and associated tags deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new article
// ArticleController.create = async (req, res) => {
//   const newArticle = req.body;

//   try {
//     const createdArticle = await ArticleModel.create(newArticle);
//     res.status(201).json(createdArticle);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

ArticleController.create = async (req, res) => {
  const currentDate = new Date();
  const pt = currentDate.toISOString();

  const {
    title,
    description,
    content,
    thumbnail,
    principal_image,
    status,
    //Todo: adding default values... otherwise the model should be modified ==> add allow null or set default value on the model.
    flag_count=0,
    like_count=0,
    is_pinned=0,
    is_blacklisted=0,
    comment_authorized=0,
    published_at = pt,
    category_id,
    tags
  } = req.body;

  const author_id = req.claims.sub

  try {
    // Step 1: Create the article
    const createdArticle = await ArticleModel.create({
      title,
      description,
      content,
      thumbnail,
      principal_image,
      status,
      flag_count,
      like_count,
      is_pinned,
      is_blacklisted,
      comment_authorized,
      published_at,
      author_id,
      category_id,
    });

    // Retrieve the ID of the newly created article
    const articleId = createdArticle.id;

    // Step 2: Create tags if they don't exist and link them to the article
    if (tags && tags.length > 0) {
      const tagNames = tags.split('|'); // Split the string into an array of tag names

      for (const tagName of tagNames) {
        let tag = await TagModel.findOne({ where: { title: tagName } });

        // If the tag doesn't exist, create it
        if (!tag) {
          tag = await TagModel.create({ title: tagName });
        }

        // Link Article with Tags using the pivot table (article_tag)
        await Article_tagModel.create({
          tag_id: tag.id,
          article_id: articleId,
        });
      }
    }


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

    uploadManager.removeFile(article.thumbnail);
    uploadManager.removeFile(article.principal_image);

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
        {
          model: UserModel,
          as: 'author',
          on: {
              id : Sequelize.where(Sequelize.col('article.author_id'), '=', Sequelize.col('author.ID'))
            },
            attributes: ['FIRST_NAME', 'LAST_NAME'],
        }
      ]
    });
    // if there is no article
    if (!articles) {
      return res.status(404).json({ error: 'Article not found' });
    }
    // Step 2: Retrieve the list of authors (USER_ENTITY data)
    // const authorIds = articles.rows.map((article) => article.author_id);
    // const authors = await UserModel.findAll({
    //   attributes: ['ID', 'FIRST_NAME', 'LAST_NAME'],
    //   where: { ID: authorIds },
    // });

    // Step 3: Map articles to include tags and authors

    // const articlesWithDetails = articles.rows.map((article) => {
    //   const articleData = article.toJSON();
    //   const article_tags = articleData.article_tags.map((articleTag) => articleTag.tag.title);
    //
    //
    //   return {
    //     ...articleData,
    //     author: authors.find((author) => author.ID === article.author_id),
    //     article_tags,
    //   };
    // });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Endpoint pour récupérer les détails d'un article, y compris les tags et l'auteur
ArticleController.getArticleWithDetails = async (req, res) => {
  const articleId = parseInt(req.params.id);
  try {
    // Étape 1 : Récupérer les détails de l'article, y compris les tags et la catégorie
    const article = await ArticleModel.findOne({
      where: { id: articleId },
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
          attributes: ['id','title'],
        },
      ],
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Étape 2 : Récupérer les informations sur l'auteur
    let author = await UserModel.findOne({
      attributes: ['ID', 'FIRST_NAME', 'LAST_NAME'],
      where: { ID: article.author_id },
    });

    if (!author) {
      author = {
        ID: 'Unknown',
        FIRST_NAME: 'Unknown',
        LAST_NAME: 'Unknown',
      }
    }

    // Étape 3 : Mapper les détails de l'article pour inclure les tags et l'auteur
    const articleData = article.toJSON();
    const article_tags = articleData.article_tags.map((articleTag) => articleTag.tag.title);

    const articleWithDetails = {
      ...articleData,
      author: {
        ID: author.ID,
        FIRST_NAME: author.FIRST_NAME,
        LAST_NAME: author.LAST_NAME,
      },
      article_tags,
    };

    res.json(articleWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get articles by category ID
ArticleController.getArticlesByCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    // Step 1: Find the category by its ID
    const category = await CategoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Step 2: Find articles associated with the category and include article details
    const articles = await ArticleModel.findAll({
      where: { category_id: categoryId },
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
    });

    // Step 3: Fetch author details separately for each article
    const articlesWithDetails = await Promise.all(articles.map(async (article) => {
      const articleData = article.toJSON();
      const article_tags = articleData.article_tags.map((articleTag) => articleTag.tag.title);

      // Fetch author details in a separate query
      const author = await UserModel.findOne({
        attributes: ['ID', 'FIRST_NAME', 'LAST_NAME'],
        where: { ID: article.author_id },
      });

      return {
        ...articleData,
        author: author ? author.toJSON() : { ID: 'Unknown', FIRST_NAME: 'Unknown', LAST_NAME: 'Unknown' },
        article_tags,
      };
    }));

    res.json(articlesWithDetails);
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
          model: Article_tagModel,
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




ArticleController.getLastSharedArticle = async (req, res) => {
  try {
    const lastSharedArticle = await ArticleModel.findOne({
      attributes:['id', 'title', 'description', 'thumbnail', 'principal_image'],
      where: {
        published_at: {
          // Ensure the article has been published
          [Sequelize.Op.ne]: null,
        },
      },
      // Fetch the latest update
      order: [['updatedAt', 'DESC']],
    });

    if (!lastSharedArticle) {
      return res.status(404).json({ error: 'No article found' });
    }

    res.json(lastSharedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// TODO: Add More controllers methods to manage the additional routes 

module.exports = ArticleController;
