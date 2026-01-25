import { Check, Copy, GitBranchIcon, LucideIcon, Repeat, ThumbsDown, ThumbsUp } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { UIMessage } from "~/lib/ai/types";
import { trpc } from "~/lib/backend/trpc/client";
import { useClipBoard } from "~/lib/hooks";
import { RegenerateFunc } from "~/lib/types";
import { formatNumber, cn } from "~/lib/utils";

interface Props {
  content: string;
  reload: RegenerateFunc;
  message: UIMessage;
}
export default function ButtonRow({ content, reload, message }: Props) {
  const [isCopied, copyText] = useClipBoard();
  const params = useParams();
  const router = useRouter();

  const branchMutation = trpc.chat.branchChat.useMutation({
    onSuccess: (data) => {
      router.push(`/chat/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to branch chat");
    },
  });

  async function branch() {
    const id = params.id as string;
    if (!id) return;
    branchMutation.mutate({ id, messageId: message.id });
  }
  const buttons: Array<{
    icon: LucideIcon;
    tooltip: string;
    label?: string;
    onClick: () => void;
  }> = [
    {
      icon: isCopied ? Check : Copy,
      tooltip: isCopied ? "Copied!" : "Copy",
      onClick: copy,
      label: isCopied ? "Copied!" : "Copy",
    },
    {
      icon: branchMutation.isPending ? Loader2 : GitBranchIcon,
      tooltip: branchMutation.isPending ? "Branching..." : "Branch",
      onClick: branch,
    },
    {
      icon: Repeat,
      tooltip: "Regenerate",
      onClick: async () => {
        await reload({
          messageId: message.id,
        });
      },
    },
    { icon: ThumbsUp, tooltip: "Like", onClick: like },
    { icon: ThumbsDown, tooltip: "Dislike", onClick: dislike },
  ];

  function like() {
    toast("Thanks for your feedback!", {
      position: "top-center",
    });
  }
  function dislike() {
    toast("Thanks for your feedback! We will try to improve", {
      position: "top-center",
    });
  }
  function copy() {
    copyText(content);
  }

  return (
    <div className="mt-2 flex justify-end gap-2">
      <div className="flex items-center justify-center gap-2 font-sans italic">
        {message?.metadata?.model && <span className="text-sm">{message.metadata.model}</span>}
        {message?.metadata?.totalTokens && (
          <span className="text-sm">{`${formatNumber(message.metadata.totalTokens)} Tokens`}</span>
        )}
      </div>
      {buttons.map(({ icon: Icon, onClick, tooltip, label }, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              className="flex h-fit  w-fit gap-1 rounded-xl bg-card px-3 py-2"
              variant="ghost"
              size="icon"
              disabled={onClick === branch && branchMutation.isPending}
              onClick={() => onClick()}
            >
              <Icon
                className={cn(
                  "h-2 w-2",
                  onClick === branch && branchMutation.isPending && "animate-spin",
                )}
              />
              {label && <span className="text-xs">{label}</span>}

              <span className="sr-only">{tooltip}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
