import { Bookshelf03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { BookOpen } from "lucide-react";

import { categoryType } from "@/app/types/category";

import SideBarButton from "../Sidebar-Button/Sidebar-Button";

const SidebarComponent = ({ categories }: { categories: categoryType[] }) => {
  return (
    <div className="h-screen w-64 bg-[#ececf1]">
      <div className="flex items-center gap-2 px-8 py-6">
        <BookOpen size={25} className="text-[#0a3968]" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-[#0a3968]">Categorias</h2>
          <p className="text-xs text-slate-400">NAVEGUE POR GÊNERO</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-2">
        {categories.map((categorie) => (
          <SideBarButton href={`/category/${categorie.id}`} key={categorie.id}>
            <HugeiconsIcon icon={Bookshelf03Icon} />
            {categorie.name}
          </SideBarButton>
        ))}
      </div>
    </div>
  );
};

export default SidebarComponent;
