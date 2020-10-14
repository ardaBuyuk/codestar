const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");
const User = require("./models/userModel");
const passport = require("passport");
const app = express()
const PORT = 4000 || process.env.PORT;

const indexRoutes = require("./routes/indexRoutes");
const adminRoutes = require("./routes/adminRoutes");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://codestar:1234@codestar.r4ayw.mongodb.net/codeStar?retryWrites=true&w=majority");
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

 passport.use(new LocalStrategy(User.authenticate()));

 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(adminRoutes);

app.use((req,res) => {
    res.render("404");
});

const server = app.listen(PORT, (req,res,err) => {
    if(err) console.log(err)
    console.log("Server Started.");
});