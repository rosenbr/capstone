const express = require("express");
const app = express();

// Middleware
const methodOverride = require("method-override");

app.get("/", function(req, res){
    res.render("../views/index");
});

app.get("/home", function(req, res){
    res.render("../views/home");
});

app.get("/browse", function(req, res){
    res.render("../views/browse");
});

app.get("/catagory", function(req, res){
    res.render("../views/catagory");
});

app.get("/profile", function(req, res){
    res.render("../views/profile");
});

app.get("/recipe", function(req, res){
    res.render("../views/recipe");
});

app.set("view engine", "ejs");


app.listen(3000, function(){
    console.log("Server Running on Port 3000");
});