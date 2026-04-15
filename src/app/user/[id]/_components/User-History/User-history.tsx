/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/app/_components/ui/badge";

import ReturnButton from "../Return-Button/Return-Button";

interface UserHistoryProps {
  id: string;
  token: string;
  title: string;
  bookImage: string;
  autor: string;
  loanDate: string;
  status: string;
}

const UserHistory = ({
  id,
  token,
  title,
  bookImage,
  autor,
  loanDate,
  status,
}: UserHistoryProps) => {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_100px] items-center gap-4 border-b border-slate-100 p-4 transition-colors last:border-0 hover:bg-slate-50">
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${bookImage}`}
          alt={`Capa do livro ${title}`}
          className="h-16 w-12 shrink-0 rounded-md object-cover shadow-sm"
        />
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-sm font-semibold text-[#0a3968]">
            {title}
          </p>
          <p className="truncate text-xs text-slate-500">{autor}</p>
        </div>
      </div>

      <p className="text-sm font-medium text-slate-600">{loanDate}</p>

      <div>
        <Badge
          className={`rounded-lg px-3 py-1 text-xs font-medium shadow-none ${
            status === "BORROWED"
              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {status === "BORROWED" ? "Emprestado" : "Devolvido"}
        </Badge>
      </div>

      <div className="flex justify-end">
        {status === "BORROWED" ? (
          <ReturnButton loanId={id} token={token} />
        ) : (
          <span className="text-xs font-medium text-slate-400">-</span>
        )}
      </div>
    </div>
  );
};

export default UserHistory;
