const {Op} = require('sequelize');
const moment = require('moment');
const config = require('../../config/server');
const Movie = require('../models/Movie');

const TRENDING_TIME = 30 * 3; // Last three months

module.exports = async (req, res) => {
  try {
    const results = await Movie.findAll({
      limit: config.resultsLimit,
      where: {
        year: {
          [Op.eq]: moment().format('YYYY'),
        },
        runtime: {
          [Op.gt]: 0,
        },
        rating: {
          [Op.gt]: 0,
        },
        uploaded_at: {
          [Op.gte]: moment().subtract(TRENDING_TIME, 'day').format('YYYY-MM-DD 00:00:00'),
        },
      },
      order: [
        ['rating', 'desc'],
      ],
    });
    res.send({items: results});
  } catch (err) {
    console.error(err);
    return res.send({errors: ['Server error, try again later']});
  }
};
