
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Servico = {
  id: number;
  nome: string;
  descricao: string;
  imagem_url: string | null;
  icone: string | null;
  ativo: boolean;
  destaque: boolean;
  ordem: number;
};

const BUCKET = "posto-gasparin-media";
const LIMITE_IMAGEM = 5 * 1024 * 1024;

const FORMATOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function AdminServicos() {
  const supabase = useMemo(() => createClient(), []);

  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [icone, setIcone] = useState("🔧");

  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemAtual, setImagemAtual] = useState<string | null>(null);
  const [previewImagem, setPreviewImagem] = useState<string | null>(null);

  const [ativo, setAtivo] = useState(true);
  const [destaque, setDestaque] = useState(false);
  const [ordem, setOrdem] = useState(0);

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro">(
    "sucesso"
  );

  // =====================================================
  // MENSAGENS
  // =====================================================

  function mostrarMensagem(
    texto: string,
    tipo: "sucesso" | "erro" = "sucesso"
  ) {
    setMensagem(texto);
    setTipoMensagem(tipo);
  }

  // =====================================================
  // CARREGAR SERVIÇOS
  // =====================================================

  async function carregarServicos() {
    setCarregando(true);

    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("ordem", { ascending: true })
        .order("id", { ascending: true });

      if (error) {
        console.error("Erro ao carregar serviços:", error);
        mostrarMensagem("Erro ao carregar os serviços.", "erro");
        return;
      }

      setServicos((data || []) as Servico[]);
    } catch (error) {
      console.error("Erro inesperado ao carregar:", error);
      mostrarMensagem("Ocorreu um erro ao carregar os serviços.", "erro");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarServicos();
  }, []);

  // =====================================================
  // PREVIEW DA IMAGEM
  // =====================================================

  useEffect(() => {
    if (!imagem) {
      setPreviewImagem(null);
      return;
    }

    const url = URL.createObjectURL(imagem);

    setPreviewImagem(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imagem]);

  // =====================================================
  // LIMPAR FORMULÁRIO
  // =====================================================

  function limparFormulario() {
    setNome("");
    setDescricao("");
    setIcone("🔧");
    setImagem(null);
    setImagemAtual(null);
    setPreviewImagem(null);
    setAtivo(true);
    setDestaque(false);
    setOrdem(servicos.length);
    setEditandoId(null);
  }

  // =====================================================
  // VALIDAR IMAGEM
  // =====================================================

  function validarImagem(arquivo: File): string | null {
    if (!FORMATOS_PERMITIDOS.includes(arquivo.type)) {
      return "Formato inválido. Envie uma imagem JPG, PNG ou WEBP.";
    }

    if (arquivo.size > LIMITE_IMAGEM) {
      return "A imagem deve ter no máximo 5 MB.";
    }

    return null;
  }

  // =====================================================
  // SELECIONAR IMAGEM
  // =====================================================

  function selecionarImagem(arquivo: File | null) {
    if (!arquivo) {
      setImagem(null);
      return;
    }

    const validacao = validarImagem(arquivo);

    if (validacao) {
      mostrarMensagem(validacao, "erro");
      setImagem(null);
      return;
    }

    setImagem(arquivo);
    mostrarMensagem("");
  }

  // =====================================================
  // UPLOAD
  // =====================================================

  async function enviarImagem(arquivo: File): Promise<string | null> {
    const validacao = validarImagem(arquivo);

    if (validacao) {
      throw new Error(validacao);
    }

    const extensao = arquivo.name.split(".").pop()?.toLowerCase() || "jpg";

    const nomeArquivo = `servico-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.${extensao}`;

    const caminho = `servicos/${nomeArquivo}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(caminho, arquivo, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Erro no upload da imagem:", error);
      throw new Error("Não foi possível enviar a imagem.");
    }

    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(caminho);

    return data.publicUrl;
  }

  // =====================================================
  // SALVAR SERVIÇO
  // =====================================================

  async function salvarServico(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (salvando) return;

    mostrarMensagem("");

    if (!nome.trim() || !descricao.trim()) {
      mostrarMensagem("Preencha o nome e a descrição do serviço.", "erro");
      return;
    }

    if (!Number.isFinite(ordem) || ordem < 0) {
      mostrarMensagem("Informe uma ordem de exibição válida.", "erro");
      return;
    }

    setSalvando(true);

    try {
      let imagemUrl = imagemAtual;

      // Enviar nova imagem, se selecionada
      if (imagem) {
        imagemUrl = await enviarImagem(imagem);
      }

      const dadosServico = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        icone: icone.trim() || "🔧",
        imagem_url: imagemUrl,
        ativo,
        destaque,
        ordem: Math.floor(ordem),
      };

      let error;

      if (editandoId !== null) {
        const resultado = await supabase
          .from("services")
          .update(dadosServico)
          .eq("id", editandoId);

        error = resultado.error;
      } else {
        const resultado = await supabase
          .from("services")
          .insert(dadosServico);

        error = resultado.error;
      }

      if (error) {
        console.error("Erro ao salvar serviço:", error);
        throw new Error("Não foi possível salvar o serviço no banco de dados.");
      }

      const estavaEditando = editandoId !== null;

      limparFormulario();

      await carregarServicos();

      mostrarMensagem(
        estavaEditando
          ? "Serviço atualizado com sucesso!"
          : "Serviço cadastrado com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao salvar:", error);

      mostrarMensagem(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado.",
        "erro"
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // EDITAR
  // =====================================================

  function editarServico(servico: Servico) {
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setIcone(servico.icone || "🔧");
    setImagemAtual(servico.imagem_url);
    setImagem(null);
    setAtivo(servico.ativo);
    setDestaque(servico.destaque);
    setOrdem(servico.ordem);
    setEditandoId(servico.id);

    mostrarMensagem("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =====================================================
  // EXCLUIR
  // =====================================================

  async function excluirServico(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este serviço? Essa ação não poderá ser desfeita."
    );

    if (!confirmar) return;

    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Erro ao excluir:", error);
        mostrarMensagem("Erro ao excluir o serviço.", "erro");
        return;
      }

      if (editandoId === id) {
        limparFormulario();
      }

      await carregarServicos();

      mostrarMensagem("Serviço excluído com sucesso!");
    } catch (error) {
      console.error(error);
      mostrarMensagem("Ocorreu um erro ao excluir o serviço.", "erro");
    }
  }

  // =====================================================
  // ATIVAR / DESATIVAR
  // =====================================================

  async function alternarStatus(servico: Servico) {
    try {
      const { error } = await supabase
        .from("services")
        .update({ ativo: !servico.ativo })
        .eq("id", servico.id);

      if (error) {
        console.error("Erro ao alterar status:", error);
        mostrarMensagem("Erro ao alterar o status do serviço.", "erro");
        return;
      }

      await carregarServicos();

      mostrarMensagem(
        servico.ativo
          ? "Serviço desativado."
          : "Serviço ativado."
      );
    } catch (error) {
      console.error(error);
      mostrarMensagem("Ocorreu um erro ao alterar o status.", "erro");
    }
  }

  // =====================================================
  // DESTAQUE
  // =====================================================

  async function alternarDestaque(servico: Servico) {
    try {
      const { error } = await supabase
        .from("services")
        .update({ destaque: !servico.destaque })
        .eq("id", servico.id);

      if (error) {
        console.error("Erro ao alterar destaque:", error);
        mostrarMensagem("Erro ao alterar o destaque.", "erro");
        return;
      }

      await carregarServicos();

      mostrarMensagem(
        servico.destaque
          ? "Destaque removido."
          : "Serviço marcado como destaque."
      );
    } catch (error) {
      console.error(error);
      mostrarMensagem("Ocorreu um erro ao alterar o destaque.", "erro");
    }
  }

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-[#173690] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div>
            <h1 className="text-2xl font-bold">
              Posto Gasparin
            </h1>

            <p className="text-sm text-white/80">
              Painel Administrativo
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-semibold transition hover:bg-[#36b970]"
            >
              ← Dashboard
            </Link>

            <Link
              href="/servicos"
              className="rounded-lg bg-[#36b970] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#2fa864]"
            >
              Ver site
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">

        {/* TÍTULO */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#36b970]">
            Administração
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#173690]">
            Serviços
          </h2>

          <p className="mt-2 text-gray-600">
            Cadastre e gerencie os serviços que serão apresentados no site público.
          </p>
        </div>

        {/* MENSAGEM */}
        {mensagem && (
          <div
            role="alert"
            className={`mb-6 rounded-xl border p-4 ${
              tipoMensagem === "erro"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-[#36b970]/30 bg-[#36b970]/10 text-[#173690]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {tipoMensagem === "erro" ? "⚠️" : "✅"}
              </span>

              <p className="font-semibold">
                {mensagem}
              </p>
            </div>
          </div>
        )}

        {/* FORMULÁRIO */}
        <section className="mb-10 rounded-2xl bg-white p-5 shadow-sm sm:p-6">

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
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancelar edição
              </button>
            )}
          </div>

          <form
            onSubmit={salvarServico}
            className="mt-6 space-y-5"
          >

            {/* NOME */}
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nome do serviço *
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Lavagem de veículos"
                required
                disabled={salvando}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <label
                htmlFor="descricao"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Descrição *
              </label>

              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva o serviço..."
                rows={4}
                required
                disabled={salvando}
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />
            </div>

            {/* ÍCONE */}
            <div>
              <label
                htmlFor="icone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ícone (emoji)
              </label>

              <input
                id="icone"
                type="text"
                value={icone}
                onChange={(e) => setIcone(e.target.value)}
                placeholder="Ex.: ⛽"
                disabled={salvando}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />

              <p className="mt-1 text-xs text-gray-500">
                Exemplos: ⛽ 🛒 🚗 🔧 ⭐ 🧼
              </p>
            </div>

            {/* IMAGEM */}
            <div>
              <label
                htmlFor="imagem"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Imagem do serviço
              </label>

              <input
                id="imagem"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={salvando}
                onChange={(e) => {
                  selecionarImagem(e.target.files?.[0] || null);
                }}
                className="block w-full rounded-xl border border-gray-300 bg-white p-3 text-sm disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG ou WEBP. Tamanho máximo: 5 MB.
              </p>

              {/* IMAGEM ATUAL */}
              {!previewImagem && imagemAtual && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    Imagem atual:
                  </p>

                  <img
                    src={imagemAtual}
                    alt="Imagem atual do serviço"
                    className="max-h-64 max-w-full rounded-xl border border-gray-200 object-contain"
                  />
                </div>
              )}

              {/* PRÉ-VISUALIZAÇÃO */}
              {previewImagem && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    Pré-visualização:
                  </p>

                  <img
                    src={previewImagem}
                    alt="Pré-visualização da imagem selecionada"
                    className="max-h-64 max-w-full rounded-xl border border-gray-200 object-contain"
                  />

                  <button
                    type="button"
                    onClick={() => setImagem(null)}
                    className="mt-2 text-sm font-semibold text-red-600 hover:underline"
                  >
                    Remover imagem selecionada
                  </button>
                </div>
              )}
            </div>

            {/* ORDEM */}
            <div>
              <label
                htmlFor="ordem"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem de exibição
              </label>

              <input
                id="ordem"
                type="number"
                value={ordem}
                onChange={(e) => setOrdem(Number(e.target.value))}
                min={0}
                step={1}
                disabled={salvando}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />

              <p className="mt-1 text-xs text-gray-500">
                Menor número aparece primeiro.
              </p>
            </div>

            {/* OPÇÕES */}
            <div className="grid gap-4 sm:grid-cols-2">

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  checked={ativo}
                  onChange={(e) => setAtivo(e.target.checked)}
                  disabled={salvando}
                  className="mt-1 h-5 w-5 accent-[#36b970]"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Serviço ativo
                  </p>

                  <p className="text-xs text-gray-500">
                    Aparecerá no site público.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  checked={destaque}
                  onChange={(e) => setDestaque(e.target.checked)}
                  disabled={salvando}
                  className="mt-1 h-5 w-5 accent-[#36b970]"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Serviço em destaque
                  </p>

                  <p className="text-xs text-gray-500">
                    Pode aparecer em áreas especiais do site.
                  </p>
                </div>
              </label>
            </div>

            {/* BOTÃO */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={salvando}
                className="w-full rounded-xl bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-[#36b970] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {salvando
                  ? "Salvando..."
                  : editandoId !== null
                    ? "💾 Salvar alterações"
                    : "➕ Cadastrar serviço"}
              </button>
            </div>
          </form>
        </section>

        {/* LISTAGEM */}
        <section>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

            <button
              type="button"
              onClick={carregarServicos}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-white"
            >
              ↻ Atualizar lista
            </button>
          </div>

          {/* CARREGANDO */}
          {carregando ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#173690]" />

              <p className="font-semibold text-[#173690]">
                Carregando serviços...
              </p>
            </div>
          ) : servicos.length === 0 ? (
            /* VAZIO */
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
            /* LISTA */
            <div className="grid gap-5 md:grid-cols-2">

              {servicos.map((servico) => (
                <article
                  key={servico.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >

                  <div className="p-5 sm:p-6">

                    {/* CABEÇALHO */}
                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#36b970]/10 text-2xl">
                        {servico.icone || "🔧"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="break-words text-lg font-bold text-[#173690]">
                          {servico.nome}
                        </h4>

                        <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-gray-600">
                          {servico.descricao}
                        </p>
                      </div>
                    </div>

                    {/* IMAGEM */}
                    {servico.imagem_url && (
                      <div className="mt-5">
                        <img
                          src={servico.imagem_url}
                          alt={servico.nome}
                          className="h-48 w-full rounded-xl object-cover"
                        />
                      </div>
                    )}

                    {/* STATUS */}
                    <div className="mt-4 flex flex-wrap gap-2">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          servico.ativo
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {servico.ativo ? "● Ativo" : "● Inativo"}
                      </span>

                      {servico.destaque && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                          ⭐ Destaque
                        </span>
                      )}

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                        Ordem: {servico.ordem}
                      </span>
                    </div>

                    {/* AÇÕES */}
                    <div className="mt-6 grid grid-cols-2 gap-2 border-t border-gray-100 pt-5 sm:gap-3">

                      <button
                        type="button"
                        onClick={() => editarServico(servico)}
                        className="rounded-lg border border-[#36b970] px-3 py-2 text-sm font-bold text-[#173690] transition hover:bg-[#36b970]/10"
                      >
                        ✏️ Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => excluirServico(servico.id)}
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
                      >
                        🗑️ Excluir
                      </button>

                      <button
                        type="button"
                        onClick={() => alternarStatus(servico)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                      >
                        {servico.ativo
                          ? "⏸️ Desativar"
                          : "▶️ Ativar"}
                      </button>

                      <button
                        type="button"
                        onClick={() => alternarDestaque(servico)}
                        className="rounded-lg border border-yellow-300 px-3 py-2 text-sm font-bold text-yellow-700 transition hover:bg-yellow-50"
                      >
                        {servico.destaque
                          ? "⭐ Remover destaque"
                          : "☆ Destacar"}
                      </button>
                    </div>
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
