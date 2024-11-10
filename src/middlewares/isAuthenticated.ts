import { Request, Response, NextFunction } from "express";
import {verify} from "jsonwebtoken";

interface PayLoad{
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){

    // Primeiro Receber o token
    const authToken = req.headers.authorization;
    if(!authToken){
        return res.status(401).end();
    }

    // Descontruir para pegar somente o token
    const [, token] = authToken.split(" ")

    // terceiro validar o token
    try{
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        )as PayLoad;

        //Recuperar o id do token e colocar dentro de uma variavel user_id dentro do Request.
        req.user_id = sub;

        return next();

    }catch(err){
        return res.status(401).end();
    }
}