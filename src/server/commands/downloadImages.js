const path = require('path');
const fs = require('fs');
const request = require('superagent');
const _ = require('lodash');
const urls = require('../../../storage/data/urls');

const BATCH_SIZE = 30;

(async function downloadImage() {
    const storagePath = path.resolve(__dirname, '..', '..', '..', 'storage');
    const chunks = _.chunk(urls, BATCH_SIZE);

    for (let i = 0; i < chunks.length; i++) {
        console.log(`Processing urls with IDs ${chunks[i].map(url => url.id).join(',')}...`);

        const requests = chunks[i].map(url => new Promise(resolve => {
            request.get(url.img).send().end((err, res) => {
                if (err || !res) {
                    resolve(null);
                    return console.error(`Failed to download image "${url.img}"`);
                }

                fs.writeFileSync(path.join(storagePath, 'images', `${url.id}.jpg`), res.body, 'utf8');
                resolve(url.id);
            });
        }));

        await Promise.all(requests);
    }
})();
