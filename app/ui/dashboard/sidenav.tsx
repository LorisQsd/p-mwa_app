"use client";

import Link from "next/link";
import {
  Squares2X2Icon,
  CurrencyDollarIcon,
  ChartPieIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Good for maintanability
const links = [
  { name: "Home", href: "/dashboard", icon: Squares2X2Icon },
  {
    name: "Resume",
    href: "/dashboard/resume",
    icon: CurrencyDollarIcon,
  },
  { name: "Stats", href: "/dashboard/stats", icon: ChartPieIcon },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[80%] h-[50px] bg-slate-200 rounded-md flex items-center justify-center sm:static sm:translate-x-0 sm:w-[15%] sm:h-[80vh] sm:bg-transparent">
      <ul className="flex justify-evenly items-center w-full sm:flex-col sm:gap-6">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <li key={link.name} >
              <Link href={link.href}>
                <LinkIcon className={clsx('duration-300 p-2 w-[45px] sm:w-[50px] bg-slate-200 sm:bg-transparent ', pathname === link.href ? "text-primary-400 -translate-y-3/4 rounded-t-full scale-125 sm:translate-y-0" : "text-slate-800 sm:text-slate-200")} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
