const Sequelize = require('sequelize');

module.exports = class Movie extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                img: {
                    type: DataTypes.STRING,
                },
                title: {
                    type: DataTypes.TEXT,
                },
                year: {
                    type: DataTypes.FLOAT,
                },
                rating: {
                    type: DataTypes.FLOAT,
                },
                genres: {
                    type: DataTypes.JSON,
                },
                link: {
                    type: DataTypes.STRING,
                },
                magnet: {
                    type: DataTypes.TEXT,
                },
                imdb: {
                    type: DataTypes.STRING,
                },
            },
            {
                tableName: 'movies',
                sequelize,
                timestamps: false,
            },
        );
    }
};
