/* eslint-disable @next/next/no-img-element */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldError, FieldGroup } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { searchAuthor } from "@/app/actions/authors";
import { useDebounce } from "@/app/hooks/useDebounce";
import { AuthorTypes } from "@/app/types/author";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Digite algo para buscar." }),
});

const AuthorSearch = () => {
  const router = useRouter();
  const [results, setResults] = useState<AuthorTypes[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const searchTerm = form.watch("name");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearchTerm.length >= 2) {
        setIsSearching(true);
        setShowDropdown(true);

        try {
          const data = await searchAuthor(debouncedSearchTerm);
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
    router.push(`/search?name=${data.name}`);
  };
  return (
    <form
      className="flex flex-col items-center justify-between gap-4 xl:w-[70%] xl:flex-row xl:gap-2"
      onSubmit={form.handleSubmit(handleSearch)}
    >
      <div className="relative flex w-full gap-2">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="text"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder="Pesquisar por nome."
                  className="xl:h-15 h-10 bg-white sm:h-12"
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

        {showDropdown && (
          <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-slate-500">
                Buscando autor...
              </div>
            ) : results.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto">
                {results.slice(0, 5).map((author) => (
                  <li
                    key={author.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <Link
                      href={`/author/${author.id}`}
                      className="flex items-center gap-3 p-3"
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="h-12 w-8 shrink-0 overflow-hidden rounded bg-slate-200">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${author.authorImage}`}
                          alt={`Imagem do autor ${author.name}`}
                          className="h-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#0a3968]">
                          {author.name}
                        </span>

                        <span className="text-sm font-normal text-[#0a3968]">
                          {author.books.length} Obras
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
        <Button
          type="submit"
          className="xl:h-15 xl:w-15 h-10 w-10 bg-[#0a3968]"
        >
          <Search size={16} />
        </Button>
      </div>
    </form>
  );
};

export default AuthorSearch;
