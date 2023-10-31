const FollowerModel = require('../configs/db/config/db').follower;

const FollowerController = {};

FollowerController.getAll = async (req, res) => {
    try {
        const followers = await FollowerModel.findAll();
        res.json(followers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get follower by ID
FollowerController.getByPk = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const follower = await FollowerModel.findByPk(id);

        if (!follower) {
            return res.status(404).json({ error: 'Follower not found' });
        }

        res.json(follower);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete follower by ID
FollowerController.deleteByPk = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const follower = await FollowerModel.findByPk(id);

        if (!follower) {
            return res.status(404).json({ error: 'Follower not found' });
        }

        await FollowerModel.destroy({
            where: { id: id },
        });

        res.json({ message: 'Follower deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new Follower
FollowerController.create = async (req, res) => {
    const newFollower = req.body;

    try {
        const createdFollower = await FollowerModel.create(newFollower);
        res.status(201).json(createdFollower);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update follower by ID
FollowerController.update = async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    try {
        const follower = await FollowerModel.findByPk(id);

        if (!follower) {
            return res.status(404).json({ error: 'Follower not found' });
        }

        await FollowerModel.update(updatedData, {
            where: { id: id },
        });

        // Fetch the updated follower data
        const updatedFollower = await FollowerModel.findByPk(id);
        res.json(updatedFollower);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get followers by Follower ID
FollowerController.getFollowersByFollowerId = async (req, res) => {
    const followerId = parseInt(req.params.followerId);

    try {
        const followers = await FollowerModel.findAll({
            where: { follower_id: followerId }
        });

        res.json(followers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get followers by Following ID
FollowerController.getFollowersByFollowingId = async (req, res) => {
    const followingId = parseInt(req.params.followingId);

    try {
        const followers = await FollowerModel.findAll({
            where: { following_id: followingId }
        });

        res.json(followers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = FollowerController;