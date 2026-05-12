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

  const { autenticado } = useAuth();

  useEffect(() => {

    if (!autenticado) {
      router.push("/");
    }

  }, [autenticado]);

  if (!autenticado) {
    return null;
  }

  return children;
}