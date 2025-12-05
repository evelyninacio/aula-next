import Link from "next/link";

// Este componente é assíncrono e roda no servidor por padrão no App Router.
// O Next.js vai pré-renderizar esta página em tempo de build (SSG),
// desde que o fetch seja estático (sem coisas baseadas em cookies, headers dinâmicos, etc.)
export default async function Home() {
  // valor padrão caso a API falhe
  let horario = "Não foi possível carregar o horário da API.";

  try {
    const res = await fetch(
      "https://worldtimeapi.org/api/timezone/America/Sao_Paulo"
    );

    if (res.ok) {
      const data = await res.json();
      horario = data.datetime;
    }
  } catch (error) {
    // Tratamos o erro para não quebrar o build na Vercel
    console.error("Erro ao buscar horário da API:", error);
  }

  return (
    <div>
      <h1>Página SSG</h1>

      <h3>Horário vindo de uma API externa no momento da build/pre-renderização:</h3>

      {horario}
      <br />

      <Link href="/isr">Ir para ISR</Link>
      <br/>
      <Link href="/ssr">Ir para SSR</Link>
      <br/>
      <Link href="/csr">Ir para CSR</Link>
    </div>
  );
}
