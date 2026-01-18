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
  name: z.string().min(1, {
    message: "Name is required",
  }).optional(),
  occupation: z.string().min(1, {
    message: "Occupation is required",
  }).optional(),
  bio: z.string().min(1, {
    message: "Bio is required",
  }).optional(),
  customInstructions: z.string().min(1, {
    message: "Custom instructions is required",
  }).optional(),
});
type Customization = z.infer<typeof customizationSchema>;

export { fileSchema, editChatSchema, customizationSchema, type Customization };
