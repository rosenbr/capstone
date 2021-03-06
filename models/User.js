const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, "Please enter an Email Address."],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please Enter a Password."],
            unique: true,
        },
        recipes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
        bio: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;