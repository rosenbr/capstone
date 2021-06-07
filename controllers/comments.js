const express = require("express");
const router = express.Router();
const noods_db = require("../models");
const session = require("express-session");

// Index Route pres
router.get("/index", function(req, res) {
    noods_db.Comment.find({}, function(err, foundComment) {
        if (err) return res.send(err);

        const context = { comments: foundComment };
        res.render("../views/comment/index", context);
    });
});

// New Route pres from
router.get("/new", function(req, res) {
    noods_db.Comment.find({}, function(err, foundComment) {
        if (err) return res.send(err);

        const context = { comments: foundComment };
        res.render("../views/comment/new", context);
    });
});

// Show Route pres
router.get("/show/:id", function(req, res){
    noods_db.Comment.findById(req.params.id)
        .populate("comments")
        .exec(function (err, foundComment) {
            if (err) return res.send(err);

            const context = { comments: foundComment };
            return res.render(`../views/comment/show`, context);
        });
});

// Create Route func
router.post("/show", function(req, res) {
    req.body.user = req.session.currentUser.id;
    noods_db.Comment.create(req.body, function (err, createdComment) {
        if (err) return res.send(err);

        noods_db.Recipe.findById(createdComment.recipe).exec(function (err, foundRecipe) {
            if (err) return res.send(err);

            foundRecipe.comments.push(createdComment);
            foundRecipe.save();

            return res.redirect(`/recipes/show/${foundRecipe._id}`);
        });
    });
});

// Edit Route pres form
router.get("/edit/:id/:recipeId", function(req, res) {
    noods_db.Comment.findById(req.params.id, function(err, foundComment) {
        if (err) return res.send(err);

        const context = { comment: foundComment, recipeId: req.params.recipeId };
        res.render("../views/comment/edit", context);
    });
});

// Update Route func
router.put("/edit/:id/:recipeId", function(req, res) {
    noods_db.Comment.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                ...req.body,
            },
        },
        { new: true },
            function(err, updatedComment) {
                if (err) return res.send(err);
                return res.redirect(`/recipes/show/${req.params.recipeId}`);
            }
    );
});

module.exports = router;