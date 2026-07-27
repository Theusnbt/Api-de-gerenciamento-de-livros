import jwt from "jsonwebtoken";
import express from "express";

function auth(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({
        message: "Token not send"    
        });

    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = payload;

        next();
    }
    catch(error){
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

export default auth;