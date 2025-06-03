import { z } from "zod/v4";

/**
 * Base schema for Meta webhook events
 * This validates the initial structure of all Meta webhook payloads
 * before specific platform schemas (like WhatsApp) are applied
 */
export const metaWebhookBaseSchema = z.object({
  object: z.string().describe("The Meta platform that triggered this webhook (e.g., 'whatsapp_business_account', 'instagram', 'page')"),
  entry: z.array(
    z.object({
      id: z.string().describe("The ID of the object that triggered this webhook"),
      time: z.number().optional().describe("The time this webhook was triggered"),
      changes: z.array(
        z.object({
          field: z.string().describe("The field that changed"),
          value: z.any().describe("The value of the changed field")
        })
      ).describe("Array of changes that triggered this webhook")
    })
  ).describe("Array of webhook entries")
});

/**
 * Type for the base Meta webhook payload
 */
export type TMetaWebhookBase = z.infer<typeof metaWebhookBaseSchema>;

/**
 * Schema specifically for WhatsApp webhook verification
 * Used to validate the query parameters in GET requests
 */
export const metaWebhookVerificationSchema = z.object({
  "hub.mode": z.string().describe("The mode of the verification request"),
  "hub.verify_token": z.string().describe("The verification token to validate"),
  "hub.challenge": z.string().describe("The challenge string to be echoed back")
});

/**
 * Type for Meta webhook verification parameters
 */
export type TMetaWebhookVerification = z.infer<typeof metaWebhookVerificationSchema>;
