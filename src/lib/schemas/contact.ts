import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  subject: z.string().min(2).max(200).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
