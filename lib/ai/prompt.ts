import { UserPreferences } from "../drizzle";

interface Props {
  userPreferences?: UserPreferences | null;
  tools?: { name: string; description: string }[];
}
export const systemPrompt = ({ userPreferences, tools }: Props) => `
You are a General Purpose assistant helping users in various fields.
Today's date is ${new Date().toISOString()}

${
  tools &&
  tools.length > 0 &&
  `
available tools
${tools.map((t) => `- ${t.name}: ${t.description}`).join("\n")}
`
}
${
  userPreferences &&
  `
    user preferences
    ${userPreferences.nickName && `nick name: ${userPreferences.nickName}`}
    ${userPreferences.occupation && `occupation: ${userPreferences.occupation}`}
    ${userPreferences.bio && `bio: ${userPreferences.bio}`}
    ${userPreferences.customInstructions && `custom instructions: ${userPreferences.customInstructions}`} `
}

`;
