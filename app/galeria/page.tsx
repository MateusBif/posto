/* eslint-disable @next/next/no-img-element */

import { createClient } from "@/lib/supabase/server";

type Foto = {
  id: string;
  titulo: string;
  descricao: string | null;
  imagem_url: string;
  categoria: string | null;
  destaque: boolean;
  ativo: boolean;
  ordem: number;
};

export default async function Galeria() {
  const supabase = await createClient();

  const { data: fotosData, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("ativo", true)
    .order("destaque", { ascending: false })
    .order("ordem", { ascending: true });

  const fotos: Foto[] = fotosData || [];

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#36b970] text-xl font-bold text-white">
              PG
            </div>

            <div>
              <h1 className="text-lg font-extrabold leading-tight text-[#173690]">
                Posto Gasparin
              </h1>

              <p className="text-xs text-gray-500">
                Parada, praticidade e atendimento
              </p>
            </div>
          </a>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="/"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              Início
            </a>

            <a
              href="/o-posto"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              O Posto
            </a>

            <a
              href="/servicos"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              Serviços
            </a>

            <a href="/galeria" className="font-bold text-[#36b970]">
              Galeria
            </a>

            <a
              href="/promocoes"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              Promoções
            </a>

            <a
              href="/contato"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
              Contato
            </a>

            <a
              href="/admin/login"
              className="rounded-lg bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#2fa864]"
            >
              Login
            </a>
          </nav>

          {/* MENU MOBILE */}
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none rounded-lg bg-[#36b970] px-4 py-2 text-xl text-white">
              ☰
            </summary>

            <div className="absolute right-0 top-14 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
              <nav className="flex flex-col">
                <a
                  href="/"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Início
                </a>

                <a
                  href="/o-posto"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  O Posto
                </a>

                <a
                  href="/servicos"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Serviços
                </a>

                <a
                  href="/galeria"
                  className="rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#36b970]"
                >
                  Galeria
                </a>

                <a
                  href="/promocoes"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Promoções
                </a>

                <a
                  href="/contato"
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Contato
                </a>

                <a
                  href="/admin/login"
                  className="mt-2 rounded-lg bg-[#36b970] px-5 py-3 text-center font-bold text-[#173690] transition hover:bg-[#2fa864]"
                >
                  Login
                </a>
              </nav>
            </div>
          </details>
        </div>
      </header>

      {/* BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#173690] to-[#36b970]">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white">
              Galeria
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Conheça o Posto Gasparin
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
              Confira imagens da nossa estrutura, dos espaços e dos serviços
              disponíveis no posto.
            </p>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TÍTULO */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-semibold uppercase tracking-wider text-[#36b970]">
              Fotos
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nossa estrutura
            </h2>

            <p className="mt-4 text-gray-600">
              Conheça nossos espaços e tudo o que preparamos para oferecer
              mais praticidade e conforto aos nossos clientes.
            </p>
          </div>

          {/* ERRO */}
          {error ? (
            <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <h3 className="text-lg font-bold text-red-700">
                Não foi possível carregar a galeria
              </h3>

              <p className="mt-2 text-sm text-red-600">
                Tente novamente mais tarde.
              </p>
            </div>
          ) : fotos.length === 0 ? (
            /* GALERIA VAZIA */
            <div className="mt-12 rounded-2xl bg-white p-12 text-center shadow-sm">
              <div className="text-6xl">📷</div>

              <h3 className="mt-5 text-xl font-bold text-[#173690]">
                Em breve, novas fotos!
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-gray-600">
                Estamos preparando nossa galeria para mostrar todos os
                detalhes do Posto Gasparin.
              </p>
            </div>
          ) : (
            /* FOTOS */
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fotos.map((foto) => (
                <article
                  key={foto.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={foto.imagem_url}
                      alt={foto.titulo}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* DESTAQUE */}
                    {foto.destaque && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#36b970] px-3 py-1 text-xs font-bold text-white shadow">
                        ⭐ Destaque
                      </span>
                    )}

                    {/* GRADIENTE */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />

                    {/* INFORMAÇÕES SOBRE A FOTO */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      {foto.categoria && (
                        <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                          {foto.categoria}
                        </span>
                      )}

                      <h3 className="text-lg font-bold">
                        {foto.titulo}
                      </h3>

                      {foto.descricao && (
                        <p className="mt-1 text-sm text-white/90">
                          {foto.descricao}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#36b970] py-14">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#173690] sm:text-4xl">
            Quer conhecer o Posto Gasparin?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#173690]">
            Consulte nossa localização e encontre o melhor caminho para
            chegar até nós.
          </p>

          <a
            href="/contato"
            className="mt-7 inline-flex rounded-full bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-[#10286b]"
          >
            Ver contato e localização
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#173690] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h3 className="text-xl font-extrabold">
              Posto Gasparin
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/80">
              Parada, praticidade e atendimento.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Navegação</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
              <a href="/" className="hover:text-white">
                Início
              </a>

              <a href="/o-posto" className="hover:text-white">
                O Posto
              </a>

              <a href="/servicos" className="hover:text-white">
                Serviços
              </a>

              <a href="/galeria" className="hover:text-white">
                Galeria
              </a>

              <a href="/promocoes" className="hover:text-white">
                Promoções
              </a>

              <a href="/contato" className="hover:text-white">
                Contato
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Contato</h3>

            <div className="mt-4 space-y-3 text-sm text-white/80">
              <p>Telefone: (00) 0000-0000</p>
              <p>WhatsApp: (00) 00000-0000</p>
              <p>Endereço: informação provisória</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-white/70 sm:px-6">
            © {new Date().getFullYear()} Posto Gasparin. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}