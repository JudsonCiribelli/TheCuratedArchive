"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "../_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../_components/ui/field";
import { Input } from "../_components/ui/input";
import { Separator } from "../_components/ui/separator";
import { apiClient } from "../lib/api";
import { setToken } from "../lib/authToken";
import { LoginUserType } from "./types/loginUserTypes";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Formato de email inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    setErrorMessage(null);

    try {
      const response = await apiClient<LoginUserType>("/auth", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.data && response.data.token) {
        await setToken(response.data.token);
      }
      console.log(response.data.token);

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro inesperado ao realizar login.");
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl font-bold text-[#032342]">
          The Curated Archive
        </h2>
        <h3 className="text-slate-500">
          Excelência Editorial em Leitura Digital
        </h3>
        <Card className="xl:w-125 w-full max-w-xl sm:max-w-md">
          <CardHeader>
            <CardTitle className="text-semibold my-2 text-lg">
              Bem-vindo de volta
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
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
                        placeholder="exemplo@arquivo.com"
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
              </FieldGroup>

              {/* Exibe o erro da API caso as credenciais estejam erradas */}
              {errorMessage && (
                <p className="mt-2 text-center text-sm font-medium text-red-500">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                className="h-10 w-full cursor-pointer bg-[#032342] text-sm"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <div className="mx-4">
            <Separator />
          </div>

          <div className="my-4 text-center">
            <span className="text-xs font-normal md:text-sm xl:text-sm">
              Ainda não faz parte do arquivo?{" "}
              <Link href="/register" className="text-[#052b52]">
                Criar conta
              </Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
