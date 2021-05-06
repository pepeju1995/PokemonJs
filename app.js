const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const usersController = require("./controllers/users");
const bodyParser = require("body-parser");
usersController.registerUser("pepeju95", "1234");

require("./auth")(passport);


const app = express();
app.use(bodyParser.json());

const port = 3000;

// req y res
// req: es la request (la peticion)
// res: es la respuesta
app.get("/", (req, res) => {
    console.log(req);
    res.send("Hello World!");
});

app.post("/login", (req, res) => {
    // Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        // Si no son validas, error
        if (!result) {
            return res.status(401).json({message: "Invalid credentials."});
        }
    })
    
    // Si son validas, generamos un JWT y lo devolvemos
    const token = jwt.sign({userId: req.body.user});

    res.status(200).json(
        {token: token}
    )
});

app.post("/team/pokemons", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/team", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.status(200).send("Hello World!");
});

app.delete("/team/pokemons/:pokeid", (req, res) => {
    res.status(200).send("Hello World!");
});

app.put("/team", (req, res) => {
    res.status(200).send("Hello World!");
});

app.listen(port, (req, res) => {
    console.log("Server started at port 3000");
});

exports.app = app;