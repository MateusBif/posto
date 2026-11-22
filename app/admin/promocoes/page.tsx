
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Promocao = {
  id: number;
  titulo: string;
  descricao: string;
  tipo: "promocao" | "sorteio";
  imagem_url: string | null;
  data_inicio: string;
  data_fim: string;
  regulamento: string | null;
  ativo: boolean;
  destaque: boolean;
  created_at?: string;
};

const BUCKET = "posto-gasparin-media";
const LIMITE_IMAGEM = 5 * 1024 * 1024;

const TIPOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function AdminPromocoes() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"promocao" | "sorteio">("promocao");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [regulamento, setRegulamento] = useState("");
  const [ativa, setAtiva] = useState(true);
  const [destaque, setDestaque] = useState(false);

  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemAtual, setImagemAtual] = useState<string | null>(null);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  // =====================================================
  // CARREGAR PROMOÇÕES
  // =====================================================

  async function carregarPromocoes() {
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar promoções:", error);
        setMensagem("Não foi possível carregar as promoções.");
        setErro(true);
        return;
      }

      setPromocoes((data || []) as Promocao[]);
    } catch (error) {
      console.error("Erro inesperado:", error);
      setMensagem("Ocorreu um erro ao carregar as promoções.");
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPromocoes();
  }, []);

  // =====================================================
  // MENSAGENS
  // =====================================================

  function mostrarMensagem(texto: string, houveErro = false) {
    setMensagem(texto);
    setErro(houveErro);
  }

  // =====================================================
  // LIMPAR FORMULÁRIO
  // =====================================================

  function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setTipo("promocao");
    setInicio("");
    setFim("");
    setRegulamento("");
    setAtiva(true);
    setDestaque(false);
    setImagem(null);
    setImagemAtual(null);
    setEditandoId(null);
  }

  // =====================================================
  // VALIDAR IMAGEM
  // =====================================================

  function validarImagem(arquivo: File): string | null {
    if (!TIPOS_PERMITIDOS.includes(arquivo.type)) {
      return "Formato inválido. Use JPG, PNG ou WEBP.";
    }

    if (arquivo.size > LIMITE_IMAGEM) {
      return "A imagem deve ter no máximo 5 MB.";
    }

    return null;
  }

  // =====================================================
  // UPLOAD DA IMAGEM
  // =====================================================

  async function enviarImagem(): Promise<string | null> {
    if (!imagem) {
      return imagemAtual;
    }

    const validacao = validarImagem(imagem);

    if (validacao) {
      throw new Error(validacao);
    }

    const supabase = createClient();

    const extensao = imagem.name.split(".").pop()?.toLowerCase() || "jpg";

    const nomeArquivo = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.${extensao}`;

    const caminho = `promocoes/${nomeArquivo}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(caminho, imagem, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Erro no upload:", error);
      throw new Error("Não foi possível enviar a imagem.");
    }

    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(caminho);

    return data.publicUrl;
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
      mostrarMensagem(validacao, true);
      setImagem(null);
      return;
    }

    setImagem(arquivo);
    mostrarMensagem("");
  }

  // =====================================================
  // CADASTRAR / EDITAR
  // =====================================================

  async function salvarPromocao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (salvando) return;

    mostrarMensagem("");

    if (
      !titulo.trim() ||
      !descricao.trim() ||
      !inicio ||
      !fim
    ) {
      mostrarMensagem("Preencha todos os campos obrigatórios.", true);
      return;
    }

    if (fim < inicio) {
      mostrarMensagem(
        "A data de encerramento deve ser igual ou posterior à data de início.",
        true
      );
      return;
    }

    setSalvando(true);

    try {
      const supabase = createClient();
      const imagemUrl = await enviarImagem();

      const dados = {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        tipo,
        imagem_url: imagemUrl,
        data_inicio: inicio,
        data_fim: fim,
        regulamento: regulamento.trim() || null,
        ativo: ativa,
        destaque,
      };

      if (editandoId !== null) {
        const { error } = await supabase
          .from("promotions")
          .update(dados)
          .eq("id", editandoId);

        if (error) {
          console.error("Erro ao atualizar promoção:", error);
          throw new Error("Não foi possível atualizar a promoção.");
        }

        mostrarMensagem("Promoção atualizada com sucesso!");
      } else {
        const { error } = await supabase
          .from("promotions")
          .insert(dados);

        if (error) {
          console.error("Erro ao cadastrar promoção:", error);
          throw new Error("Não foi possível cadastrar a promoção.");
        }

        mostrarMensagem("Promoção cadastrada com sucesso!");
      }

      limparFormulario();
      await carregarPromocoes();
    } catch (error) {
      console.error("Erro ao salvar promoção:", error);

      mostrarMensagem(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro inesperado ao salvar.",
        true
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // EDITAR
  // =====================================================

  function editarPromocao(promocao: Promocao) {
    setTitulo(promocao.titulo);
    setDescricao(promocao.descricao);
    setTipo(promocao.tipo);
    setInicio(promocao.data_inicio);
    setFim(promocao.data_fim);
    setRegulamento(promocao.regulamento || "");
    setAtiva(promocao.ativo);
    setDestaque(promocao.destaque);
    setImagem(null);
    setImagemAtual(promocao.imagem_url);
    setEditandoId(promocao.id);

    mostrarMensagem("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =====================================================
  // EXCLUIR
  // =====================================================

  async function excluirPromocao(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta promoção?"
    );

    if (!confirmar) return;

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("promotions")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Erro ao excluir promoção:", error);
        mostrarMensagem("Não foi possível excluir a promoção.", true);
        return;
      }

      mostrarMensagem("Promoção excluída com sucesso!");

      if (editandoId === id) {
        limparFormulario();
      }

      await carregarPromocoes();
    } catch (error) {
      console.error(error);
      mostrarMensagem("Ocorreu um erro ao excluir a promoção.", true);
    }
  }

  // =====================================================
  // ATIVAR / DESATIVAR
  // =====================================================

  async function alternarStatus(promocao: Promocao) {
    const novoStatus = !promocao.ativo;
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("promotions")
        .update({ ativo: novoStatus })
        .eq("id", promocao.id);

      if (error) {
        console.error("Erro ao alterar status:", error);
        mostrarMensagem("Não foi possível alterar o status.", true);
        return;
      }

      mostrarMensagem(
        novoStatus
          ? "Promoção ativada com sucesso!"
          : "Promoção desativada com sucesso!"
      );

      await carregarPromocoes();
    } catch (error) {
      console.error(error);
      mostrarMensagem("Ocorreu um erro ao alterar o status.", true);
    }
  }

  // =====================================================
  // DESTAQUE
  // =====================================================

  async function alternarDestaque(promocao: Promocao) {
    const novoDestaque = !promocao.destaque;
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("promotions")
        .update({ destaque: novoDestaque })
        .eq("id", promocao.id);

      if (error) {
        console.error("Erro ao alterar destaque:", error);
        mostrarMensagem("Não foi possível alterar o destaque.", true);
        return;
      }

      mostrarMensagem(
        novoDestaque
          ? "Promoção marcada como destaque!"
          : "Destaque removido!"
      );

      await carregarPromocoes();
    } catch (error) {
      console.error(error);
      mostrarMensagem("Ocorreu um erro ao alterar o destaque.", true);
    }
  }

  // =====================================================
  // FORMATAR DATA
  // =====================================================

  function formatarData(data: string) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  // =====================================================
  // DATA DE HOJE
  // =====================================================

  function dataHoje() {
    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  }

  // =====================================================
  // SITUAÇÃO
  // =====================================================

  function situacaoPromocao(promocao: Promocao) {
    const hoje = dataHoje();

    if (!promocao.ativo) {
      return "Inativa";
    }

    if (hoje < promocao.data_inicio) {
      return "Agendada";
    }

    if (hoje > promocao.data_fim) {
      return "Encerrada";
    }

    return "Em andamento";
  }

  // =====================================================
  // TIPO
  // =====================================================

  function nomeTipo(tipo: Promocao["tipo"]) {
    return tipo === "sorteio" ? "Sorteio" : "Promoção";
  }

  // =====================================================
  // COR DO STATUS
  // =====================================================

  function corStatus(status: string) {
    switch (status) {
      case "Em andamento":
        return "bg-green-100 text-green-800";

      case "Agendada":
        return "bg-blue-100 text-blue-800";

      case "Encerrada":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-red-100 text-red-800";
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
              href="/"
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
            Promoções e Sorteios
          </h2>

          <p className="mt-2 text-gray-600">
            Cadastre e gerencie as promoções e sorteios que serão divulgados no site.
          </p>
        </div>

        {/* MENSAGEM */}
        {mensagem && (
          <div
            role="alert"
            className={`mb-6 rounded-xl border p-4 ${
              erro
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-[#36b970]/30 bg-[#36b970]/10 text-[#173690]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {erro ? "⚠️" : "✅"}
              </span>

              <p className="font-semibold">{mensagem}</p>
            </div>
          </div>
        )}

        {/* FORMULÁRIO */}
        <section className="mb-10 rounded-2xl bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#173690]">
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
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
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
              <label
                htmlFor="titulo"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Título *
              </label>

              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex.: Promoção especial"
                required
                disabled={salvando}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />
            </div>

            {/* TIPO */}
            <div>
              <label
                htmlFor="tipo"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Tipo *
              </label>

              <select
                id="tipo"
                value={tipo}
                onChange={(e) =>
                  setTipo(e.target.value as "promocao" | "sorteio")
                }
                disabled={salvando}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              >
                <option value="promocao">Promoção</option>
                <option value="sorteio">Sorteio</option>
              </select>
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
                placeholder="Descreva a promoção ou sorteio..."
                rows={5}
                required
                disabled={salvando}
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />
            </div>

            {/* DATAS */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="inicio"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Data de início *
                </label>

                <input
                  id="inicio"
                  type="date"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                  required
                  disabled={salvando}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label
                  htmlFor="fim"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Data de encerramento *
                </label>

                <input
                  id="fim"
                  type="date"
                  value={fim}
                  onChange={(e) => setFim(e.target.value)}
                  min={inicio || undefined}
                  required
                  disabled={salvando}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* REGULAMENTO */}
            <div>
              <label
                htmlFor="regulamento"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Regulamento / Informações adicionais
              </label>

              <textarea
                id="regulamento"
                value={regulamento}
                onChange={(e) => setRegulamento(e.target.value)}
                placeholder="Informe regras, condições, detalhes do sorteio..."
                rows={4}
                disabled={salvando}
                className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20 disabled:bg-gray-100"
              />
            </div>

            {/* IMAGEM */}
            <div>
              <label
                htmlFor="imagem"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Imagem da promoção
              </label>

              <input
                id="imagem"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={salvando}
                onChange={(e) => {
                  selecionarImagem(e.target.files?.[0] || null);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG ou WEBP. Tamanho máximo: 5 MB.
              </p>

              {imagem && (
                <p className="mt-2 text-sm text-[#173690]">
                  Arquivo selecionado: {imagem.name}
                </p>
              )}

              {imagemAtual && !imagem && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    Imagem atual:
                  </p>

                  <img
                    src={imagemAtual}
                    alt="Imagem atual da promoção"
                    className="max-h-64 max-w-full rounded-xl border border-gray-200 object-contain"
                  />
                </div>
              )}

              {imagem && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    Pré-visualização:
                  </p>

                  <img
                    src={URL.createObjectURL(imagem)}
                    alt="Pré-visualização da nova imagem"
                    className="max-h-64 max-w-full rounded-xl border border-gray-200 object-contain"
                  />
                </div>
              )}
            </div>

            {/* OPÇÕES */}
            <div className="space-y-4 rounded-xl bg-gray-50 p-4">

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={ativa}
                  onChange={(e) => setAtiva(e.target.checked)}
                  disabled={salvando}
                  className="mt-1 h-5 w-5 accent-[#36b970]"
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

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={destaque}
                  onChange={(e) => setDestaque(e.target.checked)}
                  disabled={salvando}
                  className="mt-1 h-5 w-5 accent-[#36b970]"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Destacar promoção
                  </p>

                  <p className="text-sm text-gray-500">
                    Marque para dar prioridade de exibição no site.
                  </p>
                </div>
              </label>
            </div>

            {/* BOTÃO SALVAR */}
            <button
              type="submit"
              disabled={salvando}
              className="w-full rounded-xl bg-[#173690] px-6 py-3.5 font-bold text-white transition hover:bg-[#36b970] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando
                ? "Salvando..."
                : editandoId !== null
                  ? "💾 Salvar alterações"
                  : "➕ Cadastrar promoção"}
            </button>
          </form>
        </section>

        {/* LISTAGEM */}
        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#173690]">
                Promoções cadastradas
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {promocoes.length} registro(s)
              </p>
            </div>

            <button
              type="button"
              onClick={carregarPromocoes}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              ↻ Atualizar lista
            </button>
          </div>

          {/* CARREGANDO */}
          {carregando ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-gray-300 border-t-[#173690]" />

              <p className="text-gray-500">
                Carregando promoções...
              </p>
            </div>
          ) : promocoes.length === 0 ? (
            /* VAZIO */
            <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">
              <p className="text-lg font-semibold text-gray-700">
                Nenhuma promoção cadastrada
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Utilize o formulário acima para cadastrar a primeira.
              </p>
            </div>
          ) : (
            /* LISTA */
            <div className="grid gap-5 md:grid-cols-2">

              {promocoes.map((promocao) => {
                const status = situacaoPromocao(promocao);

                return (
                  <article
                    key={promocao.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                  >

                    {/* IMAGEM */}
                    {promocao.imagem_url && (
                      <img
                        src={promocao.imagem_url}
                        alt={promocao.titulo}
                        className="h-52 w-full object-cover"
                      />
                    )}

                    {/* CONTEÚDO */}
                    <div className="p-5">

                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                          {nomeTipo(promocao.tipo)}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${corStatus(status)}`}
                        >
                          {status}
                        </span>

                        {promocao.destaque && (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                            ⭐ Destaque
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg font-bold text-[#173690]">
                        {promocao.titulo}
                      </h4>

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                        {promocao.descricao}
                      </p>

                      <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm">
                        <p>
                          <strong>Início:</strong>{" "}
                          {formatarData(promocao.data_inicio)}
                        </p>

                        <p className="mt-1">
                          <strong>Encerramento:</strong>{" "}
                          {formatarData(promocao.data_fim)}
                        </p>
                      </div>

                      {promocao.regulamento && (
                        <details className="mt-4">
                          <summary className="cursor-pointer text-sm font-semibold text-[#173690]">
                            Ver regulamento
                          </summary>

                          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                            {promocao.regulamento}
                          </p>
                        </details>
                      )}

                      {/* AÇÕES */}
                      <div className="mt-5 flex flex-wrap gap-2">

                        <button
                          type="button"
                          onClick={() => editarPromocao(promocao)}
                          className="rounded-lg bg-[#173690] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                        >
                          ✏️ Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => alternarStatus(promocao)}
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            promocao.ativo
                              ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                        >
                          {promocao.ativo
                            ? "Desativar"
                            : "Ativar"}
                        </button>

                        <button
                          type="button"
                          onClick={() => alternarDestaque(promocao)}
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            promocao.destaque
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {promocao.destaque
                            ? "★ Remover destaque"
                            : "☆ Destacar"}
                        </button>

                        <button
                          type="button"
                          onClick={() => excluirPromocao(promocao.id)}
                          className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 bg-[#173690] px-6 py-8 text-center text-sm text-white/80">
        <p>Painel Administrativo — Posto Gasparin</p>

        <p className="mt-1 text-[#36b970]">
          Gerenciamento de promoções e sorteios
        </p>
      </footer>
    </main>
  );
}
