"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
export default function AdminOPosto() {
  const [salvo, setSalvo] = useState(false);
  const [formulario, setFormulario] = useState({
    nome: "Posto Gasparin",
    titulo: "Seu posto de confiança",
    descricao:
    "Aqui ficará a apresentação oficial do Posto Gasparin. As informações reais poderão ser cadastradas posteriormente pela área administrativa.",
    historia:
    "Aqui será apresentada a história do Posto Gasparin, sua trajetória e sua importância para os clientes e para a região.",
    diferencial1: "Atendimento de qualidade",
    diferencial2: "Estrutura completa",
    diferencial3: "Praticidade e conveniência",
    diferencial4: "Compromisso com o cliente",
    estrutura1: "Abastecimento",
    estrutura2: "Conveniência",
    estrutura3: "Atendimento",
    estrutura4: "Estacionamento",
  });
function alterarCampo(
campo: keyof typeof formulario,
valor: string
) {
  setFormulario({
    ...formulario,
    [campo]: valor,
  });
setSalvo(false);
}
function salvarAlteracoes(event: FormEvent) {
  event.preventDefault();
  setSalvo(true);
  setTimeout(() => {
    setSalvo(false);
    }, 4000);
  }
return (
<main className="min-h-screen bg-gray-100">
  {/* HEADER */}
  <header className="bg-[#173690] text-white shadow-lg">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <div>
        <p className="text-2xl font-bold">
          Posto Gasparin
        </p>
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
  <section className="mx-auto max-w-5xl px-6 py-10">
    {/* TÍTULO */}
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#36b970]">
        Administração
      </p>
      <h1 className="mt-2 text-3xl font-bold text-[#173690]">
        O Posto
      </h1>
      <p className="mt-2 text-gray-600">
        Edite as informações que serão apresentadas na página
        "O Posto" do site.
      </p>
    </div>
    {/* MENSAGEM DE SUCESSO */}
    {salvo && (
    <div className="mb-6 rounded-xl border border-[#36b970]/30 bg-[#36b970]/10 p-4 text-[#173690]">
      <div className="flex items-center gap-3">
        <span className="text-xl">
          ✅
        </span>
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
    {/* FORMULÁRIO */}
    <form
    onSubmit={salvarAlteracoes}
    className="space-y-8"
    >
      {/* INFORMAÇÕES PRINCIPAIS */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#173690]">
          Informações principais
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Essas informações serão utilizadas na apresentação
          principal do posto.
        </p>
        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nome do posto
            </label>
            <input
            type="text"
            value={formulario.nome}
            onChange={(e) =>
              alterarCampo("nome", e.target.value)
            }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Título de apresentação
          </label>
          <input
          type="text"
          value={formulario.titulo}
          onChange={(e) =>
            alterarCampo("titulo", e.target.value)
          }
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
        />
      </div>
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
      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
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
    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
    />
  </div>
</div>
</section>
{/* DIFERENCIAIS */}
<section className="rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-[#173690]">
    Diferenciais
  </h2>
  <p className="mt-1 text-sm text-gray-500">
    Cadastre os principais diferenciais que serão
    apresentados aos clientes.
  </p>
  <div className="mt-6 grid gap-5 sm:grid-cols-2">
    <Campo
    label="Diferencial 1"
    value={formulario.diferencial1}
    onChange={(valor) =>
      alterarCampo("diferencial1", valor)
    }
  />
  <Campo
  label="Diferencial 2"
  value={formulario.diferencial2}
  onChange={(valor) =>
    alterarCampo("diferencial2", valor)
  }
/>
<Campo
label="Diferencial 3"
value={formulario.diferencial3}
onChange={(valor) =>
  alterarCampo("diferencial3", valor)
}
/>
<Campo
label="Diferencial 4"
value={formulario.diferencial4}
onChange={(valor) =>
  alterarCampo("diferencial4", valor)
}
/>
</div>
</section>
{/* ESTRUTURA */}
<section className="rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-[#173690]">
    Estrutura
  </h2>
  <p className="mt-1 text-sm text-gray-500">
    Informe os principais espaços ou estruturas
    disponíveis no posto.
  </p>
  <div className="mt-6 grid gap-5 sm:grid-cols-2">
    <Campo
    label="Estrutura 1"
    value={formulario.estrutura1}
    onChange={(valor) =>
      alterarCampo("estrutura1", valor)
    }
  />
  <Campo
  label="Estrutura 2"
  value={formulario.estrutura2}
  onChange={(valor) =>
    alterarCampo("estrutura2", valor)
  }
/>
<Campo
label="Estrutura 3"
value={formulario.estrutura3}
onChange={(valor) =>
  alterarCampo("estrutura3", valor)
}
/>
<Campo
label="Estrutura 4"
value={formulario.estrutura4}
onChange={(valor) =>
  alterarCampo("estrutura4", valor)
}
/>
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
  className="rounded-xl bg-[#173690] px-7 py-3 font-bold text-white shadow-sm transition hover:bg-[#36b970]"
  >
    💾 Salvar alterações
  </button>
</div>
</form>
</section>
{/* FOOTER */}
<footer className="mt-10 bg-[#173690] px-6 py-8 text-center text-sm text-white/80">
  <p>
    Painel Administrativo — Posto Gasparin
  </p>
  <p className="mt-1 text-[#36b970]">
    Gerenciamento de conteúdo
  </p>
</footer>
</main>
);
}
/*** COMPONENTE DE CAMPO ***/
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