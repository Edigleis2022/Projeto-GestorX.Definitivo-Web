"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

export default function AcessarProduto() {
  const [categoria, setCategoria] = useState("");
  const [tipoBusca, setTipoBusca] = useState("");
  const [produto, setProduto] = useState("");
  const [produtosAleatorios, setProdutosAleatorios] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);

  // Exibe mensagens de erro para o usuário
  const [erro, setErro] = useState("");

  // Executa automaticamente quando a página é carregada
  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    // Recupera credenciais salvas no login
    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");

    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Authorization:", "Basic " + btoa(`${email}:${senha}`));

    try {
      const response = await fetch("http://localhost:8080/produtos", {

        // Envia Basic Auth para o Spring Security
        headers: {
          //Basic Auth
          Authorization: "Basic " + btoa(`${email}:${senha}`),
          
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const erro = await response.text();

        throw new Error(`Erro ${response.status}: ${erro}`);
      }

      const dados = await response.json();

      console.log("Produtos encontrados:", dados);

      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);

      setErro("Não foi possível carregar os produtos.");
    }
  }

  /* useEffect(() => {
    const sorteados = produtosEstoque
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    setProdutosAleatorios(sorteados);
  }, []); */

  return (
    <main className={styleSlideBar.paginaPrincipal}>
      <header className={styleSlideBar.paginaCabecalho}>
        <Link href="/" className={styleSlideBar.paginaLinkLogo}>
          <Image className={styleSlideBar.paginaLogo} src={Logo} alt="Logo" width={80} height={80} />
        </Link>

        <h1 className={styleSlideBar.paginaTitulo}>Acessar Produto</h1>

        <div className={styleSlideBar.paginaEspacoCabecalho} />
      </header>

      <div className={styleSlideBar.paginaLinkRetornoArea}>
        <Link href="/telas/TelasInternas/TelaPrincipal" className={styleSlideBar.paginaLinkRetorno}>
          Voltar
        </Link>
      </div>

      <section className={styleSlideBar.paginaSecaoComEspaco}>
        <div className={styleSlideBar.filtroGrid}>
          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Filtrar por:</label>
            <select className={styleSlideBar.campoSelect} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecione</option>
              <option value="nome">Nome do Produto</option>
              <option value="codigo">Codigo do Produto</option>
              <option value="categoria">Categoria</option>
              <option value="fornecedor">Fornecedor</option>
              <option value="marca">Marca</option>
            </select>
          </div>

          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Tipo de busca:</label>
            <select className={styleSlideBar.campoSelect} value={tipoBusca} onChange={(e) => setTipoBusca(e.target.value)}>
              <option value="">Selecione</option>
              <option value="contem">Contem</option>
              <option value="igual">Igual</option>
              <option value="diferente">Diferente</option>
            </select>
          </div>

          <div className={styleSlideBar.campoFiltro}>
            <label className={styleSlideBar.campoRotulo}>Produto:</label>
            <Input placeholder="Digite o nome ou codigo" value={produto} onChange={(e) => setProduto(e.target.value)} />
          </div>

          <div className={styleSlideBar.campoAcao}>
            <Button>Buscar</Button>
          </div>
        </div>

        <div className={styleSlideBar.tabelaContainer}>
          <table className={styleSlideBar.tabela}>
            <thead className={styleSlideBar.tabelaCabecalho}>
              <tr>
                <th className={styleSlideBar.tabelaCelula}>Codigo</th>
                <th className={styleSlideBar.tabelaCelula}>Nome</th>
                <th className={styleSlideBar.tabelaCelula}>Categoria</th>
                <th className={styleSlideBar.tabelaCelula}>Marca</th>
                <th className={styleSlideBar.tabelaCelula}>Fornecedor</th>
                <th className={styleSlideBar.tabelaCelula}>Preco</th>
                <th className={styleSlideBar.tabelaCelula}>Estoque Minimo</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id} className={styleSlideBar.tabelaLinha}>
                  <td className={styleSlideBar.tabelaCelula}>{produto.codigo}</td>
                  <td className={styleSlideBar.tabelaCelula}>{produto.nome}</td>
                  <td className={styleSlideBar.tabelaCelula}>{produto.categoria}</td>
                  <td className={styleSlideBar.tabelaCelula}>{produto.marca}</td> 
                  <td className={styleSlideBar.tabelaCelula}>{produto.fornecedor}</td>
                  <td className={styleSlideBar.tabelaCelula}>{produto.preco}</td>
                  <td className={styleSlideBar.tabelaCelula}>{produto.estoqueMinimo}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
