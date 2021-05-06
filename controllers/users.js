const uuid = require("uuid");
const crypto = require("./crypto.js");

const userDatabase = {
    "0001": {
        "password": "",
        "salt": "",
        "userName": ""
    }
};
// userId -> password

const registerUser = (userName, password) => {
    let hashedPwd = crypto.hashPasswordSync(password);
    // Guardar en la base de datos nuestro usuario
    userDatabase[uuid.v4()] = {
        userName: userName,
        password: result
    };
}

const checkUserCredentials = (userId, password, done) => {
    // Comprobar que las credenciales son correctas
    let user = userDatabase[userId];
    crypto.checkUserCredentials(password, user.password, done);
}