
import * as dotenv from "dotenv";
import Request from "supertest";
import mongoose from "mongoose";
import app from "../../app";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL!;

mongoose.set({strictQuery: true})


describe("routes/products.route.ts test",() => {
    it("route /api/products should return data successfullly",async () => {
        let res = await Request(app).get("/store/products");
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.output.length).toBeGreaterThan(0);
    });
});

