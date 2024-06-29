"use client";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import HomeCard from "./HomeCard";
import Loader from "./Loader";
import MeetingModal from "./MeetingModal";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const initialValues = {
  dateTime: new Date(),
  title: "",
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const title = values.title || "Instant Meeting";
      const description =
        values.description ||
        "This meeting has no description as it was an instant meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            title,
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${callDetail?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 text-white md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/meeting/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-cyan2blue"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/meeting/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-purple2blue"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/meeting/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple2red"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/meeting/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-pink2blue"
        handleClick={() => router.push("/meetings/recordings")}
      />
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            {/* Title Section */}
            <label className="text-base text-meeting font-normal leading-[22.4px]">
              Add a title
            </label>
            <Textarea
              className="bg-meeting text-meeting border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />

            {/* Description Section */}
            <label className="text-base text-meeting font-normal leading-[22.4px]">
              Add a description
            </label>
            <Textarea
              className="bg-meeting text-meeting border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-meeting font-normal leading-[22.4px]">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="bg-meeting text-meeting w-full rounded p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image={"/meeting/checked.svg"}
          buttonIcon="/meeting/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="bg-meeting text-meeting border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
