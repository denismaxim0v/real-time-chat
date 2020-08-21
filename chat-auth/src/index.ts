import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";

import redis from "redis";
import kafka, { Producer } from "kafka-node";

//Connects to the Database -> then starts the express
createConnection()
  .then(async (connection) => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(bodyParser.json());
    const client = new kafka.KafkaClient({
      kafkaHost: `${process.env.KAFKA_HOST}:${Number(process.env.KAFKA_PORT)}`,
    });
    const producer = new Producer(client);
    producer.on("ready", function () {
      console.log("producer is ready");
    });

    //Set all routes from routes folder

    app.use("/", router);
    // read connection options from ormconfig file (or ENV variables)
    // const connectionOptions = await getConnectionOptions();

    if (!process.env.REDIS_HOST) {
      throw new Error("REDIS_HOST must be defined");
    }

    const redisClient = redis.createClient({
      port: 6379,
      host: process.env.REDIS_HOST,
    });

    try {
      // broker stuff here
    } catch (err) {
      console.error(err);
    }

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch((error) => console.log(error));
