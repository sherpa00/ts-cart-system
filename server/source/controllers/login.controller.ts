import * as dotenv from "dotenv";
import { Request,Response,NextFunction } from "express";
import { sign } from "jsonwebtoken";
import { compareSync } from "bcrypt";
import UserModel from "../models/user.model";
import { NONAME } from "dns";
 
dotenv.config();

const SECRET : string = process.env.SECRET!;

// ____________________________ LOGIN CONTROLLER _____________________________

const login = async (req: Request,res: Response,next: NextFunction) => {
    try {
        // find user by userid
        let user = await UserModel.findOne({email: req.body.email});

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found with that email"
            });
        }

        // compare the hash password
        let isValid = compareSync(req.body.password,user.password);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Password Incorrect"
            })
        } else {
            let signedJWT = sign({sub: user._id},SECRET,{expiresIn: "1h"});
            

            res.status(200).json({
                success: true,
                message: "Successfully logged in",
                output: {
                    token: signedJWT
                }
            });
        }

    } catch (err) {
        res.status(400).json({
            success: false,
            output: err,
            message: "Error while loggin in"
        })
    }
}

export {login};
