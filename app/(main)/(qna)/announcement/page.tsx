import { Button } from "@/components/ui/button";
import { getStudentAnnouncements } from "@/lib/actions/forum.action";
import { isProfileTeacher } from "@/lib/actions/user.action";
import { roobertSemibold } from "@/styles/fonts";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Component from "./_components/CustomCard";

// const IssueForm = dynamic(
//   () => import("@/app/(main)/(qna)/announcement/_components/IssueForm"),
//   {
//     // Disable server side rendering of this component
//     ssr: false,
//   },
// );

const NewIssuePage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/get-started");

  const announcements = await getStudentAnnouncements({ studentId: userId });
  const teacher = await isProfileTeacher({ userId });

  return (
    <div>
      <div className="mb-10 flex justify-between max-sm:flex-col max-sm:gap-5">
        <h1 className="h1-bold text-dark100_light900">Announcements</h1>
        {teacher && (
          <Link href="/announcement/new">
            <Button>Add new announcement</Button>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {announcements.length === 0 ? (
          <div className="flex flex-col items-start gap-6">
            <div
              className={`text-pink2blue_yellow2pink text-xl ${roobertSemibold.className}`}
            >
              Follow Teacher to Get Announcements
            </div>
            <Image
              alt="follow illustration"
              width={500}
              height={400}
              src="/illustrations/follow.svg"
            />
          </div>
        ) : (
          announcements.map((announcement, index) => (
            <div className="mb-2 w-full" key={index}>
              <Component
                teacherName={announcement.teacherName!}
                teacherUsername={announcement.teacherUsername!}
                description={announcement.description}
                title={announcement.title}
                imageLink={announcement.teacherPicture!}
                createdAt={announcement.createdAt!}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );

  return;
};

export default NewIssuePage;
