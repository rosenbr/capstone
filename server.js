// === | External Modules | ===
const express = require("express");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// === | Internal Modules | ===
const controllers = require("./controllers");

// === | Instanced Modules| ===
const app = express();

// === | Config | ===
app.set("view engine", "ejs");
require("dotenv").config();

// === | Middleware | ===
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/styles"));

app.use(
    session({
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
        },
    })
);

app.use(function(req, res, next) {
    console.log(`${req.method} - ${req.url}`);
    console.log(req.session);
    next();
});

app.use(function(req, res, next) {
    app.locals.user = req.session.currentUser;
    next();
});

const authRequired = function(req, res, next) {
    if(req.session.currentUser) {
        return next();
    }
    return res.redirect("/login");
};

// === | Routes | ===
// Landing
app.get("/", function(req, res){
    res.render("../views/index");
});

// === | Controllers| ===
// Users
app.use("/users", controllers.users);

// Recipes
app.use("/recipes", authRequired, controllers.recipes);

// Comments
app.use("/comments", authRequired, controllers.comments);

// === | Listener | ===
app.listen(3000, function(){
    console.log("Server Running on Port 3000");
});