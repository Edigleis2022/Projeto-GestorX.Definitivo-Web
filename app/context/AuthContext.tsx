"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { gerarBasicToken } from "@/lib/auth";
import { Usuario } from "@/types/usuario";

type AuthContextType = {
  usuario: Usuario | null;
  token: string | null;
  autenticado: boolean;
  loading: boolean;

  login: (
    email: string,
    senha: string
  ) => Promise<void>;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
  useState(true);

  useEffect(() => {

    const tokenStorage =
      localStorage.getItem("token");

    const usuarioStorage =
      localStorage.getItem("usuario");

    if (
      tokenStorage &&
      usuarioStorage
    ) {

      setToken(tokenStorage);

      setUsuario(
        JSON.parse(usuarioStorage)
      );
    }

    setLoading(false);

  }, []);

  async function login(
    email: string,
    senha: string
  ) {

    const token =
      gerarBasicToken(email, senha);
    console.log(token);
    const response = await api({
      method: "GET",

      url: "/usuarios/me",

      headers: {
        Authorization: token,
      },
    });

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "usuario",
      JSON.stringify(response.data)
    );

    setToken(token);

    setUsuario(response.data);

    router.push("/telas/TelaPrincipal");
  }

  function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("usuario");

    setToken(null);

    setUsuario(null);

    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        autenticado: !!usuario,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}