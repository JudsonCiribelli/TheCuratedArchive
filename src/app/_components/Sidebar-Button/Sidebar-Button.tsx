"use client";

import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/app/lib/utils";

import { buttonVariants } from "../ui/button";

interface SidebarButtonProps {
  href: string;
  children: ReactNode;
}

const SideBarButton = ({ href, children }: SidebarButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "default" }),
        "flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-full bg-[#0a3968] hover:bg-[#082a4d]",
      )}
    >
      {children}
    </Link>
  );
};

export default SideBarButton;
