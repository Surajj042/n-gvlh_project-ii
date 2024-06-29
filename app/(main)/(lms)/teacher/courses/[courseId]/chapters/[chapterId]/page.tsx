import { redirect } from "next/navigation";
import React from "react";

import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
// import { ChapterDescriptionForm } from "./_components/chapter-description-form";
// import { ChapterAccessForm } from "./_components/chapter-access-form";
// import { ChapterVideoForm } from "./_components/chapter-video-form";
// import { Banner } from "@/components/banner";
// import { ChapterActions } from "./_components/chatper-actions";
import { Banner } from "@/components/banner";
import Chapter from "@/database/chapter.modal";
import MuxData from "@/database/muxdata.modal";
import { getChapterNameById } from "@/lib/actions/chapter.action";
import { connectToDatabase } from "@/lib/mongoose";
import { auth } from "@clerk/nextjs/server";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterActions } from "./_components/chapter-actions";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";

interface ChapterIdPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage: React.FC<ChapterIdPageProps> = async ({ params }) => {
  const { courseId, chapterId } = params;
  const { userId } = auth();

  if (!userId) {
    return redirect("/get-started");
  }

  // Find the chapter by chapterId and courseId
  connectToDatabase();
  const chapter = await Chapter.findOne({ _id: chapterId, courseId });

  if (!chapter) {
    return redirect("/get-started");
  }

  // Find the related MuxData by chapterId
  const muxData = await MuxData.findOne({ chapterId: chapterId });

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
    chapter.youtubeUrl,
  ];

  const totalFields = 3;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const hasTitleAndDescription =
    Boolean(chapter.title) && Boolean(chapter.description);

  const hasVideoOrYoutubeUrl =
    Boolean(chapter.videoUrl) || Boolean(chapter.youtubeUrl);

  const isComplete = hasTitleAndDescription && hasVideoOrYoutubeUrl;

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to course setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
              </div>
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Complete all fields {completionText}
            </span>
          </div>
          <ChapterActions
            disabled={!isComplete}
            courseId={params.courseId}
            chapterId={params.chapterId}
            isPublished={chapter.isPublished}
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="items-ceenter flex gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl font-medium">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl font-medium">Access Settings</h2>
            </div>
            <ChapterAccessForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl font-medium">Add a video</h2>
            </div>
            <ChapterVideoForm
              muxData={muxData}
              chapterData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export async function generateMetadata({
  params,
}: {
  params: { chapterId: string };
}) {
  const chapter = await getChapterNameById({ chapterId: params.chapterId });

  if (!chapter) return;

  return {
    title: `${chapter.title}`,
  };
}

export default ChapterIdPage;
