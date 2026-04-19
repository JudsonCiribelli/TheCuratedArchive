/* eslint-disable @next/next/no-img-element */
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { getBookByCategoryId, getCategoryData } from "@/app/actions/categories";

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  const categorie = await getCategoryData(categoryId);

  const books = await getBookByCategoryId(categoryId);

  return (
    <div>
      <Card className="my-5 w-full shrink-0 border-none bg-slate-200 shadow-md">
        <CardContent className="p-6 md:p-10 xl:p-14">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-1">
              <p className="flex items-center text-sm">
                Inicio <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </p>
              <p className="flex items-center text-sm">
                Coleção <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
              </p>
              <p className="flex items-center text-sm text-[#0a3968]">
                {categorie[0].name}
              </p>
            </div>

            <h2 className="text-5xl text-[#0a3968]">{categorie[0].name}</h2>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-600 xl:text-lg">
                Explore narrativas que transcedem o tempo. Da literatura
                clássica à ficção <br /> comtemporânea, descubra história
                curadas por sua profundidade e impacto <br /> cultural.
              </p>

              <Badge className="bg-green-300 p-7 text-sm text-green-900">
                {books.length} livros <br /> encontrados
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="m-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book) => (
          <Link href={`/book/${book.id}`} key={book.id}>
            <div className="my-5 flex cursor-pointer flex-col rounded-lg bg-slate-100 p-4 shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md">
              <div className="aspect-2/3 mb-3 w-full overflow-hidden rounded-md bg-slate-200">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${book.bookImage}`}
                  alt={`Capa do livro ${book.title}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
