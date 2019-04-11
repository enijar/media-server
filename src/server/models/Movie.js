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
                genres_0: {
                    type: DataTypes.STRING,
                },
                genres_1: {
                    type: DataTypes.STRING,
                },
                link: {
                    type: DataTypes.STRING,
                },
                magnet: {
                    type: DataTypes.STRING,
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
