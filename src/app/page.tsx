import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Array de estruturas de dados
const dataStructures = [
  {
    id: 'queues',
    title: 'Filas',
    description:
      'Estrutura de dados linear que segue o princípio FIFO (First In, First Out).',
    icon: '📋',
  },
  {
    id: 'stacks',
    title: 'Pilhas',
    description:
      'Estrutura de dados linear que segue o princípio LIFO (Last In, First Out).',
    icon: '📚',
  },
  {
    id: 'lists',
    title: 'Listas',
    description:
      'Estrutura de dados linear que permite armazenar uma coleção de elementos.',
    icon: '📝',
  },
  {
    id: 'trees',
    title: 'Árvores',
    description:
      'Estrutura de dados hierárquica não-linear com relação pai-filho entre nós.',
    icon: '🌳',
  },
  {
    id: 'graphs',
    title: 'Grafos',
    description:
      'Estrutura de dados não-linear que consiste em vértices e arestas para conectá-los.',
    icon: '🕸️',
  },
  {
    id: 'hash-tables',
    title: 'Tabelas Hash',
    description:
      'Estrutura de dados que implementa mapeamento eficiente de chave-valor.',
    icon: '🔑',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Aprenda Estruturas de Dados
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Plataforma interativa para facilitar o aprendizado de estruturas de
            dados através de exemplos práticos e visualizações.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Sobre a plataforma</h2>
          <p className="text-lg mb-8">
            Nosso sistema educacional interativo tem como objetivo facilitar o
            aprendizado de estruturas de dados para alunos universitários.
            Oferecemos uma plataforma amigável e intuitiva que permite
            visualizar o funcionamento das principais estruturas de dados,
            acompanhar seu comportamento em tempo real e praticar com exemplos
            interativos.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto text-center mb-12">
            <div className="p-4">
              <div className="text-4xl mb-2">🎓</div>
              <div className="font-medium">Aprendizado interativo</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">🔍</div>
              <div className="font-medium">Exemplos práticos</div>
            </div>
            <div className="p-4">
              <div className="text-4xl mb-2">💡</div>
              <div className="font-medium">Visualizações</div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Structures Cards */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Estruturas de Dados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataStructures.map((structure) => (
              <Card
                key={structure.id}
                className="group overflow-hidden hover:border-primary transition-colors"
              >
                <CardHeader>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {structure.icon}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {structure.title}
                  </CardTitle>
                  <CardDescription>{structure.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Aprenda como funciona, suas operações básicas e visualize
                    exemplos práticos.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/estruturas/${structure.id}`} className="w-full">
                    <Button className="w-full" variant="outline">
                      Explorar {structure.title}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Comece sua jornada agora</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Escolha uma estrutura de dados para iniciar o aprendizado com
            exemplos interativos e visualizações claras.
          </p>
          <Button size="lg" className="mx-auto">
            Ver todas as estruturas
          </Button>
        </div>
      </section>
    </main>
  );
}
