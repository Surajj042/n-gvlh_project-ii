import { SVGSkeleton } from "@/components/Skeleton";
import { auth } from "@clerk/nextjs/server";

const Loading = () => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div>
        <SVGSkeleton className="h-14 w-96" />
      </div>
      <SVGSkeleton className="my-5 h-96 w-full rounded-[30px] py-8 max-sm:px-3 sm:px-5 xl:px-28" />
      <SVGSkeleton className="my-5 h-96 w-full rounded-[30px] py-8 max-sm:px-3 sm:px-5 xl:px-28" />
      <SVGSkeleton className="my-5 h-96 w-full rounded-[30px] py-8 max-sm:px-3 sm:px-5 xl:px-28" />
    </div>
  );
};

export default Loading;
