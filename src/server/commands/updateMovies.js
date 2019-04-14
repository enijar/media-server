require('../bootstrap');
const Sequelize = require('sequelize');
const fetch = require('node-fetch');
const _ = require('lodash');
const config = require('../../config/server');
const Movie = require('../models/Movie');

// @note you will most likely need a VPN for this to run without
// being blocked by your ISP. I suggest https://nordvpn.com
async function updateMovies(page = 1, failedPages = []) {
    const endpoint = `https://yts.am/api/v2/list_movies.json?page=${page}&limit=50`;

    console.log(`Fetching movies from endpoint ${endpoint}...`);

    try {
        const res = await fetch(endpoint);
        const json = await res.json();
        const movies = _.get(json, 'data.movies', []).map(movie => {
            const torrent = _.get(movie, 'torrents', []).find(torrent => torrent.quality === '1080p');

            if (!torrent) {
                return null;
            }

            return {
                guid: _.get(movie, 'id', null),
                img: _.get(movie, 'large_cover_image', '').replace('https://yts.am', config.cdnHost),
                title: _.get(movie, 'title_english', null),
                year: _.get(movie, 'year', null),
                rating: _.get(movie, 'rating', null),
                genres: _.get(movie, 'genres', null),
                summary: _.get(movie, 'summary', null),
                description_full: _.get(movie, 'description_full', null),
                synopsis: _.get(movie, 'synopsis', null),
                language: _.get(movie, 'language', null),
                runtime: _.get(movie, 'runtime', null),
                certificate: _.get(movie, 'mpa_rating', null),
                link: _.get(movie, 'url', ''),
                hash: _.get(torrent, 'hash', null),
                seeds: _.get(torrent, 'seeds', 0),
                peers: _.get(torrent, 'peers', 0),
                size: _.get(torrent, 'size', 0),
                type: _.get(torrent, 'type', null),
                imdb: `https://www.imdb.com/title/${_.get(movie, 'imdb_code', '')}`,
                uploaded_at: _.get(torrent, 'date_uploaded', null),
            };
        }).filter(movie => movie !== null);

        if (movies.length === 0) {
            console.log('Movies updated');

            if (failedPages.length > 0) {
                console.error(`Failed to fetch ${failedPages.length} pages: ${failedPages.join(',')}`);
            }

            return;
        }

        const duplicateMovies = await Movie.findAll({
            where: {
                guid: {
                    [Sequelize.Op.in]: movies.map(movie => movie.guid),
                },
            },
        });
        const duplicateMovieIds = duplicateMovies.map(movie => movie.guid);

        // Remove duplicate films
        await Movie.bulkCreate(movies.filter(movie => !duplicateMovieIds.includes(movie.guid)));

        if (duplicateMovies.length === movies.length) {
            return;
        }
    } catch (err) {
        failedPages.push(page);
        console.error(`Error fetching movies from endpoint ${endpoint}: ${err.message}`);
    }

    return updateMovies(++page, failedPages);
}

module.exports = () => updateMovies();
