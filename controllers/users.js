const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// Home Route
router.get("/home", function(req, res){
    res.render("../views/profile/home");
});

// About Route
router.get("/about", function(req, res) {
    res.render("../views/profile/about");
});

// SUPER SECRET BROWNIES ("Shhhhh....its a secret")
router.get("/ssb", function(req, res) {
    res.render("../views/recipe/brownies");
});

// Show Route 
router.get("/profile/:id", function(req, res) {
    noods_db.User.findById(req.params.id)
        .populate({
            path: "recipes",
        })
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
        if (!foundUser) return res.redirect("/users/register");
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) return res.send("No Noods for you! Email or Password Invalid");
        req.session.currentUser = {
            id: foundUser.id,
            username: foundUser.username,
        };
        return res.redirect("/users/home");
    } catch (err) { 
        console.log(err);
        res.send(err);
    }
});

// Logout
router.delete("/logout", async function(req, res) {
    await req.session.destroy();
    return res.redirect("/");
});

module.exports = router;