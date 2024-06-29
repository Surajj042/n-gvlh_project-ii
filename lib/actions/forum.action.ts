"use server";

import Forum, { IAnnouncement, IForum } from "@/database/forum.modal";
import User, { IUser } from "@/database/user.modal";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../mongoose";

interface CreateForumParams {
  title?: string;
  teacherId: string;
}

interface FollowForumParams {
  teacherClerkId: string;
  studentId: string;
  path: string;
}

interface AddAnnouncementInForumsParams {
  forumId: string;
  title: string;
  description: string;
}

interface AddAnnouncementParams {
  userId: string;
  title: string;
  description: string;
}

interface GetAnnouncementsParams {
  studentId: string;
}
interface EditAnnouncementsParams {
  teacherId: string;
  announcementId: string;
}

/**
 * Creates a new forum in the database.
 * @param params - Object containing title and teacherId.
 * @returns The created forum object if successful.
 * @throws Error if the teacher is invalid or any other error occurs.
 */
export async function createForum(params: CreateForumParams) {
  try {
    await connectToDatabase();

    const { teacherId } = params;
    // TODO: Make the forum title dynamic in future
    const title = "FORUM";
    const teacher = await User?.findOne({ clerkId: teacherId });

    if (!teacher || teacher.role !== "TEACHER") {
      throw new Error("Invalid teacher");
    }

    const forumData = {
      title,
      teacherId: teacher._id,
      announcements: [],
      followers: [],
    };

    const forum = await Forum.create(forumData);

    return forum;
  } catch (error) {
    throw error;
  }
}

export async function followForum(params: FollowForumParams) {
  try {
    const { teacherClerkId, studentId, path } = params;

    if (!studentId) {
      redirect("/sign-in");
    }

    await connectToDatabase();

    const teacher = await User?.findOne({
      clerkId: teacherClerkId,
      role: "TEACHER",
    });

    const student = await User.findOne({ clerkId: studentId });
    if (!student) {
      throw new Error("Invalid student");
    }

    const forum = await Forum.findOne({ teacherId: teacher._id });
    if (!forum) {
      throw new Error("Forum not found");
    }

    if (!forum.followers.includes(student._id)) {
      forum.followers.push(student._id);
      await forum.save();
      revalidatePath(path);
    } else {
      forum.followers = forum.followers.filter(
        (followerId) => followerId.toString() !== student._id.toString(),
      );
      await forum.save();
      revalidatePath(path);
    }
  } catch (error) {
    throw error;
  }
}

export async function isFollowing({
  teacherId,
  studentId,
}: {
  teacherId: string;
  studentId: string | null;
}) {
  if (!studentId) {
    return false;
  }

  await connectToDatabase();

  //TODO: This method is so lame man
  // We are getting teacher clerk id from params
  // Then we find the teacher._id from clerkId as forum schema stores the teacher._id in it
  // So one of the soultion is to change the forum schema to also store the clerkId of the teacher
  const teacher = await User.findOne({ clerkId: teacherId });
  const student = await User.findOne({ clerkId: studentId });
  const forum = await Forum.findOne({ teacherId: teacher._id }).populate({
    path: "followers",
    match: { _id: { $eq: student._id } },
    model: User,
  });

  const isFollowing = forum?.followers.some((follower) =>
    follower._id.equals(student._id),
  );

  return isFollowing;
}

/**
 * Adds a new announcement to a specified forum by its ID.
 * @param params - Object containing forumId, title, and description of the announcement.
 * @returns Updated forum with the new announcement added.
 * @throws Error if the forum is not found or any other error occurs during the process.
 */
export async function addAnnouncement(params: AddAnnouncementParams) {
  try {
    const teacherId = params.userId;
    if (!teacherId) {
      throw new Error("User not logged in");
    }
    const { title, description } = params;

    await connectToDatabase();

    const teacher = await User.findOne({ clerkId: teacherId, role: "TEACHER" });

    const forum = await Forum.findOne({ teacherId: teacher._id });

    if (!forum) {
      if (!forum && teacher) {
        const newForum = await createForum({ teacherId: teacherId });
        newForum.announcements.push({ title, description });
        await newForum.save();
      }
    } else {
      if (!teacher._id.equals(forum.teacherId)) {
        throw new Error("You are not authorized to make this announcement");
      }
      forum.announcements.push({ title, description });
      await forum.save();
    }
  } catch (error) {
    throw error;
  }
}

