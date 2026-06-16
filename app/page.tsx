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
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">("erro");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    setMensagem("");
    setCarregando(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          senha: form.senha,
        }),
      });

      const usuario = await response.json();

      if (!response.ok) {
        setTipoMensagem("erro");
        setMensagem(usuario.message || "E-mail ou senha inválidos.");
        setCarregando(false);
        return;
      }

      console.log("Usuário logado:", usuario);

      // Salva os dados do usuário logado
      localStorage.setItem("email", form.email);

      console.log("Email salvo:", localStorage.getItem("email"));
      console.log("Senha salva:", localStorage.getItem("senha"));

      // Salva a senha temporariamente para usar no Basic Auth
      // (somente durante a fase de desenvolvimento)
      localStorage.setItem("senha", form.senha);

      // Salva os dados retornados pela API
      localStorage.setItem("usuario", JSON.stringify(usuario));

      setTipoMensagem("sucesso");
      setMensagem("Login realizado com sucesso!");

      setTimeout(() => {
        router.push("/telas/TelasInternas/TelaPrincipal");
      }, 900);
    } catch (error) {
      console.error(error);

      setTipoMensagem("erro");
      setMensagem("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
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
          <LinkInfo
            modo="link"
            href="/telas/TelasCadastro/CriarUsuario"
            text="Criar Novo Usuario"
          />
          <LinkInfo
            modo="link"
            href="/telas/TelasInternas/TelasCadastro/RedefinirSenha"
            text="Redefinir Senha"
          />
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

        <Button type="button" onClick={entrar} disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </Button>
      </div>
    </main>
  );
}
