/* eslint-disable quotes */
const express = require('express');
const RegisterService = require('./register-service.js');
const path = require('path');

const registerRouter = express.Router();
const jsonBodyParser = express.json();

registerRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { username, password } = req.body;
  for (const field of ['username', 'password'])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });

  const passwordError = RegisterService.validatePassword(password);
  if (passwordError) return res.status(400).json({ error: passwordError});
  RegisterService.hasUserWithUsername(req.app.get('db'), username)
    .then((hasUserWithUsername) => {
      if (hasUserWithUsername)
        return res.status(400).json({ error: 'Username taken' });
      
      return RegisterService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          username,
          password: hashedPassword
        };

        return RegisterService.insertUser(req.app.get('db', newUser).then(
          (user) => {
            res
              .status(201)
              .location(
                path.posix.join(
                  `https://chrissy-rollplay-api.herokuapp.com/`,
                  `/topics/${user.id}`
                )
              )
              .json(RegisterService.serializeUser(user));
          }
        ));
      });
    })
    .catch(next);
});

module.exports = registerRouter;