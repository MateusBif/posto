"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Contato = {
  id?: number | string;
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

  // Carregar informações do banco
  useEffect(() => {
    async function carregarContato() {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("contact_info")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setContato({
            id: data.id,
            telefone: data.telefone ?? "",
            whatsapp: data.whatsapp ?? "",
            email: data.email ?? "",
            endereco: data.endereco ?? "",
            horario: data.horario ?? "",
            mapa: data.mapa ?? "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar contato:", error);

        setMensagem(
          "Erro ao carregar os dados de contato. Verifique sua conexão."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarContato();
  }, []);

  // Atualizar campos
  function atualizarCampo(
    campo: keyof Contato,
    valor: string
  ) {
    setContato((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  // Salvar informações
  async function salvarContato(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSalvando(true);
    setMensagem("");

    try {
      const supabase = createClient();

      const dados = {
        telefone: contato.telefone,
        whatsapp: contato.whatsapp,
        email: contato.email,
        endereco: contato.endereco,
        horario: contato.horario,
        mapa: contato.mapa,
        updated_at: new Date().toISOString(),
      };

      if (contato.id) {
        // Atualizar registro existente
        const { error } = await supabase
          .from("contact_info")
          .update(dados)
          .eq("id", contato.id);

        if (error) {
          throw error;
        }
      } else {
        // Criar novo registro
        const { data, error } = await supabase
          .from("contact_info")
          .insert(dados)
          .select()
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setContato((prev) => ({
            ...prev,
            id: data.id,
          }));
        }
      }

      setMensagem("Informações de contato salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar contato:", error);

      setMensagem(
        "Erro ao salvar. Verifique os dados e tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  }

  // Tela de carregamento
  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl bg-white p-8 shadow">
            <p className="text-gray-600">
              Carregando informações de contato...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Página principal
  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#173690]">
            Informações de Contato
          </h1>

          <p className="mt-2 text-gray-600">
            Gerencie as informações exibidas na página pública
            de contato do Posto Gasparin.
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={salvarContato}
          className="space-y-6 rounded-xl bg-white p-5 shadow-md md:p-8"
        >

          {/* Telefone, WhatsApp, Email e Endereço */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Telefone */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Telefone
              </label>

              <input
                type="text"
                value={contato.telefone}
                onChange={(e) =>
                  atualizarCampo("telefone", e.target.value)
                }
                placeholder="(45) 0000-0000"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-[#173690] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                WhatsApp
              </label>

              <input
                type="text"
                value={contato.whatsapp}
                onChange={(e) =>
                  atualizarCampo("whatsapp", e.target.value)
                }
                placeholder="(45) 99999-9999"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-[#36b970] focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* E-mail */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                E-mail
              </label>

              <input
                type="email"
                value={contato.email}
                onChange={(e) =>
                  atualizarCampo("email", e.target.value)
                }
                placeholder="contato@postogasparin.com.br"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-[#173690] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Endereço */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Endereço
              </label>

              <input
                type="text"
                value={contato.endereco}
                onChange={(e) =>
                  atualizarCampo("endereco", e.target.value)
                }
                placeholder="Endereço completo do posto"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-[#173690] focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Horário de funcionamento */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Horário de funcionamento
            </label>

            <textarea
              value={contato.horario}
              onChange={(e) =>
                atualizarCampo("horario", e.target.value)
              }
              placeholder="Exemplo: Segunda a domingo, das 6h às 22h"
              rows={3}
              className="w-full resize-y rounded-lg border border-gray-300 p-3 outline-none transition focus:border-[#173690] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Google Maps */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Link do Google Maps
            </label>

            <textarea
              value={contato.mapa}
              onChange={(e) =>
                atualizarCampo("mapa", e.target.value)
              }
              placeholder="Cole aqui o link do Google Maps"
              rows={3}
              className="w-full resize-y rounded-lg border border-gray-300 p-3 outline-none transition focus:border-[#173690] focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-sm text-gray-500">
              Esse link será utilizado pelo botão para abrir
              a localização do posto.
            </p>
          </div>

          {/* Mensagem */}
          {mensagem && (
            <div
              className={`rounded-lg p-4 ${
                mensagem.includes("sucesso")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {mensagem}
            </div>
          )}

          {/* Botão salvar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="submit"
              disabled={salvando}
              className="rounded-lg bg-[#173690] px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando
                ? "Salvando..."
                : "Salvar informações"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}