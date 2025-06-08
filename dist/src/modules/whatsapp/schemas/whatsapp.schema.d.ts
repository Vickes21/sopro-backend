import { z } from "zod";
declare const messageSchema: z.ZodObject<{
    from: z.ZodString;
    id: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodEnum<["text", "image", "audio", "document", "video", "sticker", "location", "contacts", "reaction", "button", "unknown"]>;
    text: z.ZodOptional<z.ZodObject<{
        body: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        body?: string;
    }, {
        body?: string;
    }>>;
    image: z.ZodOptional<z.ZodObject<{
        caption: z.ZodOptional<z.ZodString>;
        mime_type: z.ZodString;
        sha256: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }>>;
    audio: z.ZodOptional<z.ZodObject<{
        caption: z.ZodOptional<z.ZodString>;
        mime_type: z.ZodString;
        sha256: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }>>;
    document: z.ZodOptional<z.ZodObject<{
        caption: z.ZodOptional<z.ZodString>;
        mime_type: z.ZodString;
        sha256: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }>>;
    video: z.ZodOptional<z.ZodObject<{
        caption: z.ZodOptional<z.ZodString>;
        mime_type: z.ZodString;
        sha256: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }>>;
    sticker: z.ZodOptional<z.ZodObject<{
        caption: z.ZodOptional<z.ZodString>;
        mime_type: z.ZodString;
        sha256: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }, {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    }>>;
    location: z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        latitude?: number;
        longitude?: number;
        address?: string;
    }, {
        name?: string;
        latitude?: number;
        longitude?: number;
        address?: string;
    }>>;
    contacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        addresses: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        emails: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        name: z.ZodObject<{
            formatted_name: z.ZodString;
            first_name: z.ZodString;
            last_name: z.ZodOptional<z.ZodString>;
            middle_name: z.ZodOptional<z.ZodString>;
            suffix: z.ZodOptional<z.ZodString>;
            prefix: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            formatted_name?: string;
            first_name?: string;
            last_name?: string;
            middle_name?: string;
            suffix?: string;
            prefix?: string;
        }, {
            formatted_name?: string;
            first_name?: string;
            last_name?: string;
            middle_name?: string;
            suffix?: string;
            prefix?: string;
        }>;
        org: z.ZodOptional<z.ZodAny>;
        phones: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        urls: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: {
            formatted_name?: string;
            first_name?: string;
            last_name?: string;
            middle_name?: string;
            suffix?: string;
            prefix?: string;
        };
        addresses?: any[];
        emails?: any[];
        org?: any;
        phones?: any[];
        urls?: any[];
    }, {
        name?: {
            formatted_name?: string;
            first_name?: string;
            last_name?: string;
            middle_name?: string;
            suffix?: string;
            prefix?: string;
        };
        addresses?: any[];
        emails?: any[];
        org?: any;
        phones?: any[];
        urls?: any[];
    }>, "many">>;
    reaction: z.ZodOptional<z.ZodObject<{
        message_id: z.ZodString;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message_id?: string;
        emoji?: string;
    }, {
        message_id?: string;
        emoji?: string;
    }>>;
    button: z.ZodOptional<z.ZodAny>;
    errors: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
    from?: string;
    errors?: any[];
    timestamp?: string;
    text?: {
        body?: string;
    };
    image?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    audio?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    document?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    video?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    sticker?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    location?: {
        name?: string;
        latitude?: number;
        longitude?: number;
        address?: string;
    };
    contacts?: {
        name?: {
            formatted_name?: string;
            first_name?: string;
            last_name?: string;
            middle_name?: string;
            suffix?: string;
            prefix?: string;
        };
        addresses?: any[];
        emails?: any[];
        org?: any;
        phones?: any[];
        urls?: any[];
    }[];
    reaction?: {
        message_id?: string;
        emoji?: string;
    };
    button?: any;
}, {
    id?: string;
    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
    from?: string;
    errors?: any[];
    timestamp?: string;
    text?: {
        body?: string;
    };
    image?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    audio?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    document?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    video?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    sticker?: {
        id?: string;
        caption?: string;
        mime_type?: string;
        sha256?: string;
    };
    location?: {
        name?: string;
        latitude?: number;
        longitude?: number;
        address?: string;
    };
    contacts?: {
        name?: {
            formatted_name?: string;
            first_name?: string;
            last_name?: string;
            middle_name?: string;
            suffix?: string;
            prefix?: string;
        };
        addresses?: any[];
        emails?: any[];
        org?: any;
        phones?: any[];
        urls?: any[];
    }[];
    reaction?: {
        message_id?: string;
        emoji?: string;
    };
    button?: any;
}>;
declare const contactSchema: z.ZodObject<{
    profile: z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
    }, {
        name?: string;
    }>;
    wa_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    profile?: {
        name?: string;
    };
    wa_id?: string;
}, {
    profile?: {
        name?: string;
    };
    wa_id?: string;
}>;
export declare const whatsappWebhookSchema: z.ZodObject<{
    object: z.ZodLiteral<"whatsapp_business_account">;
    entry: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        changes: z.ZodArray<z.ZodObject<{
            value: z.ZodObject<{
                messaging_product: z.ZodLiteral<"whatsapp">;
                metadata: z.ZodObject<{
                    display_phone_number: z.ZodString;
                    phone_number_id: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    display_phone_number?: string;
                    phone_number_id?: string;
                }, {
                    display_phone_number?: string;
                    phone_number_id?: string;
                }>;
                contacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    profile: z.ZodObject<{
                        name: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name?: string;
                    }, {
                        name?: string;
                    }>;
                    wa_id: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }, {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }>, "many">>;
                messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    from: z.ZodString;
                    id: z.ZodString;
                    timestamp: z.ZodString;
                    type: z.ZodEnum<["text", "image", "audio", "document", "video", "sticker", "location", "contacts", "reaction", "button", "unknown"]>;
                    text: z.ZodOptional<z.ZodObject<{
                        body: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        body?: string;
                    }, {
                        body?: string;
                    }>>;
                    image: z.ZodOptional<z.ZodObject<{
                        caption: z.ZodOptional<z.ZodString>;
                        mime_type: z.ZodString;
                        sha256: z.ZodString;
                        id: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }>>;
                    audio: z.ZodOptional<z.ZodObject<{
                        caption: z.ZodOptional<z.ZodString>;
                        mime_type: z.ZodString;
                        sha256: z.ZodString;
                        id: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }>>;
                    document: z.ZodOptional<z.ZodObject<{
                        caption: z.ZodOptional<z.ZodString>;
                        mime_type: z.ZodString;
                        sha256: z.ZodString;
                        id: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }>>;
                    video: z.ZodOptional<z.ZodObject<{
                        caption: z.ZodOptional<z.ZodString>;
                        mime_type: z.ZodString;
                        sha256: z.ZodString;
                        id: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }>>;
                    sticker: z.ZodOptional<z.ZodObject<{
                        caption: z.ZodOptional<z.ZodString>;
                        mime_type: z.ZodString;
                        sha256: z.ZodString;
                        id: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }, {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    }>>;
                    location: z.ZodOptional<z.ZodObject<{
                        latitude: z.ZodNumber;
                        longitude: z.ZodNumber;
                        name: z.ZodOptional<z.ZodString>;
                        address: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    }, {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    }>>;
                    contacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        addresses: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
                        emails: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
                        name: z.ZodObject<{
                            formatted_name: z.ZodString;
                            first_name: z.ZodString;
                            last_name: z.ZodOptional<z.ZodString>;
                            middle_name: z.ZodOptional<z.ZodString>;
                            suffix: z.ZodOptional<z.ZodString>;
                            prefix: z.ZodOptional<z.ZodString>;
                        }, "strip", z.ZodTypeAny, {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        }, {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        }>;
                        org: z.ZodOptional<z.ZodAny>;
                        phones: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
                        urls: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
                    }, "strip", z.ZodTypeAny, {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }, {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }>, "many">>;
                    reaction: z.ZodOptional<z.ZodObject<{
                        message_id: z.ZodString;
                        emoji: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        message_id?: string;
                        emoji?: string;
                    }, {
                        message_id?: string;
                        emoji?: string;
                    }>>;
                    button: z.ZodOptional<z.ZodAny>;
                    errors: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
                }, "strip", z.ZodTypeAny, {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }, {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                messages?: {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }[];
                contacts?: {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }[];
                messaging_product?: "whatsapp";
                metadata?: {
                    display_phone_number?: string;
                    phone_number_id?: string;
                };
            }, {
                messages?: {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }[];
                contacts?: {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }[];
                messaging_product?: "whatsapp";
                metadata?: {
                    display_phone_number?: string;
                    phone_number_id?: string;
                };
            }>;
            field: z.ZodLiteral<"messages">;
        }, "strip", z.ZodTypeAny, {
            value?: {
                messages?: {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }[];
                contacts?: {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }[];
                messaging_product?: "whatsapp";
                metadata?: {
                    display_phone_number?: string;
                    phone_number_id?: string;
                };
            };
            field?: "messages";
        }, {
            value?: {
                messages?: {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }[];
                contacts?: {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }[];
                messaging_product?: "whatsapp";
                metadata?: {
                    display_phone_number?: string;
                    phone_number_id?: string;
                };
            };
            field?: "messages";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        changes?: {
            value?: {
                messages?: {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }[];
                contacts?: {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }[];
                messaging_product?: "whatsapp";
                metadata?: {
                    display_phone_number?: string;
                    phone_number_id?: string;
                };
            };
            field?: "messages";
        }[];
    }, {
        id?: string;
        changes?: {
            value?: {
                messages?: {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }[];
                contacts?: {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }[];
                messaging_product?: "whatsapp";
                metadata?: {
                    display_phone_number?: string;
                    phone_number_id?: string;
                };
            };
            field?: "messages";
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    object?: "whatsapp_business_account";
    entry?: {
        id?: string;
        changes?: {
            value?: {
                messages?: {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }[];
                contacts?: {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }[];
                messaging_product?: "whatsapp";
                metadata?: {
                    display_phone_number?: string;
                    phone_number_id?: string;
                };
            };
            field?: "messages";
        }[];
    }[];
}, {
    object?: "whatsapp_business_account";
    entry?: {
        id?: string;
        changes?: {
            value?: {
                messages?: {
                    id?: string;
                    type?: "unknown" | "text" | "image" | "audio" | "document" | "video" | "sticker" | "location" | "contacts" | "reaction" | "button";
                    from?: string;
                    errors?: any[];
                    timestamp?: string;
                    text?: {
                        body?: string;
                    };
                    image?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    audio?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    document?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    video?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    sticker?: {
                        id?: string;
                        caption?: string;
                        mime_type?: string;
                        sha256?: string;
                    };
                    location?: {
                        name?: string;
                        latitude?: number;
                        longitude?: number;
                        address?: string;
                    };
                    contacts?: {
                        name?: {
                            formatted_name?: string;
                            first_name?: string;
                            last_name?: string;
                            middle_name?: string;
                            suffix?: string;
                            prefix?: string;
                        };
                        addresses?: any[];
                        emails?: any[];
                        org?: any;
                        phones?: any[];
                        urls?: any[];
                    }[];
                    reaction?: {
                        message_id?: string;
                        emoji?: string;
                    };
                    button?: any;
                }[];
                contacts?: {
                    profile?: {
                        name?: string;
                    };
                    wa_id?: string;
                }[];
                messaging_product?: "whatsapp";
                metadata?: {
                    display_phone_number?: string;
                    phone_number_id?: string;
                };
            };
            field?: "messages";
        }[];
    }[];
}>;
export declare const textMessageContentSchema: z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodObject<{
        body: z.ZodString;
        preview_url: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        body?: string;
        preview_url?: boolean;
    }, {
        body?: string;
        preview_url?: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "text";
    text?: {
        body?: string;
        preview_url?: boolean;
    };
}, {
    type?: "text";
    text?: {
        body?: string;
        preview_url?: boolean;
    };
}>;
export declare const mediaMessageContentSchema: z.ZodObject<{
    type: z.ZodEnum<["image", "audio", "video", "document"]>;
}, "strip", z.ZodAny, z.objectOutputType<{
    type: z.ZodEnum<["image", "audio", "video", "document"]>;
}, z.ZodAny, "strip">, z.objectInputType<{
    type: z.ZodEnum<["image", "audio", "video", "document"]>;
}, z.ZodAny, "strip">>;
export declare const templateMessageContentSchema: z.ZodObject<{
    type: z.ZodLiteral<"template">;
    template: z.ZodObject<{
        name: z.ZodString;
        language: z.ZodObject<{
            code: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            code?: string;
        }, {
            code?: string;
        }>;
        components: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            parameters: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
            }, "strip", z.ZodAny, z.objectOutputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">, z.objectInputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">>, "many">;
        }, "strip", z.ZodTypeAny, {
            type?: string;
            parameters?: z.objectOutputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }, {
            type?: string;
            parameters?: z.objectInputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        language?: {
            code?: string;
        };
        components?: {
            type?: string;
            parameters?: z.objectOutputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }[];
    }, {
        name?: string;
        language?: {
            code?: string;
        };
        components?: {
            type?: string;
            parameters?: z.objectInputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "template";
    template?: {
        name?: string;
        language?: {
            code?: string;
        };
        components?: {
            type?: string;
            parameters?: z.objectOutputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }[];
    };
}, {
    type?: "template";
    template?: {
        name?: string;
        language?: {
            code?: string;
        };
        components?: {
            type?: string;
            parameters?: z.objectInputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }[];
    };
}>;
export declare const whatsAppMessageContentSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"text">;
    text: z.ZodObject<{
        body: z.ZodString;
        preview_url: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        body?: string;
        preview_url?: boolean;
    }, {
        body?: string;
        preview_url?: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "text";
    text?: {
        body?: string;
        preview_url?: boolean;
    };
}, {
    type?: "text";
    text?: {
        body?: string;
        preview_url?: boolean;
    };
}>, z.ZodObject<{
    type: z.ZodEnum<["image", "audio", "video", "document"]>;
}, "strip", z.ZodAny, z.objectOutputType<{
    type: z.ZodEnum<["image", "audio", "video", "document"]>;
}, z.ZodAny, "strip">, z.objectInputType<{
    type: z.ZodEnum<["image", "audio", "video", "document"]>;
}, z.ZodAny, "strip">>, z.ZodObject<{
    type: z.ZodLiteral<"template">;
    template: z.ZodObject<{
        name: z.ZodString;
        language: z.ZodObject<{
            code: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            code?: string;
        }, {
            code?: string;
        }>;
        components: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            parameters: z.ZodArray<z.ZodObject<{
                type: z.ZodString;
            }, "strip", z.ZodAny, z.objectOutputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">, z.objectInputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">>, "many">;
        }, "strip", z.ZodTypeAny, {
            type?: string;
            parameters?: z.objectOutputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }, {
            type?: string;
            parameters?: z.objectInputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        language?: {
            code?: string;
        };
        components?: {
            type?: string;
            parameters?: z.objectOutputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }[];
    }, {
        name?: string;
        language?: {
            code?: string;
        };
        components?: {
            type?: string;
            parameters?: z.objectInputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    type?: "template";
    template?: {
        name?: string;
        language?: {
            code?: string;
        };
        components?: {
            type?: string;
            parameters?: z.objectOutputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }[];
    };
}, {
    type?: "template";
    template?: {
        name?: string;
        language?: {
            code?: string;
        };
        components?: {
            type?: string;
            parameters?: z.objectInputType<{
                type: z.ZodString;
            }, z.ZodAny, "strip">[];
        }[];
    };
}>]>;
export declare const whatsAppApiResponseSchema: z.ZodObject<{
    messaging_product: z.ZodString;
    contacts: z.ZodArray<z.ZodObject<{
        wa_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        wa_id?: string;
    }, {
        wa_id?: string;
    }>, "many">;
    messages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
    }, {
        id?: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    messages?: {
        id?: string;
    }[];
    contacts?: {
        wa_id?: string;
    }[];
    messaging_product?: string;
}, {
    messages?: {
        id?: string;
    }[];
    contacts?: {
        wa_id?: string;
    }[];
    messaging_product?: string;
}>;
export type TWhatsappWebhook = z.infer<typeof whatsappWebhookSchema>;
export type TWhatsappMessage = z.infer<typeof messageSchema>;
export type TWhatsAppContact = z.infer<typeof contactSchema>;
export type TTextMessage = z.infer<typeof textMessageContentSchema>;
export type TMediaMessage = z.infer<typeof mediaMessageContentSchema>;
export type TTemplateMessage = z.infer<typeof templateMessageContentSchema>;
export type TWhatsAppMessageContent = z.infer<typeof whatsAppMessageContentSchema>;
export type TWhatsAppApiResponse = z.infer<typeof whatsAppApiResponseSchema>;
export {};
