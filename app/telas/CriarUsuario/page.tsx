"use client";

import { useState } from "react";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import EstruturaTelasIniciais from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

export default function CriarUsuario() { 
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    cargo: "",
    estabelecimento: "",
  });

  function atualizar(campo: string, valor: string) {
    setForm({ ...form, [campo]: valor });
  }

  async function criarConta() {

  try {

    const response = await api.post(
      "/usuarios",
      form
    );

    alert("Novo usuario criado com sucesso!");

    console.log(response.data);

  } catch (error: any) {

    alert(
      error.response?.data?.message ??
      "Nao foi possivel criar o usuario."
    );
  }
}

  return (
    <main className={EstruturaTelasIniciais.containerPrincipal}>
      <div className={EstruturaTelasIniciais.containerCriarUsuario}>
        <div className={EstruturaTelasIniciais.containerCabecalhoLogo}>
          <Link href="/" className={EstruturaTelasIniciais.containerLinkLogo}>
            <Image
              className={EstruturaTelasIniciais.containerImageLogo}
              src={Logo}
              alt="Logo"
              width={200}
              height={300}
            />
          </Link>
          <h1 className={EstruturaTelasIniciais.containerLinkTexto}>Criar Novo Usuario</h1>
        </div>

        <div className={styleInput.containerOrdenaçãoInputs}>
          <div className={styleInput.containerInputs}>
            <InputandLabel
              label="Nome Completo"
              value={form.nome}
              placeholder=" "
              onChange={(e) => atualizar("nome", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
            <InputandLabel
              label="CPF"
              value={form.cpf}
              placeholder=" "
              onChange={(e) => atualizar("cpf", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
            <InputandLabel
              label="E-mail"
              type="email"
              value={form.email}
              placeholder=" "
              onChange={(e) => atualizar("email", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
          </div>

          <div className={styleInput.containerInputs}>
            <InputandLabel
              label="Senha"
              type="password"
              value={form.senha}
              placeholder=" "
              onChange={(e) => atualizar("senha", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
            <InputandLabel
              label="Cargo"
              value={form.cargo}
              placeholder=" "
              onChange={(e) => atualizar("cargo", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
            <InputandLabel
              label="Estabelecimento"
              value={form.estabelecimento}
              placeholder=" "
              onChange={(e) => atualizar("estabelecimento", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
          </div>
        </div>

        <Button onClick={criarConta}>Criar Conta</Button>
      </div>
    </main>
  );
}