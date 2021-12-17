const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')

// Returns all known users
router.get('/findAll', function(request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })  
        .catch(error => response.status(400).send(error))
})

router.get('/whoIsLoggedIn', auth_middleware, function(request, response) {
    const username = request.session.username;
    return response.send(username);
})

router.get('/favorites', auth_middleware, function(request, response) {
    const username = request.session.username;
    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if(!userResponse) {
                response.status(404).send("User not found");
            }
    
            response.send(userResponse.favorites)
        })
        .catch((error) => response.status(400).send(error));
})

router.get('/:username', (request, response) => {
  const username = request.params.username;
  if(!username) {
    return response.status(422).send("Missing data");
  }
  
  return UserModel.findUserByUsername(username)
    .then((userResponse) => {
        if(!userResponse) {
            response.status(404).send("User not found");
        }

        response.send(userResponse)
    })
    .catch((error) => response.status(500).send("Issue getting user"))

})

router.post('/authenticate', function(request, response) {
    let { username, password } = request.body;
    // password = JSON.stringify(password);
    // console.log(password);
    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            // console.log(userResponse)
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }
            // console.log(userResponse)
            if (userResponse.password === password) {
                request.session.username = username;

                return response.status(200).send({username});

            } else {
                return response.status(404).send("No user found with that password");
            }
        })

})


router.post('/', function(req, res) {
    const { username, password } = req.body;
    // console.log(req.body);

    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }

    return UserModel.insertUser({username: username, password: password})
        .then((userResponse) => {
            req.session.username = username;

            //return response.cookie('huntersCookie', token, {httpOnly: true})
            return res.status(200).send({username});
        })
        .catch(error => res.status(422).send(error))

});


// router.post('/authenticate', function(request, response) {
//     let { username, password } = request.body;
//     // password = JSON.stringify(password);
//     console.log(password);
//     if (!username || !password) {
//         return response.status(422).send('Must include both password and username');
//     }

//     return UserModel.findUserByUsername(username)
//         .then((userResponse) => {
//             console.log(userResponse)
//             console.log(userResponse.password)
//             if (!userResponse) {
//                 return response.status(404).send("No user found with that username");
//             }
//             if (userResponse.password === password) {

//                 const payload = {username: username};

//                 const token = jwt.sign(payload, "SUPER_DUPER_SECRET", {
//                     expiresIn: '14d',
//                 });

//                 // request.session.username = username;

//                 return response.cookie('kaiwenCookie', token, {httpOnly: true}).status(200).send({username})
//                 // return response.status(200).send("User is logged in!")
//                 // return response.status(200).send({username});

//             } else {
//                 return response.status(404).send("No user found with that password");
//             }
//         })


// })


// router.post('/', function(req, res) {
//     const { username, password } = req.body;
//     console.log(req.body);

//     if (!username || !password) {
//         return res.status(422).send("Missing username: " + username + "or password:" + password)
//     }

//     return UserModel.insertUser({username: username, password: password})
//         .then((userResponse) => {
//             // req.session.username = username;

//             return response.cookie('kaiwenCookie', token, {httpOnly: true})
//             // return res.status(200).send({username});
//         })
//         .catch(error => res.status(422).send(error))

// });

router.post('/logout', function(req, res) {
    req.session.destroy()
    return res.send("Ok");
})

router.put('/favorite/:jobId', auth_middleware, function(req, res) {
    const username = req.session.username;
    const jobId = req.params.jobId;
    // console.log(jobId)
    // console.log(username)

    return UserModel.updateByUsername(username, jobId)
        .then((userResponse) => response.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))

    

})

module.exports = router;