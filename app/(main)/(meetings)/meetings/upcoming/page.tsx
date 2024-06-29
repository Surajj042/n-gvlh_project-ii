import CallList from "@/components/CallList";

const UpcomingPage = () => {
  return (
    <section className="text-meeting flex size-full flex-col gap-10 max-[745px]:text-center">
      <h1 className="text-3xl font-bold">Upcoming Meeting</h1>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;
