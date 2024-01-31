
const { activity: Activity,
        section: Section,
        impression: Impression,
        level: Level
 } = require('../configs/db/config/db'); 

// Controller functions for CRUD operations
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createActivity = async (req, res) => {
  const { name, position, is_delete, is_free, section_id } = req.body;
  try {
    const newActivity = await Activity.create({ name, position, is_delete, is_free, section_id });
    res.status(201).json(newActivity);
  } catch (error) { 
    res.status(500).json({ error: error.message });
  }
};

const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { name, position, is_delete, is_free, section_id } = req.body;
  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    await activity.update({ name, position, is_delete, is_free, section_id });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findByPk(id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    await activity.destroy();
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllActivitiesGroupedBySection = async (req, res) => {
//TODO : prefer to be moved to section controller instead.
    try {
    const sectionsWithActivities = await Section.findAll({
        include: [{
            model: Activity,
            as:'activities',
            attributes: ['id', 'is_free', 'name', 'position'], 
            where: {
                is_delete: false, 
            },
        }],
        });
      
      console.log(sectionsWithActivities)
      
  
     
  
      res.status(200).json(sectionsWithActivities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch activities grouped by section' });
    }
  };

  const getSectionsWithActivitiesAndImpressionsByPeriodAndUserId = async (req, res) => {
    const periodId = req.query.periodId; 
    const userId = req.query.userId; 
    try {
      const sectionsWithActivities = await Section.findAll({
        include: [{
          model: Activity,
          as: 'activities',
          attributes: ['id', 'name', 'position'], 
          include: {
            model: Impression,
            as:'impressions',
            attributes: ['id','content'],
            where: {
              period_id: periodId,
              student_id: userId,
            },
            required: true, // Fetch activities even if there are no impressions
            include: {
                model: Level,
                as:'level',
                attributes: ['id','name']
              },
          },
          required:true
        }],
      }); 
      res.status(200).json(sectionsWithActivities);
    } catch (error) { 
      res.status(500).json({ error: 'Failed to fetch sections with activities and impressions' });
    }
  };
  
  


module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getAllActivitiesGroupedBySection,
  getSectionsWithActivitiesAndImpressionsByPeriodAndUserId
};
