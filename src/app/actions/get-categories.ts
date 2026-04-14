"use server";
import { apiClient } from "../lib/api";
import { BookByCategory } from "../types/booksByCategory";
import { categoryType } from "../types/category";

export async function getCategory() {
  try {
    const data = await apiClient<categoryType[]>("/category", {
      method: "GET",
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error ao buscar categoria");
  }
}

export async function getCategoryData(
  categoryId: string,
): Promise<categoryType[]> {
  try {
    const data = await apiClient<categoryType[]>(`/category/${categoryId}`, {
      method: "GET",
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error ao buscar categoria");
  }
}

export async function getBookByCategoryId(
  categoryId: string,
): Promise<BookByCategory[]> {
  try {
    const response = await apiClient<BookByCategory[]>(
      `/books/category/${categoryId}`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error ao buscar livros");
  }
}
