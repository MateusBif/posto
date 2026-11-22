"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Servico = {
  id: string;
  nome: string;
  descricao: string;
  imagem_url: string | null;
  icone: string | null;
  ativo: boolean;
  destaque: boolean;
  ordem: number;
};

type Galeria = {
  id: string;
  titulo: string;
  descricao: string | null;
  imagem_url: string;
  categoria: string | null;
  destaque: boolean;
  ativo: boolean;
  ordem: number;
};

type Promocao = {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  imagem_url: string | null;
  data_inicio: string | null;
  data_fim: string | null;
  regulamento: string | null;
  ativo: boolean;
  destaque: boolean;
};

export default function Home() {
  const supabase = createClient();

  const [menuAberto, setMenuAberto] = useState(false);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [galeria, setGaleria] = useState<Galeria[]>([]);
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      const hoje = new Date().toISOString().split("T")[0];

      const [servicosResult, galeriaResult, promocoesResult] =
        await Promise.all([
          supabase
            .from("services")
            .select("*")
            .eq("ativo", true)
            .order("destaque", { ascending: false })
            .order("ordem", { ascending: true })
            .limit(4),

          supabase
            .from("gallery")
            .select("*")
            .eq("ativo", true)
            .order("destaque", { ascending: false })
            .order("ordem", { ascending: true })
            .limit(6),

          supabase
            .from("promotions")
            .select("*")
            .eq("ativo", true)
            .order("destaque", { ascending: false })
            .order("data_inicio", { ascending: false }),
        ]);

      if (!servicosResult.error) {
        setServicos(servicosResult.data || []);
      }

      if (!galeriaResult.error) {
        setGaleria(galeriaResult.data || []);
      }

      if (!promocoesResult.error) {
        const promocoesValidas = (promocoesResult.data || []).filter(
          (promocao: Promocao) => {
            const inicio =
              !promocao.data_inicio || promocao.data_inicio <= hoje;

            const fim = !promocao.data_fim || promocao.data_fim >= hoje;

            return inicio && fim;
          }
        );

        setPromocoes(promocoesValidas.slice(0, 3));
      }

      setCarregando(false);
    }

    carregarDados();
  }, []);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* CABEÇALHO */}

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* LOGO */}

          <a href="/" className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#36b970] text-xl font-black text-[#173690]">
              PG
            </div>

            <div>
              <h1 className="text-lg font-extrabold leading-none text-[#173690] sm:text-xl">
                Posto Gasparin
              </h1>

              <p className="mt-1 text-xs font-medium text-gray-500">
                Grupo Potencial
              </p>
            </div>

          </a>

          {/* MENU DESKTOP */}

          <nav className="hidden items-center gap-7 lg:flex">

            <a
              href="/"
              className="font-semibold text-[#36b970]"
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

            <a
              href="/galeria"
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
            >
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
              className="rounded-xl bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:brightness-95"
            >
              Login
            </a>

          </nav>

          {/* BOTÃO MOBILE */}

          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-xl text-[#173690] lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            {menuAberto ? "✕" : "☰"}
          </button>

        </div>

        {/* MENU MOBILE */}

        {menuAberto && (
          <div className="border-t border-gray-200 bg-white px-5 py-4 lg:hidden">

            <nav className="mx-auto flex max-w-7xl flex-col">

              {[
                ["Início", "/"],
                ["O Posto", "/o-posto"],
                ["Serviços", "/servicos"],
                ["Galeria", "/galeria"],
                ["Promoções e Sorteios", "/promocoes"],
                ["Contato", "/contato"],
              ].map(([nome, link]) => (
                <a
                  key={link}
                  href={link}
                  onClick={fecharMenu}
                  className="border-b border-gray-100 py-4 font-medium text-gray-700 transition hover:text-[#36b970]"
                >
                  {nome}
                </a>
              ))}

              <a
                href="/admin/login"
                onClick={fecharMenu}
                className="mt-4 rounded-xl bg-[#36b970] px-5 py-3 text-center font-bold text-[#173690]"
              >
                Login administrativo
              </a>

            </nav>

          </div>
        )}

      </header>

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#173690]">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#36b970]/20 blur-2xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#36b970]/20 blur-2xl" />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* TEXTO */}

          <div className="max-w-2xl">

            <span className="inline-flex rounded-full border border-[#36b970]/40 bg-[#36b970]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#36b970]">
              Grupo Potencial
            </span>

            <h2 className="mt-7 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Sua parada de confiança

              <span className="mt-2 block text-[#36b970]">
                na estrada.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              Abasteça, descanse e aproveite nossos serviços.
              O Posto Gasparin está preparado para oferecer
              praticidade, conforto e qualidade durante sua jornada.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <a
                href="/servicos"
                className="rounded-xl bg-[#36b970] px-7 py-4 text-center font-extrabold text-[#173690] shadow-lg transition hover:brightness-95"
              >
                Conheça nossos serviços
              </a>

              <a
                href="/contato"
                className="rounded-xl border border-white/40 bg-white/5 px-7 py-4 text-center font-bold text-white transition hover:bg-white hover:text-[#173690]"
              >
                Como chegar
              </a>

            </div>

          </div>

          {/* IMAGEM PRINCIPAL */}

          <div className="relative">

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl">

              {galeria.length > 0 && galeria[0]?.imagem_url ? (
                <img
                  src={galeria[0].imagem_url}
                  alt={galeria[0].titulo || "Posto Gasparin"}
                  className="h-[360px] w-full object-cover sm:h-[440px]"
                />
              ) : (
                <div className="flex h-[360px] flex-col items-center justify-center bg-gradient-to-br from-[#36b970] to-[#173690] p-10 text-center sm:h-[440px]">

                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#36b970] text-3xl font-black text-[#173690]">
                    PG
                  </div>

                  <h3 className="mt-7 text-2xl font-bold text-white">
                    Posto Gasparin
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                    Sua parada de confiança na estrada.
                  </p>

                </div>
              )}

            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-[#36b970] p-5 shadow-xl sm:block">

              <p className="text-sm font-bold text-[#173690]">
                Grupo Potencial
              </p>

              <p className="mt-1 text-xs text-[#173690]/80">
                Qualidade e confiança
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ACESSOS RÁPIDOS */}

      <section className="bg-gray-50 px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
              Tudo em um só lugar
            </span>

            <h2 className="mt-3 text-3xl font-black text-[#173690] sm:text-4xl">
              Encontre o que precisa
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Acesse rapidamente as principais informações do Posto Gasparin.
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icone: "⛽",
                titulo: "O Posto",
                descricao: "Conheça nossa estrutura e história.",
                link: "/o-posto",
              },
              {
                icone: "🔧",
                titulo: "Serviços",
                descricao: "Confira os serviços disponíveis.",
                link: "/servicos",
              },
              {
                icone: "📷",
                titulo: "Galeria",
                descricao: "Veja fotos de nossa estrutura.",
                link: "/galeria",
              },
              {
                icone: "🎁",
                titulo: "Promoções",
                descricao: "Confira nossas ofertas e sorteios.",
                link: "/promocoes",
              },
            ].map((item) => (
              <a
                key={item.link}
                href={item.link}
                className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#36b970]/40 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#36b970]/10 text-2xl">
                  {item.icone}
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-[#173690]">
                  {item.titulo}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.descricao}
                </p>

                <span className="mt-5 block font-bold text-[#36b970]">
                  Saiba mais →
                </span>

              </a>
            ))}

          </div>

        </div>

      </section>

      {/* SERVIÇOS */}

      <section className="px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
                Comodidade para você
              </span>

              <h2 className="mt-3 text-3xl font-black text-[#173690] sm:text-4xl">
                Nossos serviços
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                Conheça os serviços disponíveis para tornar sua parada
                mais prática e confortável.
              </p>

            </div>

            <a
              href="/servicos"
              className="font-bold text-[#36b970] transition hover:text-[#173690]"
            >
              Ver todos os serviços →
            </a>

          </div>

          {carregando ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-gray-100"
                />
              ))}

            </div>
          ) : servicos.length > 0 ? (

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {servicos.map((servico) => (
                <a
                  href="/servicos"
                  key={servico.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {servico.imagem_url ? (
                    <img
                      src={servico.imagem_url}
                      alt={servico.nome}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-[#173690]/5 text-5xl">
                      {servico.icone || "⛽"}
                    </div>
                  )}

                  <div className="p-6">

                    <h3 className="text-lg font-extrabold text-[#173690]">
                      {servico.nome}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {servico.descricao}
                    </p>

                    <span className="mt-5 block font-bold text-[#36b970]">
                      Saiba mais →
                    </span>

                  </div>

                </a>
              ))}

            </div>

          ) : (

            <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-10 text-center">

              <p className="text-gray-500">
                Os serviços serão exibidos aqui assim que forem cadastrados.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* PROMOÇÕES */}

      {promocoes.length > 0 && (
        <section className="bg-[#173690] px-5 py-20 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-7xl">

            <div className="text-center">

              <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
                Aproveite
              </span>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Promoções e sorteios
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">
                Confira as novidades e participe das nossas campanhas.
              </p>

            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {promocoes.map((promocao) => (
                <a
                  href="/promocoes"
                  key={promocao.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                >

                  {promocao.imagem_url && (
                    <img
                      src={promocao.imagem_url}
                      alt={promocao.titulo}
                      className="h-52 w-full object-cover"
                    />
                  )}

                  <div className="p-6">

                    <span className="inline-flex rounded-full bg-[#36b970]/10 px-3 py-1 text-xs font-bold uppercase text-[#173690]">
                      {promocao.tipo === "sorteio" ? "Sorteio" : "Promoção"}
                    </span>

                    <h3 className="mt-4 text-xl font-extrabold text-[#173690]">
                      {promocao.titulo}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {promocao.descricao}
                    </p>

                    <span className="mt-5 block font-bold text-[#36b970]">
                      Confira →
                    </span>

                  </div>

                </a>
              ))}

            </div>

            <div className="mt-10 text-center">

              <a
                href="/promocoes"
                className="inline-flex rounded-xl bg-[#36b970] px-7 py-4 font-bold text-[#173690] transition hover:brightness-95"
              >
                Ver todas as promoções
              </a>

            </div>

          </div>

        </section>
      )}

      {/* GALERIA */}

      {galeria.length > 0 && (
        <section className="px-5 py-20 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-7xl">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
                  Conheça nossa estrutura
                </span>

                <h2 className="mt-3 text-3xl font-black text-[#173690] sm:text-4xl">
                  Galeria de fotos
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                  Confira alguns registros do Posto Gasparin.
                </p>

              </div>

              <a
                href="/galeria"
                className="font-bold text-[#36b970] transition hover:text-[#173690]"
              >
                Ver galeria completa →
              </a>

            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {galeria.slice(0, 6).map((foto) => (
                <a
                  href="/galeria"
                  key={foto.id}
                  className="group relative overflow-hidden rounded-2xl"
                >

                  <img
                    src={foto.imagem_url}
                    alt={foto.titulo}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">

                    <h3 className="font-bold text-white">
                      {foto.titulo}
                    </h3>

                    {foto.descricao && (
                      <p className="mt-1 line-clamp-2 text-sm text-white/80">
                        {foto.descricao}
                      </p>
                    )}

                  </div>

                </a>
              ))}

            </div>

          </div>

        </section>
      )}

      {/* SOBRE */}

      <section className="bg-gray-50 px-5 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div className="overflow-hidden rounded-3xl">

            {galeria.length > 1 ? (
              <img
                src={galeria[1].imagem_url}
                alt="Estrutura do Posto Gasparin"
                className="h-[380px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[380px] items-center justify-center bg-gradient-to-br from-[#173690] to-[#36b970]">

                <div className="text-center">

                  <div className="text-7xl">
                    ⛽
                  </div>

                  <h3 className="mt-5 text-2xl font-black text-white">
                    Posto Gasparin
                  </h3>

                </div>

              </div>
            )}

          </div>

          <div>

            <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
              Sobre nós
            </span>

            <h2 className="mt-3 text-3xl font-black text-[#173690] sm:text-4xl">
              Uma parada pensada para você
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Seja para abastecer, fazer uma pausa ou utilizar os
              serviços disponíveis, o Posto Gasparin busca oferecer
              praticidade durante sua jornada.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Nossa estrutura e serviços foram pensados para atender
              nossos clientes com comodidade e qualidade.
            </p>

            <a
              href="/o-posto"
              className="mt-8 inline-flex rounded-xl bg-[#173690] px-7 py-4 font-bold text-white transition hover:bg-[#36b970] hover:text-[#173690]"
            >
              Conheça o Posto Gasparin
            </a>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-[#36b970] px-5 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">

          <div>

            <h2 className="text-3xl font-black text-[#173690]">
              Precisa falar com o Posto Gasparin?
            </h2>

            <p className="mt-3 text-[#173690]/80">
              Entre em contato através dos nossos canais.
            </p>

          </div>

          <a
            href="/contato"
            className="rounded-xl bg-[#173690] px-8 py-4 font-extrabold text-white transition hover:brightness-110"
          >
            Entrar em contato
          </a>

        </div>

      </section>

      {/* RODAPÉ */}

      <footer className="bg-[#173690] px-5 py-12 text-white sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">

          {/* MARCA */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#36b970] font-black text-[#173690]">
                PG
              </div>

              <div>

                <h3 className="font-extrabold">
                  Posto Gasparin
                </h3>

                <p className="text-xs text-white/60">
                  Grupo Potencial
                </p>

              </div>

            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              Sua parada de confiança na estrada.
              Conte com o Posto Gasparin.
            </p>

          </div>

          {/* NAVEGAÇÃO */}

          <div>

            <h3 className="font-bold">
              Navegação
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">

              <a href="/" className="transition hover:text-[#36b970]">
                Início
              </a>

              <a href="/o-posto" className="transition hover:text-[#36b970]">
                O Posto
              </a>

              <a href="/servicos" className="transition hover:text-[#36b970]">
                Serviços
              </a>

              <a href="/galeria" className="transition hover:text-[#36b970]">
                Galeria
              </a>

              <a href="/promocoes" className="transition hover:text-[#36b970]">
                Promoções
              </a>

              <a href="/contato" className="transition hover:text-[#36b970]">
                Contato
              </a>

              <a
                href="/admin/login"
                className="mt-2 inline-flex w-fit rounded-lg bg-[#36b970] px-4 py-2 font-semibold text-[#173690] transition hover:brightness-95"
              >
                Login administrativo
              </a>

            </div>

          </div>

          {/* CONTATO */}

          <div>

            <h3 className="font-bold">
              Contato
            </h3>

            <div className="mt-4 space-y-3 text-sm text-white/70">

              <p>
                Entre em contato conosco através da página de contato.
              </p>

              <a
                href="/contato"
                className="inline-flex font-bold text-[#36b970] transition hover:text-white"
              >
                Ver informações de contato →
              </a>

            </div>

          </div>

        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/50">

          © {new Date().getFullYear()} Posto Gasparin. Todos os direitos reservados.

        </div>

      </footer>

    </main>
  );
}