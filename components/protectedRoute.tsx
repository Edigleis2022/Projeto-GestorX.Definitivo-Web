"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const {
    autenticado,
    loading,
  } = useAuth();

  useEffect(() => {

    if (
      !loading &&
      !autenticado
    ) {

      router.push("/");
    }

  }, [
    autenticado,
    loading,
    router,
  ]);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!autenticado) {
    return null;
  }

  return children;
}