export default function Promocoes() {



  const promocoes = [



    {



      status: "ATIVA",



      titulo: "Promoção de Abastecimento",



      descricao:



        "Abasteça seu veículo e participe desta promoção especial do Posto Gasparin.",



      periodo: "Período promocional",



      destaque: true,



    },



    {



      status: "EM BREVE",



      titulo: "Sorteio Especial",



      descricao:



        "Uma nova campanha está sendo preparada. Em breve teremos mais informações.",



      periodo: "Em breve",



      destaque: false,



    },



    {



      status: "EM BREVE",



      titulo: "Campanha Especial",



      descricao:



        "Fique atento às novidades e acompanhe nossas próximas campanhas.",



      periodo: "Em breve",



      destaque: false,



    },



  ];







  return (



    <main className="min-h-screen bg-white">









      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">



        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">









          <a href="/" className="flex items-center gap-3">







            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#36b970] text-xl font-bold text-white">



              PG



            </div>







            <div>



              <h1 className="text-lg font-extrabold leading-tight text-[#173690]">



                Posto Gasparin



              </h1>







              <p className="text-xs text-gray-500">



                Parada, praticidade e atendimento



              </p>



            </div>







          </a>









          <nav className="hidden items-center gap-7 md:flex">







            <a



              href="/"



              className="font-medium text-gray-700 transition hover:text-[#36b970]"



           >



              Início



            </a>







            <a



              href="/o-posto"



              className="font-medium text-gray-700 transition hover:text-[#36b970]"



           >



              O Posto



            </a>







            <a



              href="/servicos"



              className="font-medium text-gray-700 transition hover:text-[#36b970]"



           >



              Serviços



            </a>







            <a



              href="/galeria"



              className="font-medium text-gray-700 transition hover:text-[#36b970]"



           >



              Galeria



            </a>







            <a



              href="/promocoes"



              className="font-bold text-[#36b970]"



           >



              Promoções



            </a>







            <a



              href="/contato"



              className="font-medium text-gray-700 transition hover:text-[#36b970]"



           >



              Contato



            </a>







            <a



              href="/admin/login"



              className="rounded-lg bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#36b970]"



           >



              Login



            </a>







          </nav>









          <details className="relative md:hidden">







            <summary className="cursor-pointer list-none rounded-lg bg-[#36b970] px-4 py-2 text-xl text-white">



              ☰



            </summary>







            <div className="absolute right-0 top-14 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">







              <nav className="flex flex-col">







                <a



                  href="/"



                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"



               >



                  Início



                </a>







                <a



                  href="/o-posto"



                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"



               >



                  O Posto



                </a>







                <a



                  href="/servicos"



                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"



               >



                  Serviços



                </a>







                <a



                  href="/galeria"



                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"



               >



                  Galeria



                </a>







                <a



                  href="/promocoes"



                  className="rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#36b970]"



               >



                  Promoções



                </a>







                <a



                  href="/contato"



                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"



               >



                  Contato



                </a>







                <a



                  href="/admin/login"



                  className="rounded-lg bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#36b970]"



               >



                  Login



                </a>







              </nav>







            </div>







          </details>







        </div>



      </header>









      <section className="relative overflow-hidden bg-[#173690]">







        <div className="absolute inset-0 bg-gradient-to-r from-[#173690] via-[#173690] to-[#173690]" />







        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">







          <div className="max-w-3xl">







            <span className="inline-block rounded-full bg-[#36b970] px-4 py-2 text-sm font-bold text-[#173690]">



              Promoções & Sorteios



            </span>







            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">



              Aproveite nossas promoções



            </h2>







            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">



              Confira as campanhas, promoções e sorteios disponíveis no



              Posto Gasparin.



            </p>







          </div>







        </div>







      </section>









      <section className="bg-gray-50 py-16 sm:py-20">







        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">







          <div className="mx-auto max-w-2xl text-center">







            <span className="font-semibold uppercase tracking-wider text-[#36b970]">



              Oportunidades



            </span>







            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">



              Promoções disponíveis



            </h2>







            <p className="mt-4 text-gray-600">



              Acompanhe nossas campanhas e fique por dentro das novidades.



            </p>







          </div>









          <div className="mt-12 grid gap-7 lg:grid-cols-3">







            {promocoes.map((promocao) => (



              <article



                key={promocao.titulo}



                className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${



                  promocao.destaque



                    ? "border-[#36b970] ring-2 ring-[#36b970]/20"



                    : "border-gray-200"



                }`}



             >







                {/** TOPO DO CARD **/}



                <div className="flex h-44 items-center justify-center bg-[#173690]">







                  <div className="text-center">







                    <div className="text-6xl">



                      {promocao.destaque ? "🎁" : "🎉"}



                    </div>







                    <p className="mt-3 font-bold text-white">



                      Posto Gasparin



                    </p>







                  </div>







                </div>







                {/** CONTEÚDO **/}



                <div className="p-7">







                  <div className="flex items-center justify-between gap-3">







                    <span



                      className={`rounded-full px-3 py-1 text-xs font-bold ${



                        promocao.status === "ATIVA"



                          ? "bg-[#36b970]/15 text-[#36b970]"



                          : "bg-[#36b970]/10 text-[#173690]"



                      }`}



                   >



                      {promocao.status}



                    </span>







                    {promocao.destaque && (



                      <span className="text-sm font-bold text-[#36b970]">



                        ★ Destaque



                      </span>



                    )}







                  </div>







                  <h3 className="mt-5 text-2xl font-extrabold text-gray-900">



                    {promocao.titulo}



                  </h3>







                  <p className="mt-3 leading-7 text-gray-600">



                    {promocao.descricao}



                  </p>







                  <div className="mt-6 border-t border-gray-100 pt-5">







                    <p className="text-sm text-gray-500">



                      Período



                    </p>







                    <p className="mt-1 font-semibold text-gray-800">



                      {promocao.periodo}



                    </p>







                  </div>







                  {promocao.destaque && (



                    <button



                      type="button"



                      className="mt-6 w-full rounded-full bg-[#36b970] px-5 py-3 font-bold text-white transition hover:bg-[#173690]"



                   >



                      Quero participar



                    </button>



                  )}







                </div>







              </article>



            ))}







          </div>







        </div>







      </section>







      {/** AVISO **/}



      <section className="bg-white py-14">







        <div className="mx-auto max-w-4xl px-4 sm:px-6">







          <div className="rounded-3xl border border-[#36b970]/20 bg-[#36b970]/10 p-8 text-center sm:p-10">







            <div className="text-5xl">



              📢



            </div>







            <h2 className="mt-5 text-2xl font-extrabold text-[#173690]">



              Fique de olho nas novidades!



            </h2>







            <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#173690]">



              Novas promoções e sorteios poderão ser adicionados



              periodicamente. Consulte sempre esta página para acompanhar



              as novidades.



            </p>







          </div>







        </div>







      </section>







      {/** CTA **/}



      <section className="bg-[#36b970] py-14">







        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">







          <h2 className="text-3xl font-extrabold text-[#173690] sm:text-4xl">



            Ficou com alguma dúvida?



          </h2>







          <p className="mx-auto mt-4 max-w-2xl text-[#173690]">



            Entre em contato conosco para saber mais sobre nossas



            promoções e campanhas.



          </p>







          <a



            href="/contato"



            className="mt-7 inline-flex rounded-full bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-[#173690]"



         >



            Fale conosco



          </a>







        </div>







      </section>







      {/** FOOTER **/}



      <footer className="bg-[#173690] text-white">







        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">







          <div>







            <h3 className="text-xl font-extrabold">



              Posto Gasparin



            </h3>







            <p className="mt-3 text-sm leading-6 text-white/80">



              Informações provisórias para o desenvolvimento do projeto.



            </p>







          </div>

          <div>

            <h3 className="font-bold">

              Navegação

            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">

              <a href="/" className="hover:text-white">

                Início

              </a>

              <a href="/o-posto" className="hover:text-white">

                O Posto

              </a>

              <a href="/servicos" className="hover:text-white">

                Serviços

              </a>

              <a href="/galeria" className="hover:text-white">

                Galeria

              </a>

              <a href="/promocoes" className="hover:text-white">

                Promoções

              </a>

              <a href="/contato" className="hover:text-white">

                Contato

              </a>

            </div>

          </div>

          <div>

            <h3 className="font-bold">

              Contato

            </h3>

            <div className="mt-4 space-y-3 text-sm text-white/80">

              <p>Telefone: (00) 0000-0000</p>

              <p>WhatsApp: (00) 00000-0000</p>

              <p>Endereço: informação provisória</p>

            </div>

          </div>

        </div>

        <div className="border-t border-[#173690]">

          <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-white/70 sm:px-6">

            © {new Date().getFullYear()} Posto Gasparin. Todos os direitos reservados.

          </div>

        </div>

      </footer>

    </main>

  );

}