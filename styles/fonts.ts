import localFont from "next/font/local";

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
const roobertSemibold = localFont({ src: "../public/fonts/RoobertSemiBold.ttf" });
const roobertRegular = localFont({ src: "../public/fonts/RoobertRegular.ttf" });

export { roobertSemibold, roobertRegular };
