import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { createClient,RedisClientType } from "redis";

dotenv.config();

const EXTTERNAL_API = process.env.PRODUCTS_API!;

// _______________________ REDIS CLIENT && CONNECTION  __________________________
let redisClient: RedisClientType;
(async () => {
  redisClient = createClient();
  redisClient.on("error", (err: any) => console.log(err));
  await redisClient.connect();
  console.log("Redis server is connected...");
})();
const EXPIRATION: number = 3600;

// ____________________________ PRODUCTS CONTROLLERS ________________________

// get all products by fetching from external api with help from axios
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cachedProducts = await redisClient.get("products");
  
  // if products is in cache....
  if (cachedProducts) {
    return res.status(200).json({
      success: true,
      output: JSON.parse(cachedProducts),
    });
  } else {
    // if producst is not in cache...
    // fetch api here
    let result: AxiosResponse = await axios.get(EXTTERNAL_API);
    // also set the product to cache
    redisClient.set("products",JSON.stringify(result.data));
    redisClient.expire("products",EXPIRATION);
    return res.status(200).json({
      success: true,
      output: result.data,
    });
  }
};

export { getAllProducts,redisClient };
