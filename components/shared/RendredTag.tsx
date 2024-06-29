import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge
        variant="qn_tag"
        bgClassName="dark:bg-dark-400 bg-slate-100 rounded-[6px]"
        className="subtle-medium border-none uppercase"
      >
        {name}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;
