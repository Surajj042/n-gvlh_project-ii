import { redirect } from "next/navigation";

import { CoursesList } from "@/components/courses-list";
import AnswerTab from "@/components/shared/AnswerTab";
import QuestionTab from "@/components/shared/QuestionTab";
import { roobertSemibold } from "@/fonts";
import { getDashboardCourses } from "@/lib/actions/course.action";
import { getUserInfo } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import DashboardSection from "./_components/dashboard-section";
import EmptyDashboard from "./_components/empty-dashboard";
/**
 * Function to render the dashboard for a user.
 * Retrieves the user's completed and in-progress courses, user information, questions, and answers.
 * Displays different sections based on the user's data, including courses, meetings, questions, and answers.
 * Redirects to sign-in page if the user is not authenticated.
 *
 * @returns JSX element representing the dashboard layout with user-specific data and sections.
 */
export default async function Dashboard() {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return redirect("/get-started");
  }

   const { completedCourses, coursesInProgress, userDetail } =await getDashboardCourses(clerkId);

   const userInfo = await getUserInfo({ userId: clerkId });

  return (
    <div className="p-6">
      <div
        className={`${roobertSemibold.className} text-pink2blue_yellow2pink pb-1 text-center text-4xl`}
      >
        Welcome back, {userDetail.name}
      </div>

      <DashboardSection title="My Courses">
        {completedCourses.length > 0 || coursesInProgress.length > 0 ? (
          <CoursesList
            items={[...coursesInProgress, ...completedCourses]}
            small={true}
          />
        ) : (
          <EmptyDashboard
            btnText="Show Me the Courses"
            btnlink="/search"
            text="Join courses to unlock this section"
            leftPic="/illustrations/join.svg"
            leftPicAlt="Join Course Illustration"
            hSizeLeft={180}
            wSizeLeft={190}
            rightPic="/illustrations/teacher.svg"
            rightPicAlt="Teacher Illustration"
            hSizeRight={197}
            wSizeRight={262}
          />
        )}
      </DashboardSection>

      <DashboardSection title="Meeting Section">
        <EmptyDashboard
          btnText="Join Meeting"
          btnlink="/meetings"
          text="Paste the meeting link to join"
          leftPic="/illustrations/videocall.svg"
          leftPicAlt="Video Call Illustration 1"
          hSizeLeft={197}
          wSizeLeft={190}
          rightPic="/illustrations/videocall2.svg"
          rightPicAlt="Video Call Illustration 2"
          hSizeRight={197}
          wSizeRight={262}
          isMeeting={true}
        />
      </DashboardSection>

      <DashboardSection title="My Questions">
        {userInfo?.totalQuestions ? (
          <QuestionTab
            searchParams={{ pageSize: "3" }}
            userId={userDetail._id}
            clerkId={clerkId!}
            pagination={"dontshow"}
          />
        ) : (
          <EmptyDashboard
            btnText="Ask A Question"
            btnlink="/ask-question"
            text="Ask your question and get answers from experts and peers"
            leftPic="/illustrations/qn1.svg"
            leftPicAlt="Ask Question 1 Illustration"
            hSizeLeft={197}
            wSizeLeft={190}
            rightPic="/illustrations/qn2.svg"
            rightPicAlt="Ask Question 2 Illustration"
            hSizeRight={197}
            wSizeRight={262}
          />
        )}
      </DashboardSection>
      <DashboardSection title="My Answers">
        {userInfo?.totalAnswers ? (
          <AnswerTab
            searchParams={{ pageSize: "3" }}
            userId={userDetail._id}
            clerkId={clerkId!}
            pagination={"dontshow"}
          />
        ) : (
          <EmptyDashboard
            btnText="All Questions"
            btnlink="/all-questions"
            text="Your insights could be the missing piece—share your knowledge and help us all grow!"
            leftPic="/illustrations/qn1.svg"
            leftPicAlt="Ask Question 1 Illustration"
            hSizeLeft={197}
            wSizeLeft={190}
            rightPic="/illustrations/qn2.svg"
            rightPicAlt="Ask Question 2 Illustration"
            hSizeRight={197}
            wSizeRight={262}
          />
        )}
      </DashboardSection>
    </div>
  );
}
