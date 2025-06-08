"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaWebhookVerificationSchema = exports.metaWebhookBaseSchema = void 0;
const v4_1 = require("zod/v4");
exports.metaWebhookBaseSchema = v4_1.z.object({
    object: v4_1.z.string().describe("The Meta platform that triggered this webhook (e.g., 'whatsapp_business_account', 'instagram', 'page')"),
    entry: v4_1.z.array(v4_1.z.object({
        id: v4_1.z.string().describe("The ID of the object that triggered this webhook"),
        time: v4_1.z.number().optional().describe("The time this webhook was triggered"),
        changes: v4_1.z.array(v4_1.z.object({
            field: v4_1.z.string().describe("The field that changed"),
            value: v4_1.z.any().describe("The value of the changed field")
        })).describe("Array of changes that triggered this webhook")
    })).describe("Array of webhook entries")
});
exports.metaWebhookVerificationSchema = v4_1.z.object({
    "hub.mode": v4_1.z.string().describe("The mode of the verification request"),
    "hub.verify_token": v4_1.z.string().describe("The verification token to validate"),
    "hub.challenge": v4_1.z.string().describe("The challenge string to be echoed back")
});
//# sourceMappingURL=meta-webhook.schema.js.map