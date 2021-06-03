const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const Recipe = require("../models");
const session = require("express-session");

// TODO Index Route present
router.get("/recipe/browse", function(req, res) {
    res.render("../views/recipe/browse");
});

// New Route present form 
router.get("/recipe/new", function(req, res) {
    res.render("../views/recipe/new");
});


// TODO Show Route present



// TODO Create Route functional
router.post("/recipes", async function(req, res) {
    noods_db.Recipe.create(req.body, function (err, createdRecipe) {
        console.log(createdRecipe);
        if (err) return res.send(err);

        noods_db.Recipe.findById(createdRecipe.user).exec(function (err, foundUser) {
            if (err) return res.send(err);

            foundUser.recipes.push(createdRecipe);
            foundUser.save();

            return res.redirect("/browse");
        });
    });
});

// router.post("/register", async function(req, res) {
//     try {
//         const foundUser = await noods_db.User.findOne({ email: req.body.email });
//         if(foundUser) {
//             return res.redirect("/users/login");
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(req.body.password, salt);
//         req.body.password = hash;
//         const newUser = await noods_db.User.create(req.body);
//         return res.redirect("/users/login");
//     } catch (err) {
//         console.log(err);
//         return res.send(err);
//     }
// });




// TODO Edit Route present form



// TODO Update Route functional



// TODO Delete Route functional




module.exports = router;