const JwtStrategy = require("passport-jwt").Strategy,
    ExtracktJwt = require("passport-jwt").ExtractJwt;

module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtracktJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: "secretPassword" // TODO deberia estar en una variable de entorno
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log("decoded jwt", decoded);
        return done(null, decoded);
    }));
}