"use server";

import Category from "@/database/category.modal";
import Chapter from "@/database/chapter.modal";
import Course from "@/database/course.modal";
import Purchase from "@/database/purchase.modal";
import User from "@/database/user.modal";
import UserProgress from "@/database/userprogress.modal";
import {
  CourseWithProgressWithCategory,
  GetCourses,
  GetTeacherCourses,
} from "@/types";
import { connectToDatabase } from "../mongoose";
import { getProgress } from "./progress.action";

export const getCourseNameById = async ({ courseId }: { courseId: string }) => {
  try {
    connectToDatabase();
    const courseName = await Course.findById(courseId);
    return courseName;
  } catch (error) {
    console.log("COURSE METADATA FETCHING ERROR ", error);
  }
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<any[]> => {
  try {
    connectToDatabase();
    // Fetch courses with the given conditions

    const courses = categoryId
      ? await Course.find({
          isPublished: true,
          title: { $regex: title || "", $options: "i" },
          categoryId,
        })
          .sort({ createdAt: -1 })
          .exec()
      : await Course.find({
          isPublished: true,
          title: { $regex: title || "", $options: "i" },
        })
          .sort({ createdAt: -1 })
          .exec();

    const coursesWithRelatedData = await Promise.all(
      courses.map(async (course) => {
        const [category, chapters, purchases] = await Promise.all([
          Category.findById(course.categoryId),
          Chapter.find({ courseId: course._id, isPublished: true }, { _id: 1 }),
          Purchase.find({ courseId: course._id, userId }),
        ]);

        course = course.toObject();
        course.category = category;
        course.chapters = chapters;
        course.purchases = purchases;

        return course;
      }),
    );

    const coursesWithProgress = await Promise.all(
      coursesWithRelatedData.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null, // make progress possibly null
          };
        }

        const progressPercentage = await getProgress(userId, course._id);

        return {
          ...course,
          progress: progressPercentage,
        };
      }),
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
export const getTeacherCourses = async ({
  userId,
  teacherId,
}: GetTeacherCourses): Promise<any[]> => {
  try {
    connectToDatabase();
    // Fetch courses with the given conditions

    const courses = await Course.find({
      isPublished: true,
      userId: teacherId,
    })
      .sort({ createdAt: -1 })
      .exec();

    const coursesWithRelatedData = await Promise.all(
      courses.map(async (course) => {
        const [category, chapters, purchases] = await Promise.all([
          Category.findById(course.categoryId),
          Chapter.find({ courseId: course._id, isPublished: true }, { _id: 1 }),
          Purchase.find({ courseId: course._id, userId }),
        ]);

        course = course.toObject();
        course.category = category;
        course.chapters = chapters;
        course.purchases = purchases;

        return course;
      }),
    );

    const coursesWithProgress = await Promise.all(
      coursesWithRelatedData.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null, // make progress possibly null
          };
        }

        const progressPercentage = await getProgress(userId, course._id);

        return {
          ...course,
          progress: progressPercentage,
        };
      }),
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};

export async function getCourseWithChaptersAndProgress(
  courseId: string,
  userId: string,
) {
  try {
    connectToDatabase();
    // Fetch the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Fetch the published chapters for the course
    const chapters = await Chapter.find({
      courseId,
      isPublished: true,
    }).sort({ position: "asc" });

    // Fetch user progress for each chapter
    const chaptersWithProgress = await Promise.all(
      chapters.map(async (chapter) => {
        const userProgress = await UserProgress.findOne({
          userId,
          chapterId: chapter._id,
        });

        return {
          ...chapter.toObject(),
          userProgress: userProgress ? userProgress.toObject() : null,
        };
      }),
    );

    return {
      ...course.toObject(),
      chapters: chaptersWithProgress,
    };
  } catch (error) {
    console.error("Error fetching course with chapters and progress:", error);
    throw error;
  }
}

export async function getCourseWithPublishedChapters(courseId: string) {
  try {
    connectToDatabase();
    // Fetch the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    // Fetch the published chapters for the course
    const chapters = await Chapter.find({
      courseId,
      isPublished: true,
    }).sort({ position: "asc" });
    // TODO: Change every database fetch to this toObject()
    return {
      ...course.toObject(),
      chapters: chapters.map((chapter) => chapter.toObject()),
    };
  } catch (error) {
    console.error("Error fetching course with chapters:", error);
    throw error;
  }
}

type DashboardCourses = {
  completedCourses: any[];
  coursesInProgress: any[];
  userDetail: any;
};

export const getDashboardCourses = async (
  userId: string,
): Promise<DashboardCourses> => {
  try {
    connectToDatabase();

    const purchasedCourses = await Purchase.find({ userId }).exec();

    const coursesWithDetails: CourseWithProgressWithCategory[] = [];
    // Fetch user details
    const userDetail = await User.findOne({ clerkId: userId }).exec();

    for (const purchase of purchasedCourses) {
      // Fetch course details
      const course = await Course.findById(purchase.courseId).exec();
      if (!course) continue;

      // Fetch category details
      const category = await Category.findById(course.categoryId).exec();
      if (!category) continue;

      // Fetch published chapters
      const chapters = await Chapter.find({
        courseId: course._id,
        isPublished: true,
      })
        .sort({ position: "asc" })
        .exec();

      // Calculate progress
      const progress = await getProgress(userId, course._id.toString());

      coursesWithDetails.push({
        ...course.toObject(),
        category: category.toObject(),
        chapters: chapters.map((chapter) => chapter.toObject()),
        progress,
      });
    }

    // Filter courses into completed and in-progress
    const completedCourses = coursesWithDetails.filter(
      (course) => course.progress === 100,
    );
    const coursesInProgress = coursesWithDetails.filter(
      (course) => course.progress !== 100,
    );

    return {
      completedCourses,
      coursesInProgress,
      userDetail,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]: ", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
      userDetail: "",
    };
  }
};

