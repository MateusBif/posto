"use client";

import { useEffect, useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Contato = {
  telefone: string | null;
  whatsapp: string | null;
  email: string | null;
  endereco: string | null;
  horario: string | null;
  mapa: string | null;
};

export default function Contato() {
  const supabase = createClient();

  const [contato, setContato] = useState<Contato>({
    telefone: "",
    whatsapp: "",
    email: "",
    endereco: "",
    horario: "",
    mapa: "",
  });

  const [carregando, setCarregando] = useState(true);

  const [nome, setNome] = useState("");
  const [emailVisitante, setEmailVisitante] = useState("");
  const [telefoneVisitante, setTelefoneVisitante] = useState("");
  const [mensagemVisitante, setMensagemVisitante] = useState("");

  // =====================================================
  // CARREGAR INFORMAÇÕES DO SUPABASE
  // =====================================================

  useEffect(() => {
    async function carregarContato() {
      const { data, error } = await supabase
        .from("contact_info")
        .select("telefone, whatsapp, email, endereco, horario, mapa")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        console.error("Erro ao carregar informações de contato:", error);
      }

      if (data) {
        setContato({
          telefone: data.telefone || "",
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          endereco: data.endereco || "",
          horario: data.horario || "",
          mapa: data.mapa || "",
        });
      }

      setCarregando(false);
    }

    carregarContato();
  }, []);

  // =====================================================
  // FUNÇÕES AUXILIARES
  // =====================================================

  function somenteNumeros(valor: string) {
    return valor.replace(/\D/g, "");
  }

  function linkTelefone(valor: string) {
    return `tel:${somenteNumeros(valor)}`;
  }

  function linkWhatsApp(valor: string) {
    let numero = somenteNumeros(valor);

    // Adiciona o código do Brasil caso não esteja presente
    if (numero.length <= 11) {
      numero = `55${numero}`;
    }

    return `https://wa.me/${numero}`;
  }

  function enviarMensagemWhatsApp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!contato.whatsapp) {
      alert("O WhatsApp do posto ainda não foi cadastrado.");
      return;
    }

    if (!nome.trim() || !mensagemVisitante.trim()) {
      alert("Preencha seu nome e sua mensagem.");
      return;
    }

    const texto = `
Olá, Posto Gasparin!

Nome: ${nome}
E-mail: ${emailVisitante || "Não informado"}
Telefone: ${telefoneVisitante || "Não informado"}

Mensagem:
${mensagemVisitante}
    `.trim();

    const url = `${linkWhatsApp(contato.whatsapp)}?text=${encodeURIComponent(
      texto
    )}`;

    window.open(url, "_blank");
  }

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <main className="min-h-screen bg-white">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

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

            <a href="/contato" className="font-bold text-[#36b970]">
              Contato
            </a>

            <a
              href="/admin/login"
              className="rounded-lg bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#2fa663]"
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
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
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
                  className="rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#36b970]"
                >
                  Contato
                </a>

                <a
                  href="/admin/login"
                  className="mt-2 rounded-lg bg-[#36b970] px-5 py-3 text-center font-bold text-[#173690] transition hover:bg-[#2fa663]"
                >
                  Login
                </a>
              </nav>
            </div>
          </details>
        </div>
      </header>

      {/* ================================================= */}
      {/* BANNER */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-[#173690]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#173690] to-[#36b970]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-[#36b970] px-4 py-2 text-sm font-bold text-[#10265f]">
              Fale conosco
            </span>

            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Entre em contato
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#effaf4]">
              Tire suas dúvidas, fale com nossa equipe ou encontre o melhor
              caminho para chegar ao Posto Gasparin.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* INFORMAÇÕES DE CONTATO */}
      {/* ================================================= */}

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-[#173690]">
              Nossos canais de atendimento
            </h2>

            <p className="mt-3 text-gray-600">
              Entre em contato conosco pelos canais disponíveis.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* TELEFONE */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#effaf4] text-3xl">
                📞
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Telefone
              </h3>

              {carregando ? (
                <p className="mt-3 animate-pulse text-gray-400">
                  Carregando...
                </p>
              ) : contato.telefone ? (
                <a
                  href={linkTelefone(contato.telefone)}
                  className="mt-3 block font-medium text-gray-600 transition hover:text-[#36b970]"
                >
                  {contato.telefone}
                </a>
              ) : (
                <p className="mt-3 text-gray-500">
                  Telefone não informado
                </p>
              )}

              {contato.telefone && (
                <a
                  href={linkTelefone(contato.telefone)}
                  className="mt-4 inline-block text-sm font-semibold text-[#36b970]"
                >
                  Ligar agora →
                </a>
              )}
            </div>

            {/* WHATSAPP */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#effaf4] text-3xl">
                💬
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                WhatsApp
              </h3>

              {carregando ? (
                <p className="mt-3 animate-pulse text-gray-400">
                  Carregando...
                </p>
              ) : contato.whatsapp ? (
                <p className="mt-3 text-gray-600">{contato.whatsapp}</p>
              ) : (
                <p className="mt-3 text-gray-500">
                  WhatsApp não informado
                </p>
              )}

              {contato.whatsapp && (
                <a
                  href={linkWhatsApp(contato.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-[#36b970]"
                >
                  Iniciar conversa →
                </a>
              )}
            </div>

            {/* EMAIL */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#effaf4] text-3xl">
                📧
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                E-mail
              </h3>

              {carregando ? (
                <p className="mt-3 animate-pulse text-gray-400">
                  Carregando...
                </p>
              ) : contato.email ? (
                <a
                  href={`mailto:${contato.email}`}
                  className="mt-3 block break-all text-gray-600 transition hover:text-[#36b970]"
                >
                  {contato.email}
                </a>
              ) : (
                <p className="mt-3 text-gray-500">
                  E-mail não informado
                </p>
              )}

              {contato.email && (
                <a
                  href={`mailto:${contato.email}`}
                  className="mt-4 inline-block text-sm font-semibold text-[#36b970]"
                >
                  Enviar e-mail →
                </a>
              )}
            </div>

            {/* HORÁRIO */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#effaf4] text-3xl">
                🕐
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Atendimento
              </h3>

              {carregando ? (
                <p className="mt-3 animate-pulse text-gray-400">
                  Carregando...
                </p>
              ) : contato.horario ? (
                <p className="mt-3 whitespace-pre-line text-gray-600">
                  {contato.horario}
                </p>
              ) : (
                <p className="mt-3 text-gray-500">
                  Horário não informado
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* LOCALIZAÇÃO E FORMULÁRIO */}
      {/* ================================================= */}

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* LOCALIZAÇÃO */}
            <div>
              <span className="font-semibold uppercase tracking-wider text-[#36b970]">
                Como chegar
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Nossa localização
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Confira nosso endereço e utilize o mapa para encontrar
                facilmente o Posto Gasparin.
              </p>

              {/* ENDEREÇO */}
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#effaf4] text-2xl">
                    📍
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Endereço
                    </h3>

                    {carregando ? (
                      <p className="mt-2 animate-pulse text-gray-400">
                        Carregando endereço...
                      </p>
                    ) : contato.endereco ? (
                      <p className="mt-2 whitespace-pre-line leading-7 text-gray-600">
                        {contato.endereco}
                      </p>
                    ) : (
                      <p className="mt-2 text-gray-500">
                        Endereço ainda não cadastrado.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* MAPA */}
              <div className="mt-6 flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#173690] to-[#36b970]">
                <div className="p-8 text-center text-white">
                  <div className="text-7xl">📍</div>

                  <h3 className="mt-5 text-2xl font-bold">
                    Posto Gasparin
                  </h3>

                  <p className="mt-3 text-[#e1f7ea]">
                    {contato.endereco || "Nossa localização"}
                  </p>

                  {contato.mapa ? (
                    <a
                      href={contato.mapa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-bold text-[#173690] transition hover:bg-[#effaf4]"
                    >
                      Como chegar
                    </a>
                  ) : (
                    <p className="mt-6 rounded-full bg-white/20 px-5 py-3 text-sm">
                      Localização ainda não configurada
                    </p>
                  )}
                </div>
              </div>

              {contato.mapa && (
                <a
                  href={contato.mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#36b970] px-5 py-3 font-semibold text-[#173690] transition hover:bg-[#effaf4]"
                >
                  📍 Abrir localização no Google Maps
                </a>
              )}
            </div>

            {/* FORMULÁRIO */}
            <div>
              <span className="font-semibold uppercase tracking-wider text-[#36b970]">
                Mensagem
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Fale com a gente
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Preencha o formulário abaixo e sua mensagem será encaminhada
                diretamente para o WhatsApp do posto.
              </p>

              <form
                onSubmit={enviarMensagemWhatsApp}
                className="mt-8 space-y-5"
              >
                {/* NOME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Nome *
                  </label>

                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    E-mail
                  </label>

                  <input
                    type="email"
                    value={emailVisitante}
                    onChange={(e) => setEmailVisitante(e.target.value)}
                    placeholder="seuemail@email.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                  />
                </div>

                {/* TELEFONE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Telefone
                  </label>

                  <input
                    type="tel"
                    value={telefoneVisitante}
                    onChange={(e) => setTelefoneVisitante(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                  />
                </div>

                {/* MENSAGEM */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mensagem *
                  </label>

                  <textarea
                    rows={5}
                    required
                    value={mensagemVisitante}
                    onChange={(e) => setMensagemVisitante(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                  />
                </div>

                {/* BOTÃO */}
                <button
                  type="submit"
                  disabled={!contato.whatsapp}
                  className="w-full rounded-xl bg-[#36b970] px-6 py-3.5 font-bold text-white transition hover:bg-[#2f9f63] disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {contato.whatsapp
                    ? "Enviar mensagem pelo WhatsApp"
                    : "WhatsApp não cadastrado"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  Ao clicar, o WhatsApp será aberto com sua mensagem pronta
                  para envio.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* WHATSAPP */}
      {/* ================================================= */}

      <section className="bg-[#effaf4] py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="text-5xl">💬</div>

          <h2 className="mt-5 text-3xl font-extrabold text-[#10265f]">
            Prefere falar pelo WhatsApp?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#2f9f63]">
            Entre em contato diretamente com nossa equipe pelo WhatsApp.
          </p>

          {contato.whatsapp ? (
            <a
              href={linkWhatsApp(contato.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-full bg-[#36b970] px-7 py-3 font-bold text-white transition hover:bg-[#2f9f63]"
            >
              Conversar pelo WhatsApp
            </a>
          ) : (
            <p className="mt-7 inline-block rounded-full bg-gray-300 px-7 py-3 font-semibold text-gray-600">
              WhatsApp ainda não cadastrado
            </p>
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="bg-[#10265f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {/* SOBRE */}
          <div>
            <h3 className="text-xl font-extrabold">
              Posto Gasparin
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#e1f7ea]">
              Parada, praticidade e atendimento.
            </p>
          </div>

          {/* NAVEGAÇÃO */}
          <div>
            <h3 className="font-bold">Navegação</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-[#e1f7ea]">
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

          {/* CONTATO */}
          <div>
            <h3 className="font-bold">Contato</h3>

            <div className="mt-4 space-y-3 text-sm text-[#e1f7ea]">
              {contato.telefone && (
                <p>
                  Telefone:{" "}
                  <a
                    href={linkTelefone(contato.telefone)}
                    className="hover:text-white"
                  >
                    {contato.telefone}
                  </a>
                </p>
              )}

              {contato.whatsapp && (
                <p>
                  WhatsApp:{" "}
                  <a
                    href={linkWhatsApp(contato.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {contato.whatsapp}
                  </a>
                </p>
              )}

              {contato.email && (
                <p>
                  E-mail:{" "}
                  <a
                    href={`mailto:${contato.email}`}
                    className="break-all hover:text-white"
                  >
                    {contato.email}
                  </a>
                </p>
              )}

              {contato.endereco && (
                <p className="whitespace-pre-line">
                  Endereço: {contato.endereco}
                </p>
              )}

              {!contato.telefone &&
                !contato.whatsapp &&
                !contato.email &&
                !contato.endereco && (
                  <p>Informações de contato não cadastradas.</p>
                )}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#173690]">
          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-[#bdebd0] sm:px-6">
            © {new Date().getFullYear()} Posto Gasparin. Todos os direitos
            reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}