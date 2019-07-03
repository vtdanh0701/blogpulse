const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');
const moment = require('moment');
const session = require('express-session')

const app = express();
app.use(session({
    secret: "back",
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));

app.use(function(req, res, next){
    res.locals.moment = moment;
    next();
})

// GET / - display all posts and their authors
app.get('/', function(req, res){
    req.session.myPage = req.originalUrl;
    console.log(req.session.myPage);
    res.render("index");
});

app.use('/authors', require('./routes/authors'));
app.use('/posts', require('./routes/posts'));
app.use('/tags', require('./routes/tags'));

app.listen(3000, function(){
    console.log("😎 upp and running 3000");
})