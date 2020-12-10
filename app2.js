'use strict';
const express = require('express');
const cors = require('cors');
const fs      = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const passport = require('./utils/pass.js');
const authRoute = require('./routes/authRoute');
const storyRoute = require('./routes/storyRoute');
const endRoute = require('./routes/endRoute');
const app2 = express();

app2.enable('trust proxy');

app2.use(cors());
// parse application/x-www-form-urlencoded
app2.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app2.use(bodyParser.json());


// if production redirect to https
if (process.env.NODE_ENV === 'production') {
    app2.use((req, res, next) => {
        if (req.secure) {
            // request was via https, so do no special handling
            next();
        } else {
            // if express app run under proxy with sub path URL
            // e.g. http://www.myserver.com/app/
            // then, in your .env, set PROXY_PASS=/app
            // Adapt to your proxy settings!
            const proxypath = process.env.PROXY_PASS || '';
            // request was via http, so redirect to https
            console.log(`https://${req.headers.host}${proxypath}${req.url}`);
            res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`);
        }
    });
}

app2.use(express.static('public'));
app2.use(express.static('uploads'));
app2.use('/thumbnails', express.static('thumbnails'));

app2.use('/auth', authRoute);
app2.use('/end', endRoute);
app2.use('/story', storyRoute);
app2.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

// http
app2.listen(3001, () => console.log(`HTTP on port ${3001}!`));

// if production, add https, with this if no need to install certs locally
if (process.env.NODE_ENV === 'production') {
    const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
    const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
    const options = {
        key: sslkey,
        cert: sslcert
    };
    https.createServer(options, app2).listen(8001,
        () => console.log(`HTTPS on port ${8001}!`)); //https traffic
}