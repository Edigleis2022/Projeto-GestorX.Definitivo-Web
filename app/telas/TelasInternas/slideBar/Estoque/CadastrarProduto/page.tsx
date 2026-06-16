"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function CadastrarProduto() {

  // ==========================================
  // Estados do formulário
  // ==========================================
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [estoqueMinimo, setEstoqueMinimo] = useState("");
  const [categoria, setCategoria] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // ==========================================
  // Função para salvar produto
  // ==========================================
  async function cadastrarProduto() {

    setMensagem("");
    setErro("");

    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");

    try {

      const response = await fetch(
        "http://localhost:8080/produtos",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            // Basic Auth
            Authorization:
              "Basic " + btoa(`${email}:${senha}`),
          },

          body: JSON.stringify({
            codigo,
            nome,
            marca,

            // Conversões para número
            preco: Number(preco),
            quantidade: Number(quantidade),
            estoqueMinimo: Number(estoqueMinimo),

            categoria,
          }),
        }
      );

      if (!response.ok) {

        const textoErro = await response.text();

        throw new Error(
          `Erro ${response.status}: ${textoErro}`
        );
      }

      const produto = await response.json();

      console.log("Produto salvo:", produto);

      setMensagem("Produto cadastrado com sucesso!");

      // Limpa formulário
      setCodigo("");
      setNome("");
      setMarca("");
      setPreco("");
      setQuantidade("");
      setEstoqueMinimo("");
      setCategoria("");

    } catch (error) {

      console.error(error);

      setErro("Erro ao cadastrar produto.");
    }
  }

  return (
    <main className={styleSlideBar.paginaPrincipal}>

      {/* ==========================
           Cabeçalho
      =========================== */}
      <header className={styleSlideBar.paginaCabecalho}>

        <Link
          href="/"
          className={styleSlideBar.paginaLinkLogo}
        >
          <Image
            className={styleSlideBar.paginaLogo}
            src={Logo}
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>
          Cadastrar Produto
        </h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />

      </header>

      {/* ==========================
           Botão Voltar
      =========================== */}
      <div className={styleSlideBar.paginaLinkRetornoArea}>
        <Link
          href="/telas/TelasInternas/slideBar/Estoque/AcessarProduto"
          className={styleSlideBar.paginaLinkRetorno}
        >
          Voltar
        </Link>
      </div>

      {/* ==========================
           Formulário
      =========================== */}
      <section className={styleSlideBar.paginaSecaoComEspaco}>

        <div className={styleSlideBar.filtroGrid}>

          <Input
            label="Código"
            placeholder=" "
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <Input
            label="Nome"
            placeholder=" "
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            label="Marca"
            placeholder=" "
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />

          <Input
            label="Preço"
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />

          <Input
            label="Quantidade"
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          <Input
            label="Estoque Mínimo"
            type="number"
            value={estoqueMinimo}
            onChange={(e) =>
              setEstoqueMinimo(e.target.value)
            }
          />

          {/* Categoria */}
          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>
              Categoria
            </label>

            <select
              className={styleSlideBar.campoSelect}
              value={categoria}
              onChange={(e) =>
                setCategoria(e.target.value)
              }
            >
              <option value="">
                Selecione
              </option>

              <option value="ELETRONICA">
                Eletrônica
              </option>

              <option value="ALIMENTO">
                Alimento
              </option>

              <option value="ROUPA">
                Roupa
              </option>

              <option value="LIMPEZA">
                Limpeza
              </option>

              <option value="OUTROS">
                Outros
              </option>
            </select>
          </div>

        </div>

        {/* Mensagens */}
        {mensagem && (
          <p>
            {mensagem}
          </p>
        )}

        {erro && (
          <p>
            {erro}
          </p>
        )}

        {/* Botão salvar */}
        <div className={styleSlideBar.campoAcao}>
          <Button
            type="button"
            onClick={cadastrarProduto}
          >
            Salvar Produto
          </Button>
        </div>

      </section>

    </main>
  );
}