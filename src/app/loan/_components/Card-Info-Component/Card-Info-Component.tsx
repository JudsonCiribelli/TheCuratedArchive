import React from "react";

interface CardInfoProps {
  title: string;
  data: string;
  icon: React.ReactNode;
}

const CardInfo = ({ title, data, icon }: CardInfoProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <h2 className="text-sm text-slate-500">{title}</h2>
        <p className="text-xs">{data}</p>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default CardInfo;
