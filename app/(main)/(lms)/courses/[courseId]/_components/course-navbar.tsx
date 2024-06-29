import { NavbarRoutes } from "@/components/navbar-routes";
import { Button } from "@/components/ui/button";
import { SafeProfile } from "@/types";
import Link from "next/link";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: any;
  progressCount: number;
  currentProfile?: SafeProfile | null;
}

export const CourseNavbar = ({
  course,
  progressCount,
  currentProfile,
}: CourseNavbarProps) => {
  return (
    <div className="flex h-full items-center border-b bg-white p-4 text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <div className="flex gap-3">
        <Link href="/">
          <Button variant="outline">Dashboard</Button>
        </Link>
        {/* <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/search`}>
          <Button variant="ghost">
            All Courses
          </Button>
        </Link> */}
      </div>
    </div>
  );
};
