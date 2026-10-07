/**eslint-disable @next/next/no-img-element**/


export default function Galeria() {


const fotos = [


  {


    titulo: "Área externa",


    imagem:


      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",


  },


  {


    titulo: "Área de abastecimento",


    imagem:


      "https://images.unsplash.com/photo-1526346698789-22fd84314424?auto=format&fit=crop&w=1200&q=80",


  },


  {


    titulo: "Atendimento",


    imagem:


      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",


  },


  {


    titulo: "Conveniência",


    imagem:


      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",


  },


  {


    titulo: "Estrutura",


    imagem:


      "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=1200&q=80",


  },


  {


    titulo: "Posto",


    imagem:


      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1200&q=80",


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


            className="font-bold text-[#36b970]"


          >


            Galeria


          </a>


          <a


            href="/promocoes"


            className="font-medium text-gray-700 transition hover:text-[#36b970]"


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


                className="rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#36b970]"


              >


                Galeria


              </a>


              <a


                href="/promocoes"


                className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"


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


    <section className="relative overflow-hidden bg-gradient-to-r from-[#173690] to-[#36b970]">


      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">


        <div className="max-w-3xl">


          <span className="inline-block rounded-full bg-[#36b970] px-4 py-2 text-sm font-bold text-[#173690]">


            Galeria


          </span>


          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">


            Conheça o Posto Gasparin


          </h2>


          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">


            Confira imagens da estrutura, dos espaços e dos serviços


            disponíveis no posto.


          </p>


        </div>


      </div>


    </section>


    <section className="bg-gray-50 py-16 sm:py-20">


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        <div className="mx-auto max-w-2xl text-center">


          <span className="font-semibold uppercase tracking-wider text-[#36b970]">


            Fotos


          </span>


          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">


            Nossa estrutura


          </h2>


          <p className="mt-4 text-gray-600">


            Imagens provisórias para apresentação do projeto.


            Posteriormente, poderão ser substituídas pelas fotos oficiais


            do Posto Gasparin.


          </p>


        </div>


        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


          {fotos.map((foto) => (


            <article


              key={foto.titulo}


              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"


            >


              <div className="relative aspect-[4/3] overflow-hidden">


                <img src={foto.imagem} alt={foto.titulo} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>


                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />


                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-5 text-white transition duration-300 group-hover:translate-y-0">


                  <h3 className="text-lg font-bold">


                    {foto.titulo}


                  </h3>


                </div>


              </div>


            </article>


          ))}


        </div>


      </div>


    </section>


    <section className="bg-[#36b970] py-14">


      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">


        <h2 className="text-3xl font-extrabold text-[#173690] sm:text-4xl">


          Quer conhecer o Posto Gasparin?


        </h2>


        <p className="mx-auto mt-4 max-w-2xl text-[#173690]">


          Consulte nossa localização e encontre o melhor caminho para


          chegar até nós.


        </p>


        <a


          href="/contato"


          className="mt-7 inline-flex rounded-full bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-[#173690]"


        >


          Ver contato e localização


        </a>


      </div>


    </section>


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


            <p>Telefone: (00) 0000-0000\</p>


            <p>WhatsApp: (00) 00000-0000\</p>


            <p>Endereço: informação provisória\</p>


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