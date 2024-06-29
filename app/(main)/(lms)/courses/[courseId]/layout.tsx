import { getCourseWithChaptersAndProgress } from "@/lib/actions/course.action";
import { getProgress } from "@/lib/actions/progress.action";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CourseMobileSidebar } from "./_components/course-mobile-sidebar";
import { CourseSidebar } from "./_components/course-sidebar";

export const metadata: Metadata = {
  authors: [
    {
      name: "CMRegmi | Github",
      url: "https://github.com/LowkeyGud",
    },
    {
      name: "CMRegmi | Wakatime",
      url: "https://wakatime.com/@lowkeygud",
    },
  ],
  title: "N-GVLH",
  description: "Next-Gen Virtual Learning Hub",
  icons: {
    icon: "/icons/favicon.svg",
  },
  openGraph: {
    title: "N-GVLH",
    description:
      "Have a problem that's been buggin you? Just post it to N-GVLH and people around the globe will help you solve it.",
    url: "https://next-ecotone.vercel.app/",
    siteName: "N-GVLH | Get Answers To Your Problems",
    images: [
      {
        url: "https://i.ibb.co/L8SN9vj/n-gvlh.jpg",
        width: 1200,
        height: 630,
        alt: "N-GVLH Q&A",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-GVLH | Get Answers To Your Problems",
    description:
      "Have a problem that's been buggin you? Just post it to N-GVLH and people around the globe will help you solve it.",
    // siteId: '',
    creator: "@LastSighh",
    // creatorId: '',
    images: ["https://i.ibb.co/L8SN9vj/n-gvlh.jpg"],
  },
};

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/get-started");
  }

  // const safeProfile = await getSafeProfile();

  // if (!safeProfile) {
  //     return redirect("/get-started");
  // }

  const course = await getCourseWithChaptersAndProgress(
    params.courseId,
    userId,
  );

  if (!course) {
    return redirect("/get-started");
  }

  // @ts-ignore
  const progressCount: number = await getProgress(userId, params.courseId);

  return (
    <div className="h-full">
      <div className="z-50 flex w-full justify-around md:justify-start md:pl-[335px]">
        <CourseMobileSidebar course={course} progressCount={progressCount} />
        <a href="/my-courses">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background p-2 text-sm font-medium ring-offset-background">
            Go Back
          </div>
        </a>
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="h-full md:pl-80">{children}</main>
    </div>
  );
};

export default CourseLayout;
