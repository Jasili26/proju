'use strict';

require('dotenv').config();
const express = require('express');
const app2 = express();

app2.enable('trust proxy');


app2.use ((req, res, next) => {
    if (req.secure) {

        next();
    } else {

        const proxypath = process.env.PROXY_PASS || ''

        res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`);
    }
});

app2.listen(3001);
