import { z } from "zod";
const fileSchema = z
  .instanceof(File, { message: "File is Required" })
  .refine((file) => file.type.startsWith("application/pdf"), {
    message: "Only PDF files supported.",
  });

const editChatSchema = z.object({
  chatId: z.string().min(4, {
    message: "Chat does not exist",
  }),
  title: z
    .string()
    .min(3, {
      message: "Chat title too small",
    })
    .max(40, {
      message: "Please use ashort title",
    }),
});

const customizationSchema = z.object({
  name: z.string().max(20, {
    message: "Name is too long",
  }),
  occupation: z.string().max(20, {
    message: "Occupation is too long",
  }),
  bio: z.string().max(50, {
    message: "Bio is too long",
  }),
  customInstructions: z.string().max(50, {
    message: "Custom instructions is too long",
  }),
});
type Customization = z.infer<typeof customizationSchema>;

export { fileSchema, editChatSchema, customizationSchema, type Customization };
