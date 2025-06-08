"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsAppApiResponseSchema = exports.whatsAppMessageContentSchema = exports.templateMessageContentSchema = exports.mediaMessageContentSchema = exports.textMessageContentSchema = exports.whatsappWebhookSchema = void 0;
const zod_1 = require("zod");
const textMessageSchema = zod_1.z.object({
    body: zod_1.z.string()
});
const mediaMessageSchema = zod_1.z.object({
    caption: zod_1.z.string().optional(),
    mime_type: zod_1.z.string(),
    sha256: zod_1.z.string(),
    id: zod_1.z.string()
});
const locationMessageSchema = zod_1.z.object({
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
    name: zod_1.z.string().optional(),
    address: zod_1.z.string().optional()
});
const reactionMessageSchema = zod_1.z.object({
    message_id: zod_1.z.string(),
    emoji: zod_1.z.string()
});
const contactMessageSchema = zod_1.z.object({
    addresses: zod_1.z.array(zod_1.z.any()).optional(),
    emails: zod_1.z.array(zod_1.z.any()).optional(),
    name: zod_1.z.object({
        formatted_name: zod_1.z.string(),
        first_name: zod_1.z.string(),
        last_name: zod_1.z.string().optional(),
        middle_name: zod_1.z.string().optional(),
        suffix: zod_1.z.string().optional(),
        prefix: zod_1.z.string().optional()
    }),
    org: zod_1.z.any().optional(),
    phones: zod_1.z.array(zod_1.z.any()).optional(),
    urls: zod_1.z.array(zod_1.z.any()).optional()
});
const messageSchema = zod_1.z.object({
    from: zod_1.z.string(),
    id: zod_1.z.string(),
    timestamp: zod_1.z.string(),
    type: zod_1.z.enum([
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
    contacts: zod_1.z.array(contactMessageSchema).optional(),
    reaction: reactionMessageSchema.optional(),
    button: zod_1.z.any().optional(),
    errors: zod_1.z.array(zod_1.z.any()).optional()
});
const contactSchema = zod_1.z.object({
    profile: zod_1.z.object({
        name: zod_1.z.string()
    }),
    wa_id: zod_1.z.string()
});
const metadataSchema = zod_1.z.object({
    display_phone_number: zod_1.z.string(),
    phone_number_id: zod_1.z.string()
});
const valueSchema = zod_1.z.object({
    messaging_product: zod_1.z.literal("whatsapp"),
    metadata: metadataSchema,
    contacts: zod_1.z.array(contactSchema).optional(),
    messages: zod_1.z.array(messageSchema).optional()
});
const changeSchema = zod_1.z.object({
    value: valueSchema,
    field: zod_1.z.literal("messages")
});
const entrySchema = zod_1.z.object({
    id: zod_1.z.string(),
    changes: zod_1.z.array(changeSchema)
});
exports.whatsappWebhookSchema = zod_1.z.object({
    object: zod_1.z.literal("whatsapp_business_account"),
    entry: zod_1.z.array(entrySchema)
});
exports.textMessageContentSchema = zod_1.z.object({
    type: zod_1.z.literal('text'),
    text: zod_1.z.object({
        body: zod_1.z.string(),
        preview_url: zod_1.z.boolean().optional()
    })
});
exports.mediaMessageContentSchema = zod_1.z.object({
    type: zod_1.z.enum(['image', 'audio', 'video', 'document']),
}).catchall(zod_1.z.any());
exports.templateMessageContentSchema = zod_1.z.object({
    type: zod_1.z.literal('template'),
    template: zod_1.z.object({
        name: zod_1.z.string(),
        language: zod_1.z.object({
            code: zod_1.z.string()
        }),
        components: zod_1.z.array(zod_1.z.object({
            type: zod_1.z.string(),
            parameters: zod_1.z.array(zod_1.z.object({
                type: zod_1.z.string()
            }).catchall(zod_1.z.any()))
        })).optional()
    })
});
exports.whatsAppMessageContentSchema = zod_1.z.union([
    exports.textMessageContentSchema,
    exports.mediaMessageContentSchema,
    exports.templateMessageContentSchema
]);
exports.whatsAppApiResponseSchema = zod_1.z.object({
    messaging_product: zod_1.z.string(),
    contacts: zod_1.z.array(zod_1.z.object({
        wa_id: zod_1.z.string()
    })),
    messages: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string()
    }))
});
//# sourceMappingURL=whatsapp.schema.js.map