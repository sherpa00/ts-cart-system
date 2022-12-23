
import { Request,Response,NextFunction } from "express";
import CartModel from "../models/cart.model";

// __________________________________ CART CONTROLLERS ___________________________________

// add cart controller
const addCart = async(req: Request,res: Response, next: NextFunction) => {  
    try {

        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

        let newCartModel = new CartModel({
            ...req.body,
            cartPrice: req.body.quantity * Number(req.body.price),
            userId: authenticatedUserId
        });
        let carts = await newCartModel.save();
        
        res.status(200).json({
            success: true,
            output: carts
        });
        next();
    } catch(err) {
        console.log("Error while adding cart");
        console.log(err);
    }
}

// read all cart controller to get the cart of user by filtering userID
const getAllCart = async (req: Request,res: Response,next: NextFunction) => {
    try {
        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

        let carts = await CartModel.find({ userId: authenticatedUserId });
        res.status(200).json({
            success: true,
            output: carts
        })
    } catch (err) {
        console.log("Error while getting all cart by userId");
        console.log("err")
    }
}


// read single cart from user carts by finding by cartId;
const getSingleCart = async(req: Request,res: Response,next: NextFunction) => {
    try {
        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

        let cart = await CartModel.find({ 
            userId: authenticatedUserId,
            _id: req.params.id 
        });

        res.status(200).json({
            success: true,
            output: cart
        })
    } catch (err) {
        console.log("Error while getting single cart by cartId");
        console.log("err")
    }
}

// update cart controller
const updateCart = async(req: Request,res: Response,next: NextFunction) => {
    try {

        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

        let findCartById = await CartModel.findOne({
            _id: req.params.id,
            userId: authenticatedUserId
        });

        let previousQuantity : number = findCartById!.quantity;
        let originalPrice : number = Number(findCartById!.price);

        if (req.query.do === "increase") {
            let carts = await CartModel.findOneAndUpdate({
                _id: req.params.id,
                userId: authenticatedUserId
            },
            {
                quantity : previousQuantity + 1,
                cartPrice: originalPrice * (previousQuantity + 1)
            });

            res.status(200).json({
                success: true,
                message: "Succssfully updated the cart"
            });
            next();
        } 

        if (req.query.do === "decrease") {
            if (previousQuantity <= 1) {

                res.status(200).json({
                    success: true,
                    message: "Quantity should not be lower than 1"
                });
                next();
            } else {
                let carts = await CartModel.findOneAndUpdate({
                    _id: req.params.id,
                    userId: authenticatedUserId
                },
                {
                    quantity : previousQuantity - 1,
                    cartPrice: originalPrice * (previousQuantity - 1)
                });
                res.status(200).json({
                    success: true,
                    message: "Successfully Updated the Cart"
                })
                next();
            }
        }

    } catch (err) {
        console.log("Error while updating cart by cartId");
        console.log("err")
    }
}

// calculate cart total controller
const calculateCart = async (req:Request,res: Response,next: NextFunction) => {
    try {
        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;


        // get the user's cart products
        const cartProducts : any = await CartModel.find({
            userId: authenticatedUserId
        });

        if (cartProducts.length <= 0 || cartProducts === null) {
            res.status(200).json({
                success: true,
                output: {
                    subtotal: 0
                },
                message: "Your cart is empty"
            });
            next();
        } else {
            // SHIPPING FEE
            const SHIPPING_FEE : number = 100;

            let ordertotal : number = 0;
            let subtotal : number = 0;

            // add products price to total
            cartProducts.forEach((product: any) => {
                // change the price string to number
                let price : number = Number(product.cartPrice)
                
                ordertotal += price;
            });

            // add shipping fee
            subtotal = ordertotal + SHIPPING_FEE;

            res.status(200).json({
                success: true,
                output: {
                    ordertotal: ordertotal,
                    shipping_fee: SHIPPING_FEE,
                    subtotal: subtotal
                },
                message: "Successfully got the cart summary."
            });      
        }

    } catch (err) {
        console.log("Error while calculation the cart total price.");
        console.log(err);
    }
}

// delete all cart controller
const deleteAllCart = async(req: Request,res: Response,next: NextFunction) => {
    try {

        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

        let carts = await CartModel.deleteMany({
            userId: authenticatedUserId
        });
        res.status(200).json({
            success: true,
            message: "Successfully deleted all carts"
        })
    } catch (err) {
        console.log("Error while deleting cart by userId");
        console.log("err")
    }
}

// delete single cart controller
const deleteSingleCart = async(req: Request,res: Response,next: NextFunction) => {
    try {

        // UserId when authenticated
        let {_id} : any = req.user;
        let authenticatedUserId = _id;

        let cart = await CartModel.deleteOne({
            _id: req.params.id,
            userId: authenticatedUserId
        });

        res.status(200).json({
            success: true,
            message: "Successfully deleted the cart"
        })
    } catch (err) {
        console.log("Error while deleting single cart by cartId");
        console.log("err")
    }
}

export {addCart,getAllCart,getSingleCart,updateCart,calculateCart,deleteAllCart,deleteSingleCart};