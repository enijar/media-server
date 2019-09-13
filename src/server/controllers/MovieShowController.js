const Movie = require('../models/Movie');

module.exports = async (req, res) => {
  const movie = await Movie.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!movie) {
    res.status(404).send({errors: ['Movie not found']});
  }

  res.send(movie);
};
