const {CronJob} = require('cron');
const moment = require('moment');
const updateMovies = require('./commands/updateMovies');
const downloadImages = require('./commands/downloadImages');
const cleanOldFiles = require('./commands/cleanOldFiles');

new CronJob('0 0 */1 * * *', async () => {
  console.log(`[CRON @ ${moment().format('YYYY-MM-DD hh:mm:ss')}] Starting update movies command...`);
  await updateMovies();
  console.log(`[CRON @ ${moment().format('YYYY-MM-DD hh:mm:ss')}] Update movies command finished`);

  console.log(`[CRON @ ${moment().format('YYYY-MM-DD hh:mm:ss')}] Starting download images command...`);
  await downloadImages();
  console.log(`[CRON @ ${moment().format('YYYY-MM-DD hh:mm:ss')}] Download images command finished`);

  console.log(`[CRON @ ${moment().format('YYYY-MM-DD hh:mm:ss')}] Starting clean old files command...`);
  await cleanOldFiles();
  console.log(`[CRON @ ${moment().format('YYYY-MM-DD hh:mm:ss')}] Clean old files finished`);
}, null, true, 'Europe/London');
