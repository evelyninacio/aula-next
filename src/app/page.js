import Link from "next/link";


// Este componente é assíncrono e roda no servidor por padrão no App Router.
// O Next.js vai pré-renderizar esta página em tempo de build (SSG),
// desde que o fetch seja estático (sem coisas baseadas em cookies, headers dinâmicos, etc.)
export default async function Home() {
  const res = await fetch(
    "https://worldtimeapi.org/api/timezone/America/Sao_Paulo"
  );
  const data = await res.json();

  const horario = data.datetime;

  return (
    <div>
      <h1>Página SSG</h1>

      <h3>Horário vindo de uma API externa no momento da build/pre-renderização:</h3>

      {horario}
      <br />

      <Link href="/sobre">Ir para Sobre</Link>
    </div>
  );
}
