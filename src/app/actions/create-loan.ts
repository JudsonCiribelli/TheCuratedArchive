"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { apiClient } from "../lib/api";
import { getToken } from "../lib/authToken";

export async function createLoan(bookId: string, userId: string) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    await apiClient("/loan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookId,
        userId,
      }),
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao criar empréstimo:", error);
    throw new Error("Falha ao realizar o empréstimo");
  }

  redirect("/");
}
