import { Schema,model } from "mongoose";

interface User {
    username: string;
    email: string;
    salt: string;
    password: string;
}

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = model<User>("users",UserSchema);

export default UserModel;