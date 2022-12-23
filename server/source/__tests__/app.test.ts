
import Request from "supertest";
import app from "../app";

describe("app.ts tests",() => {
    it("/home should be successfull",async () => {
        let res = await Request(app).get("/home");
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
    });
});