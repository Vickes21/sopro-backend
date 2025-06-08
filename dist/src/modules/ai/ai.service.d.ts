import { TMessage, TReminder, TUser } from 'src/db/schemas';
import { BaseMessage } from "@langchain/core/messages";
export declare class AiService {
    onMessage(messages: Partial<TMessage>[], contact: TUser): Promise<BaseMessage>;
    sendReminder(reminder: TReminder): Promise<BaseMessage>;
    private _parseDbMessagesToLanggraphMessages;
}
