const express = require('express');
const zod = require('zod');
const {User} = require('../db');
const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = require('../config');
const  { authMiddleware } = require("../middleware");
require('dotenv').config();

const signUpBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
});

const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})



const router = express.Router();


// Method: POST 
// Route: /api/v1/user/signup
router.post("/signup", async (req, res)=>{
    const { success } = signUpBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Already a user / Incorrect inputs"
        });
    }
    const existinUser = await User.findOne({
        username: req.body.username,
    });

    if(existinUser) {
        return res.status(411).json({
            message: "Already a user / Incorrect inputs"
        });
    }
    const user = User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId = user._id;
    const token = jwt.sign({
        userId
    },process.env.JWT_SECRET);

    res.status(200).json({
        message: "User created",
        token
    })
});

// Method: POST 
// Route: /api/v1/user/signin
router.post("/signin", async (req, res) => {
    const { success} = signInBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if(user){
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
        return res.json({
            token: token
        })
    }

    res.status(411).json({
        message: "Error while logging in"
    })

})

// Method: PUT
// Route: /api/v1/user
router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId
    },req.body);

    res.json({
        message: "Updated successfully"
    })
    return;
})


// Method: GET
// Route: /api/v1/user/bulk
// Query Parameter: ?filter=harkirat
router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;