import { roobertSemibold } from "@/styles/fonts";
import { ReactElement } from "react";

interface DashboardSection {
  title: string;
  children: ReactElement;
}

const DashboardSection = ({ children, title }: DashboardSection) => {
  return (
    <div className="card-wrapper my-5 rounded-[30px] py-8 max-sm:px-3 sm:px-5 xl:px-28">
      <div className={`pb-5 ${roobertSemibold.className} text-24sb`}>
        {title}
      </div>
      {children}
    </div>
  );
};

export default DashboardSection;
