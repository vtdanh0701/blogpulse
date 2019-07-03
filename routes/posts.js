const express = require('express');
const db = require('../models');
const router = express.Router();



// GET /posts - show all post
router.get('/', function(req, res){
    var myLastPage = req.session.myPage;
    db.post.findAll({
        include: [db.author]
    })
        .then(function(posts){
            res.render('posts/index', {posts,myLastPage});
        })
})

// GET /posts/new - send a form for a new post
router.get('/new', function(req, res){
    db.author.findAll()
        .then(function(authors){
            res.render('posts/new', {authors});
        });
});

// GET /posts/:id - returns the selected post and its author
router.get('/:id', function(req, res){
    db.post.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.author, db.comment, db.tag]
    }).then(function(post){
        res.render('posts/show', {post})
    })
})

// POST /posts - create a new post record
router.post('/', function(req, res){
    // db.author.findByPk(parseInt(req.body.authorId))
    //     .then(function(author){
    //         author.createPost({
    //             title: req.body.title,
    //             content: req.body.content
    //         }).then(function(post){
    //             res.redirect('/post')
    //         })
    //     })
    db.post.create({
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId
    }).then(function(post){
        res.redirect('/posts')
    })
})

router.post('/:id/comments', function(req, res){
    db.post.findByPk(parseInt(req.params.id))
        .then(function(post){
            post.createComment({
                content: req.body.content,
            }).then(function(comment){
                res.redirect('/posts/' + req.params.id)
            })
        })
})




module.exports = router;