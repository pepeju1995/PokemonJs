const authMiddleware = require("./tools/auth-middleware");
const express = require("express");

const setupMiddlewares = (app) => {
    app.use(express.json());
    authMiddleware.init();
    app.use(authMiddleware.proteckWithJwt);
}
exports.setupMiddlewares = setupMiddlewares;