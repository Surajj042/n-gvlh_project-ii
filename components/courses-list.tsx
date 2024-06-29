import { cn } from "@/lib/utils";
import { CourseWithProgressWithCategory } from "@/types";
import { CourseCard } from "./course-card";

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
  small?: boolean;
}

export const CoursesList = ({ items, small }: CoursesListProps) => {
  return (
    <div>
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4",
          small &&
            "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <CourseCard
            key={item._id}
            id={item._id}
            creatorId={item.userId}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          No courses found
        </div>
      )}
    </div>
  );
};
