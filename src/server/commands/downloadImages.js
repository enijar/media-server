require('../bootstrap');
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const request = require('superagent');
const _ = require('lodash');
const Movie = require('../models/Movie');

const BATCH_SIZE = 30;
const FAILED_IDS = [];

(async function downloadImage() {
    const publicPath = path.resolve(__dirname, '..', '..', '..', 'public');
    const files = fs.readdirSync(path.join(publicPath, 'images'));
    const ids = files
        .filter(file => !file.startsWith('.'))
        .map(file => parseInt(file.replace(/\.jpg$/, ''))).sort();

    const moviesWithoutImages = await Movie.findAll({
        where: {
            id: {
                [Sequelize.Op.notIn]: ids,
            },
        },
    });

    const chunks = _.chunk(moviesWithoutImages, BATCH_SIZE);

    for (let i = 0; i < chunks.length; i++) {
        console.log(`Processing urls with IDs ${chunks[i].map(url => url.id).join(',')}...`);

        const requests = chunks[i].map(url => new Promise(resolve => {
            request.get(url.img).send().end((err, res) => {
                if (err || !res) {
                    resolve(null);
                    FAILED_IDS.push(url.id);
                    return console.error(`Failed to download image "${url.img}"`);
                }

                fs.writeFileSync(path.join(publicPath, 'images', `${url.id}.jpg`), res.body, 'utf8');
                resolve(url.id);
            });
        }));

        await Promise.all(requests);
    }

    if (FAILED_IDS.length > 0) {
        console.log(`Failed to download some images, ${FAILED_IDS.join(',')}`);
    }

    console.log('Finished downloading images');
})();
