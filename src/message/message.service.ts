import { Injectable, Logger } from '@nestjs/common';
const AWS = require('aws-sdk');

@Injectable()
export class MessageService {
    private readonly logger = new Logger(MessageService.name);

    private readonly snsClient;
    private readonly sqsClient;

    constructor() {
        var endpoint = new AWS.Endpoint(process.env.AWS_ENDPOINT, process.env.AWS_REGION);
        var credentials = new AWS.SharedIniFileCredentials({profile: process.env.AWS_PROFILE});
        AWS.config.credentials = credentials;
        this.snsClient = new AWS.SNS({endpoint: endpoint});
        this.sqsClient = new AWS.SQS({endpoint: endpoint});
    }

    public sendNotification(topicArn: string, message: string) : any {
        this.logger.debug(`${MessageService.name} is sending ${message} to topic ${topicArn}`);
        this.snsClient.publish({
            Message: message,
            TopicArn: topicArn
        }, (error, data) => {
            if (error) {
                this.logger.error(error, error.stack);
            } else {
                this.logger.debug(data);
            }

            return error || data;
        });
    }

    public getMessagesFromQueue(queueUrl: string) : Promise<any[]> {
        var reqeuestOptions = {
            AttributeNames: ["SentTimestamp"],
            MaxNumberOfMessages: process.env.SQS_MAX_MESSAGES_PER_POLL,
            MessageAttributeNames: ["All"],
            QueueUrl: queueUrl,
            VisibilityTimeout: process.env.SQS_VISIBILITY_TIMEOUT,
            WaitTimeSeconds: process.env.SQS_WAIT_TIME_SECONDS
        };

        return this.sqsClient.receiveMessage(reqeuestOptions).promise()
                             .then(data => data.Messages || [])
                             .catch(error => this.logger.error(error));
    }

    public deleteMessageFromQueue(queueUrl: string, receiptHandle: string) {
        var deleteParams = {
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle
        };

        this.sqsClient.deleteMessage(deleteParams).promise()
                      .catch(error => this.logger.error(error));
    }
}
