"use client"; // Necessário para usar hooks no App Router

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CSRPage() {
  const [horario, setHorario] = useState("Carregando...");
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregarHorario() {
      try {
        const res = await fetch(
          "https://worldtimeapi.org/api/timezone/America/Sao_Paulo"
        );

        if (res.ok) {
          const data = await res.json();
          setHorario(data.datetime);
        } else {
          setErro(true);
          setHorario("Erro ao carregar horário.");
        }
      } catch (e) {
        setErro(true);
        setHorario("Erro ao carregar horário.");
      }
    }

    carregarHorario();
  }, []);

  return (
    <div>
      <h1>Página CSR</h1>

      <h3>Horário carregado apenas no navegador</h3>

      <br/>
      {horario}

      {erro && <p>Ocorreu um erro ao buscar o horário da API.</p>}

        <br/>
      <Link href="/">Voltar para Home</Link>
    </div>
  );
}
