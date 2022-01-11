const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

//Middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


//PATCH ROUTE - Edit user profile by ID

router.patch("/profile", async (req, res) => {
    const {_id, name, lastName, lastName2, dateOfBirth, identityCard, legalGender, phoneNumber, photo} = req.body;
    try{
        const userUpdated = await User.findByIdAndUpdate(_id, req.body, {new:true})
        res.status(200).json({msg: "Changes made succesfully", user: userUpdated})
    }catch(err){
        res.status(500).json({ errorMessage: error.message });
    } 

})

module.exports = router