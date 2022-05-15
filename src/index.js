import express from 'express';

var app = express();

var PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendStatus(200);
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});