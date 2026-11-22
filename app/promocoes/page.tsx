"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Promocao = {
  id: number;
  titulo: string;
  descricao: string;
  tipo: "promocao" | "sorteio";
  imagem_url: string | null;
  data_inicio: string;
  data_fim: string;
  regulamento: string | null;
  ativo: boolean;
  destaque: boolean;
  created_at?: string;
};

export default function Promocoes() {
  const supabase = createClient();

  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // =====================================================
  // DATA ATUAL
  // =====================================================

  function obterDataAtual() {
    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  // =====================================================
  // FORMATAR DATA
  // =====================================================

  function formatarData(data: string) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  // =====================================================
  // CARREGAR PROMOÇÕES DO SUPABASE
  // =====================================================

  async function carregarPromocoes() {
    setCarregando(true);
    setErro("");

    const { data, error } = await supabase
      .from("promotions")
      .select("*")
      .eq("ativo", true)
      .order("destaque", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar promoções:", error);
      setErro("Não foi possível carregar as promoções no momento.");
      setPromocoes([]);
      setCarregando(false);
      return;
    }

    const hoje = obterDataAtual();

    const campanhasValidas = (data || []).filter(
      (promocao: Promocao) =>
        promocao.data_inicio <= hoje &&
        promocao.data_fim >= hoje
    );

    setPromocoes(campanhasValidas);
    setCarregando(false);
  }

  useEffect(() => {
    carregarPromocoes();
  }, []);

  // =====================================================
  // SEPARAR PROMOÇÕES E SORTEIOS
  // =====================================================

  const listaPromocoes = promocoes.filter(
    (item) => item.tipo === "promocao"
  );

  const listaSorteios = promocoes.filter(
    (item) => item.tipo === "sorteio"
  );

  const destaques = promocoes.filter(
    (item) => item.destaque
  );

  // =====================================================
  // CARD DE CAMPANHA
  // =====================================================

  function CardPromocao({
    promocao,
  }: {
    promocao: Promocao;
  }) {
    return (
      <article
        className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
          promocao.destaque
            ? "border-[#36b970] ring-2 ring-[#36b970]/20"
            : "border-gray-200"
        }`}
      >
        {/* IMAGEM */}
        {promocao.imagem_url ? (
          <div className="relative h-56 overflow-hidden bg-gray-100">
            <img
              src={promocao.imagem_url}
              alt={promocao.titulo}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />

            {promocao.destaque && (
              <span className="absolute left-4 top-4 rounded-full bg-[#36b970] px-4 py-2 text-xs font-bold text-[#173690] shadow">
                ⭐ Destaque
              </span>
            )}
          </div>
        ) : (
          <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-[#173690] to-[#36b970]">
            <div className="text-center">
              <div className="text-7xl">
                {promocao.tipo === "sorteio" ? "🎟️" : "🎁"}
              </div>

              <p className="mt-4 font-bold text-white">
                Posto Gasparin
              </p>
            </div>

            {promocao.destaque && (
              <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#173690] shadow">
                ⭐ Destaque
              </span>
            )}
          </div>
        )}

        {/* CONTEÚDO */}
        <div className="p-7">
          {/* TIPO */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-[#36b970]/15 px-3 py-1 text-xs font-bold text-[#173690]">
              {promocao.tipo === "sorteio" ? "🎟️ Sorteio" : "🎁 Promoção"}
            </span>

            {promocao.destaque && (
              <span className="text-sm font-bold text-[#36b970]">
                ★ Destaque
              </span>
            )}
          </div>

          {/* TÍTULO */}
          <h3 className="mt-5 text-2xl font-extrabold text-gray-900">
            {promocao.titulo}
          </h3>

          {/* DESCRIÇÃO */}
          <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
            {promocao.descricao}
          </p>

          {/* PERÍODO */}
          <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-500">
              Período da campanha
            </p>

            <p className="mt-2 font-bold text-gray-800">
              {formatarData(promocao.data_inicio)} até{" "}
              {formatarData(promocao.data_fim)}
            </p>
          </div>

          {/* REGULAMENTO */}
          {promocao.regulamento && (
            <div className="mt-5">
              <details className="group">
                <summary className="cursor-pointer list-none rounded-xl border border-[#36b970]/30 px-4 py-3 font-semibold text-[#173690] transition hover:bg-[#36b970]/10">
                  <span className="flex items-center justify-between">
                    Ver regulamento e informações

                    <span className="transition group-open:rotate-180">
                      ▼
                    </span>
                  </span>
                </summary>

                <div className="mt-3 rounded-xl bg-gray-50 p-4">
                  <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
                    {promocao.regulamento}
                  </p>
                </div>
              </details>
            </div>
          )}

          {/* CTA */}
          <Link
            href="/contato"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#173690] hover:text-white"
          >
            Quero participar
          </Link>
        </div>
      </article>
    );
  }

  // =====================================================
  // SEÇÃO DE CARDS
  // =====================================================

  function SecaoCampanhas({
    titulo,
    descricao,
    lista,
    icone,
  }: {
    titulo: string;
    descricao: string;
    lista: Promocao[];
    icone: string;
  }) {
    if (lista.length === 0) return null;

    return (
      <section className="mt-16">
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <span className="text-3xl">{icone}</span>

            <h2 className="text-3xl font-extrabold text-[#173690]">
              {titulo}
            </h2>
          </div>

          <p className="mt-3 text-center text-gray-600 md:text-left">
            {descricao}
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {lista.map((promocao) => (
            <CardPromocao
              key={promocao.id}
              promocao={promocao}
            />
          ))}
        </div>
      </section>
    );
  }

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
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
              className="font-medium text-gray-700 transition hover:text-[#36b970]"
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
              className="font-bold text-[#36b970]"
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
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
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
                  className="rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#36b970]"
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
                  className="mt-2 rounded-lg bg-[#36b970] px-5 py-3 text-center font-bold text-[#173690]"
                >
                  Login
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#173690] to-[#36b970]">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white">
              Promoções & Sorteios
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Aproveite nossas promoções
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
              Confira as campanhas, promoções e sorteios disponíveis no
              Posto Gasparin.
            </p>
          </div>
        </div>
      </section>

      {/* CAMPANHAS */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TÍTULO */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-semibold uppercase tracking-wider text-[#36b970]">
              Oportunidades
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Campanhas disponíveis
            </h2>

            <p className="mt-4 text-gray-600">
              Acompanhe nossas campanhas e fique por dentro das novidades.
            </p>
          </div>

          {/* CARREGANDO */}
          {carregando && (
            <div className="py-20 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#36b970]" />

              <p className="mt-5 font-semibold text-gray-600">
                Carregando campanhas...
              </p>
            </div>
          )}

          {/* ERRO */}
          {!carregando && erro && (
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <div className="text-4xl">⚠️</div>

              <p className="mt-4 font-semibold text-red-700">
                {erro}
              </p>

              <button
                onClick={carregarPromocoes}
                className="mt-5 rounded-full bg-[#173690] px-6 py-3 font-bold text-white transition hover:bg-[#36b970]"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* DESTAQUES */}
          {!carregando && !erro && destaques.length > 0 && (
            <section className="mt-12">
              <div className="mb-8 text-center">
                <span className="font-semibold uppercase tracking-wider text-[#36b970]">
                  Em destaque
                </span>

                <h3 className="mt-2 text-2xl font-extrabold text-[#173690]">
                  Confira nossas principais campanhas
                </h3>
              </div>

              <div className="grid gap-7 md:grid-cols-2">
                {destaques.map((promocao) => (
                  <CardPromocao
                    key={`destaque-${promocao.id}`}
                    promocao={promocao}
                  />
                ))}
              </div>
            </section>
          )}

          {/* PROMOÇÕES */}
          {!carregando && !erro && (
            <SecaoCampanhas
              titulo="Promoções"
              descricao="Confira nossas ofertas e campanhas especiais."
              lista={listaPromocoes}
              icone="🎁"
            />
          )}

          {/* SORTEIOS */}
          {!carregando && !erro && (
            <SecaoCampanhas
              titulo="Sorteios"
              descricao="Participe dos sorteios e concorra a prêmios."
              lista={listaSorteios}
              icone="🎟️"
            />
          )}

          {/* SEM CAMPANHAS */}
          {!carregando && !erro && promocoes.length === 0 && (
            <div className="mt-12 rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="text-6xl">🎁</div>

              <h3 className="mt-5 text-2xl font-extrabold text-[#173690]">
                Nenhuma campanha disponível no momento
              </h3>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
                Estamos preparando novidades para você! Em breve teremos
                novas promoções e sorteios. Fique atento e acompanhe
                nossas atualizações.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* AVISO */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[#36b970]/20 bg-[#36b970]/10 p-8 text-center sm:p-10">
            <div className="text-5xl">📢</div>

            <h2 className="mt-5 text-2xl font-extrabold text-[#173690]">
              Fique de olho nas novidades!
            </h2>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#173690]">
              Novas promoções e sorteios poderão ser adicionados
              periodicamente. Consulte sempre esta página para acompanhar
              as novidades.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#36b970] py-14">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#173690] sm:text-4xl">
            Ficou com alguma dúvida?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#173690]">
            Entre em contato conosco para saber mais sobre nossas
            promoções e campanhas.
          </p>

          <Link
            href="/contato"
            className="mt-7 inline-flex rounded-full bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-white hover:text-[#173690]"
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
              Posto Gasparin
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/80">
              Parada, praticidade e atendimento.
            </p>
          </div>

          {/* NAVEGAÇÃO */}
          <div>
            <h3 className="font-bold">Navegação</h3>

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