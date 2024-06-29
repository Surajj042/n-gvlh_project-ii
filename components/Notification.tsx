import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface NotificationButtonProps {
  meetingTime: string | Date;
  redirectUrl?: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  meetingTime,
  redirectUrl,
}) => {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission,
  );

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }
  }, []);

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        setPermission(permission);
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else if (permission === "denied") {
          console.log("Notification permission denied.");
        }
      });
    }
  };

  const setReminder = () => {
    if (permission === "granted") {
      const meetingDate = new Date(meetingTime);
      const timeUntilMeeting = meetingDate.getTime() - new Date().getTime();
      if (timeUntilMeeting > 0) {
        setTimeout(() => {
          const notification = new Notification("Meeting Reminder", {
            body: "Your meeting is about to start!",
            icon: "/icons/logo.png", // Optional icon
          });

          notification.onclick = () => {
            window.location.href =
              redirectUrl || process.env.NEXT_PUBLIC_APP_URL!;
            window.focus();
          };
        }, timeUntilMeeting);
        toast.success(`Reminder set for ${meetingTime}`, {
          duration: 3000,
        });
      } else {
        toast.error("Meeting time has already passed");
      }
    } else {
      requestNotificationPermission();
    }
  };

  return (
    <div>
      {/* <button onClick={requestNotificationPermission}>
        Request Notification Permission
      </button> */}
      <Button
        onClick={() => {
          setReminder();
        }}
        className="rounded-[40px] bg-purple2red px-6"
      >
        <Image src="/icons/bell.svg" alt="feature" width={20} height={20} />
        &nbsp; Remind Me
      </Button>
      {/* <button onClick={setReminder}>Remind Me</button> */}
    </div>
  );
};

export default NotificationButton;
