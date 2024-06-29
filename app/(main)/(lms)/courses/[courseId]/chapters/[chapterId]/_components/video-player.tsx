"use client";

import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn, getYouTubeVideoId } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
import { AiFillYoutube } from "react-icons/ai";

interface VideoPlayerProps {
  isDeleted: boolean;
  youtubeUrl?: string | null;
  playbackId?: string | null;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  isDeleted,
  youtubeUrl,
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          },
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary dark:bg-slate-200">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      ) : !isLocked && !!youtubeUrl ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)!}`}
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
      ) : !!isDeleted ? (
        <div className="relative aspect-video">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-center text-secondary dark:bg-slate-200">
            <TrashIcon className="h-8 w-8 text-red-600" />
            <p>Our app is running free version of MUX</p>
            <p>So the video gets deleted after 24hr</p>
            <p>
              If you are the uploader, use YOUTUBE{" "}
              <AiFillYoutube className="inline text-red-600" /> option
            </p>
          </div>
        </div>
      ) : (
        !isLocked &&
        playbackId && (
          <MuxPlayer
            title={title}
            className={cn(!isReady && "hidden")}
            onCanPlay={() => setIsReady(true)}
            onEnded={onEnd}
            autoPlay
            playbackId={playbackId}
          />
        )
      )}
    </div>
  );
};
