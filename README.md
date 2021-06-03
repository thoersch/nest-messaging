## NestJS event processing model
* Events (messages) are sent to a SNS Topic
* SQS queues are subscribed to the SNS Topic
* Message handlers are constructer injected into Message Consumer
* Message Consumer reads messages from the queue 
* Handlers are executed via visitor pattern
* Once resolved, messages are deleted from the SQS queue

## Running Locally

* Launch SNS/SQS local containers: `docker compose up`
* Run app: `nest start`

## Running all via Docker 
* WIP

## Testing:
* SQS web dashboard: `http://localhost:9325/`
* Publish topic message via aws cli: `aws --endpoint-url=http://localhost:9911 sns publish --topic-arn arn:aws:sns:us-east-1:123456789012:my_message_topic --message "test message"`
OR
* Publish topic message via REST endpoint: 
```
curl -X POST \
  http://127.0.0.1:3000/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"message":"{\"type\": \"Todo\", \"title\": \"This is a todo\"}"
}'
```