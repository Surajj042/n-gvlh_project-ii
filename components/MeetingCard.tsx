"use client";

import { cn, formatTimeandDate } from "@/lib/utils";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import NotificationButton from "./Notification";
import { Button } from "./ui/button";

interface MeetingCardProps {
  title: string;
  description?: string;
  date: Date | string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const convertNewlinesToHtml = (text: string) => {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

const MeetingCard = ({
  icon,
  title,
  description,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const isDate = date instanceof Date && !isNaN(date.getTime());
  let formatDate, formatTime, timestampDate;
  if (isDate) {
    const { formattedDate, formattedTime } = formatTimeandDate(date);
    formatDate = formattedDate;
    formatTime = formattedTime;
  } else {
    timestampDate = new Date(date);
    const { formattedDate, formattedTime } = formatTimeandDate(timestampDate);
    formatDate = formattedDate;
    formatTime = formattedTime;
  }

  return (
    <section className="bg-meeting flex flex-col justify-between rounded-[14px] p-5 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-start justify-between">
              <h4 className="w-60 text-xl font-bold">
                {title.substring(0, 40)}
              </h4>
              {!isPreviousMeeting && (
                <div>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <Button
                        size="vs"
                        className="flex-center bg-transparent pb-2 hover:bg-transparent dark:invert"
                      >
                        <Image
                          src="/meeting/info.svg"
                          alt="feature"
                          width={20}
                          height={20}
                        />
                      </Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-dark-gradient opacity-30" />
                      <AlertDialog.Content className="custom-scrollbar data-[state=open]:animate-contentShow bg-meeting shadow-custom fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-[6px] p-[25px] dark:shadow-light-400">
                        <AlertDialog.Title className="m-0 text-[17px] font-medium">
                          {title}
                        </AlertDialog.Title>
                        <AlertDialog.Description className="mb-5 mt-4 text-[15px] leading-normal">
                          {convertNewlinesToHtml(description as string)}
                        </AlertDialog.Description>
                        <div className="flex justify-end gap-[25px]">
                          <AlertDialog.Cancel asChild>
                            <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                              Got it!
                            </button>
                          </AlertDialog.Cancel>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <Button
                    size="vs"
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      toast.success("Link Copied");
                    }}
                    className="flex-center bg-transparent invert hover:bg-transparent dark:invert-0"
                  >
                    <Image
                      src="/meeting/copy.svg"
                      alt="feature"
                      width={20}
                      height={20}
                    />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/meeting/calendar.svg"
                alt="feature"
                width={20}
                height={20}
              />
              <p className="text-base font-normal">{formatDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/meeting/clock.svg"
                alt="feature"
                width={20}
                height={20}
              />
              <p className="text-base font-normal">{formatTime}</p>
            </div>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center", {})}>
        {!isPreviousMeeting && (
          <div className="flex gap-10 pt-3">
            <Button
              onClick={handleClick}
              className="rounded-[40px] bg-purple2blue px-6"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={15} height={15} />
              )}
              &nbsp; {buttonText}
            </Button>

            {isDate && (
              <NotificationButton meetingTime={date} redirectUrl={link} />
            )}
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
