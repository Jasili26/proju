'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const endController = require('../controllers/endController');

router.get('/', endController.end_list_get);

router.post('/new',
    [
        body('end', 'minimum 3 characters').isLength({min: 3}),
    ],

    endController.end_create_post,



);

module.exports = router;