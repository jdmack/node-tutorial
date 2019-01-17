const request = require('request');

const apiKey = 'TuZIGVjYQ7g5k66GuJLqtWRymdAG8QaW';

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address);

    request({
        // url: 'http://www.mapquestapi.com/geocoding/v1/address?key=TuZIGVjYQ7g5k66GuJLqtWRymdAG8QaW&location=1301%20lombard%20street%20philadelphia',
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${address}`,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('Unable to connect to geo service');
        }
        else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        }
        else if (body.info.statuscode === 0) {
            var formattedAddress = `${body.results[0].locations[0].street}, `
                + `${body.results[0].locations[0].adminArea5}, `
                + `${body.results[0].locations[0].adminArea3} `
                + `${body.results[0].locations[0].postalCode}, `
                + `${body.results[0].locations[0].adminArea1}`;

            callback(undefined, {
                address: formattedAddress   ,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }
    });
};


module.exports.geocodeAddress = geocodeAddress;
