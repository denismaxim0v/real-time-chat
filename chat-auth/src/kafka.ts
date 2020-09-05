import kafka from "kafka-node";
import { User } from "./entity/User";

import { BadRequestError } from 'chat-errors-package';
import { getRepository } from "typeorm";

import "express-async-errors"

export const client = new kafka.KafkaClient({
  kafkaHost: `${process.env.KAFKA_HOST}:${Number(process.env.KAFKA_PORT)}`,
});

export const userCreatedConsumer = new kafka.Consumer(
  client,
  [{ topic: "users-create"}],
  {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "utf8",
    fromOffset: false,
  }
);

userCreatedConsumer.on("message", async(message) => {
  const userRepository = getRepository(User);

  let user = new User();
  user = JSON.parse(message.value as string) as User;

  console.log(user)

  try {
    await userRepository.save(user);
  } catch (e) {
    console.log(e)
    throw new BadRequestError("Could not save user")
  }
})

process.on('SIGINT', () => {
  userCreatedConsumer.close(true, () => {
      process.exit();
  });
});