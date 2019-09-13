const Sequelize = require('sequelize');
const config = require('../../config/server');
const models = require('../models/index');

const db = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
});

for (let model in models) {
  if (!models.hasOwnProperty(model)) {
    continue;
  }

  models[model] = models[model].init(db, Sequelize);
}

module.exports = db;
