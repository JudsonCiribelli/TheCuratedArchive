export type LoginUserType = {
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "CLIENT";
  token: string;
};
