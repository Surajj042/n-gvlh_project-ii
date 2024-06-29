import { redirect } from "next/navigation";

import { CheckCircle, Clock } from "lucide-react";

import { InfoCard } from "@/components/course-info-card";
import { CoursesList } from "@/components/courses-list";
import { getDashboardCourses } from "@/lib/actions/course.action";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/get-started");
  }

  const { completedCourses, coursesInProgress } =
    await getDashboardCourses(userId);

  return (
    <div className="space-y-4 p-2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
