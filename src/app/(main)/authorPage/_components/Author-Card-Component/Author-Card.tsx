import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";

import AuthorSearch from "../Author-Search-Component/Author-Search";

interface AuthorCardProps {
  authorCount: number;
}

const AuthorCard = ({ authorCount }: AuthorCardProps) => {
  return (
    <Card className="my-5 w-full shrink-0 border-none">
      <CardContent className="flex flex-col gap-4 p-6 md:p-10 xl:p-14">
        <div className="flex flex-col space-y-6">
          <h2 className="text-5xl font-normal italic text-[#052647]">
            Nossos Autores
          </h2>
          <p className="text-lg font-normal text-slate-950">
            Explore o panteão de mentes literárias que compõem nosso acervo. De{" "}
            <br />
            clássicos imortais a vozes contemporâneas que moldam o pensamento
            <br />
            morderno.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-slate-100 p-4 xl:gap-4">
          <div className="flex items-center gap-3">
            <p className="text-lg font-semibold text-[#052647]">
              {authorCount}
            </p>
            <Badge className="bg-green-800 text-sm text-white">
              Autores ativos
            </Badge>
          </div>

          <div>
            <AuthorSearch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;
