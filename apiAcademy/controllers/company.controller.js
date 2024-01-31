const { company : Company } = require('../configs/db/config/db');
// Controller functions for CRUD operations
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyByIdUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findOne({
        where: { id: id },
        include: [
            {
              association: 'user_companies',
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
                  }
              ]
            }
        ]
    })
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company.user_companies.map(user_company => user_company.user));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCompany = async (req, res) => {
  const { name, address, city, phone } = req.body;
  try {
    const newCompany = await Company.create({ name, address, city, phone });
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, address, city, phone } = req.body;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    await company.update({ name, address, city, phone });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    await company.destroy();
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyByIdUsers
};
