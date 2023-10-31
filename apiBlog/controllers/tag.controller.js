const TagModel = require('../configs/db/config/db').tag;

const TagController = {};

// Get all tags
TagController.getAll = async (req, res) => {
  try {
    const tags = await TagModel.findAll();
    if (tags.length === 0 ) {
        return res.status(404).json({ error: 'Tags not found' });
    }else{
        res.status(200).json(tags);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get tag by ID
TagController.getByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const tag = await TagModel.findByPk(id);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete tag by ID
TagController.deleteByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const tag = await TagModel.findByPk(id);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    await TagModel.destroy({
      where: { id: id },
    });

    res.json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new tag
TagController.create = async (req, res) => {
  const newTag = req.body;

  try {
    const createdTag = await TagModel.create(newTag);
    res.status(201).json(createdTag);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update tag by ID
TagController.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const tag = await TagModel.findByPk(id);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    await TagModel.update(updatedData, {
      where: { id: id },
    });

    // Fetch the updated tag data
    const updatedTag = await TagModel.findByPk(id);
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = TagController;
