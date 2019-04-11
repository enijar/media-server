const Sequelize = require('sequelize');
const Movie = require('../models/Movie');

module.exports = async (req, res) => {
    if (!req.body.query) {
        return res.send({errors: ['Missing query parameter']});
    }

    try {
        const results = await Movie.findAll({
            where: Sequelize.literal('MATCH (title) AGAINST (:title)'),
            replacements: {
                title: req.body.query,
            },
            // where: {
            //     title: {
            //         [Sequelize.Op.like]: `%${req.body.query}%`
            //     }
            // },
            order: [
                ['year', 'desc'],
            ],
        });
        res.send(results);
    } catch (err) {
        console.error(err);
        return res.send({errors: ['Server error, try again later']});
    }
};
