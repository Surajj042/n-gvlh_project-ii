"use server";

import Course from "@/database/course.modal";
import Purchase from "@/database/purchase.modal";
import { connectToDatabase } from "../mongoose";

// Utility function to group purchases by course and calculate total earnings
const groupByCourse = (purchases: any[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    await connectToDatabase();

    // Fetch purchases for the user
    const purchases = await Purchase.find({ userId });

    // Collect courseIds from purchases
    const courseIds = purchases.map((purchase) => purchase.courseId);

    // Fetch courses corresponding to the collected courseIds
    const courses = await Course.find({ _id: { $in: courseIds } });

    // Map courseIds to courses for easy access
    const courseMap: { [courseId: string]: any } = {};
    courses.forEach((course) => {
      courseMap[course._id] = course;
    });

    // Group purchases by course and calculate earnings
    const groupedEarnings: { [courseTitle: string]: number } = {};
    purchases.forEach((purchase) => {
      const course = courseMap[purchase.courseId];
      const courseTitle = course.title;
      if (!groupedEarnings[courseTitle]) {
        groupedEarnings[courseTitle] = 0;
      }
      groupedEarnings[courseTitle] += purchase.price;
    });

    // Format data
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      })
    );

    // Calculate total revenue and sales
    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
