1. start zookeeper, kafka & service1. service 1 consumes from topic1
2. start service 2 (service 1 still consumes from topic1)
3. kill service 1 - rebalance means service 2 is now consuming (on topic 2).
4. bring service 1 up again. Service 1 not consuming messages from topic 1



```
£ produce main topic
TOPIC_TO_PRODUCE_TO=topic1 npm run start-producer
# produce other-topic
TOPIC_TO_PRODUCE_TO=topic2 npm run start-producer
```

```
docker exec kafka /usr/bin/kafka-topics --bootstrap-server=localhost:9092 -list
```

```
docker exec kafka /usr/bin/kafka-consumer-groups --bootstrap-server=localhost:9092 -list
```

```
docker exec kafka /usr/bin/kafka-consumer-groups --bootstrap-server=localhost:9092 --describe --group test-group
```

```
watch -n 0.5 docker exec kafka /usr/bin/kafka-consumer-groups --bootstrap-server=localhost:9092 --describe --group test-group
```


```
docker-compose logs --tail=0 --follow
```
