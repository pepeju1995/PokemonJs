const express = require("express");
const passport = require("passport");

//Routes
const authRoutes = require("./routers/auth").router;
const teamsRoutes = require("./routers/teams").router;


const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
    //req es la request (peticion)
    //res es la respuesta
    res.status(200).send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/teams", teamsRoutes);

app.listen(port, (req, res) => {
    console.log("Server started at port 3000");
});

exports.app = app;