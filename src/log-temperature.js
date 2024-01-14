const {getCurrentTemperature, getMaxTemperature, logToFile} = require('./utilities.js');
const {CronJob} = require('cron');

const logTemperature = async () => {
    try {
        const currentTemperature = await getCurrentTemperature();
        const maxTemperature = await getMaxTemperature();
        logToFile({currentTemperature, maxTemperature});
    } catch (error) {
        console.error('Error while logging temperature', error);
    }
}

const main = () => {
    const interval = process.env.TEMPERATURE_LOG_INTERVAL_MINUTES;
    const cronExpression = `*/${interval} * * * *`;
    const job = new CronJob(cronExpression, logTemperature, null, true, 'Asia/Kolkata');

    job.start();
}

module.exports = main