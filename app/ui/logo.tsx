import Image from "next/image";
import Link from "next/link";

export default function Logo({ to }: { to: string }) {
  return (
    <Link href={to}>
      <Image
        src="/logo.svg"
        width={50}
        height={50}
        alt="Logo"
        className="absolute top-5 left-5 w-[50px] aspect-auto"
      />
    </Link>
  );
}
