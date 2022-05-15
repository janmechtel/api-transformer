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
    fetch(url, options)
        .then(inResponse => inResponse.json())
        .then(function(data) {
            return data;
        });
}

app.get('*', function(inRequest, outResponse) {
    console.log(inRequest);
    outResponse.status = 200;
    var inResponseData = getData(route.fetchRequest.url, route.fetchRequest.options);
    console.log(inResponseData[1]);
    outResponse.send(inResponseData);

});

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});

// getData(route.fetchRequest.url, route.fetchRequest.options);