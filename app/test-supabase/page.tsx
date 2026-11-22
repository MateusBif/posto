import { createClient } from "@/lib/supabase/server";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_config")
    .select("id, nome_posto, slogan")
    .eq("id", 1)
    .single();

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6">
          Teste de conexão Supabase
        </h1>

        {error ? (
          <div className="bg-red-100 text-red-800 p-4 rounded-xl">
            <h2 className="font-bold mb-2">
              ❌ Erro na conexão
            </h2>

            <p>{error.message}</p>
          </div>
        ) : (
          <div className="bg-green-100 text-green-800 p-4 rounded-xl">
            <h2 className="font-bold mb-2">
              ✅ Conexão funcionando!
            </h2>

            <p>Dados recebidos do banco de dados:</p>

            <div className="mt-4 space-y-2">
              <p>
                <strong>ID:</strong> {data.id}
              </p>

              <p>
                <strong>Posto:</strong> {data.nome_posto}
              </p>

              <p>
                <strong>Slogan:</strong> {data.slogan}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}