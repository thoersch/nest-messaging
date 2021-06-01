import { Injectable, Logger } from '@nestjs/common';
const AWS = require('aws-sdk');

@Injectable()
export class MessageService {
    private readonly logger = new Logger(MessageService.name);

    private snsClient;

    constructor() {
        var endpoint = new AWS.Endpoint(process.env.AWS_ENDPOINT, process.env.AWS_REGION);
        var credentials = new AWS.SharedIniFileCredentials({profile: process.env.AWS_PROFILE});
        AWS.config.credentials = credentials;
        this.snsClient = new AWS.SNS({endpoint: endpoint});
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
}
