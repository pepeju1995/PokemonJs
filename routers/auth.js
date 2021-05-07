const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//Controllers
const usersController = require("../controllers/users");
usersController.registerUser("pepeju95", "1234");

router.route("/")
    .get((req, res) => {
        res.send("GET Auth router");
    })


router.route("/login")
    .post((req, res) => {
        if(!req.body) {
            return res.status(400).json({message: "Missing data"});
        } else if (!req.body.user || !req.body.password) {
            return res.status(400).json({message: "Missing data"});
        }
        // Comprobamos credenciales
        usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
            // Si no son validas, error
            if (err || !result) {
                return res.status(401).json({message: "Invalid credentials."});
            }
            // Si son validas, generamos un JWT y lo devolvemos
            const token = jwt.sign({userId: result}, "secretPassword");

            res.status(200).json(
                {token: token}
            )
        })
    });

exports.router = router;
