"use server";
import { apiClient } from "../lib/api";
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
