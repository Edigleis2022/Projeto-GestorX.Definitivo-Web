"use client";

import { useState } from "react";
import { ArrowLeft, Menu, User, Box, ShoppingCart, Phone } from "lucide-react";
import Link from "next/link";
import SlideBarMenu from "../slideBar/Menu/page";
import SlideBarPerfil from "../slideBar/Perfil/page";
import SlideBarEstoque from "../slideBar/Estoque/page";
import SlideBarEstante from "../slideBar/Estante/page";
import SlideBarContatos from "../slideBar/Contatos/page";
import IconButton from "@/components/iconButton";
import AbaPesquisar from "@/components/abaPesquisar";

export default function TelaPrincipal() {
  const [activeSidebar, setActiveSidebar] = useState<null | string>(null);
  const [query, setQuery] = useState("");

  const openSidebar = (name: string) => setActiveSidebar(name);
  const closeSidebar = () => setActiveSidebar(null);

  return (
    <main className="flex w-screen min-h-screen bg-white">
      <section className="flex flex-1 flex-col">

        <header className="flex items-center justify-between bg-amber-700 text-white px-6 py-5">
          
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-gray-400" />
          </Link>

          <AbaPesquisar query={query} setQuery={setQuery} />

          <button onClick={() => openSidebar("menu")} className="hover:opacity-80 transition-opacity">
            <Menu className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          </button>
        </header>

        <div className="flex flex-1 items-center justify-center">
          <nav className="flex flex-col space-items-20 space-y-20 px-2 py-3 text-6xl text-center 
          grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-space-10">
            <IconButton icon={User} label="" iconClassName="w-20 h-20" labelClassName="text-center" onClick={() => openSidebar("perfil")} />
            <IconButton icon={Box} label="" iconClassName="w-20 h-20" labelClassName="text-center" onClick={() => openSidebar("estoque")} />
            <IconButton icon={ShoppingCart} label="" iconClassName="w-20 h-20" labelClassName="text-center" onClick={() => openSidebar("estante")} />
            <IconButton icon={Phone} label="" iconClassName="w-20 h-20" labelClassName="text-center" onClick={() => openSidebar("contatos")} />
          </nav>
        </div>
      </section>

      <SlideBarMenu isOpen={activeSidebar === "menu"} onClose={closeSidebar} />
      <SlideBarPerfil isOpen={activeSidebar === "perfil"} onClose={closeSidebar} />
      <SlideBarEstoque isOpen={activeSidebar === "estoque"} onClose={closeSidebar} />
      <SlideBarEstante isOpen={activeSidebar === "estante"} onClose={closeSidebar} />
      <SlideBarContatos isOpen={activeSidebar === "contatos"} onClose={closeSidebar}  />

    </main>
  );
}
