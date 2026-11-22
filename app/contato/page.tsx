"use client";

import { useEffect, useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Contato = {
  telefone: string;
  whatsapp: string;
  email: string;
  endereco: string;
  horario: string;
  mapa: string;
};

const contatoInicial: Contato = {
  telefone: "",
  whatsapp: "",
  email: "",
  endereco: "",
  horario: "",
  mapa: "",
};

export default function AdminContatoPage() {
  const [contato, setContato] = useState<Contato>(contatoInicial);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // =====================================================
  // CARREGAR CONTATO
  // =====================================================

  useEffect(() => {
    async function carregarContato() {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("contact_info")
          .select("telefone, whatsapp, email, endereco, horario, mapa")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setContato({
            telefone: data.telefone || "",
            whatsapp: data.whatsapp || "",
            email: data.email || "",
            endereco: data.endereco || "",
            horario: data.horario || "",
            mapa: data.mapa || "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar contato:", error);

        setErro(
          "Não foi possível carregar as informações de contato."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarContato();
  }, []);

  // =====================================================
  // ATUALIZAR CAMPOS
  // =====================================================

  function atualizarCampo(
    campo: keyof Contato,
    valor: string
  ) {
    setContato((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  // =====================================================
  // SALVAR CONTATO
  // =====================================================

  async function salvarContato(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSalvando(true);
    setMensagem("");
    setErro("");

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("contact_info")
        .upsert(
          {
            id: 1,
            telefone: contato.telefone,
            whatsapp: contato.whatsapp,
            email: contato.email,
            endereco: contato.endereco,
            horario: contato.horario,
            mapa: contato.mapa,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "id",
          }
        );

      if (error) {
        throw error;
      }

      setMensagem(
        "Informações de contato salvas com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao salvar contato:", error);

      setErro(
        "Não foi possível salvar. Verifique sua conexão e tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <main className="min-h-screen bg-gray-100">

      {/* CABEÇALHO */}
      <header className="bg-[#173690] text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              Posto Gasparin
            </h1>

            <p className="text-sm text-white/80">
              Administração • Contato
            </p>
          </div>

          <a
            href="/admin/dashboard"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#173690] transition hover:bg-gray-100"
          >
            Voltar
          </a>

        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* TÍTULO */}
        <div className="mb-8">

          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#36b970]">
            Área administrativa
          </p>

          <h2 className="text-3xl font-bold text-[#173690]">
            Informações de contato
          </h2>

          <p className="mt-2 text-gray-600">
            Cadastre e atualize as informações que serão exibidas
            na página pública de contato.
          </p>

        </div>

        {/* CARREGAMENTO */}
        {carregando && (
          <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
            <p className="animate-pulse text-gray-500">
              Carregando informações...
            </p>
          </div>
        )}

        {/* MENSAGEM DE SUCESSO */}
        {mensagem && (
          <div className="mb-6 rounded-xl border border-[#36b970]/20 bg-[#36b970]/10 px-5 py-4 text-[#173690]">
            <div className="flex items-center gap-3">

              <span className="text-xl">✓</span>

              <p className="font-semibold">
                {mensagem}
              </p>

            </div>
          </div>
        )}

        {/* MENSAGEM DE ERRO */}
        {erro && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <div className="flex items-center gap-3">

              <span className="text-xl">⚠</span>

              <p className="font-medium">
                {erro}
              </p>

            </div>
          </div>
        )}

        {/* FORMULÁRIO */}
        <form
          onSubmit={salvarContato}
          className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >

          {/* DADOS PRINCIPAIS */}
          <div className="mb-8">

            <h3 className="text-xl font-bold text-[#173690]">
              Dados principais
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Essas informações aparecerão no site público.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* TELEFONE */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Telefone
              </label>

              <input
                type="text"
                value={contato.telefone}
                onChange={(e) =>
                  atualizarCampo("telefone", e.target.value)
                }
                placeholder="Ex.: (45) 0000-0000"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />

            </div>

            {/* WHATSAPP */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                WhatsApp
              </label>

              <input
                type="text"
                value={contato.whatsapp}
                onChange={(e) =>
                  atualizarCampo("whatsapp", e.target.value)
                }
                placeholder="Ex.: (45) 99999-9999"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                E-mail
              </label>

              <input
                type="email"
                value={contato.email}
                onChange={(e) =>
                  atualizarCampo("email", e.target.value)
                }
                placeholder="Ex.: contato@posto.com.br"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />

            </div>

            {/* HORÁRIO */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Horário de atendimento
              </label>

              <input
                type="text"
                value={contato.horario}
                onChange={(e) =>
                  atualizarCampo("horario", e.target.value)
                }
                placeholder="Ex.: Segunda a domingo, 06h às 22h"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
              />

            </div>

          </div>

          {/* ENDEREÇO */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Endereço
            </label>

            <textarea
              value={contato.endereco}
              onChange={(e) =>
                atualizarCampo("endereco", e.target.value)
              }
              rows={3}
              placeholder="Digite o endereço completo do posto"
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
            />

          </div>

          {/* MAPA */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Link do Google Maps
            </label>

            <input
              type="url"
              value={contato.mapa}
              onChange={(e) =>
                atualizarCampo("mapa", e.target.value)
              }
              placeholder="Cole aqui o link da localização no Google Maps"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-[#36b970]/20"
            />

            <p className="mt-2 text-xs text-gray-500">
              Esse link poderá ser utilizado no botão
              "Como chegar" do site.
            </p>

          </div>

          {/* BOTÕES */}
          <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

            <a
              href="/admin/dashboard"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancelar
            </a>

            <button
              type="submit"
              disabled={salvando}
              className="rounded-xl bg-[#173690] px-6 py-3 font-semibold text-white transition hover:bg-[#36b970] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando
                ? "Salvando..."
                : "Salvar informações"}
            </button>

          </div>

        </form>

        {/* INFORMAÇÃO */}
        <div className="mt-8 rounded-2xl border border-[#36b970]/20 bg-[#36b970]/10 p-6">

          <h3 className="text-lg font-bold text-[#173690]">
            Sobre esta seção
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-700">
            As informações são armazenadas no banco de dados
            Supabase e utilizadas automaticamente pela página
            pública de contato, incluindo telefone, WhatsApp,
            endereço, horário e localização.
          </p>

        </div>

      </section>

    </main>
  );
}