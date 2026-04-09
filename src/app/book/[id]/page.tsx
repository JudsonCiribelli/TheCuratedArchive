/* eslint-disable @next/next/no-img-element */

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { getBookByAuthorId } from "@/app/actions/get-book-by-author-id";
import { getBookById } from "@/app/actions/get-book-by-id";

import BookItem from "./_components/Book-Item/Book-item";
import ButtonComponent from "./_components/Button-Component/Button-Component";

interface BookDetailsProps {
  params: Promise<{ id: string }>;
}

const BookDetails = async ({ params }: BookDetailsProps) => {
  const { id } = await params;

  const book = await getBookById(id);
  const bookFromAuthor = await getBookByAuthorId(book.authorId);

  const statusConfig: Record<string, { label: string; color: string }> = {
    AVAILABLE: { label: "Disponível para Aluguel", color: "bg-green-500" },
    BORROWED: { label: "Indisponível para Aluguel", color: "bg-red-500" },
    MAINTENANCE: { label: "Manutenção", color: "bg-slate-800" },
  };

  const currentStatus = statusConfig[book.status] || statusConfig.MAINTENANCE;

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#dedee6]">
        <h1 className="text-xl font-bold text-[#0a3968]">
          Livro não encontrado.
        </h1>
      </div>
    );
  }
  return (
    <section className="my-10 space-y-5 p-2">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 xl:flex-row">
        <div className="h-100 xl:w-[40%]">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${book.bookImage}`}
            alt={`Capa do livro ${book.title}`}
            className="h-full rounded-lg object-cover"
          />
        </div>

        <div className="xl:w-200">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl text-[#0a3968] xl:text-5xl">
                {book.title}
              </h2>
              <p className="text-lg text-[#0a3968]">
                <span className="text-xs text-black">por</span>
                {book.author.name}
              </p>
            </div>
            <Card>
              <CardContent className="flex flex-col items-start justify-between gap-2 xl:mx-4 xl:flex-row">
                <div>
                  <p>Status</p>
                  <div className="flex items-center gap-1">
                    <div
                      className={`h-3 w-3 rounded-full ${currentStatus.color}`}
                    />

                    <p className="text-xs font-semibold text-slate-700">
                      {currentStatus.label}
                    </p>
                  </div>
                </div>

                <Separator orientation="vertical" />

                <div className="flex flex-col">
                  <p>ISBN</p>

                  <p className="text-xs font-normal text-slate-700">
                    {book.id}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-2">
                <p className="text-sm">Sinopse</p>
                <h2 className="text-lg font-normal">{book.description}</h2>
              </CardContent>
            </Card>

            <div>
              <ButtonComponent />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto xl:mx-5 xl:my-20">
        <div className="flex flex-col">
          <p className="text-sm text-green-700">Recomendações</p>
          <div className="flex items-center gap-5 xl:justify-between">
            <p className="text-lg text-[#052342]">Outros livros deste autor</p>
            <Link
              href={`/author/${book.authorId}`}
              className="flex items-center justify-center gap-1 text-xs hover:cursor-pointer sm:truncate"
            >
              Ver bibliografia completa
              <ArrowRight size={10} />
            </Link>
          </div>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {bookFromAuthor.map((book) => (
              <BookItem
                key={book.id}
                title={book.title}
                year={book.year}
                bookImage={book.bookImage}
                category={book.category.name}
                id={book.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
