import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ConversationsService } from 'src/modules/conversations/conversations.service';
import { AiService } from 'src/modules/ai/ai.service';
import { UsersService } from 'src/modules/users/users.service';
export declare class WhatsappService {
    private configService;
    private _http;
    private userService;
    private _conversationsService;
    private _aiService;
    private phoneNumberId;
    private accessToken;
    private logger;
    constructor(configService: ConfigService, _http: HttpService, userService: UsersService, _conversationsService: ConversationsService, _aiService: AiService);
    private _processMessage;
    private _handleTextMessage;
    private sendMessage;
    processWhatsAppEvent(payload: any): Promise<{
        success: boolean;
        message: string;
        error?: any;
        statusCode?: number;
    }>;
}
