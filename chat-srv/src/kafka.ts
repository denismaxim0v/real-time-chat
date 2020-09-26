import kafka, {Producer} from 'kafka-node';

export const client = new kafka.KafkaClient({kafkaHost: `${process.env.KAFKA_HOST}:${Number(process.env.KAFKA_PORT)}`})
export const producer = new Producer(client);
    producer.on("ready", function () {
      console.log("producer is ready");
    });