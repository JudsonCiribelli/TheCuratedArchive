"use server";
import { apiClient } from "../lib/api";
import { AuthorBooksType } from "../types/authorBook";
import { BookTypes } from "../types/book";

export async function getBooks() {
  try {
    const response = await apiClient<{ data: BookTypes[] }>("/books", {
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

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

export async function searchBooks(title: string) {
  try {
    const response = await apiClient<BookTypes[]>(
      `/books/title?title=${encodeURIComponent(title)}`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error ao buscar livro!");
  }
}
