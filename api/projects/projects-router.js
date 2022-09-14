const express = require('express');
const {
    validateUserId,
    validateUser,
    validatePost,
} = require('./projects-middleware')

const User = require('../actions/actions-model')
const Post = require('../projects/projects-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Post.get()
    .then(users => {
      res.json(users)
    })
      .catch(next)
    });


router.get('/:id', validateUserId, (req, res) => {
    res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
    Post.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
    Post.update(req.params.id, { name: req.name })
    .then(() => {
      return User.getById(req.params.id)
    })
    .then(user => {
      res.json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
    try {
        await Post.remove(req.params.id)
        res.json(req.user)
      } catch (err) {
        next (err)
      }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
    try {
        const result = await Post.getProjectActions(req.params.id)
        res.json(result)
      } catch (err) {
        next(err)
      }
});

router.post('/', (req, res, next) => {
    Post.insert(
        req.project
        )
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next) 
});

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: 'something tragic inside posts router happened',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router

