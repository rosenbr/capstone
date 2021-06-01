const express = require("express");
const app = express();

// Middleware
const methodOverride = require("method-override");

app.get("/", function(req, res){
    res.render("/");
});

app.set("view enjine", "ejs");


app.listen(3000, function(){
    console.log("Server Running on Port 3000");
});