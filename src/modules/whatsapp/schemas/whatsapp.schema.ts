import { z } from "zod";

// Schema for WhatsApp text message
const textMessageSchema = z.object({
  body: z.string()
});

// Schema for WhatsApp media message (image, audio, document, video)
const mediaMessageSchema = z.object({
  caption: z.string().optional(),
  mime_type: z.string(),
  sha256: z.string(),
  id: z.string()
});

// Schema for WhatsApp location message
const locationMessageSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string().optional(),
  address: z.string().optional()
});

// Schema for WhatsApp reaction message
const reactionMessageSchema = z.object({
  message_id: z.string(),
  emoji: z.string()
});

// Schema for WhatsApp contact message
const contactMessageSchema = z.object({
  addresses: z.array(z.any()).optional(),
  emails: z.array(z.any()).optional(),
  name: z.object({
    formatted_name: z.string(),
    first_name: z.string(),
    last_name: z.string().optional(),
    middle_name: z.string().optional(),
    suffix: z.string().optional(),
    prefix: z.string().optional()
  }),
  org: z.any().optional(),
  phones: z.array(z.any()).optional(),
  urls: z.array(z.any()).optional()
});

// Schema for WhatsApp message
const messageSchema = z.object({
  from: z.string(),
  id: z.string(),
  timestamp: z.string(),
  type: z.enum([
    "text", 
    "image", 
    "audio", 
    "document", 
    "video", 
    "sticker", 
    "location", 
    "contacts", 
    "reaction", 
    "button", 
    "unknown"
  ]),
  text: textMessageSchema.optional(),
  image: mediaMessageSchema.optional(),
  audio: mediaMessageSchema.optional(),
  document: mediaMessageSchema.optional(),
  video: mediaMessageSchema.optional(),
  sticker: mediaMessageSchema.optional(),
  location: locationMessageSchema.optional(),
  contacts: z.array(contactMessageSchema).optional(),
  reaction: reactionMessageSchema.optional(),
  button: z.any().optional(),
  errors: z.array(z.any()).optional()
});

// Schema for WhatsApp contact
const contactSchema = z.object({
  profile: z.object({
    name: z.string()
  }),
  wa_id: z.string()
});

// Schema for WhatsApp metadata
const metadataSchema = z.object({
  display_phone_number: z.string(),
  phone_number_id: z.string()
});

// Schema for WhatsApp value
const valueSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  metadata: metadataSchema,
  contacts: z.array(contactSchema).optional(),
  messages: z.array(messageSchema).optional()
});

// Schema for WhatsApp change
const changeSchema = z.object({
  value: valueSchema,
  field: z.literal("messages")
});

// Schema for WhatsApp entry
const entrySchema = z.object({
  id: z.string(),
  changes: z.array(changeSchema)
});

// Main schema for WhatsApp webhook
export const whatsappWebhookSchema = z.object({
  object: z.literal("whatsapp_business_account"),
  entry: z.array(entrySchema)
});

// Types for sending WhatsApp messages
export const textMessageContentSchema = z.object({
  type: z.literal('text'),
  text: z.object({
    body: z.string(),
    preview_url: z.boolean().optional()
  })
});

export const mediaMessageContentSchema = z.object({
  type: z.enum(['image', 'audio', 'video', 'document']),
}).catchall(z.any());

export const templateMessageContentSchema = z.object({
  type: z.literal('template'),
  template: z.object({
    name: z.string(),
    language: z.object({
      code: z.string()
    }),
    components: z.array(z.object({
      type: z.string(),
      parameters: z.array(z.object({
        type: z.string()
      }).catchall(z.any()))
    })).optional()
  })
});

export const whatsAppMessageContentSchema = z.union([
  textMessageContentSchema,
  mediaMessageContentSchema,
  templateMessageContentSchema
]);

// Response type for WhatsApp API
export const whatsAppApiResponseSchema = z.object({
  messaging_product: z.string(),
  contacts: z.array(z.object({
    wa_id: z.string()
  })),
  messages: z.array(z.object({
    id: z.string()
  }))
});

// Export types
export type TWhatsappWebhook = z.infer<typeof whatsappWebhookSchema>;
export type TWhatsappMessage = z.infer<typeof messageSchema>;
export type TWhatsAppContact = z.infer<typeof contactSchema>;
export type TTextMessage = z.infer<typeof textMessageContentSchema>;
export type TMediaMessage = z.infer<typeof mediaMessageContentSchema>;
export type TTemplateMessage = z.infer<typeof templateMessageContentSchema>;
export type TWhatsAppMessageContent = z.infer<typeof whatsAppMessageContentSchema>;
export type TWhatsAppApiResponse = z.infer<typeof whatsAppApiResponseSchema>;
