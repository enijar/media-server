const Sequelize = require('sequelize');
const Movie = require('../models/Movie');

module.exports = async (req, res) => {
    if (!req.body.query) {
        return res.send({errors: ['Missing query parameter']});
    }

    try {
        const results = await Movie.findAll({where: {title: {[Sequelize.Op.like]: `%${req.body.query}%`}}});
        res.send(results);
    } catch (err) {
        console.error(err);
        return res.send({errors: ['Server error, try again later']});
    }
};
