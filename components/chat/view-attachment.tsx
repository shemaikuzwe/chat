"use client";

import { FileIcon } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Attachment } from "~/lib/types";

export default function ViewAttachment({ attachment }: { attachment: Attachment }) {
  const isImage = attachment.contentType?.startsWith("image/");

  return (
    <Card className=" h-fit rounded-md transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardContent className="p-1">
        {isImage ? (
          <div className="rounded-sm">
            <Image
              src={attachment.url}
              alt={attachment.name || "Image attachment"}
              width={150}
              height={80}
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-md">
            <FileIcon className="h-20 w-20 text-blue-500" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 p-1">
        <div className="mr-2 truncate">
          <p className="text-sm font-medium">{attachment.name}</p>
          <p className="text-xs text-gray-500">{isImage ? "Image" : attachment.contentType}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
