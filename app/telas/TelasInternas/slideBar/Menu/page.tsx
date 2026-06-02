"use client";

import { useState } from "react";
import { X, User, Box, ShoppingCart } from "lucide-react";
import SlideBarPerfil from "../Perfil/page";
import SlideBarEstoque from "../Estoque/page";
import SlideBarEstante from "../Estante/page";
import SlideBarContatos from "../Contatos/page";
import IconButtonSlideBar from "@/components/iconButton/IconButtonSlideBar";

import styleSlideBar from "@/ConjuntosCss/TelasCss/SlideBar.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideBarMenu({ isOpen, onClose }: Props) {
  const [isPerfilOpen, setIsPerfilOpen] = useState(false);
  const [isEstoqueOpen, setIsEstoqueOpen] = useState(false);
  const [isEstanteOpen, setIsEstanteOpen] = useState(false);
  const [isContatosOpen, setIsContatosOpen] = useState(false);

  return (
    <>
      <div className={`${styleSlideBar.containerPrincipal} ${isOpen ? styleSlideBar.open : styleSlideBar.closed}`}>
        <div className={styleSlideBar.containerElementos}>
          <div className={styleSlideBar.containerElementoBotao}>
            <h2 className={styleSlideBar.containerTextoElementoBotao}>Menu</h2>
            <button onClick={onClose} className={styleSlideBar.containerButtonElementoBotao}>
              <X className={styleSlideBar.containerXElementoBotao}/>
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            <IconButtonSlideBar icon={User} label="Perfil" onClick={() => setIsPerfilOpen(true)} />
            <IconButtonSlideBar icon={Box} label="Estoque" onClick={() => setIsEstoqueOpen(true)} />
            <IconButtonSlideBar icon={ShoppingCart} label="Estante" onClick={() => setIsEstanteOpen(true)} />
            <IconButtonSlideBar icon={User} label="Contatos" onClick={() => setIsContatosOpen(true)} />
          </nav>
        </div>
      </div>

      <SlideBarPerfil isOpen={isPerfilOpen} onClose={() => setIsPerfilOpen(false)} />
      <SlideBarEstoque isOpen={isEstoqueOpen} onClose={() => setIsEstoqueOpen(false)} />
      <SlideBarEstante isOpen={isEstanteOpen} onClose={() => setIsEstanteOpen(false)} />
      <SlideBarContatos isOpen={isContatosOpen} onClose={() => setIsContatosOpen(false)} />
    </>
  );
}