const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const session = require("express-session");

// Index Route present
router.get("/browse", function(req, res) {
    noods_db.Recipe.find({}, function(err, foundRecipe) {
        if (err) return res.send(err);

        const context = { recipes: foundRecipe };
        res.render("../views/recipe/browse", context);
    });
});

// New Route present form 
router.get("/new", function(req, res) {
    noods_db.Recipe.find({}, function(err, foundRecipe) {
        if (err) return res.send(err);

        const context = { recipes: foundRecipe };
        res.render("../views/recipe/new", context);
    });
});

// Show Route present
router.get("/show/:id", function(req, res){
    noods_db.Recipe.findById(req.params.id)
        .populate("comments")
        .exec(function (err, foundRecipe) {
            if (err) return res.send(err);

            const context = { recipes: foundRecipe };
            return res.render("../views/recipe/show", context);
        });
});

// Create Route functional
router.post("/show", function(req, res) {
    req.body.user = req.session.currentUser.id
    noods_db.Recipe.create(req.body, function (err, createdRecipe) {
        console.log(createdRecipe);
        if (err) return res.send(err);

        noods_db.User.findById(createdRecipe.user).exec(function (err, foundUser) {
            if (err) return res.send(err);

            foundUser.recipes.push(createdRecipe);
            foundUser.save();

            return res.redirect(`/recipes/show/${createdRecipe._id}`);
        });
    });
});

// Edit Route present form
router.get("/:id/edit", function(req, res) {
    noods_db.Recipe.findById(req.params.id, function (err, foundRecipe) {
        if (err) return res.send(err);

        const context = { recipes: foundRecipe };
        res.render("../views/recipe/edit", context);
    });
});

// Update Route functional
router.put("/:id", function(req, res) {
    noods_db.Recipe.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                ...req.body,
            },
        },
        { new: true },
        function (err, updatedRecipe) {
            if (err) return res.send(err);
            return res.redirect(`recipes/show/${updatedRecipe._id}`);
        }
    );
});

// Delete Recipe Route
router.delete("/:id", function (req, res) {
    noods_db.Recipe.findByIdAndDelete(req.params.id, function (err, deletedRecipe) {
        if (err) return res.send(err);

        noods_db.User.findById(deletedRecipe.user, function (err, foundUser) {
            foundUser.recipes.remove(deletedRecipe);
                foundUser.save();

                return res.redirect("/recipes/browse");
        });
    });
});

// Delete Comment Route
router.delete("/show/:id/:id", function(req, res) {
    noods_db.Comment.findByIdAndDelete(req.params.id, function(err, deletedComment) {
        if (err) return res.send(err);
        noods_db.Recipe.findById(deletedComment.recipe, function(err, foundRecipe) {

            foundRecipe.comments.remove(deletedComment._id);
            foundRecipe.save();

            return res.redirect(`/recipes/show/${foundRecipe._id}`);
        });
    });
});

module.exports = router;