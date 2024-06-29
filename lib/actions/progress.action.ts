"use server";
import Chapter from "@/database/chapter.modal";
import UserProgress from "@/database/userprogress.modal";
import { connectToDatabase } from "../mongoose";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number | null> => {
  try {
    connectToDatabase();
    const publishedChapters = await Chapter.find(
      { courseId, isPublished: true },
      { _id: 1 }
    );

    // Create an array of chapter IDs
    const publishedChapterIds = publishedChapters.map((chapter) => chapter._id);

    // Count valid completed chapters
    const validCompletedChapters = await UserProgress.countDocuments({
      userId,
      chapterId: { $in: publishedChapterIds },
      isCompleted: true,
    });

    // Calculate progress percentage
    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};
