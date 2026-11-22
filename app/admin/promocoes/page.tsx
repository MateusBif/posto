"use client";

import { FormEvent, useEffect, useState } from "react";
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
};

export default function AdminPromocoes() {
  const supabase = createClient();

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
    setCarregando(true);

    const { data, error } = await supabase
      .from("promotions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar promoções:", error);
      setMensagem("Erro ao carregar promoções.");
      setErro(true);
    } else {
      setPromocoes(data || []);
    }

    setCarregando(false);
  }

  useEffect(() => {
    carregarPromocoes();
  }, []);

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
  // UPLOAD DA IMAGEM
  // =====================================================

  async function enviarImagem(): Promise<string | null> {
    if (!imagem) {
      return imagemAtual;
    }

    const extensao = imagem.name.split(".").pop();
    const nomeArquivo = `${Date.now()}.${extensao}`;
    const caminho = `promocoes/${nomeArquivo}`;

    const { error } = await supabase.storage
      .from("posto-gasparin-media")
      .upload(caminho, imagem, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Erro no upload:", error);
      throw new Error("Erro ao enviar imagem.");
    }

    const { data } = supabase.storage
      .from("posto-gasparin-media")
      .getPublicUrl(caminho);

    return data.publicUrl;
  }

  // =====================================================
  // CADASTRAR / EDITAR
  // =====================================================

  async function salvarPromocao(event: FormEvent) {
    event.preventDefault();

    setMensagem("");
    setErro(false);

    if (!titulo.trim() || !descricao.trim() || !inicio || !fim) {
      setMensagem("Preencha todos os campos obrigatórios.");
      setErro(true);
      return;
    }

    if (fim < inicio) {
      setMensagem(
        "A data de encerramento deve ser posterior à data de início."
      );
      setErro(true);
      return;
    }

    setSalvando(true);

    try {
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
          console.error("Erro ao atualizar:", error);
          throw new Error(error.message);
        }

        setMensagem("Promoção atualizada com sucesso!");
      } else {
        const { error } = await supabase
          .from("promotions")
          .insert([dados]);

        if (error) {
          console.error("Erro ao cadastrar:", error);
          throw new Error(error.message);
        }

        setMensagem("Promoção cadastrada com sucesso!");
      }

      setErro(false);
      limparFormulario();
      await carregarPromocoes();
    } catch (error) {
      console.error(error);

      setMensagem(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao salvar a promoção."
      );

      setErro(true);
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

    const { error } = await supabase
      .from("promotions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao excluir:", error);
      setMensagem(error.message);
      setErro(true);
      return;
    }

    setMensagem("Promoção excluída com sucesso!");
    setErro(false);

    await carregarPromocoes();
  }

  // =====================================================
  // ATIVAR / DESATIVAR
  // =====================================================

  async function alternarStatus(promocao: Promocao) {
    const novoStatus = !promocao.ativo;

    const { error } = await supabase
      .from("promotions")
      .update({ ativo: novoStatus })
      .eq("id", promocao.id);

    if (error) {
      console.error("Erro ao alterar status:", error);
      setMensagem(error.message);
      setErro(true);
      return;
    }

    setMensagem(
      novoStatus
        ? "Promoção ativada com sucesso!"
        : "Promoção desativada com sucesso!"
    );

    setErro(false);

    await carregarPromocoes();
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
  // SITUAÇÃO DA PROMOÇÃO
  // =====================================================

  function situacaoPromocao(promocao: Promocao) {
    const hoje = new Date().toLocaleDateString("en-CA");

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
  // NOME DO TIPO
  // =====================================================

  function nomeTipo(tipo: "promocao" | "sorteio") {
    return tipo === "sorteio" ? "Sorteio" : "Promoção";
  }

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-[#173690] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">Posto Gasparin</h1>

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

      <section className="mx-auto max-w-6xl px-6 py-10">
        {/* TÍTULO */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#36b970]">
            Administração
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#173690]">
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
        <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
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
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancelar edição
              </button>
            )}
          </div>

          <form onSubmit={salvarPromocao} className="mt-6 space-y-5">
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
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
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
                  setTipo(e.target.value as "promocao" | "sorteio")
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              >
                <option value="promocao">Promoção</option>
                <option value="sorteio">Sorteio</option>
              </select>
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Descrição *
              </label>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva a promoção ou sorteio..."
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
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
                  onChange={(e) => setInicio(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Data de encerramento *
                </label>

                <input
                  type="date"
                  value={fim}
                  onChange={(e) => setFim(e.target.value)}
                  required
                  min={inicio || undefined}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
                />
              </div>
            </div>

            {/* REGULAMENTO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Regulamento / Informações adicionais
              </label>

              <textarea
                value={regulamento}
                onChange={(e) => setRegulamento(e.target.value)}
                placeholder="Informe regras, condições, detalhes do sorteio..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />
            </div>

            {/* IMAGEM */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Imagem da promoção
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const arquivo = e.target.files?.[0] || null;

                  if (arquivo && arquivo.size > 5 * 1024 * 1024) {
                    setMensagem("A imagem deve ter no máximo 5 MB.");
                    setErro(true);
                    e.target.value = "";
                    return;
                  }

                  setImagem(arquivo);
                  setMensagem("");
                  setErro(false);
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
              />

              <p className="mt-2 text-xs text-gray-500">
                Formatos de imagem aceitos. Tamanho máximo: 5 MB.
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
                    className="h-48 rounded-xl border object-contain"
                  />
                </div>
              )}
            </div>

            {/* OPÇÕES */}
            <div className="space-y-3 rounded-xl bg-gray-50 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={ativa}
                  onChange={(e) => setAtiva(e.target.checked)}
                  className="h-5 w-5 accent-[#36b970]"
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

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={destaque}
                  onChange={(e) => setDestaque(e.target.checked)}
                  className="h-5 w-5 accent-[#36b970]"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Destacar promoção
                  </p>

                  <p className="text-sm text-gray-500">
                    Marque para dar maior destaque no site.
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
                  : "➕ Cadastrar promoção"}
              </button>
            </div>
          </form>
        </section>

        {/* LISTA DE PROMOÇÕES */}
        <section>
          <div className="mb-5">
            <h3 className="text-xl font-bold text-[#173690]">
              Promoções cadastradas
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {promocoes.length}{" "}
              {promocoes.length === 1
                ? "item cadastrado"
                : "itens cadastrados"}
            </p>
          </div>

          {/* CARREGANDO */}
          {carregando ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="text-gray-600">
                Carregando promoções...
              </p>
            </div>
          ) : promocoes.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="text-5xl">🎁</div>

              <h3 className="mt-4 text-lg font-bold text-[#173690]">
                Nenhuma promoção cadastrada
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Cadastre uma promoção ou sorteio utilizando o formulário acima.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {promocoes.map((promocao) => (
                <article
                  key={promocao.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  {/* IMAGEM */}
                  {promocao.imagem_url && (
                    <img
                      src={promocao.imagem_url}
                      alt={promocao.titulo}
                      className="h-56 w-full object-cover"
                    />
                  )}

                  <div className="p-6">
                    {/* CABEÇALHO */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#36b970]/10 text-2xl">
                        {promocao.tipo === "sorteio" ? "🎟️" : "🎁"}
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#36b970]/10 px-3 py-1 text-xs font-bold text-[#173690]">
                            {nomeTipo(promocao.tipo)}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              promocao.ativo
                                ? "bg-[#36b970]/10 text-[#173690]"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {promocao.ativo ? "Ativa" : "Inativa"}
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

                        <p className="mt-1 text-xs font-semibold text-gray-500">
                          {situacaoPromocao(promocao)}
                        </p>
                      </div>
                    </div>

                    {/* DESCRIÇÃO */}
                    <p className="mt-5 whitespace-pre-line text-sm leading-6 text-gray-600">
                      {promocao.descricao}
                    </p>

                    {/* DATAS */}
                    <div className="mt-5 grid gap-3 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Início
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                          {formatarData(promocao.data_inicio)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Encerramento
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                          {formatarData(promocao.data_fim)}
                        </p>
                      </div>
                    </div>

                    {/* REGULAMENTO */}
                    {promocao.regulamento && (
                      <div className="mt-4 rounded-xl border border-gray-100 p-4">
                        <p className="text-xs font-semibold uppercase text-gray-500">
                          Regulamento
                        </p>

                        <p className="mt-2 whitespace-pre-line text-sm text-gray-600">
                          {promocao.regulamento}
                        </p>
                      </div>
                    )}

                    {/* BOTÕES */}
                    <div className="mt-6 grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-3">
                      <button
                        type="button"
                        onClick={() => editarPromocao(promocao)}
                        className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-bold text-[#173690] transition hover:bg-[#36b970]/10"
                      >
                        ✏️ Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => alternarStatus(promocao)}
                        className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-bold text-[#173690] transition hover:bg-[#36b970]/10"
                      >
                        {promocao.ativo
                          ? "⏸️ Desativar"
                          : "▶️ Ativar"}
                      </button>

                      <button
                        type="button"
                        onClick={() => excluirPromocao(promocao.id)}
                        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
                      >
                        🗑️ Excluir
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
        <p>Painel Administrativo — Posto Gasparin</p>

        <p className="mt-1 text-[#36b970]">
          Gerenciamento de promoções e sorteios
        </p>
      </footer>
    </main>
  );
}