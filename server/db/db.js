const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/simpleChallenge', {
  logging: false,
});

module.exports = db;
