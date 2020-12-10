'use strict';

const { validationResult } = require('express-validator');
const endModel = require('../models/endModel');

const end_list_get = async (req, res) => {
    const stories = await endModel.getAllEnds();
    res.json(stories);
};



const end_create_post = async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {


        const params = [
            req.body.end,

        ];

        if (await endModel.addEnd(params)) {
            res.status(200).json({message: 'end ok'});
        } else {
            res.status(400).json({error: 'register error'});
        }
    }
};

module.exports = {
    end_create_post,
    end_list_get
};