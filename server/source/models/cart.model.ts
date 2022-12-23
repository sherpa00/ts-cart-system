import { Schema,model,Types } from "mongoose";

interface Cart {
    userId: Types.ObjectId;
    id: string;
    title: string;
    price: string;
    description: string;
    quantity: number;
    cartPrice: number;
    category: {
        id: number,
        name: string,
        image: string
    };
    images: Types.Array<string>
}
// _____________________________________ SCHEMA FOR CART ______________________________
const CartSchema = new Schema<Cart>({
    userId: {
        type : Schema.Types.ObjectId,
        ref: "users"
    },
    id: { 
        type: String,
        required: true
    },
    title: { 
        type: String,
        required: true
    },
    price: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    cartPrice: {
        type: Number,
        required: true
    },
    category: {
        id: { 
            type: Number,
            required: true
        },
        name: { 
            type: String,
            required: true
        },
        image: { 
            type: String,
            required: true
        }
    },
    images: {
        type: [String]
    }
});

const CartModel = model<Cart>("carts",CartSchema);

export default CartModel;

