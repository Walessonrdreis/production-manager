'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-500">
      {/* Navbar */}
      <nav className="bg-transparent py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">ProductionManager</div>
          <div className="flex gap-4">
            <button className="text-white hover:text-blue-200 transition-colors">
              Login
            </button>
            <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Cadastre-se Grátis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <h1 className="text-5xl font-bold mb-6">
              Simplifique Suas Operações de Produção Industrial
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              ProductionManager é a maneira mais eficiente para gerenciar toda sua produção — tudo em uma única plataforma centralizada e intuitiva.
            </p>
            <button className="bg-white text-indigo-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
              Comece Agora Gratuitamente
            </button>
          </div>

          {/* Right Content - Carousel */}
          <div className="flex-1 w-full max-w-2xl">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="rounded-lg shadow-xl"
            >
              <SwiperSlide>
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                    Gestão Completa de Produção
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Controle total sobre seu processo produtivo, desde o planejamento até a execução.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Planejamento inteligente de produção
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Controle de estoque em tempo real
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Rastreabilidade completa
                    </li>
                  </ul>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                    Otimização de Recursos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Maximize a eficiência de sua produção com nossas ferramentas avançadas.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Redução de desperdícios
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Gestão eficiente de materiais
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Análise de performance
                    </li>
                  </ul>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                    Relatórios e Insights
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Tome decisões baseadas em dados com nossos relatórios detalhados.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Dashboard personalizado
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Indicadores de performance
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                      Previsões e tendências
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-24">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Por que escolher o ProductionManager?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Interface Intuitiva"
              description="Design moderno e fácil de usar, permitindo que sua equipe comece a usar rapidamente."
              icon={<InterfaceIcon className="w-12 h-12 text-indigo-400" />}
            />
            <FeatureCard
              title="Integração Total"
              description="Conecte-se com seus sistemas existentes e centralize todas as informações."
              icon={<IntegrationIcon className="w-12 h-12 text-indigo-400" />}
            />
            <FeatureCard
              title="Suporte 24/7"
              description="Equipe especializada pronta para ajudar você a qualquer momento."
              icon={<SupportIcon className="w-12 h-12 text-indigo-400" />}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>
  );
}

function InterfaceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function IntegrationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function SupportIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
} 