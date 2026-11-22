
"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Foto = {
  id: string;
  titulo: string;
  descricao: string | null;
  imagem_url: string;
  categoria: string | null;
  destaque: boolean;
  ativo: boolean;
  ordem: number;
};

export default function AdminGaleria() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Estrutura");
  const [destaque, setDestaque] = useState(false);
  const [ativo, setAtivo] = useState(true);
  const [ordem, setOrdem] = useState(0);

  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarFotos();
  }, []);

  async function carregarFotos() {
    const supabase = createClient();

    setCarregando(true);

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("destaque", { ascending: false })
      .order("ordem", { ascending: true });

    if (error) {
      setMensagem("Erro ao carregar fotos: " + error.message);
      setFotos([]);
    } else {
      setFotos(data || []);
    }

    setCarregando(false);
  }

  function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setCategoria("Estrutura");
    setDestaque(false);
    setAtivo(true);
    setOrdem(0);
    setArquivo(null);
    setPreview("");
    setEditandoId(null);

    const input = document.getElementById(
      "arquivo-imagem"
    ) as HTMLInputElement | null;

    if (input) input.value = "";
  }

  function selecionarArquivo(file: File | null) {
    setArquivo(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function salvarFoto(event: FormEvent) {
    event.preventDefault();

    const supabase = createClient();

    if (!titulo.trim()) {
      setMensagem("Preencha o título da foto.");
      return;
    }

    if (!arquivo && !editandoId) {
      setMensagem("Selecione uma imagem para cadastrar.");
      return;
    }

    setSalvando(true);
    setMensagem("");

    let imagemUrl = preview;

    try {
      // Upload da imagem
      if (arquivo) {
        const extensao =
          arquivo.name.split(".").pop()?.toLowerCase() || "jpg";

        const nomeArquivo = `galeria-${Date.now()}.${extensao}`;
        const caminho = `galeria/${nomeArquivo}`;

        const { error: uploadError } = await supabase.storage
          .from("posto-gasparin-media")
          .upload(caminho, arquivo, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error("Erro no upload: " + uploadError.message);
        }

        const { data: urlData } = supabase.storage
          .from("posto-gasparin-media")
          .getPublicUrl(caminho);

        imagemUrl = urlData.publicUrl;
      }

      // Atualizar foto existente
      if (editandoId) {
        const dadosAtualizacao: Record<string, unknown> = {
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          categoria,
          destaque,
          ativo,
          ordem,
        };

        if (arquivo) {
          dadosAtualizacao.imagem_url = imagemUrl;
        }

        const { error } = await supabase
          .from("gallery")
          .update(dadosAtualizacao)
          .eq("id", editandoId);

        if (error) {
          throw new Error(error.message);
        }

        setMensagem("Foto atualizada com sucesso!");
      } else {
        // Cadastrar nova foto
        const { error } = await supabase.from("gallery").insert({
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          categoria,
          imagem_url: imagemUrl,
          destaque,
          ativo,
          ordem,
        });

        if (error) {
          throw new Error(error.message);
        }

        setMensagem("Foto cadastrada com sucesso!");
      }

      limparFormulario();
      await carregarFotos();
    } catch (error) {
      const erro = error as Error;
      setMensagem("Erro ao salvar: " + erro.message);
    }

    setSalvando(false);
  }

  function editarFoto(foto: Foto) {
    setTitulo(foto.titulo);
    setDescricao(foto.descricao || "");
    setCategoria(foto.categoria || "Estrutura");
    setDestaque(foto.destaque);
    setAtivo(foto.ativo);
    setOrdem(foto.ordem);
    setPreview(foto.imagem_url);
    setArquivo(null);
    setEditandoId(foto.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function excluirFoto(id: string) {
    const supabase = createClient();

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta foto?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    if (error) {
      setMensagem("Erro ao excluir: " + error.message);
      return;
    }

    setMensagem("Foto excluída com sucesso!");

    await carregarFotos();
  }

  async function alternarDestaque(foto: Foto) {
    const supabase = createClient();

    const { error } = await supabase
      .from("gallery")
      .update({ destaque: !foto.destaque })
      .eq("id", foto.id);

    if (error) {
      setMensagem("Erro ao alterar destaque: " + error.message);
      return;
    }

    await carregarFotos();
  }

  async function alternarAtivo(foto: Foto) {
    const supabase = createClient();

    const { error } = await supabase
      .from("gallery")
      .update({ ativo: !foto.ativo })
      .eq("id", foto.id);

    if (error) {
      setMensagem("Erro ao alterar status: " + error.message);
      return;
    }

    await carregarFotos();
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
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#36b970]">
            Administração
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#173690]">
            Galeria
          </h2>

          <p className="mt-2 text-gray-600">
            Gerencie as imagens que serão exibidas no site público.
          </p>
        </div>

        {/* MENSAGEM */}
        {mensagem && (
          <div className="mb-6 rounded-xl border border-[#36b970]/30 bg-[#36b970]/10 p-4 text-[#173690]">
            <div className="flex items-center gap-3">
              <span className="text-xl">ℹ️</span>
              <p className="font-semibold">{mensagem}</p>
            </div>
          </div>
        )}

        {/* FORMULÁRIO */}
        <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#173690]">
                {editandoId ? "Editar foto" : "Nova foto"}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Cadastre uma imagem para a galeria.
              </p>
            </div>

            {editandoId && (
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
            onSubmit={salvarFoto}
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
                placeholder="Ex.: Área externa"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Descrição
              </label>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição da imagem..."
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />
            </div>

            {/* CATEGORIA */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Categoria
              </label>

              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#36b970]"
              >
                <option value="Estrutura">Estrutura</option>
                <option value="Abastecimento">Abastecimento</option>
                <option value="Conveniência">Conveniência</option>
                <option value="Serviços">Serviços</option>
                <option value="Equipe">Equipe</option>
                <option value="Eventos">Eventos</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            {/* UPLOAD */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Imagem {!editandoId && "*"}
              </label>

              <input
                id="arquivo-imagem"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  selecionarArquivo(e.target.files?.[0] || null)
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#173690] file:px-4 file:py-2 file:font-semibold file:text-white"
              />

              <p className="mt-2 text-xs text-gray-500">
                Envie uma imagem JPG, PNG ou WEBP. Recomendamos imagens
                com boa resolução.
              </p>
            </div>

            {/* PREVIEW */}
            {preview && (
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Pré-visualização
                </p>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={preview}
                    alt={titulo || "Pré-visualização"}
                    className="h-64 w-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* ORDEM */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Ordem de exibição
              </label>

              <input
                type="number"
                value={ordem}
                onChange={(e) => setOrdem(Number(e.target.value))}
                min={0}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#36b970] sm:w-48"
              />
            </div>

            {/* DESTAQUE */}
            <div className="rounded-xl bg-gray-50 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={destaque}
                  onChange={(e) => setDestaque(e.target.checked)}
                  className="h-5 w-5 accent-[#36b970]"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Foto em destaque
                  </p>

                  <p className="text-sm text-gray-500">
                    Marque esta opção para destacar a imagem.
                  </p>
                </div>
              </label>
            </div>

            {/* ATIVO */}
            <div className="rounded-xl bg-gray-50 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={ativo}
                  onChange={(e) => setAtivo(e.target.checked)}
                  className="h-5 w-5 accent-[#36b970]"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    Foto ativa
                  </p>

                  <p className="text-sm text-gray-500">
                    Fotos desativadas não aparecem no site público.
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
                  : editandoId
                    ? "💾 Salvar alterações"
                    : "➕ Cadastrar foto"}
              </button>
            </div>
          </form>
        </section>

        {/* FOTOS CADASTRADAS */}
        <section>
          <div className="mb-5">
            <h3 className="text-xl font-bold text-[#173690]">
              Fotos cadastradas
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {fotos.length}{" "}
              {fotos.length === 1
                ? "foto cadastrada"
                : "fotos cadastradas"}
            </p>
          </div>

          {carregando ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="font-semibold text-[#173690]">
                Carregando fotos...
              </p>
            </div>
          ) : fotos.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="text-5xl">🖼️</div>

              <h3 className="mt-4 text-lg font-bold text-[#173690]">
                Nenhuma foto cadastrada
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Cadastre a primeira imagem utilizando o formulário acima.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fotos.map((foto) => (
                <article
                  key={foto.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  {/* IMAGEM */}
                  <div className="relative">
                    <img
                      src={foto.imagem_url}
                      alt={foto.titulo}
                      className="h-56 w-full object-cover"
                    />

                    {foto.destaque && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#36b970] px-3 py-1 text-xs font-bold text-white">
                        ⭐ Destaque
                      </span>
                    )}

                    {!foto.ativo && (
                      <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                        Inativa
                      </span>
                    )}
                  </div>

                  {/* INFORMAÇÕES */}
                  <div className="p-5">
                    <h4 className="font-bold text-[#173690]">
                      {foto.titulo}
                    </h4>

                    <p className="mt-1 text-xs font-semibold text-[#36b970]">
                      {foto.categoria || "Sem categoria"}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {foto.descricao || "Sem descrição."}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      Ordem: {foto.ordem}
                    </p>

                    {/* AÇÕES */}
                    <div className="mt-5 grid gap-2">
                      <button
                        type="button"
                        onClick={() => editarFoto(foto)}
                        className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-bold text-[#173690] transition hover:bg-[#36b970]/10"
                      >
                        ✏️ Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => alternarDestaque(foto)}
                        className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-bold text-[#173690] transition hover:bg-[#36b970]/10"
                      >
                        {foto.destaque
                          ? "⭐ Remover destaque"
                          : "⭐ Tornar destaque"}
                      </button>

                      <button
                        type="button"
                        onClick={() => alternarAtivo(foto)}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                      >
                        {foto.ativo
                          ? "👁️ Desativar foto"
                          : "👁️ Ativar foto"}
                      </button>

                      <button
                        type="button"
                        onClick={() => excluirFoto(foto.id)}
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
          Gerenciamento da galeria
        </p>
      </footer>
    </main>
  );
}
