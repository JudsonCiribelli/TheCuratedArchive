"use server";
import { apiClient } from "../lib/api";
import { AuthorTypes } from "../types/author";

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
