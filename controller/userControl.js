const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userRegister = (req, res, next) => {
    const {name, email, password} = req.body;
    User.findOne({email}, (err, data) => {
        if (data) {
            return res.status(400).json({
                message: 'User has been registered already'
            })
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(401).json({
                        message: 'FAILURE, Password not found!',
                        error: err
                    });
                } else {
                    let newUser = new User({
                        name,
                        password: hash,
                        email
                    });
                    newUser.save((err, data) => {
                        if (err) {
                            res.status(400).json({
                                message: 'Error occurred Creating User',
                                error: err
                            });
                        } else {
                            console.log(newUser);
                            res.status(201).json({
                                message: 'User created successfully',
                                newUser: data
                            })
                        }
                    })
                }
            })
        }
    });
};

const userLogin = (req, res) => {
    const {name, email, password} = req.body;
    User.findOne({email}, (err, data) => {
        if (!data) {
            return res.status(401).json({
                message: "User doesn't exist"
            })
        } else {
            console.log("Before the bycrpt");
            bcrypt.compare(password, data.password, (err, res) => {
                if (err || !res) {
                    console.log("after the bycrpt -- error");
                    res.status(401).json({
                        message: 'Error, Email or Password not found!!!',
                        error: err
                    })
                } else {
                    const user = {email: data.email, name: data.name};
                    console.log('user object ', user);
                    jwt.sign({user}, 'ytuftjygfrdtjfhgft', {expiresIn: '6h'}, (err, token) => {
                        console.log('user object 2 ', user);
                        res.status(201).json({
                            message: 'Login Successfully',
                            user: user,
                            token: token
                        });
                    })

                }
            });


            // if (name !== data.name && password !== data.password) {
            //     return res.status(401).json({
            //         message: "Invalid name/password"
            //     })
            // } else {
            //     req.session.email = data.email;
            //     console.log(data.email);
            //     return res.status(200).json({
            //         message: "Logged in Successfully",
            //     })
            // }
        }
    })
};

const userDisplay = (req, res, next) => {
    User.find((err, data) => {
        if (err) return next(err)
        res.status(200).json({
            message: "users return successfully",
            data
        })

    })
};

module.exports = {userRegister, userLogin, userDisplay};
