const Movie = require('../models/Movie');

const LIMIT = 50;

module.exports = async (req, res) => {
  try {
    const results = await Movie.findAll({
      limit: LIMIT,
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
