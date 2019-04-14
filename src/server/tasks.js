const {CronJob} = require('cron');
const moment = require('moment');
const updateMovies = require('./commands/updateMovies');

new CronJob('0 0 */1 * * *', async () => {
    console.log(`[CRON @ ${moment().format('YYYY-MM-DD hh:mm:ss')}] Starting update movies command...`);
    await updateMovies();
    console.log(`[CRON @ ${moment().format('YYYY-MM-DD hh:mm:ss')}] Update movies command finished`);
}, null, true, 'Europe/London');
