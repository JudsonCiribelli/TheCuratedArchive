"use server";
import { apiClient } from "../lib/api";
import { AuthorTypes } from "../types/author";

export async function getAuthorById(authorId: string) {
  try {
    const response = await apiClient<AuthorTypes>(`/author/:${authorId}`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    return "";
  }
}
