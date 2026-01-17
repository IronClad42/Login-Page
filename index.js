var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");
var exe = require("./db");
var app = express();

app.set("view engine" , "ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: "dskjdhw askjdhsa"
}));

var verfyLoagin = (req,res,next) => {
    if(req.session.user)
    {
        next();
    }
    else
    {
        res.redirect("/verfyLogin");
    }
};

app.get("/",verfyLoagin , async function(req,res){

    var data = await exe(`SELECT * FROM create_account`);
    
    res.render("home",{info:data[0]});
});

app.get("/verfyLogin",function(req,res){
    res.render("loginPage");
});

app.post("/verfyLogin",async function(req,res){

    var data = await exe(`SELECT * FROM create_account WHERE umobile = ? AND upassword = ?`,[req.body.umobile , req.body.upassword]);

    if (data.length > 0) {
    let user = { ...data[0] };
    delete user.upassword;

    req.session.user = user;
    res.redirect("/");
}
    
});

app.listen(1000);