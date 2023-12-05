import Image from "next/image";
import Link from "next/link";
import logoSVG from "../../public/logo.svg";

export default function Logo({ to }: { to: string }) {
  return (
    <Link href={to}>
      <Image
        src={logoSVG}
        width={50}
        height={50}
        alt="Logo"
        className="fixed top-5 left-5 w-[50px] aspect-square"
      />
    </Link>
  );
}
