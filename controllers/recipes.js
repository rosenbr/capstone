const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const Recipe = require("../models/Recipe")
const session = require("express-session");

// Index Route present
router.get("/browse", function(req, res) {
    res.render("../views/recipe/browse");
});

// New Route present form 
router.get("/new", function(req, res) {
    noods_db.Recipe.find({}, function(err, foundRecipe) {
        if (err) return res.send(err);

        const context = { recipe: foundRecipe };
        res.render("../views/recipe/new", context);
    });
});

// TODO Show Route present
// router.get("/recipe/recipe", function(req, res){
//     res.render("../views/recipe/recipe");
// });
router.get("/show", function(req, res){
    noods_db.Recipe.findById(req.params.id)
        .populate("comments")
        .exec(function (err, foundRecipe) {
            if (err) return res.send(err);

            const context = { recipe: foundRecipe };
            return res.render("../views/recipe/show", context);
        });
});

// TODO Create Route functional
router.post("/show", function(req, res) {
    noods_db.Recipe.create(req.body, function (err, createdRecipe) {
        console.log(createdRecipe);
        if (err) return res.send(err);

        noods_db.Recipe.findById(createdRecipe.user).exec(function (err, foundRecipe) {
            if (err) return res.send(err);

            foundRecipe.recipe.push(createdRecipe);
            foundRecipe.save();

            return res.redirect("recipe/show/:_id");
        });
    });
});

// TODO Edit Route present form



// TODO Update Route functional



// TODO Delete Route functional




module.exports = router;