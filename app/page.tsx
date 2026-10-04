"use client";

import { useState } from "react";

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* =====================================================
          CABEÇALHO
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* LOGO PROVISÓRIA */}

          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-800 text-xl font-black text-white">
              PG
            </div>

            <div>
              <h1 className="text-lg font-extrabold leading-none text-green-900 sm:text-xl">
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
              className="font-semibold text-green-800 transition hover:text-green-600"
            >
              Início
            </a>

            <a
              href="/o-posto"
              className="font-medium text-gray-700 transition hover:text-green-700"
            >
              O Posto
            </a>

            <a
              href="/servicos"
              className="font-medium text-gray-700 transition hover:text-green-700"
            >
              Serviços
            </a>

            <a
              href="/galeria"
              className="font-medium text-gray-700 transition hover:text-green-700"
            >
              Galeria
            </a>

            <a
              href="/promocoes"
              className="font-medium text-gray-700 transition hover:text-green-700"
            >
              Promoções
            </a>

            {/* CONTATO */}
            <a
              href="/contato"
              className="font-medium text-gray-700 transition hover:text-green-700"
            >
              Contato
            </a>

            {/* LOGIN */}
            <a
              href="/admin/login"
              className="rounded-lg bg-yellow-400 px-5 py-3 font-bold text-green-950 transition hover:bg-yellow-300"
            >
              Login
            </a>

          </nav>

          {/* BOTÃO MOBILE */}

          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-xl text-gray-800 lg:hidden"
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

              <a
                href="/"
                onClick={() => setMenuAberto(false)}
                className="border-b border-gray-100 py-4 font-semibold text-green-800"
              >
                Início
              </a>

              <a
                href="/o-posto"
                onClick={() => setMenuAberto(false)}
                className="border-b border-gray-100 py-4 font-medium text-gray-700"
              >
                O Posto
              </a>

              <a
                href="/servicos"
                onClick={() => setMenuAberto(false)}
                className="border-b border-gray-100 py-4 font-medium text-gray-700"
              >
                Serviços
              </a>

              <a
                href="/galeria"
                onClick={() => setMenuAberto(false)}
                className="border-b border-gray-100 py-4 font-medium text-gray-700"
              >
                Galeria
              </a>

              <a
                href="/promocoes"
                onClick={() => setMenuAberto(false)}
                className="border-b border-gray-100 py-4 font-medium text-gray-700"
              >
                Promoções / Sorteios
              </a>

              {/* CONTATO MOBILE */}
              <a
                href="/contato"
                onClick={() => setMenuAberto(false)}
                className="mt-4 rounded-lg bg-green-800 px-5 py-3 text-center font-bold text-white"
              >
                Contato
              </a>

              {/* LOGIN MOBILE */}
              <a
                href="/admin/login"
                onClick={() => setMenuAberto(false)}
                className="mt-3 rounded-lg bg-yellow-400 px-5 py-3 text-center font-bold text-green-950"
              >
                Login
              </a>

            </nav>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-green-950">

        {/* Elementos decorativos */}

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-green-800/40" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-green-800/30" />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">

          {/* TEXTO */}

          <div className="max-w-2xl">

            <span className="inline-flex rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Posto Gasparin
            </span>

            <h2 className="mt-7 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Seu caminho começa
              <span className="block text-yellow-400">
                aqui.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
              Conteúdo provisório para apresentação do Posto Gasparin.
              Esta área será atualizada posteriormente através do painel
              administrativo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <a
                href="/servicos"
                className="rounded-xl bg-yellow-400 px-7 py-4 text-center font-extrabold text-gray-950 shadow-lg transition hover:bg-yellow-300"
              >
                Conheça nossos serviços
              </a>

              <a
                href="/contato"
                className="rounded-xl border border-white/40 bg-white/5 px-7 py-4 text-center font-bold text-white transition hover:bg-white hover:text-green-950"
              >
                Como chegar
              </a>

            </div>
          </div>

          {/* ESPAÇO PARA FUTURA FOTO */}

          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-xl">

              <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-green-800 to-green-950 shadow-2xl">

                <div className="flex h-full flex-col items-center justify-center p-10 text-center">

                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-yellow-400 text-3xl font-black text-green-950">
                    PG
                  </div>

                  <h3 className="mt-7 text-2xl font-bold text-white">
                    Foto do posto
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-gray-300">
                    Espaço reservado para a imagem real da fachada ou área de
                    abastecimento.
                  </p>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          ACESSOS RÁPIDOS
      ====================================================== */}

      <section className="bg-gray-50 px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <span className="text-sm font-extrabold uppercase tracking-wider text-green-700">
              Tudo em um só lugar
            </span>

            <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Encontre o que precisa
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Acesse rapidamente as principais informações do Posto Gasparin.
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <a
              href="/o-posto"
              className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                ⛽
              </div>

              <h3 className="mt-6 text-xl font-extrabold">
                O Posto
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Conheça o posto e encontre informações importantes.
              </p>

              <span className="mt-5 block font-bold text-green-800">
                Saiba mais →
              </span>
            </a>

            <a
              href="/servicos"
              className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                🔧
              </div>

              <h3 className="mt-6 text-xl font-extrabold">
                Serviços
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Consulte os serviços oferecidos pelo posto.
              </p>

              <span className="mt-5 block font-bold text-green-800">
                Ver serviços →
              </span>
            </a>

            <a
              href="/promocoes"
              className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                🎁
              </div>

              <h3 className="mt-6 text-xl font-extrabold">
                Promoções
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Confira promoções, campanhas e sorteios.
              </p>

              <span className="mt-5 block font-bold text-green-800">
                Conferir →
              </span>
            </a>

            <a
              href="/contato"
              className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                📍
              </div>

              <h3 className="mt-6 text-xl font-extrabold">
                Localização
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Veja o endereço e descubra como chegar.
              </p>

              <span className="mt-5 block font-bold text-green-800">
                Ver localização →
              </span>
            </a>

          </div>
        </div>
      </section>

      {/* =====================================================
          SOBRE O POSTO
      ====================================================== */}

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          {/* PLACEHOLDER IMAGEM */}

          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-3xl bg-gray-100 p-5">

              <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-300">

                <div className="max-w-sm text-center">

                  <div className="text-5xl">📷</div>

                  <h3 className="mt-5 text-xl font-bold text-gray-800">
                    Imagem do Posto
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Espaço reservado para uma foto real que poderá ser
                    adicionada posteriormente pelo painel administrativo.
                  </p>

                </div>
              </div>
            </div>
          </div>

          {/* TEXTO */}

          <div className="order-1 lg:order-2">

            <span className="text-sm font-extrabold uppercase tracking-wider text-green-700">
              O Posto
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
              Um espaço preparado para receber você
            </h2>

            <p className="mt-6 leading-7 text-gray-600">
              Este conteúdo é provisório e será substituído pelas informações
              oficiais do Posto Gasparin através do painel administrativo.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Aqui poderemos apresentar a história, estrutura, diferenciais,
              localização e outras informações importantes sobre o posto.
            </p>

            <a
              href="/o-posto"
              className="mt-7 inline-flex rounded-xl bg-green-800 px-6 py-3 font-bold text-white transition hover:bg-green-700"
            >
              Conheça o posto
            </a>

          </div>

        </div>
      </section>

      {/* =====================================================
          SERVIÇOS
      ====================================================== */}

      <section className="bg-green-950 px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-sm font-extrabold uppercase tracking-wider text-yellow-400">
              Serviços
            </span>

            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Tudo para facilitar sua parada
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
              Os serviços abaixo são apenas exemplos para montagem da tela.
              Posteriormente serão cadastrados pelo administrador.
            </p>

          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: "⛽",
                title: "Abastecimento",
                text: "Espaço reservado para informações sobre abastecimento.",
              },
              {
                icon: "🛒",
                title: "Conveniência",
                text: "Espaço reservado para informações da conveniência.",
              },
              {
                icon: "🚗",
                title: "Serviço automotivo",
                text: "Espaço reservado para os serviços automotivos.",
              },
              {
                icon: "➕",
                title: "Outro serviço",
                text: "Novos serviços poderão ser adicionados futuramente.",
              },
            ].map((servico) => (
              <div
                key={servico.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:bg-white/10"
              >
                <div className="text-3xl">
                  {servico.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-white">
                  {servico.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {servico.text}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-10 text-center">
            <a
              href="/servicos"
              className="inline-flex rounded-xl bg-yellow-400 px-7 py-3 font-extrabold text-gray-950 transition hover:bg-yellow-300"
            >
              Ver todos os serviços
            </a>
          </div>

        </div>
      </section>

      {/* =====================================================
          PROMOÇÕES
      ====================================================== */}

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <span className="text-sm font-extrabold uppercase tracking-wider text-green-700">
                Promoções
              </span>

              <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
                Promoções e sorteios
              </h2>

            </div>

            <a
              href="/promocoes"
              className="font-bold text-green-800 hover:text-green-600"
            >
              Ver todas →
            </a>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              <div className="flex aspect-[16/8] items-center justify-center bg-green-100">

                <div className="text-center">

                  <div className="text-5xl">🎁</div>

                  <p className="mt-3 font-bold text-green-900">
                    Espaço para promoção
                  </p>

                </div>

              </div>

              <div className="p-7">

                <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                  Promoção
                </span>

                <h3 className="mt-2 text-2xl font-black">
                  Título da promoção
                </h3>

                <p className="mt-3 leading-6 text-gray-600">
                  Este conteúdo será substituído posteriormente pelo
                  administrador.
                </p>

                <a
                  href="/promocoes"
                  className="mt-5 inline-block font-bold text-green-800"
                >
                  Ver detalhes →
                </a>

              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              <div className="flex aspect-[16/8] items-center justify-center bg-yellow-100">

                <div className="text-center">

                  <div className="text-5xl">🏆</div>

                  <p className="mt-3 font-bold text-yellow-900">
                    Espaço para sorteio
                  </p>

                </div>

              </div>

              <div className="p-7">

                <span className="text-xs font-bold uppercase tracking-wider text-yellow-700">
                  Sorteio
                </span>

                <h3 className="mt-2 text-2xl font-black">
                  Título do sorteio
                </h3>

                <p className="mt-3 leading-6 text-gray-600">
                  Este conteúdo será substituído posteriormente pelo
                  administrador.
                </p>

                <a
                  href="/promocoes"
                  className="mt-5 inline-block font-bold text-green-800"
                >
                  Ver detalhes →
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          GALERIA
      ====================================================== */}

      <section className="bg-gray-50 px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-sm font-extrabold uppercase tracking-wider text-green-700">
              Galeria
            </span>

            <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Conheça nossa estrutura
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              As fotos reais poderão ser adicionadas posteriormente pelo
              administrador.
            </p>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">

            {[
              "Foto 01",
              "Foto 02",
              "Foto 03",
              "Foto 04",
            ].map((foto) => (
              <div
                key={foto}
                className="flex aspect-square items-center justify-center rounded-2xl bg-gray-200 text-center"
              >
                <div>

                  <div className="text-3xl">📷</div>

                  <p className="mt-2 text-sm font-semibold text-gray-500">
                    {foto}
                  </p>

                </div>
              </div>
            ))}

          </div>

          <div className="mt-10 text-center">

            <a
              href="/galeria"
              className="inline-flex rounded-xl border-2 border-green-800 px-7 py-3 font-bold text-green-800 transition hover:bg-green-800 hover:text-white"
            >
              Ver galeria completa
            </a>

          </div>

        </div>
      </section>

      {/* =====================================================
          LOCALIZAÇÃO / CONTATO
      ====================================================== */}

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">

          <div className="rounded-3xl bg-green-950 p-8 sm:p-10">

            <span className="text-sm font-extrabold uppercase tracking-wider text-yellow-400">
              Localização
            </span>

            <h2 className="mt-3 text-3xl font-black text-white">
              Como chegar
            </h2>

            <p className="mt-5 leading-7 text-gray-300">
              O endereço, telefone, WhatsApp e demais informações serão
              cadastrados posteriormente pelo painel administrativo.
            </p>

            <div className="mt-8 space-y-5">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Endereço
                </p>

                <p className="mt-1 font-semibold text-white">
                  Endereço do Posto Gasparin
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Telefone
                </p>

                <p className="mt-1 font-semibold text-white">
                  (00) 0000-0000
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  WhatsApp
                </p>

                <p className="mt-1 font-semibold text-white">
                  (00) 00000-0000
                </p>
              </div>

            </div>

            <a
              href="/contato"
              className="mt-8 inline-flex rounded-xl bg-yellow-400 px-6 py-3 font-extrabold text-gray-950 transition hover:bg-yellow-300"
            >
              Ver informações de contato
            </a>

          </div>

          {/* MAPA PLACEHOLDER */}

          <div className="flex min-h-[400px] items-center justify-center rounded-3xl bg-gray-100 p-8">

            <div className="text-center">

              <div className="text-6xl">📍</div>

              <h3 className="mt-5 text-2xl font-black text-gray-900">
                Mapa
              </h3>

              <p className="mx-auto mt-3 max-w-sm leading-6 text-gray-600">
                O mapa real será configurado posteriormente com a localização
                oficial do posto.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-yellow-400 px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">

          <div>

            <h2 className="text-3xl font-black text-gray-950">
              Precisa falar com o Posto Gasparin?
            </h2>

            <p className="mt-2 text-gray-800">
              Entre em contato através dos nossos canais.
            </p>

          </div>

          <a
            href="/contato"
            className="rounded-xl bg-green-950 px-8 py-4 font-extrabold text-white transition hover:bg-green-900"
          >
            Entrar em contato
          </a>

        </div>
      </section>

      {/* =====================================================
          RODAPÉ
      ====================================================== */}

      <footer className="bg-gray-950 px-5 py-12 text-white sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-800 font-black">
                PG
              </div>

              <div>

                <h3 className="font-extrabold">
                  Posto Gasparin
                </h3>

                <p className="text-xs text-gray-400">
                  Grupo Potencial
                </p>

              </div>

            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              Site institucional do Posto Gasparin. Informações apresentadas
              nesta versão são provisórias.
            </p>

          </div>

          <div>

            <h3 className="font-bold">
              Navegação
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">

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

              <a
                href="/admin/login"
                className="mt-2 inline-flex w-fit rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-green-950 transition hover:bg-yellow-300"
              >
                Login
              </a>

            </div>

          </div>

          <div>

            <h3 className="font-bold">
              Contato
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">

              <p>Telefone: (00) 0000-0000</p>

              <p>WhatsApp: (00) 00000-0000</p>

              <p>Endereço: informação provisória</p>

            </div>

          </div>

        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Posto Gasparin. Todos os direitos
          reservados.
        </div>

      </footer>

    </main>
  );
}