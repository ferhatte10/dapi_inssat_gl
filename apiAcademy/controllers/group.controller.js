const {USER_ENTITY : UserModel,KEYCLOAK_GROUP} = require('../configs/db/config/db');

// Define the controller methods
const GroupController = {};

// Get all groups
GroupController.getAllGroup= async (req,res) =>{
    try {

        let groups = await KEYCLOAK_GROUP.findAll({
            where: { PARENT_GROUP: '' },
            attributes: ["ID","NAME"],
            include: [
                {
                    association: 'realm',
                    where: { name: 'intranet' },
                    attributes: []
                },
                {
                    association: 'children',
                    attributes: ["ID","NAME"],
                }
            ]
        });

        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

GroupController.getUsersByGroupId = async (req, res) => {
    //uuid of group
    let group_id = req.params.id;
    try {
        let group = await KEYCLOAK_GROUP.findOne({
            where: { ID: group_id },
            attributes: ["ID","NAME"],
            include: [
                {
                    association: 'realm',
                    where: { name: 'intranet' },
                    attributes: []
                }
            ]
        });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        //get all users of this group
        let users = await UserModel.findAll({
            attributes:
            [
                ["ID", "uuid"],
                ["FIRST_NAME", "firstName"],
                ["LAST_NAME", "lastName"],
                ["EMAIL", "email"]
            ],
            include: [
                {
                    association: 'USER_GROUP_MEMBERSHIPS',
                    where: { GROUP_ID: group_id },
                    attributes: []
                },
                {
                    association: 'realm',
                    where: { name: 'intranet' },
                    attributes: []
                },
                // {
                //     association: 'USER_ATTRIBUTES',
                //     attributes: ['name', 'value']
                // }
            ]
        });
        res.json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = GroupController;
