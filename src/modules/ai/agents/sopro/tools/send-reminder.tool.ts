import { tool } from "@langchain/core/tools";
import z from "zod";
import { createStandaloneDb } from "src/db/standalone";
import { reminders } from "src/db/schemas/reminders";
import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom, catchError } from "rxjs";

// Serviço auxiliar para enviar mensagens WhatsApp diretamente
@Injectable()
class WhatsappHelperService {
  private phoneNumberId: string | undefined;
  private accessToken: string | undefined;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID');
    this.accessToken = this.configService.get<string>('WHATSAPP_TOKEN');
  }

  async sendMessage(recipientPhone: string, message: string): Promise<any> {
    if (!this.phoneNumberId || !this.accessToken) {
      throw new Error('Missing WhatsApp API credentials in environment variables');
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientPhone,
      type: 'text',
      text: { body: message }
    };

    console.log('Sending WhatsApp payload:', JSON.stringify(payload, null, 2));

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `https://graph.facebook.com/v22.0/${this.phoneNumberId}/messages`, 
          payload, 
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json',
            }
          }
        ).pipe(
          catchError((error) => {
            console.error('Error sending WhatsApp message:', error.message);
            throw error;
          })
        )
      );

      console.log('WhatsApp message sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  }
}

// Função para criar o serviço de WhatsApp helper
const createWhatsappHelper = () => {
  const configService = new ConfigService();
  const httpService = new HttpService();
  return new WhatsappHelperService(configService, httpService);
};

export const sendReminder = tool(async ({ content }, {
  configurable
}) => {
  const userPhone = configurable.contact.phone;
  
  if (!userPhone) {
    throw new Error("Número de telefone do usuário não encontrado");
  }
  
  try {
    // Criar o serviço WhatsApp helper
    const whatsappHelper = createWhatsappHelper();
    
    // Preparar a mensagem
    const messageBody = `🔔 *LEMBRETE:* \n\n${content}`;
    
    // Enviar a mensagem diretamente usando a API do WhatsApp
    await whatsappHelper.sendMessage(userPhone, messageBody);
    
    return {
      message: "Lembrete enviado com sucesso via WhatsApp",
    };
  } catch (error) {
    console.error("Erro ao enviar lembrete via WhatsApp:", error);
    throw new Error(`Falha ao enviar lembrete via WhatsApp: ${error.message || error}`);
  }
}, {
  name: 'send_reminder',
  description: 'Envia um lembrete, gerando o conteúdo de forma personalizada e motivacional',
  schema: z.object({
    content: z.string().describe("Conteúdo do lembrete, personalizado e motivacional para o usuário"),
  })
})
