/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { searchBooks } from "@/app/actions/books";
import { useDebounce } from "@/app/hooks/useDebounce";
import { BookTypes } from "@/app/types/book";

import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";

const formSchema = z.object({
  title: z.string().nonempty({ message: "Digite algo para buscar." }),
});

const SearchComponent = () => {
  const [results, setResults] = useState<BookTypes[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const searchTerm = form.watch("title");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearchTerm.length >= 2) {
        setIsSearching(true);
        setShowDropdown(true);

        try {
          const data = await searchBooks(debouncedSearchTerm);
          setResults(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm]);

  const handleSearch = (data: z.infer<typeof formSchema>) => {
    setShowDropdown(false);
    router.push(`/search?title=${data.title}`);
  };
  return (
    <form
      className="flex flex-col items-center justify-between gap-4 xl:w-[70%] xl:flex-row xl:gap-2"
      onSubmit={form.handleSubmit(handleSearch)}
    >
      <div className="relative flex w-full gap-2">
        <FieldGroup className="w-full">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full">
                <Input
                  {...field}
                  type="text"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder="Pesquisar títulos..."
                  className="xl:h-15 h-10 w-full bg-white sm:h-12"
                  onFocus={() => {
                    if (results.length > 0) setShowDropdown(true);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className="xl:h-15 xl:w-15 h-10 w-10 shrink-0 bg-[#0a3968] hover:bg-[#062c52]"
        >
          {isSearching ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Search size={16} />
          )}
        </Button>

        {showDropdown && (
          <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-slate-500">
                Buscando obras...
              </div>
            ) : results.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto">
                {results.slice(0, 5).map((book) => (
                  <li
                    key={book.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <Link
                      href={`/book/${book.id}`}
                      className="flex items-center gap-3 p-3"
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="h-12 w-8 shrink-0 overflow-hidden rounded bg-slate-200">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${book.bookImage}`}
                          alt={`Capa do livro ${book.title}`}
                          className="h-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#0a3968]">
                          {book.title}
                        </span>
                        <span className="text-xs text-slate-500">
                          {book.author?.name || "Autor Desconhecido"}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : debouncedSearchTerm.length >= 2 ? (
              <div className="p-4 text-center text-sm text-slate-500">
                Nenhum livro encontrado para `{debouncedSearchTerm}`
              </div>
            ) : null}
          </div>
        )}
      </div>

      <nav className="flex items-center gap-4">
        <Button
          variant="outline"
          className="h-8 shrink-0 cursor-pointer rounded-full bg-white text-xs hover:bg-white"
        >
          Recentes
        </Button>

        <Button
          variant="outline"
          className="h-8 shrink-0 cursor-pointer rounded-full bg-white text-xs hover:bg-white"
        >
          Mais lidos
        </Button>

        <Button
          variant="outline"
          className="h-8 shrink-0 cursor-pointer rounded-full bg-white text-xs hover:bg-white"
        >
          Premiados
        </Button>
      </nav>
    </form>
  );
};

export default SearchComponent;
