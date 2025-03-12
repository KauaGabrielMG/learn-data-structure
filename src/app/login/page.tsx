'use client';
import { FcGoogle } from 'react-icons/fc';

// Array de estruturas de dados
const dataStructures = [
  {
    id: 'queues',
    title: 'Filas',
    description:
      'Estrutura de dados linear que segue o princípio FIFO (First In, First Out).',
    icon: '📋',
    complexity: 'Básico',
    lessons: 5,
  },
  {
    id: 'stacks',
    title: 'Pilhas',
    description:
      'Estrutura de dados linear que segue o princípio LIFO (Last In, First Out).',
    icon: '📚',
    complexity: 'Básico',
    lessons: 4,
  },
  {
    id: 'lists',
    title: 'Listas',
    description:
      'Estrutura de dados linear que permite armazenar uma coleção de elementos.',
    icon: '📝',
    complexity: 'Básico',
    lessons: 6,
  },
  {
    id: 'trees',
    title: 'Árvores',
    description:
      'Estrutura de dados hierárquica não-linear com relação pai-filho entre nós.',
    icon: '🌳',
    complexity: 'Intermediário',
    lessons: 7,
  },
  {
    id: 'graphs',
    title: 'Grafos',
    description:
      'Estrutura de dados não-linear que consiste em vértices e arestas para conectá-los.',
    icon: '🕸️',
    complexity: 'Avançado',
    lessons: 8,
  },
  {
    id: 'hash-tables',
    title: 'Tabelas Hash',
    description:
      'Estrutura de dados que implementa mapeamento eficiente de chave-valor.',
    icon: '🔑',
    complexity: 'Intermediário',
    lessons: 5,
  },
];

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md shadow-xl rounded-xl bg-white p-8 border border-gray-200">
        <div className="flex flex-col items-center gap-6">
          {/* Logo ou Título */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Estruturas de Dados
            </h1>
            <p className="text-gray-500 text-sm">Faça login para continuar</p>
          </div>

          {/* Imagem ilustrativa opcional */}
          <div>
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/90 rounded-md">
              {dataStructures.slice(0, 4).map((structure, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center rounded-md bg-background p-4 shadow-sm"
                >
                  <div className="text-3xl mb-2">{structure.icon}</div>
                  <div className="text-sm font-medium">{structure.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Login Google */}
          <button
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white hover:bg-gray-50
                      border border-gray-300 rounded-md shadow-sm transition-colors
                      text-gray-700 font-medium text-base"
            onClick={() => console.log('Login com Google')}
          >
            <FcGoogle className="h-5 w-5" />
            Entrar com Google
          </button>

          <p className="text-xs text-gray-400 text-center mt-6">
            Ao entrar, você concorda com os nossos Termos de Serviço e Política
            de Privacidade.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Estruturas de Dados. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
