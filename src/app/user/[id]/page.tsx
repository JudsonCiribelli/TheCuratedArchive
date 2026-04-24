import { AccountSetting02Icon, Book02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { redirect } from "next/navigation";

import { Card, CardContent } from "@/app/_components/ui/card";
import { getUserHistory } from "@/app/actions/user";
import { formatDate } from "@/app/helpers/formatDate";
import { getToken, getUser } from "@/app/lib/authToken";

import UserForm from "./_components/User-Form/User-Form";
import UserHistory from "./_components/User-History/User-history";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { id } = await params;
  console.log(id);

  const userLoan = await getUserHistory();

  const token = await getToken();
  if (!token) redirect("/login");

  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="items-center xl:mx-20">
      <div className="m-4 flex flex-col gap-6 xl:mt-20">
        <Card className="my-5 shrink-0 border-none bg-slate-200 p-5 shadow-md">
          <CardContent className="flex w-full flex-col space-y-1">
            <h1 className="text-xl font-semibold italic text-[#0a3968] xl:text-5xl">
              The Curated Archivie
            </h1>
            <p className="text-sm xl:text-lg">
              Bem-vindo ao seu painel pessoal. Aqui você pode gerenciar suas
              credenciais de <br /> acesso e revisar sua jornada literária
              através do tempo.
            </p>
          </CardContent>
        </Card>

        <div className="xl:flex">
          {/* Div com formulario */}
          <div className="flex flex-col rounded-lg bg-slate-100 p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-green-200 p-4">
                <HugeiconsIcon icon={AccountSetting02Icon} size={28} />
              </div>

              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-[#0a3968]">
                  Configurações de Conta
                </h2>
                <span className="text-xs text-slate-400">
                  ATUALIZE SUA IDENTIDADE
                </span>
              </div>
            </div>

            {/* Form */}
            <div>
              <UserForm
                name={user.name}
                email={user.email}
                phone={user.phone}
                imageProfile={user.imageProfile}
                id={user.id}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-1 flex-col rounded-lg border border-slate-100 bg-white p-6 shadow-sm xl:ml-6 xl:mt-0">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-[#0a3968]">
                <HugeiconsIcon icon={Book02Icon} size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#0a3968]">
                  Histórico de Aluguéis
                </h2>
                <p className="text-sm text-slate-500">
                  Seu percurso através de obras clássicas e contemporâneas.
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-lg border border-slate-200">
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 rounded-t-lg bg-slate-100 p-4 text-xs font-bold tracking-wider text-slate-500">
                <p>OBRA & AUTOR</p>
                <p>DATA DE RETIRADA</p>
                <p>STATUS</p>
              </div>

              <div className="flex flex-col rounded-b-lg bg-white">
                {userLoan && userLoan.length > 0 ? (
                  userLoan.map((loan) => (
                    <UserHistory
                      id={loan.id}
                      token={token}
                      key={loan.id}
                      title={loan.book.title}
                      bookImage={loan.book.bookImage}
                      autor={loan.book.author?.name || "Autor não informado"}
                      loanDate={formatDate(loan.loanDate)}
                      status={loan.book.status}
                    />
                  ))
                ) : (
                  <p className="p-8 text-center text-sm text-slate-500">
                    Você ainda não possui histórico de aluguéis.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
