### Useful commands

Update `docker-compose.yml` to define how many consumers listen to which topics.

Build docker container with app

```
docker build -t kafkajs-examples:local .
```

Start Zookeeper, Kafka, consumer1 and consumer2
```
docker-compose up -d
```

Tail all logs
```
docker-compose logs --tail=0 --follow
```

Send messages to topics
```
# produce main topic
TOPIC_TO_PRODUCE_TO=topic1 npm run start-producer
# produce other-topic
TOPIC_TO_PRODUCE_TO=topic2 npm run start-producer
```

list topics
```
docker exec kafka /usr/bin/kafka-topics --bootstrap-server=localhost:9092 -list
```

list consumer groups
```
docker exec kafka /usr/bin/kafka-consumer-groups --bootstrap-server=localhost:9092 -list
```

describe consumer group
```
docker exec kafka /usr/bin/kafka-consumer-groups --bootstrap-server=localhost:9092 --describe --group test-group
```

watch consumer group
```
watch -n 0.5 docker exec kafka /usr/bin/kafka-consumer-groups --bootstrap-server=localhost:9092 --describe --group test-group
```

clean up docker containers
```
docker rm -f $(docker ps -aq)
```
