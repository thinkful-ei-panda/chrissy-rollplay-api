const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const bodyParser = express.json();

// authRouter.route('/login').post(bodyParser, (req, res, next) => {
//   const { username, password } = req.body;
//   const loginUser = { username, password };

//   for (const [key, value] of Object.entries(loginUser))
//     if (value == null)
//       return res
//         .status(400)
//         .json({error: `Missing '${key}' in request body`});

//   AuthService.getUserWithUsername(req.app.get('db'), loginUser.username)
//     .then((dbUser) => {
//       if (!dbUser)
//         return res
//           .status(400)
//           .json({error: 'Incorrect Username or Password'});
//       return AuthService.Service.comparePasswords(
//         loginUser.password,
//         dbUser.password
//       ).then((compareMatch) => {
//         if (!compareMatch)
//           return res
//             .status(400)
//             .json({error: 'Incorrect Username or Password'});
//         const sub = dbUser.username;
//         const payload = { username: dbUser.id };
//         res.send({
//           authToken: AuthService.createJwt(sub, payload),
//           username: payload.username
//         });
//       });
//     })
//     .catch(next);
// });

// module.exports = authRouter;