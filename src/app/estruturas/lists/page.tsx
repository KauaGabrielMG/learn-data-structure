import { Metadata } from 'next';
import ListVisualization from '@/components/list/list-visualization';
import ListOperations from '@/components/list/list-operations';
import ListImplementation from '@/components/list/list-implementation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Code, PlayCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Listas | DataStructure Learn',
  description:
    'Aprenda sobre a estrutura de dados Lista e como ela pode armazenar e manipular coleções de elementos',
};

export default function ListPage() {
  return (
    <div className="container py-10 mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Listas</h1>
        <p className="text-xl text-muted-foreground">
          Estrutura de dados para armazenar e manipular coleções de elementos
        </p>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">O que é uma Lista?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Uma lista é uma estrutura de dados linear que armazena uma coleção
              ordenada de elementos. Diferente de arrays com tamanho fixo, as
              listas podem crescer dinamicamente e permitem inserções e remoções
              em qualquer posição. Tipos comuns incluem listas simplesmente
              encadeadas, duplamente encadeadas e listas circulares.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Operações Básicas</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">add/append</span>:
                Adiciona um elemento ao final da lista
              </li>
              <li>
                <span className="font-medium text-foreground">insert</span>:
                Insere um elemento em uma posição específica
              </li>
              <li>
                <span className="font-medium text-foreground">remove</span>:
                Remove um elemento de uma posição específica
              </li>
              <li>
                <span className="font-medium text-foreground">get</span>: Obtém
                o elemento em uma posição específica
              </li>
              <li>
                <span className="font-medium text-foreground">indexOf</span>:
                Encontra a posição da primeira ocorrência de um elemento
              </li>
              <li>
                <span className="font-medium text-foreground">size</span>:
                Retorna o número de elementos na lista
              </li>
              <li>
                <span className="font-medium text-foreground">isEmpty</span>:
                Verifica se a lista está vazia
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Aplicações Comuns</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                Implementação de outras estruturas de dados (pilhas, filas)
              </li>
              <li>Gerenciamento de memória em sistemas operacionais</li>
              <li>Histórico de navegação em navegadores web</li>
              <li>Representação de grafos (listas de adjacências)</li>
              <li>Implementação de polinômios e números grandes</li>
              <li>Editor de texto (para gerenciar linhas de texto)</li>
            </ul>
          </div>

          <Tabs defaultValue="visualization" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger
                value="visualization"
                className="flex items-center gap-2"
              >
                <PlayCircle className="h-4 w-4" /> Visualização
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Prática
              </TabsTrigger>
              <TabsTrigger
                value="implementation"
                className="flex items-center gap-2"
              >
                <Code className="h-4 w-4" /> Implementação
              </TabsTrigger>
            </TabsList>
            <TabsContent value="visualization">
              <div className="border rounded-lg p-6">
                <ListVisualization />
              </div>
            </TabsContent>
            <TabsContent value="practice">
              <div className="border rounded-lg p-6">
                <ListOperations />
              </div>
            </TabsContent>
            <TabsContent value="implementation">
              <div className="border rounded-lg p-6">
                <ListImplementation />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-muted/50">
            <h3 className="font-semibold mb-4">Complexidade de Tempo</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Acesso por índice:</span>
                <span className="font-mono">O(n)*</span>
              </div>
              <div className="flex justify-between">
                <span>Inserção no início:</span>
                <span className="font-mono">O(1)**</span>
              </div>
              <div className="flex justify-between">
                <span>Inserção no fim:</span>
                <span className="font-mono">O(1)***</span>
              </div>
              <div className="flex justify-between">
                <span>Inserção no meio:</span>
                <span className="font-mono">O(n)**</span>
              </div>
              <div className="flex justify-between">
                <span>Remoção no início:</span>
                <span className="font-mono">O(1)**</span>
              </div>
              <div className="flex justify-between">
                <span>Busca:</span>
                <span className="font-mono">O(n)</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              <p>
                * Em uma lista encadeada simples, o acesso por índice exige
                percorrer a lista
              </p>
              <p>** Para listas simplesmente encadeadas</p>
              <p>*** Com referência para o final da lista</p>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Tipos de Listas</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-medium">Lista Simplesmente Encadeada</h4>
                <p className="text-sm text-muted-foreground">
                  Cada nó contém o dado e uma referência para o próximo nó
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Lista Duplamente Encadeada</h4>
                <p className="text-sm text-muted-foreground">
                  Cada nó contém o dado e referências para os nós anterior e
                  próximo
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Lista Circular</h4>
                <p className="text-sm text-muted-foreground">
                  O último nó aponta para o primeiro, formando um círculo
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Comparações</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Tamanho dinâmico</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Inserção/remoção eficiente no início</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Acesso por índice mais lento que arrays</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Maior consumo de memória</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
