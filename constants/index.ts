import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/qna/sun.svg" },
  { value: "dark", label: "Dark", icon: "/qna/moon.svg" },
  { value: "system", label: "System", icon: "/qna/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/sidebar/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/sidebar/courses.svg",
    route: "/my-courses",
    label: "Courses",
    subLinks: [
      {
        label: "My Courses",
        route: "/my-courses",
      },
      {
        label: "Browse",
        route: "/search",
      },
    ],
  },
  {
    imgURL: "/sidebar/questions.svg",
    route: "/all-questions",
    label: "Questions",
    subLinks: [
      {
        label: "All Questions",
        route: "/all-questions",
      },
      {
        label: "Tags",
        route: "/tags",
      },
      {
        label: "Saved",
        route: "/saved",
      },
      {
        label: "Ask Question",
        route: "/ask-question",
      },
    ],
  },
  {
    imgURL: "/sidebar/community.svg",
    route: "/announcement",
    label: "Community",
    subLinks: [
      {
        label: "Announcement",
        route: "/announcement",
      },
      {
        label: "Users",
        route: "/users",
      },
    ],
  },
  {
    imgURL: "/sidebar/profile.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const teacherLinks: SidebarLink[] = [
  {
    imgURL: "/icons/favicon.svg",
    route: "/teacher/courses",
    label: "Teacher Abode",
    subLinks: [
      {
        route: "/teacher/courses",
        label: "Courses",
      },

      {
        route: "/teacher/analytics",
        label: "Analytics",
      },
      {
        route: "/meetings/dashboard",
        label: "Home",
      },
      {
        route: "/meetings/upcoming",
        label: "Upcoming",
      },
      {
        route: "/meetings/previous",
        label: "Previous",
      },
      {
        route: "/meetings/recordings",
        label: "Recordings",
      },
      {
        route: "/meetings/personal-room",
        label: "Personal Room",
      },
    ],
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
