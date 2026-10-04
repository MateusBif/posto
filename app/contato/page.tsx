export default function Contato() {
  return (
    <main className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-xl font-bold text-yellow-400">
              PG
            </div>

            <div>
              <h1 className="text-lg font-extrabold leading-tight text-green-800">
                Posto Gasparin
              </h1>
              <p className="text-xs text-gray-500">
                Parada, praticidade e atendimento
              </p>
            </div>
          </a>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-7 md:flex">
            <a href="/" className="font-medium text-gray-700 hover:text-green-700">
              Início
            </a>

            <a href="/o-posto" className="font-medium text-gray-700 hover:text-green-700">
              O Posto
            </a>

            <a href="/servicos" className="font-medium text-gray-700 hover:text-green-700">
              Serviços
            </a>

            <a href="/galeria" className="font-medium text-gray-700 hover:text-green-700">
              Galeria
            </a>

            <a href="/promocoes" className="font-medium text-gray-700 hover:text-green-700">
              Promoções
            </a>

            <a
              href="/contato"
              className="font-medium text-gray-700 hover:text-green-700"
            >
              Contato
            </a>
            
            <a
              href="/admin/login"
              className="rounded-lg bg-yellow-400 px-5 py-3 font-bold text-green-950 transition hover:bg-yellow-300"
            >
              Login
            </a>

          </nav>

          {/* MENU MOBILE */}
          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none rounded-lg bg-green-700 px-4 py-2 text-xl text-white">
              ☰
            </summary>

            <div className="absolute right-0 top-14 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
              <nav className="flex flex-col">

                <a href="/" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100">
                  Início
                </a>

                <a href="/o-posto" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100">
                  O Posto
                </a>

                <a href="/servicos" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100">
                  Serviços
                </a>

                <a href="/galeria" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100">
                  Galeria
                </a>

                <a href="/promocoes" className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100">
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
                  className="rounded-lg bg-yellow-400 px-5 py-3 font-bold text-green-950 transition hover:bg-yellow-300"
                >
                  Login
                </a>

              </nav>
            </div>
          </details>

        </div>
      </header>

      {/* BANNER */}
      <section className="relative overflow-hidden bg-green-900">
        <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900 to-green-800" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">

            <span className="inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-green-950">
              Fale conosco
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Entre em contato
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-green-50">
              Tire suas dúvidas, fale com nossa equipe ou encontre o melhor
              caminho para chegar ao Posto Gasparin.
            </p>

          </div>
        </div>
      </section>

      {/* INFORMAÇÕES */}
      <section className="bg-gray-50 py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* TELEFONE */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                📞
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Telefone
              </h3>

              <p className="mt-3 text-gray-600">
                (00) 0000-0000
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Informação provisória
              </p>
            </div>

            {/* WHATSAPP */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                💬
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                WhatsApp
              </h3>

              <p className="mt-3 text-gray-600">
                (00) 00000-0000
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Informação provisória
              </p>
            </div>

            {/* ENDEREÇO */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                📍
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Endereço
              </h3>

              <p className="mt-3 text-gray-600">
                Endereço do posto
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Informação provisória
              </p>
            </div>

            {/* HORÁRIO */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                🕐
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Atendimento
              </h3>

              <p className="mt-3 text-gray-600">
                Horário de atendimento
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Informação provisória
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* LOCALIZAÇÃO + FORMULÁRIO */}
      <section className="bg-white py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2">

            {/* MAPA */}
            <div>

              <span className="font-semibold uppercase tracking-wider text-green-700">
                Como chegar
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Nossa localização
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                A localização abaixo é apenas ilustrativa. Depois vamos
                substituir pelo endereço oficial e mapa correto do Posto
                Gasparin.
              </p>

              {/* MAPA PROVISÓRIO */}
              <div className="mt-8 flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl bg-green-900">

                <div className="p-8 text-center text-white">

                  <div className="text-7xl">
                    📍
                  </div>

                  <h3 className="mt-5 text-2xl font-bold">
                    Localização do Posto
                  </h3>

                  <p className="mt-3 text-green-100">
                    Mapa será configurado posteriormente.
                  </p>

                  <button
                    type="button"
                    className="mt-6 rounded-full bg-yellow-400 px-6 py-3 font-bold text-green-950 transition hover:bg-yellow-300"
                  >
                    Como chegar
                  </button>

                </div>

              </div>

            </div>

            {/* FORMULÁRIO */}
            <div>

              <span className="font-semibold uppercase tracking-wider text-green-700">
                Mensagem
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Fale com a gente
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Envie sua mensagem. O formulário é apenas demonstrativo nesta
                primeira versão do site.
              </p>

              <form className="mt-8 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Nome
                  </label>

                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    E-mail
                  </label>

                  <input
                    type="email"
                    placeholder="seuemail@email.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Telefone
                  </label>

                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mensagem
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Digite sua mensagem..."
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                <button
                  type="button"
                  className="w-full rounded-xl bg-green-700 px-6 py-3.5 font-bold text-white transition hover:bg-green-800"
                >
                  Enviar mensagem
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* WHATSAPP */}
      <section className="bg-green-50 py-14">

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

          <div className="text-5xl">
            💬
          </div>

          <h2 className="mt-5 text-3xl font-extrabold text-green-950">
            Prefere falar pelo WhatsApp?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-800">
            Quando tivermos o número oficial, este botão poderá abrir
            diretamente uma conversa pelo WhatsApp.
          </p>

          <button
            type="button"
            className="mt-7 rounded-full bg-green-700 px-7 py-3 font-bold text-white transition hover:bg-green-800"
          >
            Conversar pelo WhatsApp
          </button>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-green-950 text-white">

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">

          <div>
            <h3 className="text-xl font-extrabold">
              Posto Gasparin
            </h3>

            <p className="mt-3 text-sm leading-6 text-green-100">
              Informações provisórias para o desenvolvimento do projeto.
            </p>
          </div>

          <div>
            <h3 className="font-bold">
              Navegação
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-green-100">

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
            <h3 className="font-bold">
              Contato
            </h3>

            <div className="mt-4 space-y-3 text-sm text-green-100">

              <p>Telefone: (00) 0000-0000</p>
              <p>WhatsApp: (00) 00000-0000</p>
              <p>Endereço: informação provisória</p>

            </div>
          </div>

        </div>

        <div className="border-t border-green-800">

          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-green-200 sm:px-6">
            © {new Date().getFullYear()} Posto Gasparin. Todos os direitos reservados.
          </div>

        </div>

      </footer>

    </main>
  );
}