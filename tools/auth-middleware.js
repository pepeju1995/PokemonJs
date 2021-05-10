const JwtStrategy = require("passport-jwt").Strategy,
    ExtracktJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const init = () => {
    const opts = {
        jwtFromRequest: ExtracktJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: "secretPassword"
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        return done(null, decoded);
    }));
}

const proteckWithJwt = (req, res, next) => {
    if (req.path == "/" || req.path == "/auth/login") {
        return next();
    }
    return passport.authenticate("jwt", {session: false})(req, res, next);
}

exports.init = init;
exports.proteckWithJwt = proteckWithJwt;