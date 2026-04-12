"use client";

import { Bookmark, Handbag } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/app/_components/ui/button";
import { cn } from "@/app/lib/utils";

const ButtonComponent = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/loan"
        className={cn(
          buttonVariants({ variant: "default" }),
          "h-15 hover:bg-[#0a3968 flex w-40 cursor-pointer items-center gap-1 bg-[#0a3968] text-sm",
        )}
      >
        <Handbag size={20} className="text-white" />
        Alugar
      </Link>

      <Link
        href="/loan"
        className={cn(
          buttonVariants({ variant: "default" }),
          "h-15 flex w-40 cursor-pointer items-center gap-1 bg-white text-sm text-[#0a3968] hover:bg-white",
        )}
      >
        <Bookmark size={20} className="text-[#0a3968]" />
        Salvar
      </Link>
    </div>
  );
};

export default ButtonComponent;
