"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/app/_components/ui/button";
import { Field, FieldError, FieldGroup } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";

const formSchema = z.object({
  title: z.string().nonempty({ message: "Digite algo para buscar." }),
});

const AuthorSearch = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const router = useRouter();

  const handleSearch = (data: z.infer<typeof formSchema>) => {
    router.push(`/Search?title=${data.title}`);
  };
  return (
    <form
      className="flex flex-col items-center justify-between gap-4 xl:w-[70%] xl:flex-row xl:gap-2"
      onSubmit={form.handleSubmit(handleSearch)}
    >
      <div className="flex w-full gap-2">
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Pesquisar por nome."
                  className="xl:h-15 h-10 bg-white sm:h-12"
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
          className="xl:h-15 xl:w-15 h-10 w-10 bg-[#0a3968]"
        >
          <Search size={16} />
        </Button>
      </div>
    </form>
  );
};

export default AuthorSearch;
