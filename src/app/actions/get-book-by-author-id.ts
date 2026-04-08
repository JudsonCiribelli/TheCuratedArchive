"use server";
import { apiClient } from "../lib/api";
import { AuthorBooksType } from "../types/authorBook";

export async function getBookByAuthorId(
  id: string,
): Promise<AuthorBooksType[]> {
  try {
    const response = await apiClient<AuthorBooksType[]>(`/books/author/${id}`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error ao buscar livro deste autor.");
  }
}
