const {
  category : CategoryModel,
  article : ArticleModel,
  Sequelize
} = require('../configs/db/config/db');

const CategoryController = {};

// Get all categories
CategoryController.getAll = async (req, res) => {
  try {
    const categories = await CategoryModel.findAll();

    if (categories.length === 0) {
      return res.status(404).json({ error: 'No categories found' });
    } else {
      res.status(200).json(categories);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get category by ID
CategoryController.getByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const category = await CategoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete category by ID
CategoryController.deleteByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const category = await CategoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await CategoryModel.destroy({
      where: { id: id },
    });

    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new category
CategoryController.create = async (req, res) => {
  const newCategory = req.body;

  try {
    const createdCategory = await CategoryModel.create(newCategory);
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update category by ID
CategoryController.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const category = await CategoryModel.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await CategoryModel.update(updatedData, {
      where: { id: id },
    });

    // Fetch the updated category data
    const updatedCategory = await CategoryModel.findByPk(id);
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Retrieve four categories ordered by the number of associated articles
//TODO: must use include to get the data ==> avoid using 2 fetching request instead sequelize can use join.
CategoryController.getCategoriesByArticleCount = async (req, res) => {
  try {
    // Find article counts grouped by category_id
    const articleCounts = await ArticleModel.findAll({
      attributes: ['category_id', [Sequelize.fn('COUNT', Sequelize.col('*')), 'articleCount']],
      group: ['category_id'],
    });

    // Fetch all categories
    const allCategories = await CategoryModel.findAll();

    // Map category IDs to their corresponding article counts
    const categoryCountsMap = {};
    articleCounts.forEach((count) => {
      categoryCountsMap[count.get('category_id')] = count.get('articleCount');
    });

    // Sort the categories by the number of articles in descending order
    const sortedCategories = allCategories.sort(
      (categoryA, categoryB) => (categoryCountsMap[categoryB.id] || 0) - (categoryCountsMap[categoryA.id] || 0)
    );

    // Extract the top 4 categories with article counts
    const topCategories = sortedCategories.slice(0, 4).map((category) => ({
      id: category.id,
      title: category.title,
      parent_id: category.parent_id,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      articleCount: categoryCountsMap[category.id] || 0, // Default count to 0 if not found
    }));

    res.json(topCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = CategoryController;
