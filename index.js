let express = require('express');
let app = express();
let mongoose = require("mongoose");
let Registration = require("./models/Registration");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let ejs = require("ejs");

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require("dotenv").config();
app.use(express.json());

app.use(express.static("public"));
app.set("view engine", "ejs");

// connnect mongodb
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});


app.get("/", (req, res) => {
    // check cookie, if cookie is present, redirect to /checkin
    // else redirect to /login
    req.cookies["token"] ? res.redirect("/checkin") : res.redirect("/login");
});

app.get("/login", (req, res) => {
    // render login page
    res.render("login");
});
app.post("/login", (req, res) => {
    // Check if password is correct
    // if correct, set cookie and redirect to /checkin
    // else redirect to /login
    if (req.body.password == process.env.PASSWORD) {
        res.cookie("token", process.env.PASSWORD);
        res.json({status: "success"});
    } else {
        res.json({status: "error"});
    }
});
let checkToken = (req, res, next) => {
    // check if token is present
    // if present, check if cookie is correct
    // if correct, call next()
    // else redirect to /login
    // res.redirect("/login/" + req.params.id);
    // console.log(req.cookies["token"]);
    // if (req.cookies["token"]) {
        if (req.cookies["token"] == process.env.PASSWORD) {
            next();
        }
        res.redirect("/login");
    // } else {
    //     res.redirect("/login/" + req.params.id);
    // }
};
app.post("/checkin/:id", checkToken, async (req, res) => {
    // render checkin page
    // pass the id as a parameter
    // id is the reg no. of the student
    let user = await Registration.findOne({uniqueId: req.params.id}).then((user) => {
        return user;
    }).catch((err) => {
        console.log(err);
    });
    res.json({status: "success"});
});
app.get("/checkin/:id", checkToken, async (req, res) => {
    // render checkin page
    // pass the id as a parameter
    // id is the reg no. of the student
    let user = await Registration.findOne({uniqueId: req.params.id}).then((user) => {
        return user;
    }).catch((err) => {
        console.log(err);
    });
    res.render("checkin", {user: user, id: req.params.id});
});

app.get("/*", (req, res) => {
    // redirect to /login
    res.redirect("/login/noId");
});
app.listen(process.env.PORT || 3030, () => {
    console.log("Started at 3030");
    }
);