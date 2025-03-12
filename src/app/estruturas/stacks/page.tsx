import { Metadata } from 'next';
import StackVisualization from '@/components/stack/stack-visualization';
import StackOperations from '@/components/stack/stack-operations';
import StackImplementation from '@/components/stack/stack-implementation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Code, PlayCircle } from 'lucide-react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Pilhas (LIFO) | DataStructure Learn',
  description:
    'Aprenda sobre a estrutura de dados Pilha e o conceito LIFO (Last In, First Out)',
};

export default function StackPage() {
  return (
    <div className="container flex gap-4 mx-auto  w-full">
      <SidebarProvider className="container flex justify-between w-full">
        <AppSidebar className="relative top-4" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="container py-10 px-4 sm:px-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Pilhas (LIFO)
              </h1>
              <p className="text-xl text-muted-foreground">
                Last In, First Out - O último a entrar é o primeiro a sair
              </p>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    O que é uma Pilha?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Uma pilha é uma estrutura de dados linear que segue o
                    princípio LIFO (Last In, First Out), onde o último elemento
                    adicionado à pilha será o primeiro a ser removido. É como
                    uma pilha de pratos: o último prato colocado é o primeiro a
                    ser retirado.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Operações Básicas
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">Push</span>:
                      Adiciona um elemento ao topo da pilha
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Pop</span>:
                      Remove o elemento do topo da pilha
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Peek/Top
                      </span>
                      : Obtém o elemento do topo sem removê-lo
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        isEmpty
                      </span>
                      : Verifica se a pilha está vazia
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Size</span>:
                      Retorna o número de elementos na pilha
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Aplicações Comuns
                  </h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>
                      Verificação de expressões com parênteses balanceados
                    </li>
                    <li>
                      Implementação da funcionalidade &quot;desfazer&quot; em
                      editores de texto
                    </li>
                    <li>Conversão de expressões infixa para posfixa/prefixa</li>
                    <li>Gerenciamento de chamadas de função (call stack)</li>
                    <li>Algoritmo de busca em profundidade (DFS) em grafos</li>
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
                    <TabsTrigger
                      value="practice"
                      className="flex items-center gap-2"
                    >
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
                      <StackVisualization />
                    </div>
                  </TabsContent>
                  <TabsContent value="practice">
                    <div className="border rounded-lg p-6">
                      <StackOperations />
                    </div>
                  </TabsContent>
                  <TabsContent value="implementation">
                    <div className="border rounded-lg p-6">
                      <StackImplementation />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <div className="border rounded-lg p-6 bg-muted/50">
                  <h3 className="font-semibold mb-4">Complexidade de Tempo</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Push:</span>
                      <span className="font-mono">O(1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pop:</span>
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
                      <span>Acesso limitado (apenas ao topo)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
