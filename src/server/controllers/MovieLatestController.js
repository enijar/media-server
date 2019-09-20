const {Op} = require('sequelize');
const config = require('../../config/server');
const Movie = require('../models/Movie');

module.exports = async (req, res) => {
  try {
    const results = await Movie.findAll({
      limit: config.resultsLimit,
      where: {
        runtime: {
          [Op.gt]: 0,
        }
      },
      order: [
        ['year', 'desc'],
        ['rating', 'desc'],
      ],
    });
    res.send({items: results});
  } catch (err) {
    console.error(err);
    return res.send({errors: ['Server error, try again later']});
  }
};
