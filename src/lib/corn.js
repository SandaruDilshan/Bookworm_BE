import cron from 'cron';
import https from 'https';

const job = new cron.CronJob("*/14 * * * *", function () {
    https
    .get(process.env.API_URL, (res) => {
        if (res.statusCode === 200) console.log("GET request send successfully");
        else console.log("Error in GET request", res.statusCode);
    })
    .on("error", (e) => console.error("Error in GET request", e));
});

export default job;

// MINUITE, HOUR, DAY, MONTH, WEEKDAY
// *14 * * * *    eevery 14 minutes
// *30 3 15 * *    every 30 minutes at 3:30 AM on the 15th of every month