const mongoose = require("mongoose");

require("dotenv").config();

const mongoURL = process.env.MONGO_URI;

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    })
    .then(function() {
        console.log("MongoDB connected");
    })
    .catch(function(err){
        console.log("MongoDB error");
        console.log(err);
    });

mongoose.connection.on("error", function(){
    console.log("MongoDB error", err);
});

module.exports = {
    User: require("./User"),
    Comment: require("./Comment"),
    Recipe: require("./Recipe"),
};