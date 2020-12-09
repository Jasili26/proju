'use strict';

const { validationResult } = require('express-validator');
const storyModel = require('../models/storyModel');

const story_list_get = async (req, res) => {
    const users = await userModel.getAllStories();
    res.json(users);
};



const story_create_post = async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {


        const params = [
            req.body.head,
            req.body.genre,
            req.body.aloite,

        ];

        if (await storyModel.addStory(params)) {
            res.status(200).json({message: 'tarina ok'});
        } else {
            res.status(400).json({error: 'register error'});
        }
    }
};

module.exports = {
    story_create_post,
    story_list_get
};