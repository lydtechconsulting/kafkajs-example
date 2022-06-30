import {KafkaMessage} from "kafkajs";
const config = require('config');


console.log("will consume...");

const { Kafka } = require('kafkajs')

const doWork = async () => {
    const kafkaAddress = config.get('kafkaaddress');
    const clientId = config.clientId;
    const kafka = new Kafka({
        clientId,
        brokers: [kafkaAddress],
    })
    
    const groupId = config.groupId;
    const consumer = kafka.consumer({ groupId })

    await consumer.connect()
    const topic = config.topic;
    console.log(`client ${clientId} consuming from topic ${topic} with consumer group ${groupId}`)
    await consumer.subscribe({ topic, fromBeginning: true })
    let shouldErrorB = true;
    let shouldErrorD = true;

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: {topic: string, partition: number, message: KafkaMessage}) => {
            console.log({
                value: `received message on topic/partition (${topic}/${partition}) - ${message.value?.toString()} - full message: ${JSON.stringify(message)}`,
            })
            if((message.value!.toString() === 'b') && shouldErrorB) {
                console.log({
                    value: `throwing error for 'b'`
                })
                shouldErrorB = false;
                throw new Error("failing for 'b'");
            }
            if((message.value!.toString() === 'd') && shouldErrorD) {
                console.log({
                    value: `throwing error for 'd'`
                })
                shouldErrorD = false;
                throw new Error("failing for 'd'");
            }
        },
    })
}

doWork().then(()=> {
    console.log('done')
}).catch(e => {
    console.error(`got an error: ${e}`)
})
