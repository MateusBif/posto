"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AdminContatoPage() {
  const supabase = createClient();

  const [telefone, setTelefone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [endereco, setEndereco] = useState("");
  const [horario, setHorario] = useState("");
  const [email, setEmail] = useState("");
  const [mapa, setMapa] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // CARREGAR DADOS DO SUPABASE
  async function carregarContato() {
    setCarregando(true);
    setErro("");

    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("Erro ao carregar contato:", error);
      setErro("Não foi possível carregar as informações de contato.");
      setCarregando(false);
      return;
    }

    if (data) {
      setTelefone(data.telefone || "");
      setWhatsapp(data.whatsapp || "");
      setEndereco(data.endereco || "");
      setHorario(data.horario || "");
      setEmail(data.email || "");
      setMapa(data.mapa || "");
    }

    setCarregando(false);
  }

  useEffect(() => {
    carregarContato();
  }, []);

  // SALVAR DADOS
  async function salvarContato(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSalvando(true);
    setMensagem("");
    setErro("");

    const dados = {
      id: 1,
      telefone,
      whatsapp,
      endereco,
      horario,
      email,
      mapa,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("contact_info")
      .upsert(dados, { onConflict: "id" });

    if (error) {
      console.error("Erro ao salvar contato:", error);

      setErro(
        "Erro ao salvar as informações. Verifique sua conexão e tente novamente."
      );

      setSalvando(false);
      return;
    }

    setMensagem("Informações de contato salvas com sucesso!");
    setSalvando(false);

    setTimeout(() => {
      setMensagem("");
    }, 5000);
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* CABEÇALHO */}
      <header className="bg-[#173690] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              Posto Gasparin
            </h1>

            <p className="text-sm text-white/80">
              Painel Administrativo
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#36b970]"
            >
              ← Dashboard
            </Link>

            <Link
              href="/contato"
              target="_blank"
              className="rounded-lg bg-[#36b970] px-4 py-2 text-sm font-semibold text-[#173690] transition hover:bg-white"
            >
              Ver site
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* TÍTULO */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#36b970]">
            Área administrativa
          </p>

          <h2 className="text-3xl font-bold text-[#173690]">
            Informações de contato
          </h2>

          <p className="mt-2 text-gray-600">
            Gerencie as informações que serão exibidas na página pública
            de contato.
          </p>
        </div>

        {/* CARREGANDO */}
        {carregando && (
          <div className="mb-6 rounded-xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#36b970]" />

            <p className="mt-4 font-semibold text-gray-600">
              Carregando informações...
            </p>
          </div>
        )}

        {/* MENSAGEM DE SUCESSO */}
        {mensagem && (
          <div className="mb-6 rounded-xl border border-[#36b970]/30 bg-[#36b970]/10 px-5 py-4 text-[#173690]">
            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>

              <div>
                <p className="font-semibold">{mensagem}</p>

                <p className="text-sm text-[#36b970]">
                  As informações foram armazenadas no banco de dados.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ERRO */}
        {erro && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>

              <p className="font-semibold">{erro}</p>
            </div>
          </div>
        )}

        {/* FORMULÁRIO */}
        {!carregando && (
          <form
            onSubmit={salvarContato}
            className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
          >
            {/* DADOS PRINCIPAIS */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#173690]">
                Dados principais
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Essas informações serão exibidas no site e utilizadas
                pelos visitantes para entrar em contato.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* TELEFONE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Telefone
                </label>

                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Ex.: (45) 0000-0000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                />
              </div>

              {/* WHATSAPP */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  WhatsApp
                </label>

                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex.: (45) 99999-9999"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Informe o número que receberá mensagens pelo WhatsApp.
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  E-mail
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex.: contato@posto.com.br"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                />
              </div>

              {/* HORÁRIO */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Horário de atendimento
                </label>

                <input
                  type="text"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  placeholder="Ex.: Segunda a domingo, 06h às 22h"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                />
              </div>
            </div>

            {/* ENDEREÇO */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Endereço
              </label>

              <textarea
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                rows={3}
                placeholder="Digite o endereço completo do posto"
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />
            </div>

            {/* GOOGLE MAPS */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Link do Google Maps
              </label>

              <input
                type="url"
                value={mapa}
                onChange={(e) => setMapa(e.target.value)}
                placeholder="Cole aqui o link da localização no Google Maps"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />

              <p className="mt-2 text-xs text-gray-500">
                Esse link será utilizado no botão "Como chegar" do site.
              </p>

              {mapa && (
                <a
                  href={mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-[#173690] underline hover:text-[#36b970]"
                >
                  Testar link do Google Maps ↗
                </a>
              )}
            </div>

            {/* BOTÕES */}
            <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/admin/dashboard"
                className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={salvando}
                className="rounded-xl bg-[#173690] px-6 py-3 font-semibold text-white transition hover:bg-[#36b970] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando ? "Salvando..." : "Salvar informações"}
              </button>
            </div>
          </form>
        )}

        {/* INFORMAÇÃO */}
        <div className="mt-8 rounded-2xl border border-[#36b970]/20 bg-[#36b970]/10 p-6">
          <h3 className="text-lg font-bold text-[#173690]">
            Sobre esta seção
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-700">
            As informações cadastradas aqui são armazenadas no Supabase.
            As alterações realizadas serão exibidas na página pública
            de contato, sem necessidade de modificar o código do site.
          </p>
        </div>
      </section>
    </main>
  );
}