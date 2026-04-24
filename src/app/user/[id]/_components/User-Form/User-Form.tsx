/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2, Upload, User } from "lucide-react";
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
import { apiClient } from "@/app/lib/api";
import { getToken } from "@/app/lib/authToken";

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
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .optional()
    .or(z.literal("")),
});

export type UserFormSchemaType = z.infer<typeof UserFormSchema>;

interface UserFormProps {
  name: string;
  email: string;
  phone: string;
  imageProfile?: string | null;
  id: string;
}

const UserForm = ({ name, email, phone, imageProfile, id }: UserFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(imageProfile || null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      phone: phone || "",
      password: "",
    },
  });

  const handleInstantImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      setErrorMessage(null);

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const token = await getToken();
      const formData = new FormData();
      formData.append("imageProfile", file);

      await apiClient(`/users/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Erro ao fazer upload da imagem", error);
      setErrorMessage("Erro ao atualizar a foto de perfil.");
      setPreview(imageProfile || null);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      setIsUploadingImage(true);
      const token = await getToken();

      await apiClient(`/users/upload`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPreview(null);
    } catch (error) {
      console.error("Erro ao remover imagem", error);
      setErrorMessage("Erro ao remover a foto.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdateUser = async (data: UserFormSchemaType) => {
    try {
      setErrorMessage(null);
      const token = await getToken();

      await apiClient(`/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      form.reset();
      console.log("Dados de texto atualizados com sucesso!");
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao salvar os dados do perfil.");
    }
  };

  const imageSrc = preview?.startsWith("blob:")
    ? preview
    : `${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${preview}`;

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateUser)}
      className="mt-6 space-y-6"
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100">
          {isUploadingImage && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
              <Loader2 className="animate-spin text-[#0a3968]" size={24} />
            </div>
          )}

          {preview ? (
            <img
              src={imageSrc}
              alt="Perfil do usuario"
              className="h-full w-full object-cover"
            />
          ) : (
            <User size={40} className="text-slate-400" />
          )}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <p className="text-sm font-medium text-[#0a3968]">Foto de Perfil</p>
          <div className="flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-md bg-[#0a3968] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#082a4d]">
              <Upload size={16} />
              <span>Escolher foto</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInstantImageUpload}
                disabled={isUploadingImage}
              />
            </label>

            {preview && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRemoveImage}
                disabled={isUploadingImage}
                className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Remover</span>
              </Button>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Recomendado: JPG ou PNG quadrados.
          </p>
        </div>
      </div>

      <hr className="border-slate-200" />

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
                className="h-10 sm:h-12"
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
        className="w-full cursor-pointer bg-[#0a3968] py-5 text-white hover:bg-[#082a4d]"
        type="submit"
      >
        Salvar Alterações
      </Button>
    </form>
  );
};

export default UserForm;
