'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const login = (req, res) => {
    // TODO: add passport authenticate
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('login', info);
        if (err || !user) {
            return res.status(400).json({
                message: 'Error',
                user: user,
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'JooTuuNiNa');
            return res.json({user, token});
        });

    })(req, res);
};

const user_create_post = async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
        // TODO: bcrypt password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.psw, salt);
        const params = [
            req.body.username2,
            req.body.fname,
            req.body.email,
            hash, // TODO: save hash instead of the actual password
        ];

        if (await userModel.addUser(params)) {
            res.status(200).json({message: 'register ok'});
        } else {
            res.status(400).json({error: 'register error'});
        }
    }
};

const logout = (req, res) => {
    req.logout();
    res.json({message: 'logout'});
};

module.exports = {
    login,
    user_create_post,
    logout,
};