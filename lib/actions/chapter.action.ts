"use server";

import Attachment from "@/database/attachment.modal";
import Chapter from "@/database/chapter.modal";
import Course from "@/database/course.modal";
import MuxData from "@/database/muxdata.modal";
import Purchase from "@/database/purchase.modal";
import UserProgress from "@/database/userprogress.modal";
import { GetChapterProps } from "@/types";
import Mux from "@mux/mux-node";
import { connectToDatabase } from "../mongoose";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export const getChapterNameById = async ({
  chapterId,
}: {
  chapterId: string;
}) => {
  try {
    connectToDatabase();
    const chapterName = await Chapter.findById(chapterId);
    return chapterName;
  } catch (error) {
    console.log("CHAPTER METADATA FETCHING ERROR ", error);
  }
};

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    connectToDatabase();
    // Fetch purchase
    const purchase = await Purchase.findOne({
      userId,
      courseId,
    });

    // Fetch course
    const course = await Course.findOne({
      _id: courseId,
      isPublished: true,
    }).select("price");

    // Fetch chapter
    const chapter = await Chapter.findOne({
      _id: chapterId,
      isPublished: true,
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments = [];
    let nextChapter = null;
    let isDeleted = true;

    if (purchase) {
      // Fetch attachments
      attachments = await Attachment.find({
        courseId,
      });
    }

    if (chapter.isFree || purchase) {
      // Fetch muxData
      muxData = await MuxData.findOne({
        chapterId,
      });

      try {
        await video.assets.retrieve(muxData.assetId);
        isDeleted = false;
      } catch (error: any) {
        isDeleted = true;
      }
      // if (is) {
      //   console.log("hello");

      //   isDeleted = false;
      // } else {
      //   console.log("bye");
      // }

      // Fetch next chapter
      nextChapter = await Chapter.findOne({
        courseId,
        isPublished: true,
        position: { $gt: chapter.position },
      }).sort({ position: "asc" });
    }

    // Fetch user progress
    const userProgress = await UserProgress.findOne({
      userId,
      chapterId,
    });

    return {
      chapter: chapter.toObject(),
      course: course.toObject(),
      muxData: muxData ? muxData.toObject() : null,
      attachments: attachments.map((attachment: any) => attachment.toObject()),
      nextChapter: nextChapter ? nextChapter.toObject() : null,
      userProgress: userProgress ? userProgress.toObject() : null,
      purchase: purchase ? purchase.toObject() : null,
      isDeleted
    };
  } catch (error) {
    console.log(error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
