"use server";

import { auth } from "@clerk/nextjs/server";

export const checkAdmin = () => {
  const { userId } = auth();
  return userId === process.env.ADMIN_ID_1 || userId === process.env.ADMIN_ID_2;
};
