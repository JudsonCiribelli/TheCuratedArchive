export const formatDate = (
  date: string | Date | null | undefined,
  includeTime: boolean = false,
): string => {
  if (!date) return "-";

  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) return "Data inválida";

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return new Intl.DateTimeFormat("pt-BR", options).format(parsedDate);
};
