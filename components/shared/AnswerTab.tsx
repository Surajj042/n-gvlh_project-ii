import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  pagination?: "dontshow";
  clerkId?: string | null;
}

const AnswerTab = async ({
  searchParams,
  userId,
  clerkId,
  pagination,
}: Props) => {
  const { answers, hasNext } = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: searchParams.pageSize ? +searchParams.pageSize : 10,
  });

  return (
    <div>
      {answers.map((item) => (
        <AnswerCard
          key={item._id}
          answer={item.content}
          _id={item._id}
          clerkId={clerkId}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />
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

export default AnswerTab;
