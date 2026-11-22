import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function OPosto() {
  const supabase = await createClient();

  const { data: posto } = await supabase
    .from("site_config")
    .select("*")
    .eq("id", 1)
    .single();

  const nome = posto?.nome_posto || "Posto Gasparin";
  const slogan = posto?.slogan || "Parada, praticidade e atendimento";
  const titulo = posto?.titulo_apresentacao || "Conheça o nosso posto";
  const descricao =
    posto?.descricao ||
    "Conheça o Posto Gasparin, um espaço preparado para oferecer praticidade, qualidade e atendimento.";
  const historia =
    posto?.historia ||
    "Nossa história e trajetória serão apresentadas aqui.";

  const diferenciais = [
    posto?.diferencial1,
    posto?.diferencial2,
    posto?.diferencial3,
    posto?.diferencial4,
  ].filter(Boolean);

  const estruturas = [
    posto?.estrutura1,
    posto?.estrutura2,
    posto?.estrutura3,
    posto?.estrutura4,
  ].filter(Boolean);

  const iconesDiferenciais = ["⛽", "🤝", "📍", "⭐"];
  const iconesEstrutura = ["⛽", "🛒", "🚗", "🏪"];

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

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
          <nav className="hidden items-center gap-7 lg:flex">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-[#36b970]"
            >
              Início
            </Link>

            <Link
              href="/o-posto"
              className="font-semibold text-[#173690]"
            >
              O Posto
            </Link>

            <Link
              href="/servicos"
              className="font-medium text-gray-700 hover:text-[#36b970]"
            >
              Serviços
            </Link>

            <Link
              href="/galeria"
              className="font-medium text-gray-700 hover:text-[#36b970]"
            >
              Galeria
            </Link>

            <Link
              href="/promocoes"
              className="font-medium text-gray-700 hover:text-[#36b970]"
            >
              Promoções
            </Link>

            <Link
              href="/contato"
              className="font-medium text-gray-700 hover:text-[#36b970]"
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
          <details className="relative lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-gray-300 text-xl">
              ☰
            </summary>

            <nav className="absolute right-0 top-14 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">

              <Link
                href="/"
                className="block rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                Início
              </Link>

              <Link
                href="/o-posto"
                className="block rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#173690]"
              >
                O Posto
              </Link>

              <Link
                href="/servicos"
                className="block rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                Serviços
              </Link>

              <Link
                href="/galeria"
                className="block rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                Galeria
              </Link>

              <Link
                href="/promocoes"
                className="block rounded-lg px-4 py-3 hover:bg-gray-50"
              >
                Promoções / Sorteios
              </Link>

              <Link
                href="/contato"
                className="block px-4 py-3 hover:text-[#36b970]"
              >
                Contato
              </Link>

              <Link
                href="/admin/login"
                className="block rounded-lg bg-[#36b970] px-5 py-3 text-center font-bold text-[#173690] transition hover:bg-[#2fa864]"
              >
                Login
              </Link>
            </nav>
          </details>
        </div>
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="bg-gradient-to-r from-[#173690] to-[#36b970] px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-white">
            {nome}
          </span>

          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {titulo}
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
            {descricao}
          </p>

        </div>
      </section>

      {/* SOBRE O POSTO */}
      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          {/* IMAGEM */}
          <div>
            <div className="aspect-[4/3] rounded-3xl bg-gray-100 p-5">

              <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300">

                {posto?.logo_url ? (
                  <div className="flex h-full w-full items-center justify-center bg-white p-8">
                    <img
                      src={posto.logo_url}
                      alt={`Logo ${nome}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl">📷</div>

                    <h3 className="mt-5 text-xl font-bold text-gray-800">
                      Foto do posto
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                      A imagem oficial poderá ser adicionada posteriormente
                      através do painel administrativo.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* TEXTO */}
          <div>
            <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
              Sobre nós
            </span>

            <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              {titulo}
            </h2>

            <p className="mt-6 whitespace-pre-line leading-7 text-gray-600">
              {descricao}
            </p>

            <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
              {historia}
            </p>
          </div>

        </div>
      </section>

      {/* DIFERENCIAIS */}
      {diferenciais.length > 0 && (
        <section className="bg-gray-50 px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">

            <div className="text-center">
              <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
                Diferenciais
              </span>

              <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
                Por que escolher o {nome}?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                Conheça os diferenciais que fazem parte da experiência oferecida aos nossos clientes.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {diferenciais.map((item: string, index: number) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#36b970]/15 text-2xl">
                    {iconesDiferenciais[index]}
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold">
                    Diferencial {index + 1}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>
      )}

      {/* ESTRUTURA */}
      {estruturas.length > 0 && (
        <section className="px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">

            <div className="mb-12 text-center">
              <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
                Nossa estrutura
              </span>

              <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
                Tudo o que você precisa
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {estruturas.map((item: string, index: number) => (
                <div
                  key={index}
                  className="rounded-2xl bg-[#173690] p-8 text-white"
                >
                  <div className="text-4xl">
                    {iconesEstrutura[index]}
                  </div>

                  <h3 className="mt-6 text-xl font-black">
                    {item}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/80">
                    Conheça nossa estrutura e aproveite tudo o que oferecemos.
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#173690] px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">

          <div>
            <h2 className="text-3xl font-black text-white">
              Quer conhecer nossos serviços?
            </h2>

            <p className="mt-2 text-white/80">
              Consulte todos os serviços disponíveis.
            </p>
          </div>

          <Link
            href="/servicos"
            className="rounded-xl bg-[#36b970] px-7 py-4 font-extrabold text-gray-950 transition hover:bg-[#2fa864]"
          >
            Ver serviços
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 px-5 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <h3 className="font-extrabold">
              {nome}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Grupo Potencial
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {nome}. Todos os direitos reservados.
          </p>

        </div>
      </footer>

    </main>
  );
}