const express = require("express");
const passport = require("passport");
const User = require("../models/userModel");
const Html = require("../models/htmlModel.js");
const Javascript = require("../models/jsModel");
const Python = require("../models/pyModel");
const { route } = require("./adminRoutes");
const router = express.Router();

router.get("/html", (req,res) => {
    Html.find({}, (err,foundCode) => {
        if(err){
            console.log("================ ERROR ERROR ERROR ================");
            console.log(err)
        } else {

            res.render("html", {data: foundCode});
        }
    });
});
router.get("/", (req,res) => {
    res.render("home");
});
router.get("/html", (req,res) => {
    res.render("html");
});
router.get("/javascript", (req,res) => {
    Javascript.find({}, (err,foundCode) => {
        if(err){
            console.log("================ ERROR ERROR ERROR ================");
            console.log(err)
        } else {

            res.render("javascript", {data: foundCode});
        }
    });
});
router.get("/javascript", (req,res) => {
    res.render("javascript");
});
router.get("/python", (req,res) => {
    Python.find({}, (err,foundCode) => {
        if(err){
            console.log("================ ERROR ERROR ERROR ================");
            console.log(err)
        } else {

            res.render("python", {data: foundCode});
        }
    });
});
router.get("/python", (req,res) => {
    res.render("python");
});

router.get("/login",(req,res) => {
    res.render("login");
});
router.post("/login", (req,res) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
      })(req, res);
})
router.get("/register", (req,res) => {
    res.render("register");
});
router.post("/register", (req,res) => {
    let newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, (err,user) => {
        User.findOne({
            user,
          })
              .lean()
              .then((user) => {
                  if(user){
                    res.send("Bu kullanıcı adı önceden alnımış. <script>setInterval(() => {window.location.href = '/register'},1000)</script>");
                  }
                  passport.authenticate("local")(req,res, () => {
                    res.redirect("/");
              })

        })
        
    });
    
});

router.get("/logout",(req,res) => {
    req.logOut();
    res.redirect("/");
});
router.get("/python/:codeId", (req,res)=> {
    Python.findById(req.params.codeId)
    .then((foundCode) => {
        res.render("showCodePy",{foundCode: foundCode});
    })
    .catch((err) => {
        console.log("================ ERROR ERROR ERROR ================");
        console.log(err);
        res.send(err);
    });
});
router.get("/javascript/:codeId", (req,res)=> {
    Javascript.findById(req.params.codeId)
    .then((foundCode) => {
        res.render("showCodeJs",{foundCode: foundCode});
    })
    .catch((err) => {
        console.log("================ ERROR ERROR ERROR ================");
        console.log(err);
        res.send(err);
    });
});
router.get("/html/:codeId", (req,res)=> {
    Html.findById(req.params.codeId)
    .then((foundCode) => {
        res.render("showCodeHtml",{foundCode: foundCode});
    })
    .catch((err) => {
        console.log("================ ERROR ERROR ERROR ================");
        console.log(err);
        res.send(err);
    });
});

module.exports = router;