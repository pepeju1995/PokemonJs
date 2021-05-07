const express = require("express");
const passport = require("passport");
const router = express.Router();
require("../auth")(passport);

router.route("/")
    .get( passport.authenticate("jwt", {session: false}),
            (req, res, next) => {
                res.status(200).send("Hello World!")
            })
    .put(() => {
        res.status(200).send("Hello World!")
    })

router.route("/pokemons")
    .post(() => {
        res.status(200).send("Hello World!");
    })

router.route("/pokemons/:pokeid")
    .delete(() => {
        res.status(200).send("Hello World!");
    })

    
exports.router = router;