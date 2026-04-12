/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";

import { Separator } from "@/app/_components/ui/separator";

interface AuthorDataProps {
  name: string;
  bio: string;
  id: string;
  authorImage: string;
  quantityBook: number;
}

const AuthorData = ({
  quantityBook,
  name,
  id,
  bio,
  authorImage,
}: AuthorDataProps) => {
  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-4 shadow-sm">
      <div className="flex flex-1 flex-col items-center space-y-4 text-center">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${authorImage}`}
          alt={`Foto do autor ${name}`}
          className="h-40 w-40 rounded-full object-cover"
        />

        <div className="flex flex-col items-center space-y-3">
          <h2 className="text-xl font-semibold text-[#052647]">{name}</h2>

          <p className="line-clamp-3 text-sm text-slate-500">{bio}</p>
        </div>
      </div>

      <div className="mt-auto w-full pt-4">
        <Separator className="mb-4" />
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-slate-500">{quantityBook} Obras</p>
          <Link
            href={`/author/${id}`}
            className="text-sm font-medium text-[#052647] hover:underline"
          >
            Ver Perfil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorData;
