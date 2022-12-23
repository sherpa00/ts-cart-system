
import { Request,Response,NextFunction } from "express";
import { hashSync,compareSync } from "bcrypt";

import UserModel from "../models/user.model";
import CartModel from "../models/cart.model";


// ________________________________ USER CONTROLLERS __________________________________

const getUser = async (req: Request,res: Response,next: NextFunction) => {
    try {

        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

        let user = await UserModel.findById(authenticatedUserId);

         res.status(200).json({
            success: true,
            output: user,
            message: "User account is found successfully"
         });

    } catch (err) {
        console.log(
            "Error while getting the user."
        )
        console.log(err);
    }
};

const updateUser = async (req: Request,res: Response,next: NextFunction) => {
    try {
        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

         let user = await UserModel.findByIdAndUpdate(authenticatedUserId,{
            username: req.body.username,
            email: req.body.email,
         },{new: true});
         console.log(req.body.username);
         res.status(200).json({
            success: true,
            output: user,
            message: "User account is updated successfully"
         });

    } catch (err) {
        console.log(
            "Error while updating the user."
        )
        console.log(err);
    }
};

const updateUserPassword = async (req: Request,res: Response,next: NextFunction) => {
    try {
        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;
        
        let findUserById: any = await UserModel.findById(authenticatedUserId);
        
        // comparing the original password hash with the user given password and if match update
        // the original password with hashed password with given salt from db.
        if (compareSync(req.body.originalPassword,findUserById.password)) {

            // hash the new password with given salt from db
            let hashedPassword = hashSync(req.body.newPassword,findUserById.salt);

            let user = await UserModel.findByIdAndUpdate(authenticatedUserId,{
                password: hashedPassword
            },{new: true});
            res.status(200).json({
                success: true,
                output: user,
                message: "User's account password is updated successfully"
            });

        } else {
            res.status(400).json({
                success: false,
                message: "Your Original Password did not match"
            })
            next();
        }

    } catch (err) {
        console.log(
            "Error while updating the user's password."
        )
        console.log(err);
    }
};


const deleteUser = async (req: Request,res: Response,next: NextFunction) => {
    try {
        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

        // first delete the cart associated to this user
        let cartDelete = await CartModel.deleteMany({
            userId: authenticatedUserId
        });

        // if cart delete is successfull then go ahead to delete the user account
        if (cartDelete) {
            let user = await UserModel.findByIdAndDelete(authenticatedUserId);
            res.status(200).json({
                success: true,
                output: user,
                message: "User account is deleted successfully"
            });
        }

    } catch (err) {
        console.log(
            "Error while deleting the user."
        )
        console.log(err);
    }
};

export  {getUser,updateUser,updateUserPassword,deleteUser};
