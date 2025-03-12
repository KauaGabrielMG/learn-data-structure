import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Array de estruturas de dados (usando o mesmo do DataStructureSidebar)
const dataStructures = [
  {
    id: 'queues',
    title: 'Filas',
    description:
      'Estrutura de dados linear que segue o princípio FIFO (First In, First Out).',
    icon: '📋',
    complexity: 'Básico',
    lessons: 5,
    topics: [
      'Conceitos',
      'Visualização',
      'Operações',
      'Implementação',
      'Exercícios',
    ],
  },
  {
    id: 'stacks',
    title: 'Pilhas',
    description:
      'Estrutura de dados linear que segue o princípio LIFO (Last In, First Out).',
    icon: '📚',
    complexity: 'Básico',
    lessons: 4,
    topics: [
      'Conceitos',
      'Visualização',
      'Operações',
      'Implementação',
      'Exercícios',
    ],
  },
  {
    id: 'lists',
    title: 'Listas',
    description:
      'Estrutura de dados linear que permite armazenar uma coleção de elementos.',
    icon: '📝',
    complexity: 'Básico',
    lessons: 6,
    topics: [
      'Conceitos',
      'Visualização',
      'Operações',
      'Implementação',
      'Exercícios',
    ],
  },
  {
    id: 'trees',
    title: 'Árvores',
    description:
      'Estrutura de dados hierárquica não-linear com relação pai-filho entre nós.',
    icon: '🌳',
    complexity: 'Intermediário',
    lessons: 7,
    topics: [
      'Conceitos',
      'Visualização',
      'Operações',
      'Implementação',
      'Exercícios',
    ],
  },
  {
    id: 'graphs',
    title: 'Grafos',
    description:
      'Estrutura de dados não-linear que consiste em vértices e arestas para conectá-los.',
    icon: '🕸️',
    complexity: 'Avançado',
    lessons: 8,
    topics: [
      'Conceitos',
      'Visualização',
      'Operações',
      'Implementação',
      'Exercícios',
    ],
  },
  {
    id: 'hash-tables',
    title: 'Tabelas Hash',
    description:
      'Estrutura de dados que implementa mapeamento eficiente de chave-valor.',
    icon: '🔑',
    complexity: 'Intermediário',
    lessons: 5,
    topics: [
      'Conceitos',
      'Visualização',
      'Operações',
      'Implementação',
      'Exercícios',
    ],
  },
];

interface PageProps {
  params: {
    structure: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const structure = dataStructures.find((s) => s.id === params.structure);

  if (!structure) {
    return {
      title: 'Estrutura de dados não encontrada',
    };
  }

  return {
    title: `${structure.title} | Estruturas de Dados`,
    description: structure.description,
  };
}

export default function StructurePage({ params }: PageProps) {
  const structure = dataStructures.find((s) => s.id === params.structure);

  if (!structure) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
          <span className="mr-2 text-2xl">{structure.icon}</span>
          <span>{structure.complexity}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {structure.title}
        </h1>
        <p className="text-lg text-muted-foreground">{structure.description}</p>
      </div>

      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">O que você aprenderá</h2>
          <ul className="list-disc pl-5 space-y-2">
            {structure.topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
