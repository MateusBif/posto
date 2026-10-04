"use client";

import { useState } from "react";

export default function AdminContatoPage() {
  const [telefone, setTelefone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [endereco, setEndereco] = useState("");
  const [horario, setHorario] = useState("");
  const [email, setEmail] = useState("");
  const [mapa, setMapa] = useState("");

  const [mensagem, setMensagem] = useState("");

  function salvarContato(e: React.FormEvent) {
    e.preventDefault();

    setMensagem("Informações de contato salvas com sucesso!");

    setTimeout(() => {
      setMensagem("");
    }, 4000);
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* CABEÇALHO */}
      <header className="bg-green-950 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              Posto Gasparin
            </h1>

            <p className="text-sm text-green-200">
              Administração • Contato
            </p>
          </div>

          <a
            href="/admin/dashboard"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-950 transition hover:bg-gray-100"
          >
            Voltar
          </a>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-yellow-600">
            Área administrativa
          </p>

          <h2 className="text-3xl font-bold text-green-950">
            Informações de contato
          </h2>

          <p className="mt-2 text-gray-600">
            Cadastre e atualize as informações que serão exibidas na página
            pública de contato.
          </p>
        </div>

        {/* MENSAGEM */}
        {mensagem && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-800">
            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>

              <div>
                <p className="font-semibold">{mensagem}</p>

                <p className="text-sm text-green-700">
                  Nesta versão, os dados ainda estão sendo mantidos apenas
                  durante a sessão.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FORMULÁRIO */}
        <form
          onSubmit={salvarContato}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold text-green-950">
              Dados principais
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Preencha os dados reais do Posto Gasparin quando estiverem
              disponíveis.
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
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
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
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* E-MAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex.: contato@posto.com.br"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
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
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
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
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* MAPA */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Link do Google Maps
            </label>

            <input
              type="url"
              value={mapa}
              onChange={(e) => setMapa(e.target.value)}
              placeholder="Cole aqui o link da localização no Google Maps"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              Esse link poderá ser utilizado no botão "Como chegar" do site.
            </p>
          </div>

          {/* BOTÕES */}
          <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <a
              href="/admin/dashboard"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancelar
            </a>

            <button
              type="submit"
              className="rounded-xl bg-green-900 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Salvar informações
            </button>
          </div>
        </form>

        {/* PRÉVIA */}
        <div className="mt-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <h3 className="text-lg font-bold text-green-950">
            Sobre esta seção
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-700">
            Futuramente, estas informações serão armazenadas no banco de dados
            e utilizadas automaticamente pela página pública de contato,
            incluindo telefone, WhatsApp, endereço, horário e localização.
          </p>
        </div>
      </section>
    </main>
  );
}