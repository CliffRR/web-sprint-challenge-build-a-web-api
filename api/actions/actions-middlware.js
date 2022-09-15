// add middlewares here related to actions
const User = require('../actions/actions-model')

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
    const { notes, description, completed, project_id } = req.body
    if (!notes || !notes.trim() || !description || !description.trim() || (completed != false && completed != true)
    || !project_id ) {
      res.status(400).json({
        message: 'missing required name field',
      })
    } else {
        req.notes = notes.trim()
        req.description = description.trim()
      next()
    }
  }
  
module.exports = {
    logger,
    validateUserId,
    validateUser,
}

