export type RegisterUserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "ADMIN" | "CLIENT";
  createdAt: string;
  uptadedAt: string;
};
