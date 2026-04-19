/* eslint-disable @next/next/no-img-element */
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { getAuthorById } from "@/app/actions/authors";
import { getBookByAuthorId } from "@/app/actions/books";
import BookItem from "@/app/book/[id]/_components/Book-Item/Book-item";
import { extractYear } from "@/app/helpers/date-utils";

interface AuthorDetailsProps {
  params: Promise<{ authorId: string }>;
}

const AuthorDetails = async ({ params }: AuthorDetailsProps) => {
  const { authorId } = await params;

  const author = await getAuthorById(authorId);
  const authorBooks = await getBookByAuthorId(authorId);

  return (
    <section className="my-10 space-y-5 p-2">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 xl:flex-row">
        <div className="h-100 xl:w-[40%]">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${author.authorImage}`}
            alt={`Capa do livro ${author.name}`}
            className="h-full rounded-lg object-cover"
          />
        </div>

        <div className="xl:w-200">
          <div className="w-ful flex flex-col gap-4">
            <div className="space-y-4">
              <Badge className="bg-green-400 text-sm">Autor em destaque</Badge>
              <Card>
                <CardContent className="flex flex-col gap-2 xl:gap-4">
                  <h2 className="font-normal xl:text-6xl">{author.name}</h2>
                  <div className="flex items-center gap-1">
                    <p className="text-sm">São Paulo, Brasil</p>
                    <div className="h-1 w-1 rounded-full bg-black"></div>
                    <p className="text-sm">{extractYear(author.birthDate)}</p>
                    <p className="text-sm">Presente</p>
                  </div>
                  <p className="text-lg">{author.bio}</p>
                </CardContent>
              </Card>

              <div className="flex items-center gap-4">
                <Button className="cursor-pointer bg-[#05284b] p-4 hover:bg-[#05284b]">
                  Seguir Autor
                </Button>
                <Button className="cursor-pointer bg-slate-300 p-4 text-[#0a3968] hover:bg-slate-300">
                  Ver Biografia Completa
                </Button>
              </div>
              <Button className="h-15 flex w-32 flex-col items-start gap-1 bg-[#05284b] p-4 text-lg text-white hover:bg-[#05284b]">
                <p className="text-xs">Obras Totais</p>
                {author.books.length}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto xl:mx-5 xl:my-20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2>Livros de {author.name}</h2>
            <Link href="/" className="rounded-full bg-slate-300 p-2">
              <LayoutGrid size={22} />
            </Link>
          </div>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {authorBooks.map((book) => (
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

export default AuthorDetails;
