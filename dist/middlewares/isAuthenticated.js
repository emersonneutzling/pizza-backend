"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    // Primeiro Receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    // Descontruir para pegar somente o token
    const [, token] = authToken.split(" ");
    // terceiro validar o token
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        //Recuperar o id do token e colocar dentro de uma variavel user_id dentro do Request.
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
