
const request = require('request');

request({
    url: 'http://www.mapquestapi.com/geocoding/v1/address?key=TuZIGVjYQ7g5k66GuJLqtWRymdAG8QaW&location=1301%20lombard%20street%20philadelphia',
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);

});
