import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const CardComponent = () => {
  return (
    <Card className="w-90 my-5 bg-[#0a3968] lg:w-full xl:w-[80%]">
      <CardContent>
        <div className="flex flex-col space-y-7 p-2">
          <Button className="h-8 w-40 rounded-full bg-green-300 text-xs text-black hover:bg-green-300">
            Curadoria da semana
          </Button>
          <h2 className="my-2 text-xl italic text-white xl:text-5xl">
            The libary is open.
          </h2>
          <p className="text-xs text-slate-400 xl:text-lg">
            Mergulhe em uma coleção meticulosamente selecionada onde cada volume
            conta história além das páginas.
          </p>

          <div className="my-2 flex items-center gap-2">
            <Button className="cursor-pointer bg-[#062c52] p-4 hover:bg-[#062c52] xl:p-8 xl:text-sm">
              Começar Leitura
            </Button>
            <Button className="cursor-pointer bg-slate-500 p-4 hover:bg-slate-500 xl:p-8 xl:text-sm">
              Ver Catálogo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
