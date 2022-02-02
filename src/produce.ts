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
    const message = `hello from kafkajs - ${new Date().toLocaleString()}`
    console.log(`will send to ${topic} message (${message})`)
    await producer.send({
        topic,
        messages: [
            {value: message},
        ],
    })

    await producer.disconnect()
}

doWork().then(()=> {
    console.log('done')
}).catch(e => {
    console.error(`got an error: ${e}`)
})
