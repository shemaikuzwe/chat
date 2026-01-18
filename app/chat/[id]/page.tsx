import Chat from "~/components/chat";
import { capitalize } from "~/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { trpc } from "~/lib/backend/trpc/server";

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;

  const chat = await trpc.chat.getChatById({ id });
  return {
    title: capitalize(chat?.title || "New chat"),
    description: chat?.title,
  };
}
export default async function Page({ params }: PageParams) {
  const { id } = await params;
  const chat = await trpc.chat.getChatById({ id });
  if (!chat) notFound();
  const messages = chat.messages;
  return (
    <Chat
      chatId={id}
      initialMessages={messages}
      chatTitle={chat.title ?? undefined}
    />
  );
}
