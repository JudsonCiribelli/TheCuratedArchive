"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Separator } from "@/app/_components/ui/separator";
import { formatPhone } from "@/app/helpers/formatPhone";
import { apiClient } from "@/app/lib/api";

import { RegisterUserType } from "./types/registerUserTypes";

const registerSchema = z.object({
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

  terms: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os Termos de Uso.",
  }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      terms: false,
    },
  });

  const handleRegisterUser = async (data: RegisterSchemaType) => {
    setErrorMessage(null);

    try {
      const { ...userData } = data;

      await apiClient<RegisterUserType>("/users", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro inesperado ao criar conta.");
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-normal text-[#032342]">
          The Curated Archive
        </h2>
        <h2 className="text-3xl font-normal text-[#032342]">Crie sua conta</h2>
        <h3 className="text-slate-500">
          Inicie sua jornada literária personalizada
        </h3>

        <Card className="xl:w-125 w-full max-w-xl sm:max-w-md">
          <CardContent>
            <form
              className="mt-6 space-y-4"
              onSubmit={form.handleSubmit(handleRegisterUser)}
            >
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Nome Completo</FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        aria-invalid={fieldState.invalid}
                        placeholder="Joe Doe"
                        className="xl:15 h-10 sm:h-12"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="seu@email.com"
                        className="xl:15 h-10 sm:h-12"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Número de Telefone</FieldLabel>
                      <Input
                        {...field}
                        type="tel"
                        aria-invalid={fieldState.invalid}
                        placeholder="(11) 99999-9999"
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={15}
                        className="xl:15 h-10 sm:h-12"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Senha</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        placeholder="********"
                        aria-invalid={fieldState.invalid}
                        className="xl:15 h-10 sm:h-12"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="terms"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="mt-2 flex items-center gap-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-4 w-4"
                        />
                        <Label
                          className="cursor-pointer text-xs"
                          onClick={() => field.onChange(!field.value)}
                        >
                          Concordo com os Termos de Uso e a Política de
                          Privacidade
                        </Label>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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
                type="submit"
                className="mt-4 h-10 w-full cursor-pointer bg-[#032342] text-sm"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Cadastrando..."
                  : "Cadastrar conta"}
              </Button>
            </form>
          </CardContent>

          <div className="mx-4">
            <Separator />
          </div>

          <div className="my-4 text-center">
            <span className="text-xs font-normal md:text-sm xl:text-sm">
              Já possui conta?{" "}
              <Link href="/login" className="text-[#052b52]">
                Fazer login
              </Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
