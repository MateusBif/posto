
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Formulario = {
  nome: string;
  titulo: string;
  descricao: string;
  historia: string;
  diferencial1: string;
  diferencial2: string;
  diferencial3: string;
  diferencial4: string;
  estrutura1: string;
  estrutura2: string;
  estrutura3: string;
  estrutura4: string;
};

const BUCKET = "posto-gasparin-media";
const LIMITE_ARQUIVO = 5 * 1024 * 1024;

const formularioInicial: Formulario = {
  nome: "",
  titulo: "",
  descricao: "",
  historia: "",
  diferencial1: "",
  diferencial2: "",
  diferencial3: "",
  diferencial4: "",
  estrutura1: "",
  estrutura2: "",
  estrutura3: "",
  estrutura4: "",
};

export default function AdminOPosto() {
  const supabase = createClient();

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState("");

  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);

  const [logoAtual, setLogoAtual] = useState("");
  const [faviconAtual, setFaviconAtual] = useState("");

  const [formulario, setFormulario] =
    useState<Formulario>(formularioInicial);

  // CARREGAR DADOS
  useEffect(() => {
    async function carregarDados() {
      try {
        const { data, error } = await supabase
          .from("site_config")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Erro ao carregar site_config:", error);
          setErro("Não foi possível carregar as informações do posto.");
          return;
        }

        if (data) {
          setFormulario({
            nome: data.nome_posto || "",
            titulo: data.titulo_apresentacao || "",
            descricao: data.descricao || "",
            historia: data.historia || "",
            diferencial1: data.diferencial1 || "",
            diferencial2: data.diferencial2 || "",
            diferencial3: data.diferencial3 || "",
            diferencial4: data.diferencial4 || "",
            estrutura1: data.estrutura1 || "",
            estrutura2: data.estrutura2 || "",
            estrutura3: data.estrutura3 || "",
            estrutura4: data.estrutura4 || "",
          });

          setLogoAtual(data.logo_url || "");
          setFaviconAtual(data.favicon_url || "");
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
        setErro("Ocorreu um erro ao carregar os dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  // ALTERAR CAMPO
  function alterarCampo(
    campo: keyof Formulario,
    valor: string
  ) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));

    setSalvo(false);
    setErro("");
  }

  // VALIDAR ARQUIVO
  function validarImagem(arquivo: File): string | null {
    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/x-icon",
      "image/vnd.microsoft.icon",
    ];

    if (!tiposPermitidos.includes(arquivo.type)) {
      return "Formato inválido. Use JPG, PNG, WEBP, SVG ou ICO.";
    }

    if (arquivo.size > LIMITE_ARQUIVO) {
      return "O arquivo deve possuir no máximo 5 MB.";
    }

    return null;
  }

  // UPLOAD
  async function enviarImagem(
    arquivo: File,
    pasta: string
  ): Promise<string | null> {
    const validacao = validarImagem(arquivo);

    if (validacao) {
      setErro(validacao);
      return null;
    }

    const extensao = arquivo.name.split(".").pop()?.toLowerCase() || "jpg";

    const nomeArquivo = `${pasta}-${Date.now()}.${extensao}`;

    const caminho = `${pasta}/${nomeArquivo}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(caminho, arquivo, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Erro no upload:", error);
      setErro(`Não foi possível enviar o arquivo ${arquivo.name}.`);
      return null;
    }

    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(caminho);

    return data.publicUrl;
  }

  // SELECIONAR LOGO
  function selecionarLogo(arquivo: File | null) {
    if (!arquivo) {
      setLogo(null);
      return;
    }

    const validacao = validarImagem(arquivo);

    if (validacao) {
      setErro(validacao);
      setLogo(null);
      return;
    }

    setLogo(arquivo);
    setErro("");
    setSalvo(false);
  }

  // SELECIONAR FAVICON
  function selecionarFavicon(arquivo: File | null) {
    if (!arquivo) {
      setFavicon(null);
      return;
    }

    const validacao = validarImagem(arquivo);

    if (validacao) {
      setErro(validacao);
      setFavicon(null);
      return;
    }

    setFavicon(arquivo);
    setErro("");
    setSalvo(false);
  }

  // SALVAR
  async function salvarAlteracoes(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (salvando) return;

    setSalvando(true);
    setSalvo(false);
    setErro("");

    try {
      let novaLogo = logoAtual;
      let novoFavicon = faviconAtual;

      // UPLOAD DA LOGO
      if (logo) {
        const url = await enviarImagem(logo, "logo");

        if (!url) return;

        novaLogo = url;
      }

      // UPLOAD DO FAVICON
      if (favicon) {
        const url = await enviarImagem(favicon, "favicon");

        if (!url) return;

        novoFavicon = url;
      }

      // SALVAR NO BANCO
      const { error } = await supabase
        .from("site_config")
        .upsert(
          {
            id: 1,

            nome_posto: formulario.nome,
            slogan: formulario.titulo,
            titulo_apresentacao: formulario.titulo,
            descricao: formulario.descricao,
            historia: formulario.historia,

            diferencial1: formulario.diferencial1,
            diferencial2: formulario.diferencial2,
            diferencial3: formulario.diferencial3,
            diferencial4: formulario.diferencial4,

            estrutura1: formulario.estrutura1,
            estrutura2: formulario.estrutura2,
            estrutura3: formulario.estrutura3,
            estrutura4: formulario.estrutura4,

            logo_url: novaLogo,
            favicon_url: novoFavicon,
          },
          {
            onConflict: "id",
          }
        );

      if (error) {
        console.error("Erro ao salvar:", error);
        setErro(
          "Não foi possível salvar as alterações no banco de dados."
        );
        return;
      }

      setLogoAtual(novaLogo);
      setFaviconAtual(novoFavicon);

      setLogo(null);
      setFavicon(null);

      setSalvo(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Erro inesperado ao salvar:", error);
      setErro("Ocorreu um erro inesperado ao salvar.");
    } finally {
      setSalvando(false);
    }
  }

  // LOADING
  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#173690]" />

          <p className="font-semibold text-[#173690]">
            Carregando informações...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-[#173690] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div>
            <p className="text-2xl font-bold">
              Posto Gasparin
            </p>

            <p className="text-sm text-white/80">
              Painel Administrativo
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-semibold transition hover:bg-[#36b970]"
            >
              ← Dashboard
            </Link>

            <Link
              href="/"
              className="rounded-lg bg-[#36b970] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#2fa864]"
            >
              Ver site
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">

        {/* TÍTULO */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#36b970]">
            Administração
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#173690]">
            O Posto
          </h1>

          <p className="mt-2 text-gray-600">
            Edite as informações que serão apresentadas
            na página "O Posto" do site.
          </p>
        </div>

        {/* SUCESSO */}
        {salvo && (
          <div className="mb-6 rounded-xl border border-[#36b970]/30 bg-[#36b970]/10 p-4 text-[#173690]">
            <div className="flex items-center gap-3">
              <span className="text-xl">✅</span>

              <div>
                <p className="font-bold">
                  Alterações salvas!
                </p>

                <p className="text-sm">
                  As informações foram atualizadas com sucesso.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ERRO */}
        {erro && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            <p className="font-bold">Atenção</p>
            <p className="text-sm">{erro}</p>
          </div>
        )}

        {/* FORMULÁRIO */}
        <form
          onSubmit={salvarAlteracoes}
          className="space-y-8"
        >

          {/* INFORMAÇÕES PRINCIPAIS */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-[#173690]">
              Informações principais
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Essas informações serão utilizadas na apresentação principal do posto.
            </p>

            <div className="mt-6 space-y-5">

              <Campo
                label="Nome do posto"
                value={formulario.nome}
                onChange={(valor) => alterarCampo("nome", valor)}
              />

              <Campo
                label="Título de apresentação"
                value={formulario.titulo}
                onChange={(valor) => alterarCampo("titulo", valor)}
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Descrição
                </label>

                <textarea
                  value={formulario.descricao}
                  onChange={(e) =>
                    alterarCampo("descricao", e.target.value)
                  }
                  rows={5}
                  className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  História do posto
                </label>

                <textarea
                  value={formulario.historia}
                  onChange={(e) =>
                    alterarCampo("historia", e.target.value)
                  }
                  rows={6}
                  className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                />
              </div>
            </div>
          </section>

          {/* DIFERENCIAIS */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-[#173690]">
              Diferenciais
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Cadastre os principais diferenciais que serão apresentados aos clientes.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Campo
                label="Diferencial 1"
                value={formulario.diferencial1}
                onChange={(valor) => alterarCampo("diferencial1", valor)}
              />

              <Campo
                label="Diferencial 2"
                value={formulario.diferencial2}
                onChange={(valor) => alterarCampo("diferencial2", valor)}
              />

              <Campo
                label="Diferencial 3"
                value={formulario.diferencial3}
                onChange={(valor) => alterarCampo("diferencial3", valor)}
              />

              <Campo
                label="Diferencial 4"
                value={formulario.diferencial4}
                onChange={(valor) => alterarCampo("diferencial4", valor)}
              />
            </div>
          </section>

          {/* ESTRUTURA */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-[#173690]">
              Estrutura
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Informe os principais espaços ou estruturas disponíveis no posto.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Campo
                label="Estrutura 1"
                value={formulario.estrutura1}
                onChange={(valor) => alterarCampo("estrutura1", valor)}
              />

              <Campo
                label="Estrutura 2"
                value={formulario.estrutura2}
                onChange={(valor) => alterarCampo("estrutura2", valor)}
              />

              <Campo
                label="Estrutura 3"
                value={formulario.estrutura3}
                onChange={(valor) => alterarCampo("estrutura3", valor)}
              />

              <Campo
                label="Estrutura 4"
                value={formulario.estrutura4}
                onChange={(valor) => alterarCampo("estrutura4", valor)}
              />
            </div>
          </section>

          {/* LOGO */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-[#173690]">
              Logo do posto
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Envie a logo que será utilizada no site.
            </p>

            {logoAtual && (
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Logo atualmente cadastrada
                </p>

                <img
                  src={logoAtual}
                  alt="Logo atual do Posto Gasparin"
                  className="max-h-32 max-w-full object-contain"
                />
              </div>
            )}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Selecionar nova logo
              </label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={(e) =>
                  selecionarLogo(e.target.files?.[0] || null)
                }
                className="block w-full rounded-xl border border-gray-300 p-3 text-sm"
              />

              {logo && (
                <p className="mt-2 text-sm text-green-700">
                  Arquivo selecionado: {logo.name}
                </p>
              )}
            </div>
          </section>

          {/* FAVICON */}
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-[#173690]">
              Favicon
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Ícone que aparece na aba do navegador.
            </p>

            {faviconAtual && (
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Favicon atualmente cadastrado
                </p>

                <img
                  src={faviconAtual}
                  alt="Favicon atual"
                  className="h-16 w-16 object-contain"
                />
              </div>
            )}

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Selecionar novo favicon
              </label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml,image/x-icon"
                onChange={(e) =>
                  selecionarFavicon(e.target.files?.[0] || null)
                }
                className="block w-full rounded-xl border border-gray-300 p-3 text-sm"
              />

              {favicon && (
                <p className="mt-2 text-sm text-green-700">
                  Arquivo selecionado: {favicon.name}
                </p>
              )}
            </div>
          </section>

          {/* BOTÕES */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/dashboard"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={salvando}
              className="rounded-xl bg-[#173690] px-7 py-3 font-bold text-white shadow-sm transition hover:bg-[#36b970] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando
                ? "Salvando..."
                : "💾 Salvar alterações"}
            </button>
          </div>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 bg-[#173690] px-6 py-8 text-center text-sm text-white/80">
        <p>Painel Administrativo — Posto Gasparin</p>

        <p className="mt-1 text-[#36b970]">
          Gerenciamento de conteúdo
        </p>
      </footer>
    </main>
  );
}

// COMPONENTE DE CAMPO
function Campo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (valor: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
      />
    </div>
  );
}
