const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const User = require("../models/User.js");

// TODO New User Route presentational form

router.get("/new", function(req, res) {
    res.render("views/auth/register");
});

// TODO Show Route presentational
router.get(":id", function(req, res) {
    noods_db.User.findById(req.params.id)
        .populate("recipes", "comments")
        .exec(function (err, foundUser) {
            if (err) return res.send(err);

            const context = { user: foundUser };
            return res.render("profile");
        });
});


// TODO Create Route functional

router.post("/", function(req, res){
    req.body.user = req.session.currentUser.id;

    noods_db.User.create(req.body, function(err, createdUser) {
        if(err) return res.send(err);
        console.log(err);

        return res.redirect("/profile");
    });
});

// TODO Edit Route presentational



// TODO Update User Route functional


module.exports = router;