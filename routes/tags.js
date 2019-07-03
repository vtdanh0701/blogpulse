const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /tags - index - show all the tags!

// POST /tags - post them
router.post('/', (req, res) => {
    db.post.findByPk(parseInt(req.body.postId))
        .then((post) => {
            db.tag.findOrCreate({
                where: {
                    name: req.body.name
                }
            }).spread((tag, created) => {
                post.addTag(tag)
                    .then((tag) => {
                        console.log('${tag} added to ${post}');
                        res.redirect('/posts/' + req.body.postId);
                    })
            })
        })
})


module.exports = router;
// GET /tags/:id - show one tag and its associated posts