export interface MessageHandler {
    getType(): string;
    handle(message: string) : Promise<boolean>;
}
