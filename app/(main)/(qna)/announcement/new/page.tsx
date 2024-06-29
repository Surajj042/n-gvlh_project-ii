import dynamic from "next/dynamic";

const AnnouncementForm = dynamic(
  () => import("@/app/(main)/(qna)/announcement/_components/AnnouncementForm"),
  {
    // Disable server side rendering of this component
    ssr: false,
  },
);

const NewAnnouncement = () => {
  return <AnnouncementForm />;
};

export default NewAnnouncement;
