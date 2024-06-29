import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <Image
          src="/logo-light-compact.svg"
          alt="Logo"
          width={110}
          height={110}
        />
      </Link>
    </>
  );
};
