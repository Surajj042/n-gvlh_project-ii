"use client";

import { truncateWord } from "@/lib/utils";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
const Markdown = ({ description }: { description: string }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const words = description.split(" ");

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <>
      <ReactMarkdown className="inline-block">
        {showFullDescription ? description : truncateWord(description, 20)}
      </ReactMarkdown>
      {words.length > 20 && (
        <button
          onClick={toggleDescription}
          className="text-pink2blue mt-2 block text-sm dark:bg-yellow2pink"
        >
          {showFullDescription ? "Show less" : "Show more"}
        </button>
      )}
    </>
  );
};

export default Markdown;
