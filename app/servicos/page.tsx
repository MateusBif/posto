import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Servicos() {
  const supabase = await createClient();

  const [{ data: servicos }, { data: posto }] = await Promise.all([
    supabase
      .from("services")
      .select("*")
      .eq("ativo", true)
      .order("destaque", { ascending: false })
      .order("ordem", { ascending: true }),

    supabase
      .from("site_config")
      .select("nome_posto, slogan, logo_url")
      .eq("id", 1)
      .single(),
  ]);

  const nome = posto?.nome_posto || "Posto Gasparin";
  const slogan = posto?.slogan || "Parada, praticidade e atendimento";

  return (
    <main className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">

            {posto?.logo_url ? (
              <img
                src={posto.logo_url}
                alt={nome}
                className="h-11 w-11 rounded-full object-contain"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#36b970] text-xl font-bold text-white">
                PG
              </div>
            )}

            <div>
              <h1 className="text-lg font-extrabold leading-tight text-[#173690]">
                {nome}
              </h1>

              <p className="text-xs text-gray-500">
                {slogan}
              </p>
            </div>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-7 md:flex">

            <Link
              href="/"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              Início
            </Link>

            <Link
              href="/o-posto"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              O Posto
            </Link>

            <Link
              href="/servicos"
              className="font-bold text-[#36b970]"
            >
              Serviços
            </Link>

            <Link
              href="/galeria"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              Galeria
            </Link>

            <Link
              href="/promocoes"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              Promoções
            </Link>

            <Link
              href="/contato"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              Contato
            </Link>

            <Link
              href="/admin/login"
              className="rounded-lg bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#2fa864]"
            >
              Login
            </Link>

          </nav>

          {/* MENU MOBILE */}
          <details className="relative md:hidden">

            <summary className="cursor-pointer list-none rounded-lg bg-[#36b970] px-4 py-2 text-xl text-white">
              ☰
            </summary>

            <div className="absolute right-0 top-14 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">

              <nav className="flex flex-col">

                <Link
                  href="/"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Início
                </Link>

                <Link
                  href="/o-posto"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  O Posto
                </Link>

                <Link
                  href="/servicos"
                  className="rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#173690]"
                >
                  Serviços
                </Link>

                <Link
                  href="/galeria"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Galeria
                </Link>

                <Link
                  href="/promocoes"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Promoções
                </Link>

                <Link
                  href="/contato"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Contato
                </Link>

                <Link
                  href="/admin/login"
                  className="mt-2 rounded-lg bg-[#36b970] px-5 py-3 text-center font-bold text-[#173690] transition hover:bg-[#2fa864]"
                >
                  Login
                </Link>

              </nav>
            </div>
          </details>

        </div>
      </header>

      {/* BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#173690] to-[#36b970]">

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <span className="inline-block rounded-full bg-[#36b970] px-4 py-2 text-sm font-bold text-[#173690]">
              Nossos serviços
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Tudo para deixar sua parada mais prática
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
              Conheça os serviços disponíveis no {nome} e encontre
              tudo o que precisa para continuar sua viagem com tranquilidade.
            </p>

          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="bg-gray-50 py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* TÍTULO */}
          <div className="mx-auto max-w-2xl text-center">

            <span className="font-semibold uppercase tracking-wider text-[#36b970]">
              Estrutura e atendimento
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Serviços para você
            </h2>

            <p className="mt-4 text-gray-600">
              Conheça tudo o que o {nome} oferece para tornar
              sua parada mais confortável e prática.
            </p>

          </div>

          {/* GRID */}
          {servicos && servicos.length > 0 ? (

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {servicos.map((servico) => (

                <article
                  key={servico.id}
                  className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    servico.destaque
                      ? "border-[#36b970]"
                      : "border-gray-200"
                  }`}
                >

                  {/* IMAGEM */}
                  {servico.imagem_url && (
                    <div className="relative h-56 overflow-hidden">

                      <img
                        src={servico.imagem_url}
                        alt={servico.nome}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      {servico.destaque && (
                        <span className="absolute left-4 top-4 rounded-full bg-[#36b970] px-3 py-1 text-xs font-bold text-[#173690]">
                          ⭐ Destaque
                        </span>
                      )}

                    </div>
                  )}

                  {/* CONTEÚDO */}
                  <div className="p-7">

                    {/* ÍCONE */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#36b970]/10 text-3xl transition group-hover:bg-[#36b970]">
                      <span className="transition group-hover:scale-110">
                        {servico.icone || "🔧"}
                      </span>
                    </div>

                    {/* NOME */}
                    <h3 className="mt-6 text-xl font-bold text-gray-900">
                      {servico.nome}
                    </h3>

                    {/* DESCRIÇÃO */}
                    <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
                      {servico.descricao}
                    </p>

                    {/* LINHA */}
                    <div className="mt-6 h-1 w-12 rounded-full bg-[#36b970]" />

                  </div>

                </article>

              ))}

            </div>

          ) : (

            /* NENHUM SERVIÇO */
            <div className="mt-12 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

              <div className="text-5xl">
                🔧
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#173690]">
                Nenhum serviço disponível no momento
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-gray-600">
                Estamos preparando nossas informações.
                Em breve você poderá conhecer os serviços disponíveis.
              </p>

            </div>

          )}

        </div>
      </section>

      {/* DESTAQUE */}
      <section className="bg-white py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="overflow-hidden rounded-3xl bg-[#173690]">

            <div className="grid lg:grid-cols-2">

              {/* TEXTO */}
              <div className="p-8 sm:p-12 lg:p-14">

                <span className="font-semibold uppercase tracking-wider text-[#36b970]">
                  Para quem está na estrada
                </span>

                <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                  Uma parada pensada para você
                </h2>

                <p className="mt-5 leading-8 text-white/90">
                  Seja para abastecer, fazer uma pausa ou utilizar
                  os serviços disponíveis, o {nome} busca oferecer
                  praticidade durante sua jornada.
                </p>

                <Link
                  href="/contato"
                  className="mt-8 inline-flex rounded-full bg-[#36b970] px-6 py-3 font-bold text-[#173690] transition hover:bg-[#2fa864]"
                >
                  Entre em contato
                </Link>

              </div>

              {/* ÁREA VISUAL */}
              <div className="flex min-h-[280px] items-center justify-center bg-[#173690] p-10">

                <div className="text-center">

                  <div className="text-7xl">
                    🚛
                  </div>

                  <p className="mt-5 text-xl font-bold text-white">
                    Praticidade na sua viagem
                  </p>

                  <p className="mt-2 text-white/80">
                    Conte com o {nome}.
                  </p>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#36b970] py-14">

        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">

          <h2 className="text-3xl font-extrabold text-[#173690] sm:text-4xl">
            Precisa de mais informações?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#173690]">
            Entre em contato com o {nome} para saber mais
            sobre os serviços disponíveis.
          </p>

          <Link
            href="/contato"
            className="mt-7 inline-flex rounded-full bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-[#10276c]"
          >
            Fale conosco
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#173690] text-white">

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">

          {/* SOBRE */}
          <div>

            <h3 className="text-xl font-extrabold">
              {nome}
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/80">
              {slogan}
            </p>

          </div>

          {/* NAVEGAÇÃO */}
          <div>

            <h3 className="font-bold">
              Navegação
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">

              <Link href="/" className="hover:text-white">
                Início
              </Link>

              <Link href="/o-posto" className="hover:text-white">
                O Posto
              </Link>

              <Link href="/servicos" className="hover:text-white">
                Serviços
              </Link>

              <Link href="/galeria" className="hover:text-white">
                Galeria
              </Link>

              <Link href="/promocoes" className="hover:text-white">
                Promoções
              </Link>

              <Link href="/contato" className="hover:text-white">
                Contato
              </Link>

            </div>
          </div>

          {/* CONTATO */}
          <div>

            <h3 className="font-bold">
              Contato
            </h3>

            <div className="mt-4 space-y-3 text-sm text-white/80">

              <p>
                Entre em contato conosco para obter informações.
              </p>

              <Link
                href="/contato"
                className="inline-block font-semibold text-[#36b970] hover:text-white"
              >
                Ver informações de contato →
              </Link>

            </div>

          </div>

        </div>

        {/* RODAPÉ */}
        <div className="border-t border-white/10">

          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-white/70 sm:px-6">

            © {new Date().getFullYear()} {nome}. Todos os direitos reservados.

          </div>

        </div>

      </footer>

    </main>
  );
}