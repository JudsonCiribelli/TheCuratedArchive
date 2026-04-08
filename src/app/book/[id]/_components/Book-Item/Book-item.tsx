/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

interface BookItemProps {
  title: string;
  category: string;
  id: string;
  year: number;
  bookImage: string;
}
const BookItem = ({ year, bookImage, title, category, id }: BookItemProps) => {
  return (
    <Link href={`/book/${id}`}>
      <div className="min-w-45 rounded-2xl">
        <div className="p-0 px-1 pb-1 pt-1">
          <div className="h-39.75 xl:h-90 relative w-full">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${bookImage}`}
              alt={`Capa do livro ${title}`}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          <div className="pt-4">
            <h3 className="truncate text-lg font-normal text-[#052342]">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-normal">{category}</p>
            <div className="h-1 w-1 rounded-full bg-black"></div>
            <p className="truncate text-sm font-normal">{year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
