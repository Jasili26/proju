'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const storyController = require('../controllers/storyController');

router.get('/', storyController.story_list_get);

router.post('/new',
    [
        body('head', 'minimum 3 characters').isLength({min: 3}),
        body('genre', 'minimum 3 characters').isLength({min: 3}),
        body('aloite', 'email is not valid').isLength({min: 3}),

    ],


    storyController.story_create_post,

);

module.exports = router;