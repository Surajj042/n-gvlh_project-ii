"use client";
import MeetingModal from "@/components/MeetingModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roobertSemibold } from "@/styles/fonts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EmptyDashboardParams {
  leftPic: string;
  rightPic: string;
  leftPicAlt: string;
  rightPicAlt: string;
  text: string;
  btnText: string;
  btnlink: string;
  wSizeLeft: number;
  hSizeLeft: number;
  wSizeRight: number;
  hSizeRight: number;
  isMeeting?: boolean;
}

const EmptyDashboard = ({
  leftPic,
  btnText,
  btnlink,
  rightPic,
  text,
  leftPicAlt,
  rightPicAlt,
  hSizeLeft,
  wSizeLeft,
  hSizeRight,
  wSizeRight,
  isMeeting,
}: EmptyDashboardParams) => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<boolean>(false);
  const [values, setValues] = useState({ link: "" });

  return (
    <div className="flex items-center justify-between max-sm:justify-start max-sm:gap-9">
      <Image
        src={leftPic}
        alt={leftPicAlt}
        width={wSizeLeft}
        height={hSizeLeft}
        className="max-mmd:hidden"
      />

      <div className="flex-center flex-col gap-3 max-mmd:items-start">
        <div
          className={`text-pink2blue_yellow2pink text-center text-xl max-xs:text-start ${roobertSemibold.className}`}
        >
          {text}
        </div>
        <Button
          size="sm"
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          onClick={() => {
            if (isMeeting) {
              setMeetingState(true);
            } else {
              router.push(btnlink);
            }
          }}
        >
          {btnText}
        </Button>
      </div>
      <Image
        src={rightPic}
        alt={rightPicAlt}
        width={wSizeRight}
        height={hSizeRight}
        className="max-xl:hidden"
      />
      <MeetingModal
        isOpen={meetingState}
        onClose={() => setMeetingState(!meetingState)}
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
    </div>
  );
};

export default EmptyDashboard;
