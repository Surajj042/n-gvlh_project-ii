import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
  pagination?: "dontshow";
}

const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
  pagination,
}: Props) => {
  const { questions, hasNext } = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: searchParams.pageSize ? +searchParams.pageSize : 10,
  });
  return (
    <div>
      {questions.map((question) => (
        <div className="mb-5 w-full" key={question._id}>
          <QuestionCard
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        </div>
      ))}
      {typeof pagination === "undefined" && (
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          hasNext={hasNext}
        />
      )}
    </div>
  );
};

export default QuestionTab;
