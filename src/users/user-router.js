const express = require('express');
const UserService = require('./user-service');

const userRouter = express.Router();
const bodyParser = express.json();

userRouter.route('login').post(bodyParser, (req, res, next) => {
  const {username, password} = req.body;
  const loginUser = {username, password};

  for (const[key, value] of Object.entries(loginUser))
    if (value === null)
      return res
        .status(400)
        .json({error: `Missing '${key}' in request body`});

  UserService.hasUsernameAndPassword(req.app.get('db'), loginUser.username, loginUser.password)
    .then((dbUser) => {
      if (!dbUser)
        return res
          .status(400)
          .json({error: 'Incorrect Username or Password'});
      const newUser = dbUser.username;
      const newPassword = dbUser.password;
      res.send({
        username: newUser,
        user_id: newPassword
      });
    });
});