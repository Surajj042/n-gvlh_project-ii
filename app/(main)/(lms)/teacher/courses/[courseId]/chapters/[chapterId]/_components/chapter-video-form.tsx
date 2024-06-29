"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { getYouTubeVideoId } from "@/lib/utils";
import { ChapterYtForm } from "./chapter-yt-form";

interface ChapterVideoFormProps {
  muxData: any;
  chapterData: any;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  muxData,
  chapterData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  console.log(chapterData.youtubeUrl);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("youtubeUrl");

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Chapter updated");
      toggleEdit();
      // router.refresh();
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      const url = `${baseUrl}/teacher/courses/${courseId}/chapters/${chapterId}`;
      window.location.assign(url);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4 dark:bg-gray-800 dark:text-slate-300">
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !chapterData.videoUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a video
            </>
          )}
          {!isEditing && chapterData.videoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!!chapterData.youtubeUrl ? (
          <div className="relative mt-2 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(chapterData.youtubeUrl)!}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>
        ) : (
          !isEditing &&
          (!chapterData.videoUrl ? (
            <div className="flex h-60 items-center justify-center rounded-md bg-slate-200 dark:bg-gray-800 dark:text-slate-300">
              <Video className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative mt-2 aspect-video">
              <MuxPlayer playbackId={muxData?.playbackId || ""} />
            </div>
          ))
        ))}
      {isEditing && (
        <div>
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Choose Video Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtubeUrl">Youtube Link</SelectItem>
              <SelectItem value="mux">Upload Video to Mux (1 day)</SelectItem>
            </SelectContent>
          </Select>

          {selectedOption === "youtubeUrl" ? (
            <ChapterYtForm
              initialData={chapterData}
              courseId={courseId}
              chapterId={chapterId}
            />
          ) : (
            <FileUpload
              endpoint="chapterVideo"
              onChange={(url) => {
                if (url) {
                  onSubmit({ videoUrl: url });
                }
              }}
            />
          )}
          <div className="text-xs mt-4 text-muted-foreground">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {chapterData.videoUrl && !isEditing && (
        <div className="text-xs mt-2 text-muted-foreground">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};
