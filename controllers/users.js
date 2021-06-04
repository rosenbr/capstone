const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// Show Route 
router.get("/profile/:id", function(req, res) {
    noods_db.User.findById(req.params.id)
        .populate("recipes", "comments")
        .exec(function (err, foundUser) {
            if (err) return res.send(err);

            const context = { user: foundUser };
            return res.render("profile/profile", context);
        });
});

// Create Route
router.get("/register", function(req, res) {
    res.render("../views/profile/register");
});

router.post("/register", async function(req, res) {
    try {
        const foundUser = await noods_db.User.findOne({ email: req.body.email });
        if(foundUser) {
            return res.redirect("/users/login");
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const newUser = await noods_db.User.create(req.body);
        return res.redirect("/users/login");
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
});

// Login Route
router.get("/login", function(req, res) {
    res.render("../views/profile/login");
});

router.post("/login", async function(req, res) {
    try {
        const foundUser = await noods_db.User.findOne({ email: req.body.email });
        if (!foundUser) return res.redirect("/register");
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) return res.send("Email or Password Invalid");
        req.session.currentUser = {
            id: foundUser.id,
            username: foundUser.username,
        };
        return res.render("../views/profile/home");
    } catch (err) { 
        console.log(err);
        res.send(err);
    }
});

// Home Route
router.get("/users/home", function(req, res){
    res.render("../views/profile/home");
});

// Logout
router.delete("/logout", async function(req, res) {
    await req.session.destroy();
    return res.redirect("/");
});

module.exports = router;