import { apiClient } from "../lib/api";
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
