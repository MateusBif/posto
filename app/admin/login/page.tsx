
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginAdmin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    setCarregando(true);

    try {
      const supabase = createClient();

      // 1. Autenticação
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: senha,
        });

      if (authError || !authData.user) {
        setErro("E-mail ou senha inválidos.");
        return;
      }

      // 2. Consultar perfil do usuário
      const { data: perfil, error: perfilError } =
        await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .maybeSingle();

      if (perfilError || !perfil) {
        await supabase.auth.signOut();

        setErro(
          "Usuário sem perfil administrativo cadastrado."
        );
        return;
      }

      // 3. Verificar autorização
      const autorizado =
        perfil.role === "admin" ||
        perfil.role === "editor";

      if (!autorizado) {
        await supabase.auth.signOut();

        setErro(
          "Você não possui autorização para acessar o painel."
        );
        return;
      }

      // 4. Login autorizado
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Erro no login administrativo:", error);

      setErro(
        "Ocorreu um erro inesperado. Verifique sua conexão e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#173690] px-4 py-10">

      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#36b970] text-xl font-extrabold text-white">
              PG
            </div>

            <div className="text-left">
              <h1 className="text-xl font-extrabold text-white">
                Posto Gasparin
              </h1>

              <p className="text-sm text-white/80">
                Área Administrativa
              </p>
            </div>
          </Link>
        </div>

        {/* CARD */}
        <div className="rounded-3xl bg-white p-7 shadow-2xl sm:p-9">

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#36b970]/10 text-3xl">
              🔐
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-[#173690]">
              Acesso administrativo
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Entre com suas credenciais para acessar o painel.
            </p>
          </div>

          {/* ERRO */}
          {erro && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {erro}
            </div>
          )}

          {/* FORMULÁRIO */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* EMAIL */}
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
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Digite seu e-mail"
                autoComplete="email"
                required
                disabled={carregando}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />
            </div>

            {/* SENHA */}
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
                onChange={(event) =>
                  setSenha(event.target.value)
                }
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                disabled={carregando}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />
            </div>

            {/* BOTÃO */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-xl bg-[#173690] px-5 py-3.5 font-bold text-white transition hover:bg-[#36b970] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {carregando
                ? "Entrando..."
                : "Entrar no painel"}
            </button>
          </form>

          {/* VOLTAR */}
          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-[#36b970] hover:text-[#173690]"
            >
              ← Voltar para o site
            </Link>
          </div>
        </div>

        {/* RODAPÉ */}
        <p className="mt-6 text-center text-xs text-white/70">
          Área restrita aos funcionários autorizados.
        </p>
      </div>
    </main>
  );
}
