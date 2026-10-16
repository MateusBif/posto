"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
type Foto = {
  id: number;
  titulo: string;
  descricao: string;
  url: string;
  destaque: boolean;
};
export default function AdminGaleria() {
  const [fotos, setFotos] = useState<Foto[]>([
    {
      id: 1,
      titulo: "Área externa",
      descricao: "Foto de exemplo da área externa do posto.",
      url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80",
      destaque: true,
    },
    {
      id: 2,
      titulo: "Estrutura",
      descricao: "Foto de exemplo da estrutura do posto.",
      url: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=900&q=80",
      destaque: false,
    },
    {
      id: 3,
      titulo: "Conveniência",
      descricao: "Foto de exemplo da conveniência.",
      url: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
      destaque: false,
    },
  ]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [url, setUrl] = useState("");
  const [destaque, setDestaque] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setUrl("");
    setDestaque(false);
    setEditandoId(null);
  }
  function salvarFoto(event: FormEvent) {
    event.preventDefault();
    if (!titulo.trim() || !url.trim()) {
      setMensagem("Preencha o título e a URL da imagem.");
      return;
    }
    if (editandoId !== null) {
      setFotos((listaAtual) =>
        listaAtual.map((foto) =>
          foto.id === editandoId
            ? {
                ...foto,
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                url: url.trim(),
                destaque,
              }
            : foto
        )
      );
      setMensagem("Foto atualizada com sucesso!");
    } else {
      const novaFoto: Foto = {
        id: Date.now(),
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        url: url.trim(),
        destaque,
      };
      setFotos((listaAtual) => [
        ...listaAtual,
        novaFoto,
      ]);
      setMensagem("Foto cadastrada com sucesso!");
    }
    limparFormulario();
    setTimeout(() => {
      setMensagem("");
    }, 3000);
  }
  function editarFoto(foto: Foto) {
    setTitulo(foto.titulo);
    setDescricao(foto.descricao);
    setUrl(foto.url);
    setDestaque(foto.destaque);
    setEditandoId(foto.id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function excluirFoto(id: number) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta foto?"
    );
    if (!confirmar) {
      return;
    }
    setFotos((listaAtual) =>
      listaAtual.filter((foto) => foto.id !== id)
    );
    setMensagem("Foto excluída com sucesso!");
    setTimeout(() => {
      setMensagem("");
    }, 3000);
  }
  function alternarDestaque(id: number) {
    setFotos((listaAtual) =>
      listaAtual.map((foto) =>
        foto.id === id
          ? {
              ...foto,
              destaque: !foto.destaque,
            }
          : foto
      )
    );
  }
  return (
    <main className="min-h-screen bg-gray-100">
      {/*** HEADER ***/}
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
      {/*** CONTEÚDO ***/}
      <section className="mx-auto max-w-6xl px-6 py-10">
        {/*** TÍTULO ***/}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#36b970]">
            Administração
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#173690]">
            Galeria
          </h2>
          <p className="mt-2 text-gray-600">
            Gerencie as imagens que serão exibidas na galeria
            do site público.
          </p>
        </div>
        {/*** MENSAGEM ***/}
        {mensagem && (
          <div
            className={`mb-6 rounded-xl border p-4 ${
              mensagem.includes("Preencha")
                ? "border-[#36b970]/30 bg-[#36b970]/10 text-gray-700"
                : "border-[#36b970]/30 bg-[#36b970]/10 text-[#173690]"
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
        {/*** FORMULÁRIO ***/}
        <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#173690]">
                {editandoId !== null
                  ? "Editar foto"
                  : "Nova foto"}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Cadastre uma imagem para a galeria.
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
            onSubmit={salvarFoto}
            className="mt-6 space-y-5"
          >
            {/*** TÍTULO ***/}
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
            {/*** DESCRIÇÃO ***/}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição da imagem..."
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />
            </div>
            {/*** URL ***/}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                URL da imagem *
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />
              <p className="mt-2 text-xs text-gray-500">
                Por enquanto estamos utilizando URLs de imagens.
                Posteriormente vamos integrar o upload de arquivos.
              </p>
            </div>
            {/*** PREVIEW ***/}
            {url.trim() && (
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Pré-visualização
                </p>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={url}
                    alt={titulo || "Pré-visualização"}
                    className="h-64 w-full object-cover"
                  />
                </div>
              </div>
            )}
            {/*** DESTAQUE ***/}
            <div className="rounded-xl bg-gray-50 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={destaque}
                  onChange={(e) =>
                    setDestaque(e.target.checked)
                  }
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
            {/*** BOTÃO ***/}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-[#36b970] sm:w-auto"
              >
                {editandoId !== null
                  ? "💾 Salvar alterações"
                  : "➕ Cadastrar foto"}
              </button>
            </div>
          </form>
        </section>
        {/*** GALERIA ***/}
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
          {fotos.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <div className="text-5xl">
                🖼️
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#173690]">
                Nenhuma foto cadastrada
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Cadastre a primeira imagem utilizando o
                formulário acima.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fotos.map((foto) => (
                <article
                  key={foto.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  {/*** IMAGEM ***/}
                  <div className="relative">
                    <img
                      src={foto.url}
                      alt={foto.titulo}
                      className="h-56 w-full object-cover"
                    />
                    {foto.destaque && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#36b970] px-3 py-1 text-xs font-bold text-white">
                        ⭐ Destaque
                      </span>
                    )}
                  </div>
                  {/*** INFORMAÇÕES ***/}
                  <div className="p-5">
                    <h4 className="font-bold text-[#173690]">
                      {foto.titulo}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {foto.descricao || "Sem descrição."}
                    </p>
                    {/*** AÇÕES ***/}
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
                        onClick={() =>
                          alternarDestaque(foto.id)
                        }
                        className="rounded-lg border border-[#36b970] px-4 py-2 text-sm font-bold text-[#173690] transition hover:bg-[#36b970]/10"
                      >
                        {foto.destaque
                          ? "⭐ Remover destaque"
                          : "⭐ Tornar destaque"}
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
      {/*** FOOTER ***/}
      <footer className="mt-10 bg-[#173690] px-6 py-8 text-center text-sm text-white/80">
        <p>
          Painel Administrativo — Posto Gasparin
        </p>
        <p className="mt-1 text-[#36b970]">
          Gerenciamento da galeria
        </p>
      </footer>
    </main>
  );
}
