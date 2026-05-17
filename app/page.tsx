"use client";

import { useState } from "react";
import { InputandLabel } from "@/components/inputandLabel";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import styleEstrutura from "@/ConjuntosCss/TelasCss/EstruturaTelasIniciais.module.css";
import styleInput from "@/ConjuntosCss/ComponentesCss/Input.module.css";

export default function CadastrarUsuario() {

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

    } catch (error) {

      console.log(error);

      alert("E-mail ou senha inválidos");
    }
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
            loading="eager"
          />

          <h1 className={styleEstrutura.tituloCabecalho}>
            Cadastrar Usuario
          </h1>
        </div>

        <div className={styleInput.containerInputs}>

          <InputandLabel
            id="user-email"
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            className={styleInput.containerElementoInput}
            containerClassName={styleInput.containerElementoContainer}
          />

          <InputandLabel
            id="user-password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={(e) =>
              setForm({
                ...form,
                senha: e.target.value
              })
            }
            className={styleInput.containerElementoInput}
            containerClassName={styleInput.containerElementoContainer}
          />

        </div>

        <div className={styleEstrutura.containerConjuntoLinks}>
          
          <Link
            href="/telas/CriarUsuario"
            className={styleEstrutura.containerLinks}
          >
            Criar Novo Usuario
          </Link>

          <Link
            href="/telas/RedefinirSenha"
            className={styleEstrutura.containerLinks}
          >
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