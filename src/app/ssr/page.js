import Link from "next/link";

// Esta flag diz ao Next que esta página deve ser SEMPRE dinâmica,
// ou seja, renderizada a cada requisição (SSR).
export const dynamic = "force-dynamic";

export default async function SSRPage() {
  let horario = "Não foi possível carregar o horário da API.";

  try {
    const res = await fetch(
      "https://worldtimeapi.org/api/timezone/America/Sao_Paulo",
      {
        cache: "no-store", // garante que não haja cache entre requisições
      }
    );

    if (res.ok) {
  const data = await res.json();
  // pega só o campo datetime, em vez de imprimir o objeto todo
  horario = data.datetime;
}
  } catch (error) {
    console.error("Erro ao buscar horário da API (SSR):", error);
  }

  return (
    <div>
      <h1>Página SSR</h1>

      <h3>Horário vindo da API no momento de CADA requisição:</h3>
        <br/>
      {horario}

      <p>
        Se recarregar a página, o horário deve mudar sempre (enquanto a API responder).
      </p>



      <Link href="/">Voltar para Home</Link>
    </div>
  );
}
