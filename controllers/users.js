const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const session = require("express-session");

router.get("/profile", function(req, res){
    res.render("../views/profile/profile");
});

// TODO Show Route presentational
// router.get("/:id", function(req, res) {
//     noods_db.User.findById(req.params.id)
//         .populate("recipes", "comments")
//         .exec(function (err, foundUser) {
//             if (err) return res.send(err);

//             const context = { user: foundUser };
//             return res.render("users/profile");
//         });
// });


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
        return res.redirect("/home");
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

// TODO Edit Route presentational
// router.get("/:id/profileEdit", function(req, res) {
//     noods_db.User.findById(req.body.params.id, function(err, foundUser) {
//         if(err) {
//             console.log(err);
//         } else {
//             res.render(editProfile, {
//                 userEdit: foundUser
//             });
//         }
//     });
// });


// TODO Update User Route functional


module.exports = router;