export type Usuario = {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "FUNCIONARIO";
};