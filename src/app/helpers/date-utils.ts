export function extractYear(date: string | Date | undefined | null): string {
  if (!date) return "Ano desconhecido";

  try {
    const dateObject = new Date(date);

    return dateObject.getFullYear().toString();
  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return "Ano inválido";
  }
}
