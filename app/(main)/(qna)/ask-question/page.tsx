"use server";

import Question from "@/components/forms/Question";

import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) redirect("/get-started");

  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export async function generateMetadata() {
  return {
    title: "Ask a Question | N-GVLH",
    description: "Get Answers of Your Problems",
  };
}

export default AskQuestion;
