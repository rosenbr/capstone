const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/noods_db"

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });

mongoose.connection.once("connected", function(){
    console.log("MongoDb connected");
});

mongoose.connection.on("disconnected", function(){
    console.log("MongoDB disconnected");
});

mongoose.connection.on("error", function(){
    console.log("MongoDB error", err);
});

module.exports = {
    User: require("./User"),
    Comment: require("./Comment"),
    Recipe: require("./Recipe"),
};