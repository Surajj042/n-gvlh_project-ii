import Image from "next/image";
import Link from "next/link";

import { getUserById } from "@/lib/actions/user.action";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "./course-progress";
import { Badge } from "./ui/badge";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  creatorId: string;
}

export const CourseCard = async ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  creatorId,
}: CourseCardProps) => {
  const user = await getUserById({ userId: creatorId });

  return (
    <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Link href={`/courses/${id}`}>
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </Link>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-end justify-between">
          <Link href={`/profile/${creatorId}`}>
            <div className="mt-2 flex items-center space-x-2">
              <Image
                className="rounded-full"
                src={user.picture}
                alt={user.name}
                width={24}
                height={24}
              />
              <p className="text-xs text-muted-foreground hover:text-pink-700">
                {user.name}
              </p>
            </div>
          </Link>
          
        </div>
        <Link href={`/courses/${id}`}>
          <div className="flex flex-col justify-between pt-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{category}</p>
              <p className="text-xs text-muted-foreground">
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </p>
            </div>
            <div className="md:text-base line-clamp-2 text-lg font-medium transition group-hover:text-pink-700 dark:group-hover:text-pink-500">
              {title}
            </div>
          </div>
        </Link>
        <Link href={`/courses/${id}`}>
            {progress !== null ? (
              <CourseProgress
                variant={progress === 100 ? "success" : "default"}
                size="sm"
                value={progress}
              />
            ) : (
              <div className="text-md font-medium text-slate-700 dark:text-slate-200 md:text-sm">
                {price ? (
                  formatPrice(price)
                ) : (
                  <Badge className="inline bg-gradient-to-r from-purple-600 to-blue-600">
                    Free
                  </Badge>
                )}
              </div>
            )}
          </Link>
      </div>
    </div>
  );
};
