'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register',
    [
            body('username2', 'minimum 3 characters').isLength({min: 3}),
            body('fname', 'minimum 3 characters').isLength({min: 3}),
            body('email', 'email is not valid').isEmail(),
            body('psw', 'at least one upper case letter').
            matches('(?=.*[A-Z]).{8,}'),
    ],


    authController.user_create_post,

);

module.exports = router;