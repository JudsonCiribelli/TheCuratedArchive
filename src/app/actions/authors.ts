"use server";
import { apiClient } from "../lib/api";
import { AuthorTypes } from "../types/author";

export async function getAuthors() {
  try {
    const response = await apiClient<AuthorTypes>("/author", {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAuthorById(authorId: string): Promise<AuthorTypes> {
  try {
    const response = await apiClient<AuthorTypes>(`/author/${authorId}`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Autor não  encontrado");
  }
}

export async function getAllAuthors(): Promise<AuthorTypes[]> {
  try {
    const response = await apiClient<AuthorTypes[]>("/author", {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error ao buscar autores");
  }
}

export async function searchAuthor(name: string) {
  try {
    const response = await apiClient<AuthorTypes[]>(
      `/author/name?name=${encodeURIComponent(name)}`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error ao buscar autor!");
  }
}
