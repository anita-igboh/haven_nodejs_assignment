const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const AuthenticationController = {
    login: (req, res) => {
        const {name, password} = req.body;
        try {
            User.findOne({name: name})
                .exec((err, user) => {
                    if (err || !user) {
                        res.status(400).json({
                            message: 'Error occurred, user not found',
                            error: err
                        });
                    } else {
                        bcrypt.compare(password, user.password, (err, response) => {
                            if (err || !response) {
                                res.status(401).json({
                                    message: 'FAILURE, Incorrect user password!',
                                    error: err
                                });
                            } else {
                                const userObject = {email: user.email, name: user.name};
                                jwt.sign(userObject, process.env.SECRET_TOKEN, {expiresIn: '7d'}, (err, token) => {
                                    res.status(201).json({
                                        message: 'Login success!',
                                        user: userObject,
                                        token: token
                                    });
                                })
                            }
                        });
                    }

                });


        } catch (e) {
            res.status(400).json({
                message: 'wrong password',
                error: e
            })

        }
    },

    logout: (req, res) => {
        const {name} = req.body; // Not safe -- but pass the token as a body with the user ID

        // const decoded = jwt.decode(req.headers['authorization']); // You can choose to pass the token in the Header
        const decoded = jwt.decode(req.body.token); // You can choose to pass the token in the Body

        if (decoded.payload.name !== name) {
                res.status(400).json({
                    message: 'Error trying to logout!'
                });
            } else {
                res.status(200).json({
                    message: 'Logout successful'
                });

            }

    }

};

module.exports = AuthenticationController;
