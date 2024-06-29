// import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
// import { Badge } from "../ui/badge";
// import RenderTag from "../shared/RendredTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  // const interactedTags = await getTopInteractedTags({
  //   userId: user._id,
  // });

  return (
    <div className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[240px]">
      <div className="light-border w-full rounded-2xl border p-8 dark:bg-slate-900">
        <Link
          href={`/profile/${user.clerkId}`}
          className="flex-center flex-col"
        >
          <div className="h-32 w-32">
            <Image
              src={user.picture}
              alt="user profile picture"
              width={100}
              height={100}
              className="h-full w-full rounded-full"
            />
          </div>
          

          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h3>
            <p className="body-regular text-dark500_light500 mt-2">
              @{user.username}
            </p>
          </div>
        </Link>
        {/* <div className="mt-5 flex justify-center">
          {interactedTags && interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags?.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default UserCard;