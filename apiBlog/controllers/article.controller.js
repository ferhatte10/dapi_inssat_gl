const {
  article: ArticleModel,
  user: UserModel,
  comment:CommentModel,
  tag: TagModel,
  article_tag: Article_tagModel,
  category: CategoryModel,
  Sequelize
} = require('../configs/db/config/db');

// const uploadManager = require('../utils/imageUploadManager');


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

  console.log(req.body)
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
    // Step 1: Find the article by ID
    const existingArticle = await ArticleModel.findByPk(id);

    // Check if the article with the specified ID exists
    if (!existingArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Step 2: Update the article with the new data
    await existingArticle.update(updatedData);

    // Step 3: Update tags if provided
    const { tags } = req.body;

    if (tags && tags.length > 0) {
      // Remove existing tags linked to the article
      await Article_tagModel.destroy({ where: { article_id: id } });

      const tagNames = tags.split('|');

      for (const tagName of tagNames) {
        let tag = await TagModel.findOne({ where: { title: tagName } });

        // If the tag doesn't exist, create it
        if (!tag) {
          tag = await TagModel.create({ title: tagName });
        }

        // Link Article with Tags using the pivot table (article_tag)
        await Article_tagModel.create({
          tag_id: tag.id,
          article_id: id,
        });
      }
    }

    // Step 4: Fetch the updated article
    const updatedArticle = await ArticleModel.findByPk(id);

    res.status(200).json(updatedArticle);
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
  console.log("----->"+req.params.id)
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

    // Update view_count for the current article
    // TODO: must create view_count 
    await ArticleModel.update(
      { like_count: Sequelize.literal('like_count + 1') }, // Increment like_count by 1
      { where: { id: articleId } }
    );

    res.json(articleWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get articles by category ID
ArticleController.getArticlesByCategory = async (req, res) => {
  
  const categoryId = parseInt(req.params.id);

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


ArticleController.getArticlesByCategoryPaginated = async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // Default page size if not provided

  try {
    // Step 1: Find the category by its ID
    const category = await CategoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Step 2: Find articles associated with the category and include article details with pagination
    const articles = await ArticleModel.findAndCountAll({
      where: { category_id: categoryId },
      distinct:true,
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
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    // Step 3: Fetch author details separately for each article
    const articlesWithDetails = await Promise.all(articles.rows.map(async (article) => {
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

    res.json({
      articles: articlesWithDetails,
      totalItems: articles.count,
      totalPages: Math.ceil(articles.count / pageSize),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Get articles by tag Id
ArticleController.getArticlesByTag = async (req, res) => {
  const tagId = parseInt(req.params.id);

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
  const authorId = parseInt(req.params.id);

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
      attributes:['id', 'title', 'description', 'thumbnail', 'principal_image', 'author_id'],
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



ArticleController.getFilteredArticles = async (req, res) => {
  const { category, tags, dateRange, search, page = 1, pageSize = 10  } = req.body;
  const defaultCategoryRange = { category_id: { [Sequelize.Op.between]: [1, 1000] } };
  const isCategoryValid = category !== null && category !== '';

  try {
    // Construct the base query with category
    const baseQuery = {
      where: isCategoryValid ? { category_id: category } : defaultCategoryRange,
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
      distinct: 'article.id',
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };

    // conditions for tags
    if (tags && tags.length>0) {
      baseQuery.include[0].where = { tag_id: { [Sequelize.Op.in]: tags } };
    }
 
    // INFO: dateRange is an array because we've had the idea that a user can select multiple time/date ranges to fetch an article
    // but for the moment we are taking in consideration only one range.
    if (dateRange && dateRange[0].startDate && dateRange[0].endDate) {
      const startDate = new Date(dateRange[0].startDate);
      const endDate   = new Date(dateRange[0].endDate);
      
      // INFO : the datePicker of the front is generating the thedate of the day before instead of the selected day (Ex : 2024-02-24 instead of selected day 2024-02-25)
      // as a result i am checking if the dates are the same as a result i will add one  day to the endDate that way i can use the between to solve the problem.
      // the front does not precise the full Datetime as a result we cant use equal operator with the createdAt....
      if((dateRange[0].startDate !== dateRange[0].endDate)){
        baseQuery.where.createdAt = {
          [Sequelize.Op.between]: [startDate, endDate],
        };
      }else{

        //TODO : Must see with front to fetch data without add or substract 1 day.
        const min = 22;
        const startDatePlusOneDay = new Date(startDate);
        startDatePlusOneDay.setHours(startDatePlusOneDay.getHours() - min); 
        const formattedStartDate = startDatePlusOneDay.toISOString();

        const max = 22;
        const endDatePlusOneDay = new Date(endDate);
        endDatePlusOneDay.setHours(endDatePlusOneDay.getHours() + max); 
        const formattedEndDate = endDatePlusOneDay.toISOString();



        console.log(startDatePlusOneDay)
        console.log(endDate)
        baseQuery.where.createdAt = {
          [Sequelize.Op.between]: [formattedStartDate, formattedEndDate],
        };
      }
    }

    // conditions for search {title or content}
    if (search) {
      baseQuery.where[Sequelize.Op.or] = [
        Sequelize.literal(`LOWER(article.title) LIKE LOWER('%${search}%')`),
        Sequelize.literal(`LOWER(article.content) LIKE LOWER('%${search}%')`),
      ];
    }

    // Fetch articles based on the constructed query
    const articles = await ArticleModel.findAll(baseQuery);

    // Fetch author details separately for each article
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
    const totalItems = await ArticleModel.count({
      where: baseQuery.where, // Ensure count query has the same where conditions
    });
  
    res.json({
      articles: articlesWithDetails,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Retrieve comments for a specific article
ArticleController.getCommentsForArticle = async (req, res) => {
  try {
    const articleId = req.params.id; 

    // Retrieve comments associated with the specified articleId
    const comments = await CommentModel.findAll({
      where: {
        article_id: articleId,
      },
      attributes: ['id', 'title', 'content', 'user_id', 'createdAt'], // Adjust attributes as needed
    });

    // If there are no comments for the specified articleId
    if (!comments) {
      return res.status(404).json({ error: 'Comments not found for the specified article' });
    }

    // Fetch user information for each comment separately
    const commentsWithUser = await Promise.all(comments.map(async (comment) => {
      const user = await UserModel.findByPk(comment.user_id, {
        attributes: ['FIRST_NAME', 'LAST_NAME'],
      });

      return {
        ...comment.toJSON(),
        user,
      };
    }));

    res.json(commentsWithUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// TODO: Add More controllers methods to manage the additional routes 

module.exports = ArticleController;
