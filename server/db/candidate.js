const Sequelize = require('sequelize');
const db = require('./db');

//Candidate Model

const Candidate = db.define('candidate', {
  candidate_id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  communication_score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  coding_score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  company_id: {
    type: Sequelize.INTEGER,
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

module.exports = Candidate;
