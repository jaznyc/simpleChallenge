const Sequelize = require('sequelize');
const db = require('./db');

//Company Model

const Company = db.define('company', {
  company_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fractal_index: {
    type: Sequelize.DECIMAL(10, 3),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Company;
