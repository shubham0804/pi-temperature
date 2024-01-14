module.exports = {
    apps : [{
      name: 'pi-temerature-logger',
      script: './index.js',
      watch: true,
      ignore_watch : ["node_modules"],
      time: true,
      log_date_format: 'DD-MM-YYYY HH:mm:ss',
    }]
};