import { Book, LayoutGrid, LogIn, UserRoundPen } from "lucide-react";
import Link from "next/link";

import { getUser } from "@/app/lib/authToken";

import SheetsComponent from "../Sheets-Component/Sheets-Component";
import SignOutButton from "../SignOut-Button/SignOutButton";
import { Button } from "../ui/button";

const HeaderComponent = async () => {
  const user = await getUser();

  return (
    <header className="h-18 flex items-center justify-between bg-white p-2">
      <Button className="bg-transparent hover:bg-white">
        <Link className="text-normal text-lg italic text-[#0a3968]" href="/">
          The Curated Archive
        </Link>
      </Button>

      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#0a3968]"
        >
          <LayoutGrid size={16} /> Explorar
        </Link>
        <Link
          href="/authorPage"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#0a3968]"
        >
          <Book size={16} /> Autores
        </Link>

        <div className="mx-2 h-6 w-px bg-slate-200"></div>

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              href={`/user/${user.id}`}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#0a3968]"
            >
              <UserRoundPen size={16} /> Meu Perfil
            </Link>

            <SignOutButton />
          </div>
        ) : (
          <Button className="bg-[#0a3968] hover:bg-[#0a3968]">
            <Link href="/login" className="flex items-center gap-2">
              <LogIn size={16} /> Fazer Login
            </Link>
          </Button>
        )}
      </nav>

      {/* --- MENU MOBILE / SHEETS (Mostra no Mobile, Esconde no Desktop) --- */}
      <div className="md:hidden">
        <SheetsComponent user={user} />
      </div>
    </header>
  );
};

export default HeaderComponent;
