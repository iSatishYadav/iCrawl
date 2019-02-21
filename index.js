const Crawler = require("crawler");
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    host: '(localdb)\\MSSQLLOCALDB',
    dialect: 'mssql',
    username: '',
    database: '',
    password: '',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection established');
    })
    .catch((error) => {
        console.error('Unable to connect to database', error);
    });

let crawler = new Crawler({
    callback: (error, res, done) => {
        if (error)
            console.error(error);
        else {
            var $ = res.$;
            console.log("================");
            console.log("method", res.request.method);
            console.log("url", res.request.uri);
            console.log("response code", res.request.statusCode);
            console.log("headers", res.headers);
            console.log("================");
        }
        done();
    }
});

crawler.queue("https://ebiz.bpc.co.in/SMS");