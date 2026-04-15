import { apiClient } from "../lib/api";
import { getToken } from "../lib/authToken";
import { HistoryLoan } from "../types/historyLoan";

export async function getUserHistory(): Promise<HistoryLoan[]> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    const response = await apiClient<HistoryLoan[]>("/loan/my-history", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar emprestimos.");
  }
}
