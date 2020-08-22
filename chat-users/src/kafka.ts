import kafka from 'kafka-node';

export const client = new kafka.KafkaClient({kafkaHost: `${process.env.KAFKA_HOST}:${Number(process.env.KAFKA_PORT)}`})