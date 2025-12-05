import Link from "next/link";

// Dizer ao Next que esta rota deve ser revalidada a cada 30 segundos.
// Isso equivale ao "revalidate: 30" do getStaticProps no Pages Router.
export const revalidate = 30;

export default async function ISRPage() {
  let horario = "Não foi possível carregar o horário da API.";

  try {
    const res = await fetch(
     "https://worldtimeapi.org/api/timezone/America/Sao_Paulo"
    );

    if (res.ok) {
  const data = await res.json();
  // pega só o campo datetime, em vez de imprimir o objeto todo
  horario = data.datetime;
}
  } catch (error) {
    console.error("Erro ao buscar horário da API (ISR):", error);
  }

  return (
    <div>
      <h1>Página ISR</h1>

      <h3>
        Horário vindo de uma API externa com revalidação automática (ISR):
      </h3>

      {horario}
      <br />

      <p>
        A cada 30 segundos, a próxima visita dispara uma nova pré-renderização
        em background.
      </p>

     
     
      <Link href="/">Voltar para Home</Link>
    </div>
  );
}
