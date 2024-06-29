import ClientTime from "@/components/ClientTime";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat([], { dateStyle: "full" }).format(now);

  return (
    <section className="text-meeting flex flex-col gap-5">
      {/* <Script src="//code.tidio.co/scqam3jpgz32gyaf320txgxkfhpjg682.js" async /> */}
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-end max-md:px-5 max-md:py-8 lg:p-11">
          <ClientTime />
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
