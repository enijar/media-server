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
                    type: DataTypes.STRING,
                },
                rating: {
                    type: DataTypes.STRING,
                },
                genres: {
                    type: DataTypes.JSON,
                },
                link: {
                    type: DataTypes.STRING,
                },
                hash: {
                    type: DataTypes.STRING,
                },
                seeds: {
                    type: DataTypes.STRING,
                },
                peers: {
                    type: DataTypes.STRING,
                },
                size: {
                    type: DataTypes.STRING,
                },
                uploaded_at: {
                    type: DataTypes.STRING,
                },
                type: {
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
