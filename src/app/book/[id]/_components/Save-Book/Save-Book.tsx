"use client";

import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/app/_components/ui/button";
import { apiClient } from "@/app/lib/api";
import { getToken } from "@/app/lib/authToken";

interface SaveBookProps {
  bookId: string;
  initialIsSaved?: boolean;
}

const SaveBookComponent = ({ bookId, initialIsSaved }: SaveBookProps) => {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSave = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();

      await apiClient(`/books/favorites/${bookId}`, {
        method: isSaved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsSaved(!isSaved);
    } catch (error) {
      console.log("Erro ao alterar favorito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleToggleSave}
      className="h-15 flex w-40 cursor-pointer items-center gap-1 bg-white text-sm text-[#0a3968] hover:bg-white"
    >
      {/* Se estiver carregando, mostra o spinner. Se não, mostra o coração */}
      {isLoading ? (
        <Loader2 className="animate-spin text-[#0a3968]" size={18} />
      ) : (
        <Heart
          size={18}
          className={
            isSaved ? "fill-[#0a3968] text-[#0a3968]" : "text-[#0a3968]"
          }
        />
      )}
      {isSaved ? "Salvo" : "Salvar"}
    </Button>
  );
};

export default SaveBookComponent;
