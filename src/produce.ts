console.log("will produce...");

const { Kafka } = require('kafkajs')

const doWork = async () => {
    const kafka = new Kafka({
        clientId: 'my-producer',
        brokers: ['localhost:29092'],
        //ssl: {
            //rejectUnauthorized: false,
            //key: null,
            //cert: null,
            //ca: [fs.readFileSync('/Users/james/dev/lydtech/kafka/kafkajs/keys/ca-cert', 'utf-8')],
        //}
        
    })


    const producer = kafka.producer()

    await producer.connect()
    const topic = process.env.TOPIC_TO_PRODUCE_TO ?? 'topic1'
    // const message = `hello from kafkajs - ${new Date().toLocaleString()}`

    const messages = [ {value: "a"}, {value: "b"}, {value: "c"} ];

    console.log(`will send to ${topic}`)
    await producer.send({
        topic,
        messages
        // messages: [
        //     {value: message},
        //     {value: message},
        //     {value: message},
        //     {value: message},
        //     {value: message},
        // ],
    })

    await producer.disconnect()
}

doWork().then(()=> {
    console.log('done')
}).catch(e => {
    console.error(`got an error: ${e}`)
})
