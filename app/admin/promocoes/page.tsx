"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Promocao = {
  id: number;
  titulo: string;
  descricao: string;
  tipo: "Promoção" | "Sorteio";
  inicio: string;
  fim: string;
  ativa: boolean;
};

export default function AdminPromocoes() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([
    {
      id: 1,
      titulo: "Promoção de exemplo",
      descricao:
        "Esta é uma promoção de exemplo. As informações reais serão cadastradas posteriormente.",
      tipo: "Promoção",
      inicio: "01/10/2026",
      fim: "31/10/2026",
      ativa: true,
    },
    {
      id: 2,
      titulo: "Sorteio de exemplo",
      descricao:
        "Exemplo de sorteio que poderá ser divulgado pelo site do Posto Gasparin.",
      tipo: "Sorteio",
      inicio: "05/10/2026",
      fim: "30/11/2026",
      ativa: true,
    },
  ]);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"Promoção" | "Sorteio">("Promoção");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [ativa, setAtiva] = useState(true);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");

  function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setTipo("Promoção");
    setInicio("");
    setFim("");
    setAtiva(true);
    setEditandoId(null);
  }

  function salvarPromocao(event: FormEvent) {
    event.preventDefault();

    if (
      !titulo.trim() ||
      !descricao.trim() ||
      !inicio ||
      !fim
    ) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    if (editandoId !== null) {
      setPromocoes((listaAtual) =>
        listaAtual.map((promocao) =>
          promocao.id === editandoId
            ? {
                ...promocao,
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                tipo,
                inicio,
                fim,
                ativa,
              }
            : promocao
        )
      );

      setMensagem("Promoção atualizada com sucesso!");
    } else {
      const novaPromocao: Promocao = {
        id: Date.now(),
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        tipo,
        inicio,
        fim,
        ativa,
      };

      setPromocoes((listaAtual) => [
        ...listaAtual,
        novaPromocao,
      ]);

      setMensagem("Promoção cadastrada com sucesso!");
    }

    limparFormulario();

    setTimeout(() => {
      setMensagem("");
    }, 3000);
  }

  function editarPromocao(promocao: Promocao) {
    setTitulo(promocao.titulo);
    setDescricao(promocao.descricao);
    setTipo(promocao.tipo);
    setInicio(promocao.inicio);
    setFim(promocao.fim);
    setAtiva(promocao.ativa);
    setEditandoId(promocao.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function excluirPromocao(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta promoção?"
    );

    if (!confirmar) {
      return;
    }

    setPromocoes((listaAtual) =>
      listaAtual.filter((promocao) => promocao.id !== id)
    );

    setMensagem("Promoção excluída com sucesso!");

    setTimeout(() => {
      setMensagem("");
    }, 3000);
  }

  function alternarStatus(id: number) {
    setPromocoes((listaAtual) =>
      listaAtual.map((promocao) =>
        promocao.id === id
          ? {
              ...promocao,
              ativa: !promocao.ativa,
            }
          : promocao
      )
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-green-950 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              Posto Gasparin
            </h1>

            <p className="text-sm text-green-200">
              Painel Administrativo
            </p>
          </div>

          <div className="flex items-center gap-3">

            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold transition hover:bg-green-900"
            >
              ← Dashboard
            </Link>

            <Link
              href="/"
              className="hidden rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-green-950 transition hover:bg-yellow-300 sm:block"
            >
              Ver site
            </Link>

          </div>

        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        {/* TÍTULO */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Administração
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Promoções e Sorteios
          </h2>

          <p className="mt-2 text-gray-600">
            Cadastre e gerencie as promoções e sorteios que serão
            divulgados no site.
          </p>

        </div>

        {/* MENSAGEM */}
        {mensagem && (
          <div
            className={`mb-6 rounded-xl border p-4 ${
              mensagem.includes("Preencha")
                ? "border-yellow-300 bg-yellow-50 text-yellow-800"
                : "border-green-300 bg-green-50 text-green-800"
            }`}
          >
            <div className="flex items-center gap-3">

              <span className="text-xl">
                {mensagem.includes("Preencha")
                  ? "⚠️"
                  : "✅"}
              </span>

              <p className="font-semibold">
                {mensagem}
              </p>

            </div>
          </div>
        )}

        {/* FORMULÁRIO */}
        <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {editandoId !== null
                  ? "Editar promoção"
                  : "Nova promoção"}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Cadastre uma promoção ou sorteio para divulgação.
              </p>
            </div>

            {editandoId !== null && (
              <button
                type="button"
                onClick={limparFormulario}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancelar edição
              </button>
            )}

          </div>

          <form
            onSubmit={salvarPromocao}
            className="mt-6 space-y-5"
          >

            {/* TÍTULO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Título *
              </label>

              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex.: Promoção especial"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* TIPO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Tipo *
              </label>

              <select
                value={tipo}
                onChange={(e) =>
                  setTipo(
                    e.target.value as
                      | "Promoção"
                      | "Sorteio"
                  )
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="Promoção">
                  Promoção
                </option>

                <option value="Sorteio">
                  Sorteio
                </option>
              </select>
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Descrição *
              </label>

              <textarea
                value={descricao}
                onChange={(e) =>
                  setDescricao(e.target.value)
                }
                placeholder="Descreva a promoção ou sorteio..."
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* DATAS */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Data de início *
                </label>

                <input
                  type="date"
                  value={inicio}
                  onChange={(e) =>
                    setInicio(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Data de encerramento *
                </label>

                <input
                  type="date"
                  value={fim}
                  onChange={(e) =>
                    setFim(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

            </div>

            {/* STATUS */}
            <div className="rounded-xl bg-gray-50 p-4">

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={ativa}
                  onChange={(e) =>
                    setAtiva(e.target.checked)
                  }
                  className="h-5 w-5 accent-green-700"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Promoção ativa
                  </p>

                  <p className="text-sm text-gray-500">
                    Quando ativa, poderá ser exibida no site público.
                  </p>
                </div>

              </label>

            </div>

            {/* BOTÃO */}
            <div className="flex justify-end">

              <button
                type="submit"
                className="w-full rounded-xl bg-green-800 px-7 py-3 font-bold text-white transition hover:bg-green-700 sm:w-auto"
              >
                {editandoId !== null
                  ? "💾 Salvar alterações"
                  : "➕ Cadastrar promoção"}
              </button>

            </div>

          </form>

        </section>

        {/* LISTA */}
        <section>

          <div className="mb-5">

            <h3 className="text-xl font-bold text-gray-900">
              Promoções cadastradas
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {promocoes.length}{" "}
              {promocoes.length === 1
                ? "item cadastrado"
                : "itens cadastrados"}
            </p>

          </div>

          {promocoes.length === 0 ? (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

              <div className="text-5xl">
                🎁
              </div>

              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Nenhuma promoção cadastrada
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Cadastre uma promoção ou sorteio utilizando
                o formulário acima.
              </p>

            </div>

          ) : (

            <div className="grid gap-5 lg:grid-cols-2">

              {promocoes.map((promocao) => (

                <article
                  key={promocao.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >

                  {/* TOPO DO CARD */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
                        {promocao.tipo === "Sorteio"
                          ? "🎟️"
                          : "🎁"}
                      </div>

                      <div className="min-w-0">

                        <div className="mb-2 flex flex-wrap items-center gap-2">

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                            {promocao.tipo}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              promocao.ativa
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {promocao.ativa
                              ? "Ativa"
                              : "Inativa"}
                          </span>

                        </div>

                        <h4 className="text-lg font-bold text-gray-900">
                          {promocao.titulo}
                        </h4>

                      </div>

                    </div>

                  </div>

                  {/* DESCRIÇÃO */}
                  <p className="mt-5 text-sm leading-6 text-gray-600">
                    {promocao.descricao}
                  </p>

                  {/* DATAS */}
                  <div className="mt-5 grid gap-3 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">

                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Início
                      </p>

                      <p className="mt-1 font-semibold text-gray-800">
                        {promocao.inicio}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Encerramento
                      </p>

                      <p className="mt-1 font-semibold text-gray-800">
                        {promocao.fim}
                      </p>
                    </div>

                  </div>

                  {/* AÇÕES */}
                  <div className="mt-6 grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-3">

                    <button
                      type="button"
                      onClick={() =>
                        editarPromocao(promocao)
                      }
                      className="rounded-lg border border-green-700 px-4 py-2 text-sm font-bold text-green-800 transition hover:bg-green-50"
                    >
                      ✏️ Editar
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        alternarStatus(promocao.id)
                      }
                      className="rounded-lg border border-yellow-500 px-4 py-2 text-sm font-bold text-yellow-700 transition hover:bg-yellow-50"
                    >
                      {promocao.ativa
                        ? "⏸️ Desativar"
                        : "▶️ Ativar"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        excluirPromocao(promocao.id)
                      }
                      className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
                    >
                      🗑️ Excluir
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </section>

      {/* FOOTER */}
      <footer className="mt-10 bg-green-950 px-6 py-8 text-center text-sm text-green-200">

        <p>
          Painel Administrativo — Posto Gasparin
        </p>

        <p className="mt-1 text-green-400">
          Gerenciamento de promoções e sorteios
        </p>

      </footer>

    </main>
  );
}