// === | External Modules | ===
const express = require("express");
const methodOverride = require("method-override");
// const bcrypt = require("bcryptjs");
const session = require("express-session");

// === | Internal Modules | ===
const controllers = require("./controllers");

// === | Instanced Modules| ===
const app = express();

// === | Config | ===
app.set("view engine", "ejs");

// === | Middleware | ===
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
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


// === | Routes | ===
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
app.get("/profileEdit", function(req, res){
    res.render("../views/profile/profileEdit");
});

// create
app.post("/", function(req, res){
    req.body.user = req.session.currentUser.id;

    noods_db.User.create(req.body, function(err, createdUser) {
        if(err) return res.send(err);
        console.log(err);

        return res.redirect("/profile");
    });
});

// Recipe
app.get("/recipe", function(req, res){
    res.render("../views/recipe");
});

// === | Controllers| ===
// Users
app.use("/users", controllers.users);

// Recipes
// TODO add "authRequired" in the middle
app.use("/recipes", controllers.recipes);

// Comments
// TODO add "authRequired" in the middle
app.use("/comments", controllers.comments);

// === | Listener | ===
app.listen(3000, function(){
    console.log("Server Running on Port 3000");
});