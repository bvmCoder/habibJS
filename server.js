var path = require('path');
var express = require('express');
var colors = require('colors/safe');
var api = require('./public/api');

var isProduction = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production' ? true : false;
var port = process.env.PORT || 3000;
var app = express();

colors.setTheme({
    info: 'green',
    verbose: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

app.get('/api/*', (req, res) => {
    res.json(api[req.params[0]]);
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var server = app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    
    var url = `http://localhost:${port}`;

    console.log(colors.info(`Listening (NODE_ENV=${isProduction ? 'production' : 'development'}) at ${url}`));
});

server.on('uncaughtException', (req, res, err) => {
    console.log(colors.error(err));
    
    req.log.error({
        req,
        res,
        route: null,
        err
    }, 'uncaught exception');

    if (!res.headersSent) {
        req.log.error('sending error response from uncaught exception');
        res.send(err);
    }
});
