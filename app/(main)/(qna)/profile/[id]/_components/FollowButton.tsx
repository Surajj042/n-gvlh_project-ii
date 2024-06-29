"use client";

import { Button } from "@/components/ui/button";
import { followForum } from "@/lib/actions/forum.action";
import { usePathname } from "next/navigation";
import { useState } from "react";

const FollowButton = ({
  studentId,
  teacherClerkId,
  following,
}: {
  studentId: string;
  teacherClerkId: string;
  following: boolean;
}) => {
  const [isFollowed, setFollowed] = useState(following); // Local state for following
  const [loading, setLoading] = useState(false); // State to track loading state
  const pathname = usePathname();

  const onFollow = async () => {
    setLoading(true); // Set loading state to true when starting the operation
    try {
      // Optimistically update the UI state immediately
      setFollowed(!following); // Toggle the following state immediately

      // Perform the backend operation
      await followForum({
        teacherClerkId: teacherClerkId,
        studentId: studentId,
        path: pathname,
      });

      // Optionally, you can handle success if needed
    } catch (error) {
      // Handle errors if needed
      console.error("Error following forum:", error);

      // Revert back to the previous state on error
      setFollowed(!following);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <Button
      className="paragraph-medium primary-gradient min-h-[46px] min-w-[175px] px-4 py-3"
      onClick={onFollow}
      disabled={loading} // Disable button when loading
    >
      {isFollowed ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
