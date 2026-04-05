import { LoanTypes } from "./loan";

export interface UserTypes {
  name: string;
  eamil: string;
  password: string;
  phone: string;
  imageProfile?: string;
  role: string;
  active: string;
  loan: LoanTypes[];
}
