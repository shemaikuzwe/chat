import type { FileUIPart } from "ai";
import { Loader2, XIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import { FilePreview } from "./file-preview";

interface Props {
  file: FileUIPart;
  handleRemove: (a: string) => void;
}
export function AttachmentPreview({ file, handleRemove }: Props) {
  return (
    <div className="relative w-full max-w-48 rounded-md transition-all duration-300 ease-in-out hover:shadow-md">
      <div className="absolute top-1 right-1 z-10">
        <Button
          variant={"destructive"}
          className="h-5 w-5"
          size={"icon"}
          onClick={() => {
            handleRemove(file.filename ?? "attachment");
          }}
        >
          <XIcon />
        </Button>
      </div>
      <FilePreview file={file} className="h-30 w-30" />
    </div>
  );
}
export function Loading({ file }: { file: FileUIPart }) {
  return (
    <Card className="group relative w-full max-w-48 rounded-md transition-all duration-300 ease-in-out hover:shadow-md">
      <CardContent className="flex items-center justify-center gap-2 p-1">
        <div className="flex h-12 w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.filename}</p>
          <p className="truncate text-xs text-muted-foreground">{file.mediaType}</p>
        </div>
      </CardContent>
    </Card>
  );
}
