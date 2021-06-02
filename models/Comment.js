const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        // TODO fill in Comment properties
    }
)

const Comment = mongoose.model("Comment", commentSchema);

modulle.exports = Comment;