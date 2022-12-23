import * as dotenv from "dotenv";
import { Strategy,ExtractJwt } from "passport-jwt";
import { Request } from "express";
import passport from "passport";
import { Types } from "mongoose";
import UserModel from "../models/user.model";

dotenv.config();

const SECRET : string = process.env.SECRET!;

// ____________________ PASSPORT INITILIZATIONS ____________________
passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET,
        passReqToCallback: true // used to send req.user in routes for userId;
    },
    (req: Request,jwt_payload: any,done: any) => {
        // find user from db and return done 
        UserModel.findById(jwt_payload.sub,(err: any,user: any) => {
            if (err) {
                return done(null,false,{message: "Some error occured while authenticating user."})
            }

            if (user) {
                // set the req.user to be used in routes
                req.user = user;
                return done(null,user,{message: "Authorization successfull"});
            } else {
                return done(null,false,{message: "No user found"});
            }
        })
    })
);

export default passport;