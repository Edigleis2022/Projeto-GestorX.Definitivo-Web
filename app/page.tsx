"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styleCadastrar from "@/ConjuntosCss/TelasCss/CadastrarUsuario.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

export default function CadastrarUsuario() {
  const router = useRouter();

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
    <main className={styleCadastrar.containerPrincipal}>
      <div className={styleCadastrar.painelCadastrar}>
        <div className={styleCadastrar.containerCabecalho}>
          <Image
            className={styleCadastrar.containerImagem}
            src={Logo}
            alt="Logo"
            width={200}
            height={300}
          />
          <h1 className={styleCadastrar.tituloCabecalho}>Cadastrar Usuario</h1>
        </div>

        <div className={styleInput.containerInputs}>
          <Input
            id="user-email"
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={styleInput.containerElementoInput}
            containerClassName={styleInput.containerElementoContainer}
          />
          <InputandLabel
            id="user-password"
            label="Senha"
            type="password"
            placeholder=" "
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            className={styleInput.containerElementoInput}
            containerClassName={styleInput.containerElementoContainer}
          />
        </div>

        <div className={styleCadastrar.containerConjuntoLinks}>
          <Link href="/telas/CriarUsuario" className={styleCadastrar.containerLinks}>
            Criar Novo Usuario
          </Link>
          <Link href="/telas/RedefinirSenha" className={styleCadastrar.containerLinks}>
            Redefinir Senha
          </Link>

        </div>

        <Button onClick={entrar}>Cadastrar</Button>
      </div>

    </main>
    
  );
}