const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");


// Internal Modules
const controllers = require("./controllers");

// Instanced Modules
const app = express();

// Config
app.set("view engine", "ejs");

// Middleware
app.use(methodOverride("_method"));


// Routes
// Landing
app.get("/", function(req, res){
    res.render("../views/index");
});

// Home
app.get("/home", function(req, res){
    res.render("../views/home");
});

// Browse
app.get("/browse", function(req, res){
    res.render("../views/browse");
});

// Catagory
app.get("/catagory", function(req, res){
    res.render("../views/catagory");
});

// Profile
app.get("/profile", function(req, res){
    res.render("../views/profile");
});

// Recipe
app.get("/recipe", function(req, res){
    res.render("../views/recipe");
});

// Register
app.get("/register", function(req, res) {
    res.render("../views/auth/register");
});

// Login
app.get("/login", function(req, res) {
    res.render("../views/auth/login");
});



// Listener
app.listen(3000, function(){
    console.log("Server Running on Port 3000");
});