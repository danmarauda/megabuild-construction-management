import React from "react";
import { Card, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { File } from "../types/project";
import { format } from "date-fns";

interface FileCardProps {
  file: File;
}

export function FileCard({ file }: FileCardProps) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return 'lucide:image';
      case 'document':
        return 'lucide:file-text';
      case 'spreadsheet':
        return 'lucide:table';
      default:
        return 'lucide:file';
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <Card className="bg-gray-900 border border-gray-800">
      <Card.Content>
        <div className="flex items-center gap-4">
          {file.type === 'image' ? (
            <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-800">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-800">
              <Icon icon={getFileIcon(file.type)} className="text-3xl text-gray-400" />
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="text-white font-medium">{file.name}</h3>
            <div className="text-sm text-gray-400 mt-1">
              {formatFileSize(file.size)} • Uploaded {format(new Date(file.uploadedAt), "MMM dd, yyyy")}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <img 
                src={file.uploadedBy.avatar} 
                alt={file.uploadedBy.name} 
                className="w-5 h-5 rounded-full"
              />
              <span>Uploaded by {file.uploadedBy.name}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {file.type === 'image' ? (
              <Button variant="tertiary" size="sm">
                <Icon icon="lucide:eye" className="mr-1" />
                View
              </Button>
            ) : (
              <Button variant="tertiary" size="sm">
                <Icon icon="lucide:external-link" className="mr-1" />
                Open
              </Button>
            )}
            <Button variant="tertiary" size="sm">
              <Icon icon="lucide:download" className="mr-1" />
              Download
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}