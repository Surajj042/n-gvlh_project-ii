"use server";

import User from "@/database/user.modal";
import { SafeProfile } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../mongoose";

export default async function getSafeProfile() {
  try {
    const { userId } = auth();

    if (!userId) {
      return redirect("/get-started");
    }

    connectToDatabase();
    const currentProfile = await User.findOne(
      { userId },
      {
        _id: 1,
        userId: 1,
        name: 1,
        imageUrl: 1,
        email: 1,
        role: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    );

    if (!currentProfile) {
      return null;
    }

    // Convert createdAt and updatedAt to ISO strings
    const safeProfile: SafeProfile = {
      ...currentProfile,
      createdAt: currentProfile.createdAt.toISOString(),
      updatedAt: currentProfile.updatedAt.toISOString(),
    };

    // currentProfile is passed to client component and client components
    // can only pass stringified JSON objects. So we need to convert
    // Date objects to ISO strings.
    // The ... operator is used to copy all properties from currentProfile
    // to a new object. We then overwrite the createdAt, updatedAt and
    // emailVerified properties with their ISO string values.
    return safeProfile;
  } catch (error: any) {
    return null;
  }
}
