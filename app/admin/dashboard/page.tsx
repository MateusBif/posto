"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminDashboard() {
  const [menuAberto, setMenuAberto] = useState(false);

  const modulos = [
    {
      titulo: "O Posto",
      descricao: "Edite informações, apresentação e detalhes do posto.",
      icone: "🏪",
      link: "/admin/o-posto",
    },
    {
      titulo: "Serviços",
      descricao: "Gerencie os serviços oferecidos pelo posto.",
      icone: "🔧",
      link: "/admin/servicos",
    },
    {
      titulo: "Promoções",
      descricao: "Cadastre e altere promoções e sorteios.",
      icone: "🎁",
      link: "/admin/promocoes",
    },
    {
      titulo: "Galeria",
      descricao: "Adicione, remova e organize fotos.",
      icone: "🖼️",
      link: "/admin/galeria",
    },
    {
      titulo: "Contato",
      descricao: "Atualize telefone, WhatsApp, endereço e horários.",
      icone: "📞",
      link: "/admin/contato",
    },
  ];

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

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium hover:text-yellow-300"
            >
              Ver site
            </Link>

            <button
              onClick={() => {
                window.location.href = "/admin/login";
              }}
              className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-green-950 hover:bg-yellow-300"
            >
              Sair
            </button>
          </nav>

          {/* MENU MOBILE */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="text-2xl md:hidden"
          >
            ☰
          </button>
        </div>

        {menuAberto && (
          <div className="border-t border-green-800 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium"
              >
                Ver site
              </Link>

              <button
                onClick={() => {
                  window.location.href = "/admin/login";
                }}
                className="w-full rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-green-950"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* TÍTULO */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
            Administração
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p className="mt-2 max-w-2xl text-gray-600">
            Gerencie as informações que serão exibidas no site público
            do Posto Gasparin.
          </p>
        </div>

        {/* AVISO */}
        <div className="mb-8 rounded-xl border border-yellow-300 bg-yellow-50 p-5">
          <div className="flex gap-4">
            <div className="text-2xl">
              💡
            </div>

            <div>
              <h3 className="font-bold text-yellow-900">
                Área administrativa
              </h3>

              <p className="mt-1 text-sm text-yellow-800">
                Aqui os funcionários poderão atualizar as informações
                do site sem precisar alterar o código da aplicação.
              </p>
            </div>
          </div>
        </div>

        {/* MÓDULOS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {modulos.map((modulo) => (
            <Link
              key={modulo.titulo}
              href={modulo.link}
              className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-3xl">
                {modulo.icone}
              </div>

              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-800">
                {modulo.titulo}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {modulo.descricao}
              </p>

              <div className="mt-5 font-semibold text-green-700">
                Gerenciar →
              </div>
            </Link>
          ))}

        </div>

        {/* STATUS */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="text-xl font-bold text-gray-900">
            Status do sistema
          </h3>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Site público
              </p>

              <p className="mt-2 font-bold text-green-700">
                ● Online
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Área administrativa
              </p>

              <p className="mt-2 font-bold text-green-700">
                ● Ativa
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Banco de dados
              </p>

              <p className="mt-2 font-bold text-yellow-600">
                ● Em configuração
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-10 bg-green-950 px-6 py-8 text-center text-sm text-green-200">
        <p>
          Painel Administrativo — Posto Gasparin
        </p>

        <p className="mt-1 text-green-400">
          Sistema de gerenciamento de conteúdo
        </p>
      </footer>

    </main>
  );
}