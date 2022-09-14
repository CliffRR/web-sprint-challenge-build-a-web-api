const express = require('express');
const { logger } = require('./actions/actions-middlware');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router')

server.use(express.json())

server.use(logger)

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectRouter)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
})

module.exports = server;
