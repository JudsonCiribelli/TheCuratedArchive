/* eslint-disable @next/next/no-img-element */
import {
  AlertDiamondIcon,
  Calendar02Icon,
  CalendarSyncIcon,
  CheckmarkCircle03Icon,
  ClipboardMinusIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Badge } from "../_components/ui/badge";
import { Card, CardContent } from "../_components/ui/card";
import { Separator } from "../_components/ui/separator";
import { getBookById } from "../actions/get-books";
import { getToken, getUser } from "../lib/authToken";
import CardInfo from "./_components/Card-Info-Component/Card-Info-Component";
import LoanTermsForm from "./_components/Loan-Terms-Form/Loan-Terms-Forms";

interface LoanPageProps {
  searchParams: Promise<{ bookId?: string }>;
}

const LoanPage = async ({ searchParams }: LoanPageProps) => {
  const { bookId } = await searchParams;

  const today = new Date();
  const returnDate = new Date();
  returnDate.setDate(today.getDate() + 14);
  const formattedReturnDate = new Intl.DateTimeFormat("pt-BR").format(
    returnDate,
  );

  const apiDueDate = returnDate.toISOString();

  if (!bookId) redirect("/");

  const book = await getBookById(bookId);

  const token = await getToken();
  const user = await getUser();
  if (!user || !token) redirect("/login");

  return (
    <div className="mx-auto items-center">
      <div className="m-4 flex flex-col gap-6 xl:mt-20">
        <div className="space-y-2">
          <h2 className="text-2xl italic text-[#0a3968] xl:text-5xl">
            Confirmação de Aluguel
          </h2>
          <p className="text-sm xl:text-lg">
            Revise os detalhes antes de prosseguir com o empréstimo digital.
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 md:flex-row">
          <div className="h-120 xl:h-140 xl:w-120 flex w-80 shrink-0 flex-col gap-4 overflow-hidden rounded-lg bg-slate-200 p-4 md:w-48">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/files/${book.bookImage}`}
              alt={`Capa de ${book.title}`}
              className="h-full w-full rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl text-[#072949] xl:text-3xl">
                {book.title}
              </h2>
              <p>{book.author.name}</p>
            </div>

            <div className="mb-2 mt-6 flex items-center gap-4">
              <Badge className="bg-green-400 text-sm text-white">
                Digital Edition
              </Badge>
              <p className="truncate text-xs font-normal">ISBN: {book.id}</p>
            </div>
          </div>
          {/* div com dados */}
          <div className="flex flex-col gap-4">
            <div className="rounded-lg bg-slate-200 p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-[#072949]">
                <HugeiconsIcon icon={ClipboardMinusIcon} />
                Resumo do Empréstimo
              </h2>

              <CardInfo
                title="PERÍODO"
                data="14 dias"
                icon={<HugeiconsIcon icon={Calendar02Icon} />}
              />

              <Separator />

              <CardInfo
                title="DATA DE DEVOLUÇÃO"
                data={formattedReturnDate}
                icon={<HugeiconsIcon icon={CalendarSyncIcon} />}
              />
              <Separator />

              <CardInfo
                title="CUSTO TOTAL"
                data="Grátis (Digital Lending)"
                icon={<HugeiconsIcon icon={CheckmarkCircle03Icon} />}
              />
              <Separator />
            </div>
            <div className="rounded-sm bg-slate-400 px-2 py-4">
              <LoanTermsForm
                bookId={book.id}
                userId={user?.id}
                token={token}
                dueDate={apiDueDate}
              />
            </div>

            <Link
              href="/"
              className="cursor-pointer text-center text-[#072949] underline"
            >
              Cancelar e voltar à biblioteca
            </Link>

            <Card>
              <CardContent className="flex items-center gap-1">
                <HugeiconsIcon
                  icon={AlertDiamondIcon}
                  color="#C91717"
                  size={32}
                />
                <p className="text-xs">
                  Sua reserva será sincronizada instantaneamente com seu
                  dispositov Kindle ou navegador
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanPage;
