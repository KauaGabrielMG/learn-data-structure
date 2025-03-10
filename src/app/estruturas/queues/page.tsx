import { Metadata } from 'next';
import QueueVisualization from '@/components/queue/queue-visualization';
import QueueOperations from '@/components/queue/queue-operations';
import QueueImplementation from '@/components/queue/queue-implementation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Code, PlayCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Filas (FIFO) | DataStructure Learn',
  description:
    'Aprenda sobre a estrutura de dados Fila e o conceito FIFO (First In, First Out)',
};

export default function QueuePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Filas (FIFO)</h1>
        <p className="text-xl text-muted-foreground">
          First In, First Out - O primeiro a entrar é o primeiro a sair
        </p>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">O que é uma Fila?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Uma fila é uma estrutura de dados linear que segue o princípio
              FIFO (First In, First Out), onde o primeiro elemento adicionado à
              fila será o primeiro a ser removido. É como uma fila de pessoas em
              um caixa de banco: a primeira pessoa a entrar na fila será a
              primeira a ser atendida.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Operações Básicas</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Enqueue</span>:
                Adiciona um elemento ao final da fila
              </li>
              <li>
                <span className="font-medium text-foreground">Dequeue</span>:
                Remove o elemento do início da fila
              </li>
              <li>
                <span className="font-medium text-foreground">Peek/Front</span>:
                Obtém o elemento do início da fila sem removê-lo
              </li>
              <li>
                <span className="font-medium text-foreground">isEmpty</span>:
                Verifica se a fila está vazia
              </li>
              <li>
                <span className="font-medium text-foreground">Size</span>:
                Retorna o número de elementos na fila
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Aplicações Comuns</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Gerenciamento de tarefas em sistemas operacionais</li>
              <li>Implementação de buffers em transferências de dados</li>
              <li>
                Simulações de filas reais (atendimento bancário, call center)
              </li>
              <li>Algoritmo de busca em largura (BFS) em grafos</li>
              <li>Gerenciamento de impressão</li>
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
                <QueueVisualization />
              </div>
            </TabsContent>
            <TabsContent value="practice">
              <div className="border rounded-lg p-6">
                <QueueOperations />
              </div>
            </TabsContent>
            <TabsContent value="implementation">
              <div className="border rounded-lg p-6">
                <QueueImplementation />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-muted/50">
            <h3 className="font-semibold mb-4">Complexidade de Tempo</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Enqueue:</span>
                <span className="font-mono">O(1)</span>
              </div>
              <div className="flex justify-between">
                <span>Dequeue:</span>
                <span className="font-mono">O(1)</span>
              </div>
              <div className="flex justify-between">
                <span>Peek:</span>
                <span className="font-mono">O(1)</span>
              </div>
              <div className="flex justify-between">
                <span>isEmpty:</span>
                <span className="font-mono">O(1)</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span className="font-mono">O(1)</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Comparações</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Fácil de implementar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Operações eficientes (O(1))</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Tamanho fixo (em arrays)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Acesso limitado (apenas frontal)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
