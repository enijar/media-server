const Sequelize = require('sequelize');
const Movie = require('../models/Movie');

const PER_PAGE = 20;

module.exports = async (req, res) => {
    const page = Math.max(1, isNaN(parseInt(req.body.page)) ? 1 : parseInt(req.body.page));

    if (!req.body.query) {
        return res.send({errors: ['Missing query parameter']});
    }

    try {
        const results = await Movie.findAndCountAll({
            where: {
                title: {
                    [Sequelize.Op.like]: `%${req.body.query}%`
                }
            },
            order: [
                ['year', 'desc'],
            ],
            limit: PER_PAGE,
            offset: (page - 1) * PER_PAGE,
        });
        res.send({
            total: results.count,
            totalPages: Math.ceil(results.count / PER_PAGE),
            page,
            items: results.rows,
        });
    } catch (err) {
        console.error(err);
        return res.send({errors: ['Server error, try again later']});
    }
};
