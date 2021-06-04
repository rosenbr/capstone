const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            min: 10,
            max: 300,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;