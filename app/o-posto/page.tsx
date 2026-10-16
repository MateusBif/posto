export default function OPosto() {
return (
<main className="min-h-screen bg-white text-gray-900">
  <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
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
      <nav className="hidden items-center gap-7 lg:flex">
        <a href="/" className="font-medium text-gray-700 hover:text-[#36b970]">
          Início
        </a>
        <a
        href="/o-posto"
        className="font-semibold text-[#173690]"
        >
          O Posto
        </a>
        <a href="/servicos" className="font-medium text-gray-700 hover:text-[#36b970]">
          Serviços
        </a>
        <a href="/galeria" className="font-medium text-gray-700 hover:text-[#36b970]">
          Galeria
        </a>
        <a href="/promocoes" className="font-medium text-gray-700 hover:text-[#36b970]">
          Promoções
        </a>
        <a
        href="/contato"
        className="font-medium text-gray-700 hover:text-[#36b970]"
        >
          Contato
        </a>
        <a
        href="/admin/login"
        className="rounded-lg bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#36b970]"
        >
          Login
        </a>
      </nav>
      <details className="relative lg:hidden">
        <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-gray-300 text-xl">
          ☰
        </summary>
        <nav className="absolute right-0 top-14 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
          <a href="/" className="block rounded-lg px-4 py-3 hover:bg-gray-50">
            Início
          </a>
          <a
          href="/o-posto"
          className="block rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#173690]"
          >
            O Posto
          </a>
          <a href="/servicos" className="block rounded-lg px-4 py-3 hover:bg-gray-50">
            Serviços
          </a>
          <a href="/galeria" className="block rounded-lg px-4 py-3 hover:bg-gray-50">
            Galeria
          </a>
          <a href="/promocoes" className="block rounded-lg px-4 py-3 hover:bg-gray-50">
            Promoções / Sorteios
          </a>
          <a
          href="/contato"
          className="block px-4 py-3 hover:text-[#36b970]"
          >
            Contato
          </a>
          <a
          href="/admin/login"
          className="rounded-lg bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#36b970]"
          >
            Login
          </a>
        </nav>
      </details>
    </div>
  </header>
  <section className="bg-gradient-to-r from-[#173690] to-[#36b970] px-5 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#36b970]">
        Posto Gasparin
      </span>
      <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
        Conheça o nosso posto
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
        Conteúdo provisório. Aqui será apresentada a história,
        estrutura e informações institucionais do Posto Gasparin.
      </p>
    </div>
  </section>
  <section className="px-5 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <div className="aspect-[4/3] rounded-3xl bg-gray-100 p-5">
          <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-300">
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
          </div>
        </div>
      </div>
      <div>
        <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
          Sobre nós
        </span>
        <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
          Um espaço preparado para você
        </h2>
        <p className="mt-6 leading-7 text-gray-600">
          Este é um texto provisório utilizado para construir a estrutura
          visual da página.
        </p>
        <p className="mt-4 leading-7 text-gray-600">
          Posteriormente, o administrador poderá cadastrar a história,
          apresentação e demais informações oficiais do Posto Gasparin.
        </p>
        <p className="mt-4 leading-7 text-gray-600">
          Dessa forma, a equipe do posto não precisará alterar o código
          do site sempre que alguma informação precisar ser atualizada.
        </p>
      </div>
    </div>
  </section>
  <section className="bg-gray-50 px-5 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <span className="text-sm font-extrabold uppercase tracking-wider text-[#36b970]">
          Diferenciais
        </span>
        <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
          Por que escolher o Posto Gasparin?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
          Estes conteúdos são exemplos e poderão ser alterados pelo
          administrador.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
        {
        icon: "⛽",
        title: "Qualidade",
        text: "Espaço para apresentar informações sobre os produtos e serviços.",
        },
        {
        icon: "🤝",
        title: "Atendimento",
        text: "Espaço para destacar o atendimento oferecido aos clientes.",
        },
        {
        icon: "📍",
        title: "Localização",
        text: "Espaço para apresentar as vantagens da localização do posto.",
        },
        {
        icon: "⭐",
        title: "Experiência",
        text: "Espaço para apresentar os diferenciais do estabelecimento.",
        },
        ].map((item) => (
        <div
        key={item.title}
        className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#36b970]/15 text-2xl">
            {item.icon}
          </div>
          <h3 className="mt-6 text-xl font-extrabold">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            {item.text}
          </p>
        </div>
        ))}
      </div>
    </div>
  </section>
  <section className="px-5 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-[#173690] p-8 text-white">
          <div className="text-4xl">⛽</div>
          <h3 className="mt-6 text-2xl font-black">
            Abastecimento
          </h3>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            Área reservada para informações sobre abastecimento.
          </p>
        </div>
        <div className="rounded-2xl bg-[#173690] p-8 text-white">
          <div className="text-4xl">🛒</div>
          <h3 className="mt-6 text-2xl font-black">
            Conveniência
          </h3>
          <p className="mt-3 text-sm leading-6 text-gray-200">
            Área reservada para informações sobre a conveniência.
          </p>
        </div>
        <div className="rounded-2xl bg-[#173690] p-8 text-white">
          <div className="text-4xl">🚗</div>
          <h3 className="mt-6 text-2xl font-black">
            Serviços
          </h3>
          <p className="mt-3 text-sm leading-6 text-gray-200">
            Área reservada para os demais serviços oferecidos.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section className="bg-[#173690] px-5 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
      <div>
        <h2 className="text-3xl font-black text-white">
          Quer conhecer nossos serviços?
        </h2>
        <p className="mt-2 text-gray-300">
          Consulte todos os serviços disponíveis.
        </p>
      </div>
      <a
      href="/servicos"
      className="rounded-xl bg-[#36b970] px-7 py-4 font-extrabold text-gray-950 transition hover:bg-[#36b970]"
      >
        Ver serviços
      </a>
    </div>
  </section>
  <footer className="bg-gray-950 px-5 py-10 text-white sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
      <div>
        <h3 className="font-extrabold">
          Posto Gasparin
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Grupo Potencial
        </p>
      </div>
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Posto Gasparin. Todos os direitos
        reservados.
      </p>
    </div>
  </footer>
</main>
);
}
