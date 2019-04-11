const path = require('path');
const fs = require('fs');
const request = require('superagent');
const cheerio = require('cheerio');

const HOST = 'https://afidian.com';
const PAGE_INTERVAL = 5000;

const sendRequest = url => new Promise((resolve, reject) => {
    request.get(url).send().end((err, res) => {
        if (err) {
            return reject(err);
        }
        resolve(res.text);
    });
});

const storeMovies = (movies = []) => {
    const moviesFile = path.resolve(__dirname, '..', '..', '..', 'storage', 'movies.json');
    let storedMovies = [];

    if (fs.existsSync(moviesFile)) {
        storedMovies = JSON.parse(fs.readFileSync(moviesFile, 'utf8')) || [];
    }

    fs.writeFileSync(moviesFile, JSON.stringify(storedMovies.concat(movies)), 'utf8');
};

const getMovieDetails = async link => {
    try {
        const res = await sendRequest(link);
        const $ = cheerio.load(res);
        return {
            magnet: $('.magnet-download.download-torrent.magnet').attr('href'),
            imdb: $('a[title="IMDb Rating"]').attr('href'),
        };
    } catch (err) {
        console.error(err.message);
        return {};
    }
};

(async function scrape(page = 1) {
    try {
        console.log(`Getting movies from page ${page}...`);

        const res = await sendRequest(`${HOST}/browse-movies?page=${page}`);
        const $ = cheerio.load(res);

        // Stop if there is no next page
        if (!$('ul.tsc_pagination > li:last-child > a').first().text().match(/Last/)[0]) {
            return console.log(`Finished on page ${page}`);
        }

        const movies = [];

        $('.browse-movie-wrap').map(function () {
            const titleElement = $(this).find('.browse-movie-title');
            const img = $(this).find('figure > img').attr('src');
            const title = titleElement.text();
            const link = titleElement.attr('href').replace('https://yts.am', HOST);
            const year = parseInt($(this).find('.browse-movie-year').text());
            const rating = parseFloat($(this).find('h4.rating').text().replace(/\s+/g, '').replace('/10', ''));
            const genres = [];

            $(this).find('h4:not(.rating)').map(function () {
                genres.push($(this).text());
            });

            movies.push({
                img,
                title,
                year,
                rating,
                genres,
                link,
                magnet: null,
                imdb: null,
            });
        });

        const movieDetails = await Promise.all(movies.map(movie => {
            console.log(`Getting magnet link for movie ${movie.title}...`);
            return getMovieDetails(movie.link);
        }));

        for (let i = 0; i < movies.length; i++) {
            movies[i] = Object.assign(movies[i], movieDetails[i]);
        }

        storeMovies(movies);
    } catch (err) {
        console.error(err.message);
    }

    return setTimeout(() => scrape(++page), PAGE_INTERVAL);
})();