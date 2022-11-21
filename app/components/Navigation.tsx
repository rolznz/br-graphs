"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  return (
    <Link href={pathname === "/" ? "/sandbox" : "/"}>
      <span className="text-blue-300 hover:text-blue-200">
        {pathname === "/" ? "Sandbox" : "Home"}
      </span>
    </Link>
  );
}
