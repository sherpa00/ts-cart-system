
import * as dotenv from "dotenv";
import {connect,set} from "mongoose";

import app from "./app";

// ______________________________ COFIGURE ENVIRONTMENT VARIABLE __________________________
dotenv.config();

const url = process.env.MONGO_URL!
const port = process.env.PORT;

set("strictQuery",true);
// ______________________________ DB AND SERVER CONNECTIONS _______________________________
connect(url,async () => {
    try {
        console.log("DB is connected...");
        // connect to server now
        app.listen(port,() => {
            console.log("Server is alive at 5001...");
        })
    } catch (err) {
        console.log("Error occured while connecting to db.");
        console.log(err);
    }
})