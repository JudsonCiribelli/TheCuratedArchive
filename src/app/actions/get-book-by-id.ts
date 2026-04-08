"use server";
import { apiClient } from "../lib/api";
import { BookTypes } from "../types/book";

export async function getBookById(id: string): Promise<BookTypes> {
  try {
    const response = await apiClient<BookTypes>(`/books/${id}`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error ao buscar dados do livro");
  }
}
