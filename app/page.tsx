"use client";

import { useState } from "react";
import { Input } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
<<<<<<< HEAD
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/components/ConjuntosCss/CadastrarUsuario.module.css";
=======
import Link from "next/link"
import { useAuth } from "../app/context/AuthContext";
import styles from "@/components/ConjuntosCss/TelasCss/CadastrarUsuario.module.css";

>>>>>>> 2ac094510826f94d801ff441fae38d58de083d99

export default function CadastrarUsuario() {

    const {
    logout,
    usuario,
  } = useAuth();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  async function entrar() {

    try {

      await login(
        form.email,
        form.senha
      );

    } catch {

      alert(
        "Nao foi possivel acessar sua conta."
      );
    }
  }

  return (
    <main className={styles.mainCadastrar}>
      <div className={styles.painelCadastrar}>
        <div className={styles.containerCabecalho}>
          <Image
            className={styleCadastrar.containerImagem}
            src={Logo}
            alt="Logo"
            width={200}
            height={300}
          />
          <h1 className={styles.tituloCabecalho}>Cadastrar Usuario</h1>
        </div>

        <div className={styles.containerInputs}>
          <Input
            id="user-email"
            label="E-mail"
            type="email"
            placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={styles.containerElementoInput}
            containerClassName={styles.containerElementoInput}
          />

          <Input
            id="user-password"
            label="Senha"
            type="password"
            placeholder=" "
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            className={styles.containerElementoInput}
            containerClassName={styles.containerElementoInput}
          />

        </div>

        <div className={styles.containerConjuntoLinks}>
          <Link href="/telas/CriarUsuario" className={styles.containerLinks}>
            Criar Novo Usuario
          </Link>
          <Link href="/telas/RedefinirSenha" className={styles.containerLinks}>
            Redefinir Senha
          </Link>

        </div>

        <Button onClick={entrar}>
          Entrar
        </Button>

      </div>

    </main>
    
  );
}