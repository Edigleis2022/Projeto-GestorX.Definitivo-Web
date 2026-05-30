"use client";

import { useState } from "react";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import LinkInfo from "@/components/linkInfo";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { useRouter } from "next/navigation";

import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";
import styleLinkInfo from "@/ConjuntosCss/ComponentesCss/LinksInfo.module.css";

export default function CadastrarUsuario() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  async function entrar() {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error ?? "Nao foi possivel acessar sua conta.");
      return;
    }

    router.push("/telas/TelaPrincipal");
  }

  return (
    <main className={styleEstrutura.containerPrincipal}>
      <div className={styleEstrutura.containerCadastrar}>
        <div className={styleEstrutura.containerCabecalho}>
          <Image
            className={styleEstrutura.containerImagem}
            src={Logo}
            alt="Logo"
            width={200}
            height={300}
          />
          <h1 className={styleEstrutura.tituloCabecalho}>Cadastrar Usuario</h1>
        </div>

        <div className={styleInput.containerInputs}>
          <InputandLabel
            id="user-email"
            label="E-mail"
            type="email"
            placeholder=" "
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

        <div className={styleLinkInfo.containerConjuntoLinks}>
          <LinkInfo modo="link" href="/telas/CriarUsuario" text="Criar Novo Usuario" />
          <LinkInfo modo="link" href="/telas/RedefinirSenha" text="Redefinir Senha" />
        </div>

        <Button onClick={entrar}>Entrar</Button>
      </div>
    </main>
  );
}