"use client";
import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/components/ConjuntosCss/CadastrarUsuario.module.css";

export default function CadastrarUsuario() {
  const router = useRouter();

  const [form, setForm] = useState({
    codigo: "",
    senha: "",
  });

  function entrar() {
    alert("Usuário cadastrado com sucesso!");
    router.push("/telas/TelaPrincipal"); 
  }

  return (
    <main className={styles.mainCadastrar}>
      <div className={styles.painelCadastrar}>
        
        <div className={styles.containerCabecalho}
        >
          <Image className={styles.containerImagem}
            src={Logo}
            alt="Logo"
            width={200}
            height={300}
          />
          <h1 className={styles.tituloCabecalho}
          >Cadastrar Usuário</h1>
        </div>

        <div className={styles.containerInputs} 
        >
        <Input
          id="user-code"
          label="Código de Usuário"
          value={form.codigo}
          onChange={(e) => setForm({ ...form, codigo: e.target.value })}
          className={styles.containerElementoInput}
          containerClassName={styles.containerElementoInput}
        />

        <Input
          id="user-password"
          label="Senha"
          type="password"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          className={styles.containerElementoInput}
          containerClassName={styles.containerElementoInput}
        />
        </div>
        <div className={styles.containerConjuntoLinks}>
          <Link href="/telas/CriarUsuario"
          className={styles.containerLinks}>
            Criar Novo Usuário</Link>
          <Link href="/telas/RedefinirSenha" 
          className={styles.containerLinks}>
            Redefinir Senha</Link>
        </div>

        <Button onClick={entrar}>Cadastrar</Button>

      </div>
    </main>
  );
}
