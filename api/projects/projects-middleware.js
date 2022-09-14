// add middlewares here related to actions
const User = require('../projects/projects-model')

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} to ${url}`)
    next()
  }
  
async function validateUserId(req, res, next) {
    try {
      const user = await User.get(req.params.id)
      if (!user) {
          res.status(404).json({
              message: 'user not found',
          })
        // next({status: 404, message: 'user not found'})
      } else {
        req.user = user
        next()
      }
    } catch (err) {
      res.status(500).json({
        message: 'problem finding user',
      })
    }
  }
  
function validateUser(req, res, next) {
    const { name } = req.body
    if (!name || !name.trim()) {
      res.status(400).json({
        message: 'missing required name field',
      })
    } else {
      req.name = name.trim()
      next()
    }
  }
  
function validatePost(req, res, next) {
    const { name, description } = req.body
    if (!name || !name.trim() && !description || !description.trim()) {
      res.status(400).json({
        message: 'missing required text field',
      })
    } else {
        name.trim()
        description.trim()
      next()
    }
  }
  
  
  // do not forget to expose these functions to other modules
module.exports = {
    logger,
    validateUserId,
    validateUser,
    validatePost,
}


