import SidebarComponent from "@/app/_components/SideBar-Component/Sidebar-Component";
import { Button } from "@/app/_components/ui/button";
import { getCategory } from "@/app/actions/get-categories";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategory();

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col overflow-hidden bg-[#dedee6]">
      <nav className="flex shrink-0 items-center gap-2 overflow-x-auto bg-white p-3 shadow-sm lg:justify-center xl:hidden">
        {categories.map((categorie) => (
          <Button
            key={categorie.id}
            variant="outline"
            className="h-8 shrink-0 rounded-full text-xs"
          >
            {categorie.name}
          </Button>
        ))}
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden h-full w-64 border-r border-slate-200 bg-white shadow-sm xl:block">
          <SidebarComponent categories={categories} />
        </aside>

        <main className="mx-auto flex h-full flex-1 flex-col overflow-y-auto p-4 lg:w-full lg:px-20 lg:py-9 xl:w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
