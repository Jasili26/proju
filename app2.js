'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/pass');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const storyRoute = require('./routes/storyRoute');
const endRoute = require('./routes/endRoute');



const app2 = express();
const port = 3001; //Huomaa porttinumero
app2.enable('trust proxy');

app2.use ((req, res, next) => {
    if (req.secure) {
        // request was via https, so do no special handling
        next();
    } else {
        // if express app run under proxy with sub path URL
        // e.g. http://www.myserver.com/app/
        // then, in your .env, set PROXY_PASS=/app
        // Adapt to your proxy settings!
        const proxypath = process.env.PROXY_PASS || ''
        // request was via http, so redirect to https
        res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`);
    }
});

app2.use(cors());
app2.use(express.static('public'));
app2.use(express.static('uploads'));
app2.use('/thumbnails', express.static('thumbnails'));

app2.use(bodyParser.urlencoded({extended: false}));
app2.use(bodyParser.json());

app2.use('/auth', authRoute);
app2.use('/end', endRoute);
app2.use('/story', storyRoute);
app2.use('/user', passport.authenticate('jwt', {session: false}), userRoute);




app2.listen(port, () => console.log(`App listening on port ${port}...`));
