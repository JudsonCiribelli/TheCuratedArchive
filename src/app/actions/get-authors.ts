"use server";
import { apiClient } from "../lib/api";
import { AuthorTypes } from "../types/author";

export async function getAuthors() {
  try {
    const response = await apiClient<AuthorTypes[]>("/author", {
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
