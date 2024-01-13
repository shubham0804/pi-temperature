const si = require('systeminformation');
const fs = require('fs');

const getCurrentTemperature = async () => {
    const temperature = await si.cpuTemperature();
    return temperature.main;
}

const getMaxTemperature = async () => {
    const temperature = await si.cpuTemperature();
    return temperature.max;
}

const logToFile = async (info) => {
    if (typeof info !== 'object') {
        throw new Error('Log info not in json format');
    }
    const currentTimeStamp = new Date();
    info.timestamp = currentTimeStamp;
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    let dateString = currentTimeStamp.toLocaleDateString('en-IN', options);
    dateString = dateString.replace(/\//g, '-');
    const logFilePath = await createLogFileIfNotExists(dateString);
    await writeLogToFile(logFilePath, info);
}

const createLogFileIfNotExists = async (dateString) => {
    const path = process.env.TEMPERATURE_LOG_PATH;
    const fileName = `${dateString}.json`;
    const filePath = `${path}/${fileName}`;
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
        fs.writeFileSync(filePath, '[]');
    }
    return filePath;
}

const writeLogToFile = async (filePath, info) => {
        // Read the file
        const data = fs.readFileSync(filePath, 'utf8');

        // Parse the JSON into an array
        let array = JSON.parse(data);
    
        // Add the info to the array
        array.push(info);
    
        // Write the array back to the file
        fs.writeFileSync(filePath, JSON.stringify(array));
}

module.exports = {
    getCurrentTemperature,
    getMaxTemperature,
    logToFile
}