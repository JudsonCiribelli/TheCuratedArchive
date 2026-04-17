/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import CardComponent from "../_components/Card-Component/Card-Component";
import Pagination from "../_components/Pagination-Component/Pagination-Component";
import SearchComponent from "../_components/Search-Component/Search-Component";
import { getBooks } from "../actions/get-books";
import { getCategory } from "../actions/get-categories";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 10;

  const categories = await getCategory();

  const books = await getBooks(currentPage, limit);
  const hasMoreBooks = books && books.length === limit;

  return (
    <>
      <CardComponent />

      <div className="mt-4">
        <SearchComponent />
      </div>

      <div className="mt-6">
        {books && books.length > 0 ? (
          <>
            <div className="m-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book) => {
                const bookCategory = categories.find(
                  (cat) => cat.id === book.categoryId,
                );

                return (
                  <Link href={`/book/${book.id}`} key={book.id}>
                    <div className="flex cursor-pointer flex-col rounded-lg bg-white p-4 shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md">
                      <div className="aspect-2/3 mb-3 w-full overflow-hidden rounded-md bg-slate-200">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${book.bookImage}`}
                          alt={`Capa do livro ${book.title}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h2 className="my-1 text-xs text-green-700">
                        {bookCategory?.name}
                      </h2>

                      <h2
                        className="truncate font-semibold text-[#032342]"
                        title={book.title}
                      >
                        {book.title}
                      </h2>

                      <div className="mt-auto flex items-center justify-between pt-1">
                        <p className="text-sm font-normal text-slate-500">
                          {book.author.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 4. RENDERIZAMOS A PAGINAÇÃO AQUI NO FINAL */}
            <Pagination currentPage={currentPage} hasMore={hasMoreBooks} />
          </>
        ) : (
          <p className="text-slate-500">Nenhum livro disponível no momento.</p>
        )}
      </div>
    </>
  );
};

export default Home;
