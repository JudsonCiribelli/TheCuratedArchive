"use client";

import { Bookmark, Handbag } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

const ButtonComponent = () => {
  return (
    <div className="flex items-center gap-4">
      <Button className="h-15 hover:bg-[#0a3968 flex w-40 cursor-pointer items-center gap-1 bg-[#0a3968] text-sm">
        <Handbag size={20} className="text-white" />
        Alugar
      </Button>

      <Button className="h-15 flex w-40 cursor-pointer items-center gap-1 bg-white text-sm text-[#0a3968] hover:bg-white">
        <Bookmark size={20} className="text-[#0a3968]" />
        Salvar
      </Button>
    </div>
  );
};

export default ButtonComponent;
