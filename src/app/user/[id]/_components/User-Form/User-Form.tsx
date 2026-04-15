"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/app/_components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";

const UserFormSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Formato de email inválido" }),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, {
      message: "O número de telefone deve ter 11 dígitos. (DDD + 9xxxx-xxxx).",
    })
    .refine((val) => /^[1-9]{2}9[0-9]{8}$/.test(val), {
      message: "Número de telefone inválido.",
    }),

  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export type UserFormSchemaType = z.infer<typeof UserFormSchema>;

interface UserFormProps {
  name: string;
  email: string;
  phone: string;
}

const UserForm = ({ name, email, phone }: UserFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const handleUpdateUser = () => {
    setErrorMessage(null);
    console.log("clicou");
  };
  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateUser)}
      className="mt-6 space-y-4"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-[#0a3968]">Nome Completo</FieldLabel>
              <Input
                {...field}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder={name}
                className="xl:15 h-10 sm:h-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-[#0a3968]">
                Endereço de E-mail
              </FieldLabel>
              <Input
                {...field}
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder={email}
                className="xl:15 h-10 sm:h-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-[#0a3968]">
                Número para Contato
              </FieldLabel>
              <Input
                {...field}
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder={phone}
                className="xl:15 h-10 sm:h-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-[#0a3968]">Senha</FieldLabel>
              <Input
                {...field}
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Nova Senha"
                className="xl:15 h-10 sm:h-12"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {errorMessage && (
        <p className="mt-2 text-center text-sm font-medium text-red-500">
          {errorMessage}
        </p>
      )}

      <Button
        className="w-full cursor-pointer bg-[#0a3968] py-5 text-white hover:cursor-pointer hover:bg-[#0a3968]"
        type="submit"
      >
        Salvar Alterações
      </Button>
    </form>
  );
};

export default UserForm;
