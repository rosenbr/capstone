const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");

// Internal Modules
const controllers = require("./controllers");
const { nextTick } = require("node:process");

// Instanced Modules
const app = express();

// Config
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// app.use(express.static(_dirname + "/public"));

// app.use(
//     session({
//         store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
//         },
//     })
// );

// app.use(function(req, res, next) {
//     console.log(`${req.method} - ${req.url}`);
//     console.log(req.session);
//     next();
// });

// app.use(function(req, res, next) {
//     app.locals.user = req.sessions.currentUser;
//     next();
// });

// const authRequired = function(req, res, next) {
//     if(req.session.currentUser) {
//         return next();
//     }
//     return res.redirect("/login");
// };


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

// Controllers

// Login/Register
app.use("/", controllers.auth);

// Users
// TODO add "authRequired" in the middle
app.use("/user", controllers.users);

// Recipes
// TODO add "authRequired" in the middle
app.use("/recipe", controllers.recipes);

// Comments
// TODO add "authRequired" in the middle
app.use("/comments", controllers.comments);

// Listener
app.listen(3000, function(){
    console.log("Server Running on Port 3000");
});