export async function getStudentAnnouncements(
  params: GetAnnouncementsParams,
): Promise<IAnnouncement[]> {
  try {
    await connectToDatabase();
    const { studentId } = params;

    // Step 1: Find the user (student)
    const student = await User.findOne({ clerkId: studentId });

    // Step 2: Find all forums the user is following
    const forums = await Forum.find({ followers: student })
      .populate({
        path: "teacherId",
        model: User,
        select: "name username picture", // Adjust fields as needed
      })
      .exec();

    // Step 3: Extract and flatten the announcements
    let allAnnouncements: IAnnouncement[] = [];
    forums.forEach((forum: IForum) => {
      forum.announcements.forEach((announcement: IAnnouncement) => {
        // Ensure teacherId is properly typed as IUser to access name and picture
        const teacherId = forum.teacherId;
        if (teacherId) {
          // Add teacher's name and picture to each announcement
          announcement.teacherName = (teacherId as IUser).name;
          announcement.teacherPicture = (teacherId as IUser).picture;
          announcement.teacherUsername = (teacherId as IUser).username;
        }
        allAnnouncements.push(announcement);
      });
    });

    // Step 4: Sort the announcements by updatedAt
    allAnnouncements.sort((a, b) => {
      const dateA = new Date(a.updatedAt || 0);
      const dateB = new Date(b.updatedAt || 0);
      return dateB.getTime() - dateA.getTime();
    });

    return allAnnouncements;
  } catch (error) {
    console.error("Error fetching announcements: ", error);
    throw error;
  }
}

export async function getTeacherAnnouncements({
  teacherClerkId,
}: {
  teacherClerkId: string;
}) {
  // Step 1: Find the user (student)
  const teacher = await User.findOne({ clerkId: teacherClerkId });

  // Step 2: Find all forums the user is following
  const forums = await Forum.find({ teacherId: teacher })
    .populate({
      path: "teacherId",
      model: User,
      select: "name username picture", // Adjust fields as needed
    })
    .exec();

  // Step 3: Extract and flatten the announcements
  let allAnnouncements: IAnnouncement[] = [];
  forums.forEach((forum: IForum) => {
    forum.announcements.forEach((announcement: IAnnouncement) => {
      // Ensure teacherId is properly typed as IUser to access name and picture
      const teacherId = forum.teacherId;
      if (teacherId) {
        // Add teacher's name and picture to each announcement
        announcement.teacherName = (teacherId as IUser).name;
        announcement.teacherPicture = (teacherId as IUser).picture;
        announcement.teacherUsername = (teacherId as IUser).username;
      }
      allAnnouncements.push(announcement);
    });
  });

  // Step 4: Sort the announcements by updatedAt
  allAnnouncements.sort((a, b) => {
    const dateA = new Date(a.updatedAt || 0);
    const dateB = new Date(b.updatedAt || 0);
    return dateB.getTime() - dateA.getTime();
  });

  return allAnnouncements;
}

async function deleteAnnouncementByTitle({
  forumId,
  announcementTitle,
}: {
  forumId: string;
  announcementTitle: string;
}) {
  try {
    // Find the forum by ID and remove the announcement from the array by title
    const updatedForum = await Forum.findOneAndUpdate(
      { _id: forumId },
      { $pull: { announcements: { title: announcementTitle } } },
      { new: true },
    );

    if (!updatedForum) {
      console.log("Forum not found");
      return null;
    }

    return updatedForum;
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw error;
  }
}
export async function editAnnouncement(
  userId: string,
  announcementId: mongoose.Types.ObjectId,
  updatedFields: Partial<IAnnouncement>,
): Promise<void> {
  try {
    // Step 1: Find the forum containing the announcement
    const forum: IForum | null = await Forum.findOne({
      "announcements._id": announcementId,
    }).exec();

    if (!forum) {
      throw new Error("Forum not found");
    }

    const announcementIndex = forum.announcements.findIndex((announcement) =>
      announcement._id!.equals(announcementId),
    );

    if (announcementIndex === -1) {
      throw new Error("Announcement not found");
    }

    // Step 3: Update the announcement fields
    forum.announcements[announcementIndex] = {
      ...forum.announcements[announcementIndex],
      ...updatedFields,
    };

    // Step 4: Save the changes to the database
    await forum.save();

    console.log("Announcement updated successfully");
  } catch (error) {
    console.error("Error editing announcement: ", error);
    throw error;
  }
}
