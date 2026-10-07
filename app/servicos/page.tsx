export default function Servicos() {


 const servicos = [


   {


     titulo: "Abastecimento",


     descricao:


       "Abasteça seu veículo com praticidade e conte com uma estrutura preparada para atender diferentes tipos de clientes.",


     icone: "⛽",


   },


   {


     titulo: "Conveniência",


     descricao:


       "Espaço pensado para oferecer praticidade aos clientes durante a parada no posto.",


     icone: "🛒",


   },


   {


     titulo: "Atendimento",


     descricao:


       "Equipe preparada para proporcionar um atendimento rápido, cordial e eficiente.",


     icone: "🤝",


   },


   {


     titulo: "Serviços para motoristas",


     descricao:


       "Estrutura voltada também para motoristas que precisam fazer uma parada durante suas viagens.",


     icone: "🚛",


   },


   {


     titulo: "Serviços para empresas",


     descricao:


       "Soluções e atendimento para empresas e transportadoras que utilizam o posto.",


     icone: "🏢",


   },


   {


     titulo: "Parada e praticidade",


     descricao:


       "Um espaço para fazer uma pausa durante o trajeto com mais comodidade e praticidade.",


     icone: "📍",


   },


 ];


 return (


   <main className="min-h-screen bg-white">


     {/***HEADER ***/}


     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">


       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">


         {/***LOGO ***/}


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


         {/***MENU DESKTOP ***/}


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


             className="font-bold text-[#36b970]"


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


         {/***MENU MOBILE ***/}


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


                 className="rounded-lg bg-[#36b970]/10 px-4 py-3 font-semibold text-[#36b970]"


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


                 className="rrounded-lg bg-[#36b970] px-5 py-3 font-bold text-[#173690] transition hover:bg-[#36b970]"


               >


               Login


               </a>


             </nav>


           </div>


         </details>


       </div>


     </header>


     {/***BANNER ***/}


     <section className="relative overflow-hidden bg-gradient-to-r from-[#173690] to-[#36b970]">


       <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">


         <div className="max-w-3xl">


           <span className="inline-block rounded-full bg-[#36b970] px-4 py-2 text-sm font-bold text-[#173690]">


             Nossos serviços


           </span>


           <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">


             Tudo para deixar sua parada mais prática


           </h2>


           <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">


             Conheça os serviços disponíveis no Posto Gasparin e encontre


             tudo o que precisa para continuar sua viagem com tranquilidade.


           </p>


         </div>


       </div>


     </section>


     {/***SERVIÇOS ***/}


     <section className="bg-gray-50 py-16 sm:py-20">


       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


         <div className="mx-auto max-w-2xl text-center">


           <span className="font-semibold uppercase tracking-wider text-[#36b970]">


             Estrutura e atendimento


           </span>


           <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">


             Serviços para você


           </h2>


           <p className="mt-4 text-gray-600">


             Informações provisórias que poderão ser atualizadas


             posteriormente pela administração do site.


           </p>


         </div>


         {/***GRID ***/}


         <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


           {servicos.map((servico) => (


             <article


               key={servico.titulo}


               className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"


             >


               <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#36b970]/10 text-3xl transition group-hover:bg-[#36b970]">


                 <span className="transition group-hover:scale-110">


                   {servico.icone}


                 </span>


               </div>


               <h3 className="mt-6 text-xl font-bold text-gray-900">


                 {servico.titulo}


               </h3>


               <p className="mt-3 leading-7 text-gray-600">


                 {servico.descricao}


               </p>


               <div className="mt-6 h-1 w-12 rounded-full bg-[#36b970]" />


             </article>


           ))}


         </div>


       </div>


     </section>


     {/***DESTAQUE ***/}


     <section className="bg-white py-16 sm:py-20">


       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


         <div className="overflow-hidden rounded-3xl bg-[#173690]">


           <div className="grid lg:grid-cols-2">


             <div className="p-8 sm:p-12 lg:p-14">


               <span className="font-semibold uppercase tracking-wider text-[#36b970]">


                 Para quem está na estrada


               </span>


               <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">


                 Uma parada pensada para você


               </h2>


               <p className="mt-5 leading-8 text-white/90">


                 Seja para abastecer, fazer uma pausa ou utilizar os


                 serviços disponíveis, o Posto Gasparin busca oferecer


                 praticidade durante sua jornada.


               </p>


               <a


                 href="/contato"


                 className="mt-8 inline-flex rounded-full bg-[#36b970] px-6 py-3 font-bold text-[#173690] transition hover:bg-[#36b970]"


               >


                 Entre em contato


               </a>


             </div>


             <div className="flex min-h-[280px] items-center justify-center bg-[#173690] p-10">


               <div className="text-center">


                 <div className="text-7xl">


                   🚛


                 </div>


                 <p className="mt-5 text-xl font-bold text-white">


                   Praticidade na sua viagem


                 </p>


                 <p className="mt-2 text-white/80">


                   Conte com o Posto Gasparin.


                 </p>


               </div>


             </div>


           </div>


         </div>


       </div>


     </section>


     {/***CTA ***/}


     <section className="bg-[#36b970] py-14">


       <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">


         <h2 className="text-3xl font-extrabold text-[#173690] sm:text-4xl">


           Precisa de mais informações?


         </h2>


         <p className="mx-auto mt-4 max-w-2xl text-[#173690]">


           Entre em contato com o Posto Gasparin para saber mais sobre os


           serviços disponíveis.


         </p>


         <a


           href="/contato"


           className="mt-7 inline-flex rounded-full bg-[#173690] px-7 py-3 font-bold text-white transition hover:bg-[#173690]"


         >


           Fale conosco


         </a>


       </div>


     </section>


     {/***FOOTER ***/}


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