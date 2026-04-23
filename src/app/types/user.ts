import { BookTypes } from "./book";
import { LoanTypes } from "./loan";

export interface UserTypes {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  imageProfile?: string;
  role: string;
  active: string;
  books?: BookTypes[];
  loan: LoanTypes[];
}
