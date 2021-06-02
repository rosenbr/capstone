const mongoose = require("mongoose");
const { builtinModules } = require("node:module");

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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        portion: {
            type: Number,
            required: true,
        },
        spices: {
            type: String,
        },
        proteins: {
            type: String,
        },
        veg: {
            type: String,
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;