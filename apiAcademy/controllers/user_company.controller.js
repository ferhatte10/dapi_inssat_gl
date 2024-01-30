const { user_company: UserCompany, company: Company } = require('../configs/db/config/db');

const getAllUserCompanies = async (req, res) => {
  try {
    const userCompanies = await UserCompany.findAll();
    res.json(userCompanies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUserCompaniesWithDetails = async (req, res) => {
  try {
    const userCompanies = await UserCompany.findAll({
        include: [
            {
            association: 'user',
            attributes: ["ID","USERNAME","FIRST_NAME","LAST_NAME","EMAIL"],
            include: [
                {
                association: 'realm',
                where: { name: 'intranet' },
                attributes: []
                },
                {
                association: 'USER_ATTRIBUTES',
                attributes: ['name', 'value']
                }
            ]
            },
            {
            association: 'company'
            }
        ]
    });
    res.json(userCompanies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const userCompany = await UserCompany.findByPk(id);
    if (!userCompany) {
      return res.status(404).json({ message: 'User Company not found' });
    }
    res.json(userCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserCompanyByIdWithDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const userCompany = await UserCompany.findOne({
        where: { id: id },
        include: [
            {
            association: 'user',
            attributes: ["ID","USERNAME","FIRST_NAME","LAST_NAME","EMAIL"],
            include: [
                {
                association: 'realm',
                where: { name: 'intranet' },
                attributes: []
                },
                {
                association: 'USER_ATTRIBUTES',
                attributes: ['name', 'value']
                }
            ]
            },
            {
            association: 'company'
            }
        ]
    })
    if (!userCompany) {
      return res.status(404).json({ message: 'User Company not found' });
    }
    res.json(userCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserCompany = async (req, res) => {
  const { user_id, company_id } = req.body;
  try {
    // Check if the company exists before creating user_company
    const existingCompany = await Company.findByPk(company_id);
    if (!existingCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const newUserCompany = await UserCompany.create({ user_id, company_id });
    res.status(201).json(newUserCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserCompany = async (req, res) => {
  const { id } = req.params;
  const { user_id, company_id } = req.body;
  try {
    const userCompany = await UserCompany.findByPk(id);
    if (!userCompany) {
      return res.status(404).json({ message: 'User Company not found' });
    }

    // Check if the new company_id exists before updating user_company
    const existingCompany = await Company.findByPk(company_id);
    if (!existingCompany) {
      return res.status(404).json({ message: 'New company not found' });
    }

    await userCompany.update({ user_id, company_id });
    res.json(userCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const userCompany = await UserCompany.findByPk(id);
    if (!userCompany) {
      return res.status(404).json({ message: 'User Company not found' });
    }
    await userCompany.destroy();
    res.json({ message: 'User Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUserCompanies,
  getUserCompanyById,
  createUserCompany,
  updateUserCompany,
  deleteUserCompany,
  getAllUserCompaniesWithDetails,
  getUserCompanyByIdWithDetails
};
