import { Download, File } from "lucide-react";

interface AttachmentProps {
  url: string;
  name: string;
}

export const AttachmentBox = ({ url, name }: AttachmentProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-start gap-3">
        <div>
          <File />
        </div>
        <div>{name}</div>
      </div>
      <a href={url}>
        <Download />
      </a>
    </div>
  );
};
