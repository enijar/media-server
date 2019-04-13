require('../bootstrap');
const fetch = require('node-fetch');
const _ = require('lodash');
const config = require('../../config/server');
const Movie = require('../models/Movie');

const STATE = {
    page: 1,
    failedPages: [],
};

const WORKERS = 20;

async function updateMovies(page = 1) {
    const endpoint = `https://yts.am/api/v2/list_movies.json?page=${page}`;

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
                summary: _.get(movie, 'summary', null),
                summary_full: _.get(movie, 'summary_full', null),
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

            if (STATE.failedPages.length > 0) {
                console.error(`Failed to fetch ${STATE.failedPages.length} pages: ${STATE.failedPages.join(',')}`);
            }

            process.exit(0);
        }

        await Movie.bulkCreate(movies);
    } catch (err) {
        STATE.failedPages.push(page);
        console.error(`Error fetching movies from endpoint ${endpoint}: ${err.message}`);
    }
}

(async function work() {
    const processes = [];
    for (let i = 0; i < WORKERS; i++) {
        processes.push(updateMovies(STATE.page));
        STATE.page++;
    }

    await Promise.all(processes);
    return work();
})();
