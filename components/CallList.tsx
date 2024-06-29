"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";

import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import MeetingCard from "./MeetingCard";
import { useToast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({ title: "Try again later" });
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
    // TODO: npm run build was crying about toast not being present in depedency aaray of useEffect
  }, [type, callRecordings, toast]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[2400px]:grid-cols-5">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/meeting/previous.svg"
                : type === "upcoming"
                  ? "/meeting/upcoming.svg"
                  : "/meeting/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.title ||
              (meeting as CallRecording).filename?.substring(0, 19) ||
              "No Title"
            }
            description={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 19) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt! ||
              (meeting as CallRecording).start_time
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={
              type === "recordings" ? "/meeting/play.svg" : undefined
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-meeting text-2xl font-bold">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
