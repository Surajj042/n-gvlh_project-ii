import { getCourseWithPublishedChapters } from "@/lib/actions/course.action";
import { redirect } from "next/navigation";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await getCourseWithPublishedChapters(params.courseId);

  if (!course || !course.isPublished) {
    return redirect("/not-found");
  }

  return redirect(`/courses/${course._id}/chapters/${course.chapters[0]._id}`);
};

export default CourseIdPage;
