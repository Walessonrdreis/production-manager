export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Sistema de Gerenciamento de Produção
        </h1>
        
        <p className="text-center mb-4">
          Bem-vindo ao sistema completo para gerenciamento de produção industrial
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Gestão de Produtos</h2>
            <p>Controle seu catálogo de produtos e matérias-primas</p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Ordens de Produção</h2>
            <p>Gerencie e acompanhe suas ordens de produção</p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Controle de Estoque</h2>
            <p>Monitore seus níveis de estoque em tempo real</p>
          </div>
        </div>
      </div>
    </main>
  );
} 