const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/noods_db"

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