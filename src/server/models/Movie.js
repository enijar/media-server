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
                    type: DataTypes.STRING,
                },
                genres: {
                    type: DataTypes.JSON,
                },
                summary: {
                    type: DataTypes.TEXT,
                },
                description_full: {
                    type: DataTypes.TEXT,
                },
                synopsis: {
                    type: DataTypes.TEXT,
                },
                language: {
                    type: DataTypes.STRING,
                },
                runtime: {
                    type: DataTypes.STRING,
                },
                certificate: {
                    type: DataTypes.STRING,
                },
                link: {
                    type: DataTypes.STRING,
                },
                hash: {
                    type: DataTypes.STRING,
                },
                seeds: {
                    type: DataTypes.FLOAT,
                },
                peers: {
                    type: DataTypes.FLOAT,
                },
                size: {
                    type: DataTypes.STRING,
                },
                type: {
                    type: DataTypes.STRING,
                },
                imdb: {
                    type: DataTypes.STRING,
                },
                uploaded_at: {
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
