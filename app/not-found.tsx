import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex-center min-h-screen flex-col bg-gray-100 p-2">
      <div className="flex-center flex-col text-center">
        <Image src="/404.svg" alt="404 - Not Found" width={400} height={400} />
        <h1 className="mt-10 text-2xl font-bold text-gray-800">
          This is a really serious predicament you're in. You are lost🫢
        </h1>
        <p className="mt-1 text-gray-600">
          But don't worry, we've got you covered. Just click the button below.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-purple2red px-6 py-3 text-white shadow-md transition duration-300 hover:bg-purple-700"
        >
          Help Me
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
