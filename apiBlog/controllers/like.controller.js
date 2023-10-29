const LikeModel = require('../configs/db/config/db').like;

const LikeController = {};

// Get all likes
LikeController.getAll = async (req, res) => {
  try {
    const likes = await LikeModel.findAll();
    if (!!likes){
        return res.status(404).json({ error: 'No like found' });
    }else{
      res.status.status(200).json(likes);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get like by ID
LikeController.getByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const like = await LikeModel.findByPk(id);

    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    res.json(like);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete like by ID
LikeController.deleteByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const like = await LikeModel.findByPk(id);

    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    await LikeModel.destroy({
      where: { id: id },
    });

    res.json({ message: 'Like deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new like
LikeController.create = async (req, res) => {
  const newLike = req.body;

  try {
    const createdLike = await LikeModel.create(newLike);
    res.status(201).json(createdLike);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update like by ID
LikeController.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const like = await LikeModel.findByPk(id);

    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    await LikeModel.update(updatedData, {
      where: { id: id },
    });

    // Fetch the updated like data
    const updatedLike = await LikeModel.findByPk(id);
    res.json(updatedLike);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = LikeController;
