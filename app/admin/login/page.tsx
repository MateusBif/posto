"use client";

import { FormEvent, useState } from "react";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");

    if (!email || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    // Login provisório.
    // A autenticação real será conectada posteriormente.
    if (email === "admin@postogasparin.com.br" && senha === "123456") {
      window.location.href = "/admin/dashboard";
      return;
    }

    setErro("E-mail ou senha inválidos.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-950 px-4 py-10">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="mb-8 text-center">

          <a href="/" className="inline-flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-xl font-extrabold text-green-950">
              PG
            </div>

            <div className="text-left">
              <h1 className="text-xl font-extrabold text-white">
                Posto Gasparin
              </h1>

              <p className="text-sm text-green-200">
                Área Administrativa
              </p>
            </div>

          </a>

        </div>

        {/* CARD */}
        <div className="rounded-3xl bg-white p-7 shadow-2xl sm:p-9">

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
              🔐
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
              Acesso administrativo
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Entre com suas credenciais para acessar o painel.
            </p>

          </div>

          {/* ERRO */}
          {erro && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {erro}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                E-mail
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu e-mail"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Senha
              </label>

              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="Digite sua senha"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 px-5 py-3.5 font-bold text-white transition hover:bg-green-800"
            >
              Entrar no painel
            </button>

          </form>

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">

            <a
              href="/"
              className="text-sm font-semibold text-green-700 hover:text-green-800"
            >
              ← Voltar para o site
            </a>

          </div>

        </div>

        <p className="mt-6 text-center text-xs text-green-300">
          Área restrita aos funcionários autorizados.
        </p>

      </div>

    </main>
  );
}