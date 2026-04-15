"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/app/_components/ui/button";
import { apiClient } from "@/app/lib/api";

interface ReturnButtonProps {
  loanId: string;
  token: string;
}

const ReturnButton = ({ loanId, token }: ReturnButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReturn = async () => {
    setIsLoading(true);

    try {
      await apiClient(`/loan/${loanId}/return`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao tentar devolver o livro.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleReturn}
      disabled={isLoading}
      size="sm"
      className="w-full bg-[#0a3968] text-xs hover:bg-[#062c52]"
    >
      {isLoading ? "Devolvendo..." : "Devolver"}
    </Button>
  );
};

export default ReturnButton;
