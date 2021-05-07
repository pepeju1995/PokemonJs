const express = require("express");
const passport = require("passport");

//Routes
const authRoutes = require("./routers/auth").router;

require("./auth")(passport);


const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
    //req es la request (peticion)
    //res es la respuesta
    res.status(200).send("Hello World!");
});

app.use("/auth", authRoutes);

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