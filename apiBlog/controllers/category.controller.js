const CategoryModel = require('../configs/db/config/db').category;

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

module.exports = CategoryController;
