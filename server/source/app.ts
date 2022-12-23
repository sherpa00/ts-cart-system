import Express, { Request,Response,Application, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./configs/passport.configs";
import productRoutes from "./routes/products.routes";
import userRoutes from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import signupRoutes from "./routes/signup.routes";
import cartRoutes from "./routes/cart.routes";


// __________________________________ EXPRESS APP ____________________________________
const app : Application = Express();

// _________________________________ EXPRESS MIDDLEWARES ________________________________
app.use(Express.json());
app.use(Express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cookieParser());
// cors configuration
app.use(cors())

// __________________________________ TESTING "/home" ROUTE ________________________________
app.get("/home",(req: Request,res: Response): void => {
    res.status(200).json({
        success: true,
        message: "REST API IS ALIVE"
    });
});

app.use("/account",loginRoutes,signupRoutes);
app.use("/api",passport.authenticate("jwt",{session: false}),userRoutes,cartRoutes);
app.use("/store",productRoutes);

app.get("/protected",passport.authenticate("jwt",{session: false}),(req: Request,res: Response) => {
    res.status(200).json({
        success: true
    })
});

export default app;




