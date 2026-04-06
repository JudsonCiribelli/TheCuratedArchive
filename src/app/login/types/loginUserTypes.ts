export type LoginUserType = {
  name: string;
  email: string;
  phone: string;
  role: "ADMIN" | "CLIENT";
  data: {
    token: string;
    user: {
      name: string;
      email: string;
      role: string;
    };
  };
  timestamp: string;
};
