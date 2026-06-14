"use client";

import { useState } from "react";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";

import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";
import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";

export default function CriarUsuario() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    cargo: "",
    estabelecimento: "",
    tipoUsuario: "ADMIN",
  });

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">(
    "sucesso",
  );

  function atualizar(campo: string, valor: string) {
    setForm({ ...form, [campo]: valor });
  }

  async function criarConta() {
    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setTipoMensagem("erro");
        setMensagem(data.message || "Erro ao criar usuário.");

        return;
      }

      setTipoMensagem("sucesso");
      setMensagem("Usuário criado com sucesso!");

      console.log(data);
    } catch (error) {
      console.error(error);

      setTipoMensagem("erro");
      setMensagem("Erro ao conectar com o servidor.");
    }
  }

  return (
    <main className={styleEstrutura.containerPrincipal}>
      <div className={styleEstrutura.containerCriarUsuario}>
        <div className={styleEstrutura.containerCabecalhoLogo}>
          <Link href="/" className={styleEstrutura.containerLinkLogo}>
            <Image
              className={styleEstrutura.containerImageLogo}
              src={Logo}
              alt="Logo"
              width={200}
              height={300}
            />
          </Link>
          <h1 className={styleEstrutura.containerLinkTexto}>
            Demonstracao do Sistema
          </h1>
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
              label="Cargo"
              value={form.cargo}
              placeholder=" "
              onChange={(e) => atualizar("cargo", e.target.value)}
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
          </div>

          <div className={styleInput.containerInputs}>
            <InputandLabel
              label="Senha"
              value={form.senha}
              placeholder=" "
              onChange={(e) => atualizar("senha", e.target.value)}
              className={styleInput.containerElementoInput}
              containerClassName={styleInput.containerElementoContainer}
            />
          </div>
          <div> 
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

        {mensagem && (
          <p
            className={
              tipoMensagem === "sucesso"
                ? styleEstrutura.mensagemSucesso
                : styleEstrutura.mensagemErro
            }
          >
            {mensagem}
          </p>
        )}

        <Button type="button" onClick={criarConta}>
          Criar Conta
        </Button>
      </div>
    </main>
  );
}
