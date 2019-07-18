require('../bootstrap');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;

function cleanOldFiles() {
    const downloadsPath = path.resolve(__dirname, '..', '..', '..', 'storage', 'downloads');
    const files = fs.readdirSync(downloadsPath);
    const now = Date.now();

    for (let i = 0; i < files.length; i++) {
        const filePath = path.join(downloadsPath, files[i]);
        const stat = fs.statSync(filePath);

        // Ignore non-directory files
        if (!stat.isDirectory()) {
            continue;
        }

        // Delete old directories
        if (stat.birthtimeMs + WEEK_IN_MS <= now) {
            rimraf.sync(filePath);
        }
    }
}

module.exports = () => cleanOldFiles();
