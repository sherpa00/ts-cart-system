import { Request,Response,NextFunction } from "express";
import { genSaltSync,hashSync } from "bcrypt";
import UserModel from "../models/user.model";


// _________________________________ SIGNUP CONTROLLER ___________________________________
const signup = async (req: Request,res: Response,next: NextFunction) => {
    try {

        // generate a salt
        let salt = genSaltSync(10);

        // hash the password
        let hashedPassword = hashSync(req.body.password,salt);

        let newUserModel = new UserModel({
            username: req.body.username,
            email: req.body.email,
            salt: salt,
            password: hashedPassword
        });

         let newUser = await newUserModel.save();
         res.status(200).json({
            success: true,
            output: newUser
         });

    } catch (err) {
        console.log(
            "Error while signing up new user."
        )
        console.log(err);
    }
};

export {signup};