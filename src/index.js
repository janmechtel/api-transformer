import express from 'express';
import fetch from 'node-fetch';

var app = express();

var PORT = process.env.PORT || 3000;

var route = {
    fetchRequest: {
        url: 'https://api.sampleapis.com/wines/reds',
        options: {}
    }
}

function getData(url, options) {
    return fetch(url, options)
        .then(inResponse => inResponse.json())
        .then(function(data) {
            return data;
        });
}

app.get('*', function(inRequest, outResponse) {
    console.log(inRequest);
    getData(route.fetchRequest.url, route.fetchRequest.options)
    .then(function(inResponseData) {
        console.log(inResponseData[1]);
        outResponse.send(inResponseData);
        outResponse.status = 200;
    });
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});

// getData(route.fetchRequest.url, route.fetchRequest.options)
//     .then(function(data) {
//         console.log(data[1])
//     });