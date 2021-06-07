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
router.get("/edit", function(req, res) {
    noods_db.Comment.find({}, function(err, foundComment) {
        if (err) return res.send(err);

        const context = { comments: foundComment };
        res.render("../views/comment/edit", context);
    });
});

// TODO Update Route func
// router.put("/show", function(req, res) {
//     noods_db.Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//             $set: {
//                 ...req.body,
//             },
//         },
//         { new: true },
//         {
//             function(err, updatedComment) {
//                 if (err) return res.send(err);
//                 return res.render(`../views/recipe/show`);
//             }
//         }
//     );
// });

router.put("/recipes/show", function(req, res) {
    noods_db.Comment.findByIdAndUpdate(req.body, function (err, updatedComment) {
        if (err) return res.send(err);

        noods_db.Recipe.findById(updatedComment.recipe).exec(function (err, foundRecipe) {
            if (err) return res.send(err);

            foundRecipe.comments.push(updatedComment);
            foundRecipe.save();

            return res.redirect(`/recipes/show/${foundRecipe._id}`);
        });
    });
});

module.exports = router;