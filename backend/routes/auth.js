const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "signedin";
const fetchUser = require('../middleware/fetchUser');

//Route 1/3 >>> Creating user registration endpoint ........ /api/auth/createuser
router.post('/createuser', [
    //Defining field properties
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    //Checking for bad inputs
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Creating user in database
    try {
        //Check if the user is already available
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Username not available" });
        }

        //Used salt to secure the hashed password 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        
        //add user in database with given user details
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user : {
                id: user.id
            }
        };
        //auth-token is used to verify the user 
        const authToken  = jwt.sign(data, JWT_SECRET);
        res.json(authToken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 2/3 >>> Creating user login endpoint ........ /api/auth/login
router.post('/login', [
    //Defining field properties
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errors = validationResult(req);

    //Checking for bad inputs
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    //Checking user in database
    try {
        let user = await User.findOne({ email });
        //Check if the account does not exist
        if (!user) {
            return res.status(400).json({ error: "Invalid credential" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid credential" });
        }

        const data = {
            user : {
                id: user.id
            }
        };
        const authToken  = jwt.sign(data, JWT_SECRET);
        res.json(authToken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 3/3G >>> get login user detail endpoint ........ /api/auth/getuser
router.post('/getuser', fetchUser, async (req, res) => {

    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;