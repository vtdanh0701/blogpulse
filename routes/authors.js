const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /authors - returns all authors
router.get('/', function(req, res){
    db.author.findAll().then(function(authors){
        res.render('authors/index', {authors});
    })
})

// GET /authors/new - send a form to add new author
router.get('/new', function(req, res){
    res.render('authors/new');
})

// POST /authors - create a new author
router.post('/', function(req, res){
    db.author.create({
        name: req.body.name
    }).then(function(data){
        res.redirect('/authors');
    })
})

// GET /authors/:id - returns the selected author
router.get('/:id', function(req, res){
    let id = parseInt(req.params.id)
    db.author.findOne({
        where: {id: id},
        include: [db.post]
    })
        .then(function(author){
            res.render('authors/show', {author})
        })
})

module.exports = router;