"use client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteToken } from "@/app/lib/authToken";

import { Button } from "../ui/button";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await deleteToken();
    router.refresh();
    router.push("/login");
  };
  return (
    <Button
      variant="ghost"
      className="flex h-9 cursor-pointer items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
      onClick={handleSignOut}
    >
      <LogOutIcon size={16} />
      Sair
    </Button>
  );
};

export default SignOutButton;
