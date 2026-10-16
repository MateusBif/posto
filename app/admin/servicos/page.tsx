"use client";

import { FormEvent, useState } from "react";

import Link from "next/link";

type Servico = {

  id: number;

  nome: string;

  descricao: string;

};

export default function AdminServicos() {

  const [servicos, setServicos] = useState<Servico[]>([

    {

      id: 1,

      nome: "Abastecimento",

      descricao: "Serviço de abastecimento de veículos.",

    },

    {

      id: 2,

      nome: "Conveniência",

      descricao: "Produtos e itens para facilitar a viagem.",

    },

    {

      id: 3,

      nome: "Atendimento",

      descricao: "Atendimento aos clientes do posto.",

    },

  ]);

  const [nome, setNome] = useState("");

  const [descricao, setDescricao] = useState("");

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [mensagem, setMensagem] = useState("");

  function limparFormulario() {

    setNome("");

    setDescricao("");

    setEditandoId(null);

  }

  function salvarServico(event: FormEvent) {

    event.preventDefault();

    if (!nome.trim() || !descricao.trim()) {

      setMensagem("Preencha o nome e a descrição do serviço.");

      return;

    }

    if (editandoId !== null) {

      setServicos((servicosAtuais) =>

        servicosAtuais.map((servico) =>

          servico.id === editandoId

            ? {

                ...servico,

                nome: nome.trim(),

                descricao: descricao.trim(),

              }

            : servico

        )

      );

      setMensagem("Serviço atualizado com sucesso!");

    } else {

      const novoServico: Servico = {

        id: Date.now(),

        nome: nome.trim(),

        descricao: descricao.trim(),

      };

      setServicos((servicosAtuais) => [

        ...servicosAtuais,

        novoServico,

      ]);

      setMensagem("Serviço cadastrado com sucesso!");

    }

    limparFormulario();

    setTimeout(() => {

      setMensagem("");

    }, 3000);

  }

  function editarServico(servico: Servico) {

    setNome(servico.nome);

    setDescricao(servico.descricao);

    setEditandoId(servico.id);

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  }

  function excluirServico(id: number) {

    const confirmar = window.confirm(

      "Tem certeza que deseja excluir este serviço?"

    );

    if (!confirmar) {

      return;

    }

    setServicos((servicosAtuais) =>

      servicosAtuais.filter((servico) => servico.id !== id)

    );

    setMensagem("Serviço excluído com sucesso!");

    setTimeout(() => {

      setMensagem("");

    }, 3000);

  }

  return (

    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <header className="bg-[#173690] text-white shadow-lg">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">

              Posto Gasparin

            </h1>

            <p className="text-sm text-white/80">

              Painel Administrativo

            </p>

          </div>

          <div className="flex items-center gap-3">

            <Link

              href="/admin/dashboard"

              className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-semibold transition hover:bg-[#36b970]"

            >

              ← Dashboard

            </Link>

            <Link

              href="/"

              className="hidden rounded-lg bg-[#36b970] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#2fa864] sm:block"

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

          <p className="text-sm font-semibold uppercase tracking-wide text-[#36b970]">

            Administração

          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#173690]">

            Serviços

          </h2>

          <p className="mt-2 text-gray-600">

            Cadastre e gerencie os serviços que serão apresentados

            no site público.

          </p>

        </div>

        {/* MENSAGEM */}

        {mensagem && (

          <div className="mb-6 rounded-xl border border-[#36b970]/30 bg-[#36b970]/10 p-4 text-[#173690]">

            <div className="flex items-center gap-3">

              <span className="text-xl">

                {mensagem.includes("Preencha") ? "⚠️" : "✅"}

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

              <h3 className="text-xl font-bold text-[#173690]">

                {editandoId !== null

                  ? "Editar serviço"

                  : "Novo serviço"}

              </h3>

              <p className="mt-1 text-sm text-gray-500">

                {editandoId !== null

                  ? "Altere as informações e salve novamente."

                  : "Adicione um novo serviço ao site."}

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

            onSubmit={salvarServico}

            className="mt-6 space-y-5"

          >

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">

                Nome do serviço

              </label>

              <input

                type="text"

                value={nome}

                onChange={(e) => setNome(e.target.value)}

                placeholder="Ex.: Lavagem de veículos"

                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"

              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">

                Descrição

              </label>

              <textarea

                value={descricao}

                onChange={(e) => setDescricao(e.target.value)}

                placeholder="Descreva o serviço..."

                rows={4}

                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"

              />

            </div>

            <div className="flex justify-end">

              <button

                type="submit"

                className="w-full rounded-xl bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-[#36b970] sm:w-auto"

              >

                {editandoId !== null

                  ? "💾 Salvar alterações"

                  : "➕ Cadastrar serviço"}

              </button>

            </div>

          </form>

        </section>

        {/* LISTA */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold text-[#173690]">

                Serviços cadastrados

              </h3>

              <p className="mt-1 text-sm text-gray-500">

                {servicos.length}{" "}

                {servicos.length === 1

                  ? "serviço cadastrado"

                  : "serviços cadastrados"}

              </p>

            </div>

          </div>

          {servicos.length === 0 ? (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

              <div className="text-4xl">

                🔧

              </div>

              <h3 className="mt-4 text-lg font-bold text-[#173690]">

                Nenhum serviço cadastrado

              </h3>

              <p className="mt-2 text-sm text-gray-500">

                Cadastre o primeiro serviço utilizando o formulário acima.

              </p>

            </div>

          ) : (

            <div className="grid gap-5 md:grid-cols-2">

              {servicos.map((servico) => (

                <article

                  key={servico.id}

                  className="rounded-2xl bg-white p-6 shadow-sm"

                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#36b970]/10 text-2xl">

                        🔧

                      </div>

                      <div className="min-w-0">

                        <h4 className="text-lg font-bold text-[#173690]">

                          {servico.nome}

                        </h4>

                        <p className="mt-2 text-sm leading-6 text-gray-600">

                          {servico.descricao}

                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

                    <button

                      type="button"

                      onClick={() => editarServico(servico)}

                      className="flex-1 rounded-lg border border-[#36b970] px-4 py-2 text-sm font-bold text-[#173690] transition hover:bg-[#36b970]/10"

                    >

                      ✏️ Editar

                    </button>

                    <button

                      type="button"

                      onClick={() => excluirServico(servico.id)}

                      className="flex-1 rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"

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

      <footer className="mt-10 bg-[#173690] px-6 py-8 text-center text-sm text-white/80">

        <p>

          Painel Administrativo — Posto Gasparin

        </p>

        <p className="mt-1 text-[#36b970]">

          Gerenciamento de serviços

        </p>

      </footer>

    </main>

  );

}
