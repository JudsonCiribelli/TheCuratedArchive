"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Field, FieldError, FieldGroup } from "@/app/_components/ui/field";
import { Label } from "@/app/_components/ui/label";
import { apiClient } from "@/app/lib/api";
import { LoanTypes } from "@/app/types/loan";

const loanTermsSchema = z.object({
  terms: z.boolean().refine((val) => val === true, {
    message: "Você precisa aceitar os Termos de Uso.",
  }),
});

export type loanTermsSchemaType = z.infer<typeof loanTermsSchema>;

interface LoanTermsFormProps {
  bookId: string;
  userId: string;
  token: string;
  dueDate: string;
}

const LoanTermsForm = ({
  bookId,
  userId,
  token,
  dueDate,
}: LoanTermsFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const router = useRouter();
  const form = useForm<loanTermsSchemaType>({
    resolver: zodResolver(loanTermsSchema),
    defaultValues: {
      terms: false,
    },
  });

  const handleCreateLoan = async () => {
    setErrorMessage(null);

    try {
      await apiClient<LoanTypes>("/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId,
          userId,
          dueDate,
        }),
      });
      setIsSuccessOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro inesperado ao criar empréstimo.");
      }
    }
  };

  const handleSuccessRedirect = () => {
    setIsSuccessOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(handleCreateLoan)}>
        <FieldGroup>
          <Controller
            name="terms"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="mt-2 flex items-center gap-2 text-white">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-4 w-4"
                  />
                  <Label
                    className="cursor-pointer truncate text-xs"
                    onClick={() => field.onChange(!field.value)}
                  >
                    Concordo com os Termos de Uso e a Política de Privacidade
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
          className="mt-4 h-10 w-full cursor-pointer bg-[#032342] text-sm hover:bg-[#032342]"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Confirmando..." : "Confirmar Aluguel"}
          <HugeiconsIcon icon={ArrowRight05Icon} size={32} strokeWidth={1} />
        </Button>
      </form>

      <AlertDialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#0a3968]">
              Empréstimo Confirmado! 🎉
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              O seu aluguel foi registrado com sucesso. Você tem até a data de
              devolução para aproveitar a sua leitura.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleSuccessRedirect}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Voltar para o Início
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoanTermsForm;
