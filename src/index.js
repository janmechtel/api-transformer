import express from 'express';
import fetch from 'node-fetch';
import jmespath from 'jmespath'

var app = express();

var PORT = process.env.PORT || 3000;

var route = {
    fetchRequest: {
        url: 'https://api.sampleapis.com/wines/reds',
        options: {}
    },
    //alternatively we could put the entire response into the jmesPathResponse 
    // '{totalCount: length([:5]), items: [:5].{winery:winery}}'
    jmesPathResponse: {
        totalCount: 'length([:5])',
        items: '[:5].{winery:winery}'
    }
}

function getData(url, options) {
    return fetch(url, options)
        .then(inResponse => inResponse.json())
        .then(function(data) {
            return data;
        });
}

app.get('*', serveRoute);

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});

function serveRoute(inRequest, outResponse) {
    console.log(inRequest);
    getData(route.fetchRequest.url, route.fetchRequest.options)
    .then(function(inResponseData) {
        console.log(inResponseData[1]);
        var outResponseData = {};
        for (const key in route.jmesPathResponse) {
            if (Object.hasOwnProperty.call(route.jmesPathResponse, key)) {
                const element = route.jmesPathResponse[key];
                console.log(key, element);
                var value = jmespath.search(inResponseData, element);
                console.log(value);
                outResponseData[key] = value; 
            }
        }
        console.log(outResponseData);
        if (outResponse !== null) {
            outResponse.send(outResponseData);
            outResponse.status = 200;
        }
    });
};

// for debugging
// serveRoute(null, null);