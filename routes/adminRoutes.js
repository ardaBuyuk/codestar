const express = require("express");
const { db } = require("../models/htmlModel.js");
const Html = require("../models/htmlModel.js");
const Javascript = require("../models/jsModel.js");
const Python = require("../models/pyModel");
const router = express.Router();

router.get("/shareCodes",isLoggedIn ,(req,res) => {
    res.render("user/shareCodes");
});
router.get("/shareHtml", isLoggedIn ,(req,res) => {
    res.render("user/shareHtml");
});
router.post("/shareHtml",isLoggedIn ,(req,res) => {
    let title = req.body.title;
    let description = req.body.description;
    let html = req.body.html;
    let css = req.body.css;
    let category = "html";
    let author = req.user.username;

    let newCode = new Html({
        title: title,
        description: description,
        html: html,
        css: css,
        category: "html",
        author: author
    });
    newCode.save((error, data) => {
        if (error)
            console.log("Beklenmeyen bir hatayla karşılaşıldı.", error.message);
 
        res.redirect("/html")
        console.log(data);
    });
});
router.post("/shareJs",isLoggedIn ,(req,res) => {
    let title = req.body.title;
    let description = req.body.description;
    let javascript = req.body.javascript
    let category = "javascript";
    let author = req.user.username;

    let newCode = new Javascript({
        title: title,
        description: description,
        javascript: javascript,
        category: "javascript",
        author: author
    });
    newCode.save((error, data) => {
        if (error)
            console.log("Beklenmeyen bir hatayla karşılaşıldı.", error.message);
 
        res.redirect("/javascript")
        console.log(data);
    });
});
router.get("/shareJs",isLoggedIn ,(req,res) => {
    res.render("user/shareJs");
});
router.post("/sharePy",isLoggedIn ,(req,res) => {
    let title = req.body.title;
    let description = req.body.description;
    let python = req.body.python
    let category = "python";
    let author = req.user.username;

    let newCode = new Python({
        title: title,
        description: description,
        python: python,
        category: "python",
        author: author
    });
    newCode.save((error, data) => {
        if (error)
            console.log("Beklenmeyen bir hatayla karşılaşıldı.", error.message);
 
        res.redirect("/python")
        console.log(data);
    });
});
router.get("/sharePy",isLoggedIn ,(req,res) => {
    res.render("user/sharePy");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("404");
}

module.exports = router;
