
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const geocodeApiKey = 'TuZIGVjYQ7g5k66GuJLqtWRymdAG8QaW';
const weatherApiKey = '43f7bb8459130aa0b8360d8726d7cdc4';
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${geocodeApiKey}&location=${encodedAddress}`;


axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    var latitude = response.data.results[0].locations[0].latLng.lat;
    var longitude = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/${latitude},${longitude}`;
    var formattedAddress = `${response.data.results[0].locations[0].street}, `
        + `${response.data.results[0].locations[0].adminArea5}, `
        + `${response.data.results[0].locations[0].adminArea3} `
        + `${response.data.results[0].locations[0].postalCode}, `
        + `${response.data.results[0].locations[0].adminArea1}`;

    console.log(formattedAddress);

    return axios.get(weatherUrl);

}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    }
    else {
        console.log(e.message);
    }
});
