"use client";

import {
  Book,
  LayoutGrid,
  LogIn,
  LogOutIcon,
  Menu,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { deleteToken } from "@/app/lib/authToken";
import { cn } from "@/app/lib/utils";
import { LoanTypes } from "@/app/types/loan";

import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface SheetsProps {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  imageProfile?: string;
  role?: string;
  active?: string;
  loan?: LoanTypes[];
}

const SheetsComponent = ({ user }: { user: SheetsProps | null }) => {
  const [isSheetsOpen, setIsSheetsOpen] = useState(false);
  const router = useRouter();

  const handleRedirectUser = () => {
    setIsSheetsOpen(false);
    router.push("/login");
  };

  const handleSignOut = async () => {
    await deleteToken();
    setIsSheetsOpen(false);
    router.refresh();
  };

  const handleLinkNavigation = () => {
    setIsSheetsOpen(false);
  };

  return (
    <Sheet open={isSheetsOpen} onOpenChange={setIsSheetsOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "bg-[#0a3968] text-white",
        )}
      >
        <Menu size={26} />
      </SheetTrigger>

      <SheetContent className="pt-10" showCloseButton={false}>
        <div className="mx-2">
          {user ? (
            <div className="flex gap-2">
              {user.imageProfile ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${user.imageProfile}`}
                  alt={`Foto de ${user.name}`}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a3968] font-semibold text-white">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}

              <div className="flex w-[70%] flex-col overflow-hidden">
                <h2 className="truncate font-semibold text-[#032342]">
                  {user.name}
                </h2>
                <h2 className="truncate text-sm text-slate-500">
                  {user.email}
                </h2>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-sm">Olá, faça login</h2>
              <Button
                className="bg-[#0a3968] hover:cursor-pointer"
                onClick={handleRedirectUser}
              >
                <LogIn size={16} />
              </Button>
            </div>
          )}

          <div className="mx-2 my-4">
            <Separator />
          </div>

          <div className="flex w-full flex-col items-center justify-start gap-2">
            <Link
              href="/"
              onClick={handleLinkNavigation}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex h-10 w-full cursor-pointer items-center justify-start gap-2 bg-[#0a3968] hover:bg-[#082a4d]",
              )}
            >
              <LayoutGrid size={16} />
              Explorar
            </Link>

            <Link
              href="/authorPage"
              onClick={handleLinkNavigation}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex h-10 w-full cursor-pointer items-center justify-start gap-2 bg-[#0a3968] hover:bg-[#082a4d]",
              )}
            >
              <Book size={16} />
              Autores
            </Link>

            <Link
              href="/"
              onClick={handleLinkNavigation}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex h-10 w-full cursor-pointer items-center justify-start gap-2 bg-[#0a3968] hover:bg-[#082a4d]",
              )}
            >
              <UserRoundPen size={16} />
              Meu Perfil
            </Link>
          </div>
        </div>

        <div className="mx-2 my-4">
          <Separator />
        </div>

        {user ? (
          <div className="flex flex-col gap-2 py-5">
            <Button
              className="mx-2 h-10 cursor-pointer justify-start gap-2 bg-[#0a3968]"
              onClick={handleSignOut}
            >
              <LogOutIcon size={16} />
              Sair da conta
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SheetsComponent;
