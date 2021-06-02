const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const User = require("../models/User.js");

// TODO Create Route
router.post("/", function(req, res) {
    req.body.users = req.session.currentUser.id;

    noods_db.User.create(req.body, function (err, createdUser){
        if (err) return res.send(err);

        return res.redirect("/profile");
    });
});
// TODO Show Route
router.get("/", async function (req, res) {
    noods_db.User.find({}, function(err, allUsers) {
        if (err) return res.send(err);

        const context = {  users: allUsers };
        return res.render("users/index", context);
    });
});
// TODO Edit Route


module.exports = router;