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
                summary: {
                    type: DataTypes.STRING,
                },
                summary_full: {
                    type: DataTypes.STRING,
                },
                description_full: {
                    type: DataTypes.STRING,
                },
                synopsis: {
                    type: DataTypes.STRING,
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
                    type: DataTypes.STRING,
                },
                peers: {
                    type: DataTypes.STRING,
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
