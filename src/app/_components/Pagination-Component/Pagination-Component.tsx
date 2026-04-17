import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
}

const Pagination = ({ currentPage, hasMore }: PaginationProps) => {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {/* Botão Anterior */}
      <Link
        href={`/?page=${currentPage - 1}`}
        // Desativa o link se estiver na página 1
        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
      >
        <Button variant="outline" disabled={currentPage <= 1} className="gap-2">
          <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
          Anterior
        </Button>
      </Link>

      <span className="text-sm font-medium text-slate-600">
        Página {currentPage}
      </span>

      <Link
        href={`/?page=${currentPage + 1}`}
        className={!hasMore ? "pointer-events-none opacity-50" : ""}
      >
        <Button variant="outline" disabled={!hasMore} className="gap-2">
          Próxima
          <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
        </Button>
      </Link>
    </div>
  );
};

export default Pagination;
