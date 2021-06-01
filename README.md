WIP sns/sqs messaging app

## Running Locally

* Launch SNS/SQS local containers: `docker compose up`
* Run app: `nest start`

Testing:
* SQS web dashboard: `http://localhost:9325/`
* Publish topic message: `aws --endpoint-url=http://localhost:9911 sns publish --topic-arn arn:aws:sns:us-east-1:123456789012:my_message_topic --message "test message"`