import { Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { FileUIPart } from "ai";
import { FilePreview } from "./file-preview";
import { Card,CardContent } from "../ui/card";

interface Props {
  file: FileUIPart;
  handleRemove: (a: string) => void;
}
export function AttachmentPreview({ file, handleRemove }: Props) {
  return (
    <div className="rounded-md relative w-full max-w-48 transition-all duration-300 ease-in-out hover:shadow-md">
      <div className="absolute z-10 right-1 top-1">
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
    <Card className="group rounded-md relative w-full max-w-48 transition-all duration-300 ease-in-out hover:shadow-md">
      <CardContent className="p-1 flex justify-center items-center gap-2">
        <div className="flex items-center justify-center w-full h-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.filename}</p>
          <p className="text-xs text-muted-foreground truncate">
            {file.mediaType}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
