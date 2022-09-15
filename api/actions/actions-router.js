// Write your "actions" router here!
const express = require('express');
const {
    validateUserId,
    validateUser,
} = require('./actions-middlware')

const User = require('../actions/actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    User.get()
    .then(users => {
      res.json(users)
    })
      .catch(next)
    });


router.get('/:id', validateUserId, (req, res) => {
    res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
    User.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
    User.update(req.params.id, req.body)
    .then(user => {
      res.json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
    try {
        await User.remove(req.params.id)
        res.json(req.user)
      } catch (err) {
        next (err)
      }
});

module.exports = router
