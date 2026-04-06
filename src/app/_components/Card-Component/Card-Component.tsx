import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const CardComponent = () => {
  return (
    <Card className="my-5 w-full shrink-0 border-none bg-[#0a3968] shadow-md">
      <CardContent className="p-6 md:p-10 xl:p-14">
        <div className="flex flex-col space-y-6">
          <Button className="h-8 w-max rounded-full bg-green-300 px-4 text-xs font-semibold text-[#0a3968] hover:bg-green-400">
            Curadoria da semana
          </Button>

          <h2 className="text-3xl italic text-white md:text-4xl xl:text-5xl">
            The library is open.
          </h2>

          <p className="max-w-2xl text-sm text-slate-300 md:text-base xl:text-lg">
            Mergulhe em uma coleção meticulosamente selecionada onde cada volume
            conta uma história além das páginas.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button className="cursor-pointer bg-[#062c52] px-6 py-5 text-sm hover:bg-[#041d36] xl:px-8 xl:py-6 xl:text-base">
              Começar Leitura
            </Button>
            <Button className="cursor-pointer bg-slate-600 px-6 py-5 text-sm text-white hover:bg-slate-700 xl:px-8 xl:py-6 xl:text-base">
              Ver Catálogo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
