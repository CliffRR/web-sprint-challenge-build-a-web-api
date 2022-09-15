const express = require('express');
const {
    validateUserId,
    validateUser,
} = require('./projects-middleware')

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
    Post.insert({ name: req.name, description: req.description, completed: true })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
    Post.update(req.params.id, req.body )
    .then(() => {
      return Post.get(req.params.id)
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

router.get('/:id/actions', validateUserId, async (req, res, next) => {
    try {
        const result = await Post.getProjectActions(req.params.id)
        res.json(result)
      } catch (err) {
        next(err)
      }
});

module.exports = router

