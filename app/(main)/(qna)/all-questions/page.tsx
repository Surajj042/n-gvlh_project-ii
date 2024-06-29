import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/navbar/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import {
  getQuestions,
  getRecommendedQuestions,
} from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  authors: [
    {
      name: "CMRegmi | Github",
      url: "https://github.com/LowkeyGud",
    },
    {
      name: "CMRegmi | Wakatime",
      url: "https://wakatime.com/@lowkeygud",
    },
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "N-GVLH",
  description: "Next-Gen Virtual Learning Hub",
  icons: {
    icon: "/icons/favicon.svg",
  },
  openGraph: {
    title: "N-GVLH",
    description:
      "Have a problem that's been buggin you? Just post it to N-GVLH and people around the globe will help you solve it.",
    url: "https://next-ecotone.vercel.app/",
    siteName: "N-GVLH | Get Answers To Your Problems",
    images: [
      {
        url: "https://i.ibb.co/L8SN9vj/n-gvlh.jpg",
        width: 1200,
        height: 630,
        alt: "N-GVLH Q&A",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-GVLH | Get Answers To Your Problems",
    description:
      "Have a problem that's been buggin you? Just post it to N-GVLH and people around the globe will help you solve it.",
    // siteId: '',
    creator: "@LastSighh",
    // creatorId: '',
    images: ["https://i.ibb.co/L8SN9vj/n-gvlh.jpg"],
  },
};

export default async function Home({ searchParams }: SearchParamsProps) {
  let result;

  const { userId } = auth();
  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        questions: [],
        hasNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-3 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/qna/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        {/* Mobile HomeFilter */}
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-2 flex w-full flex-col gap-6">
        {result?.questions.length && result.questions.length > 0 ? (
          result?.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="Theres no question to show"
            description="Uh Oh🫢 Looks like this tab has no questions yet!"
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        hasNext={result?.hasNext}
      />
    </>
  );
}
