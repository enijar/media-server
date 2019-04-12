require('../bootstrap');
const fetch = require('node-fetch');
const _ = require('lodash');
const config = require('../../config/server');
const Movie = require('../models/Movie');

(async function updateMovies(page = 1) {
    const endpoint = `${config.proxyHost}/api/v2/list_movies.json?page=${page}`;

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
                img: _.get(movie, 'large_cover_image', '').replace('https://yts.am', config.cdnHost),
                title: _.get(movie, 'title_english', null),
                year: _.get(movie, 'year', null),
                rating: _.get(movie, 'rating', null),
                genres: _.get(movie, 'genres', null),
                link: _.get(movie, 'url', '').replace('https://yts.am', config.proxyHost),
                hash: _.get(torrent, 'hash', null),
                seeds: _.get(torrent, 'seeds', 0),
                peers: _.get(torrent, 'peers', 0),
                size: _.get(torrent, 'size', 0),
                uploaded_at: _.get(torrent, 'date_uploaded', null),
                type: _.get(torrent, 'type', null),
                imdb: `https://www.imdb.com/title/${_.get(movie, 'imdb_code', '')}`,
            };
        }).filter(movie => movie !== null);

        if (movies.length === 0) {
            console.log('Movies updated');
            process.exit(0);
        }

        await Movie.bulkCreate(movies);
    } catch (err) {
        console.error(`Error fetching movies from endpoint ${endpoint}: ${err.message}`);
    }

    return updateMovies(++page);
})();
