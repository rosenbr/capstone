const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        portion: {
            type: Number,
            required: true,
        },
        cookMethod: {
            type: String,
            required: true,
        },
        spices: {
            type: String,
        },
        proteins: {
            type: String,
        },
        veggies: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;