import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: any;
  progressCount: number;
}

export const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <div className="text-sm p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background font-medium ring-offset-background">
          All Chapters
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};
