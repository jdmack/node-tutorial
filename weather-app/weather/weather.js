const request = require('request');

const apiKey = '43f7bb8459130aa0b8360d8726d7cdc4';

var getWeather = (latitude, longitude, callback) => {
    request(
    {
        url: `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(`Current temperature: ${body.currently.temperature}`);
            callback(undefined, body.currently);
        }
        else {
            console.log('Unable to fetch weather.');
        }
    });
}

module.exports.getWeather = getWeather;
