import { Metadata } from 'next';
import StackVisualization from '@/components/stack/stack-visualization';
import StackOperations from '@/components/stack/stack-operations';
import StackImplementation from '@/components/stack/stack-implementation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Code, Home, Layers, PlayCircle } from 'lucide-react';
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
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Pilhas (LIFO) | DataStructure Learn',
  description:
    'Aprenda sobre a estrutura de dados Pilha e o conceito LIFO (Last In, First Out)',
};

export default function StackPage() {
  return (
    <div className="container flex gap-4 mx-auto w-full">
      <SidebarProvider className="container flex justify-between w-full">
        <AppSidebar className="relative" />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="flex items-center gap-1"
                    >
                      <Home className="h-3.5 w-3.5" />
                      <span>Início</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/estruturas">
                      Estruturas de Dados
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5" />
                      <span>Pilhas (LIFO)</span>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Botão para alternar tema */}
            <ThemeToggle />
          </header>

          {/* Adicionando navegação rápida para tópicos sobre pilhas */}
          <div className="bg-muted/30 px-4 py-2 border-b">
            <nav className="flex gap-4 overflow-auto text-sm">
              <Link
                href="#conceitos"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Conceitos
              </Link>
              <Link
                href="#operacoes"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Operações Básicas
              </Link>
              <Link
                href="#aplicacoes"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Aplicações
              </Link>
              <Link
                href="#pratica"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Visualização e Prática
              </Link>
            </nav>
          </div>

          <div className="container py-10 px-4 sm:px-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
                <Layers className="h-8 w-8" />
                Pilhas (LIFO)
              </h1>
              <p className="text-xl text-muted-foreground">
                Last In, First Out - O último a entrar é o primeiro a sair
              </p>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div id="conceitos">
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

                <div id="operacoes">
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

                <div id="aplicacoes">
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

                <div id="pratica">
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
              </div>

              {/* Sidebar lateral com links rápidos */}
              <div className="space-y-6">
                {/* Sumário de navegação */}
                <div className="border rounded-lg p-6 bg-background sticky top-6">
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                    Nesta página
                  </h3>
                  <nav className="space-y-2">
                    <Link
                      href="#conceitos"
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      O que é uma Pilha?
                    </Link>
                    <Link
                      href="#operacoes"
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      Operações Básicas
                    </Link>
                    <Link
                      href="#aplicacoes"
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      Aplicações Comuns
                    </Link>
                    <Link
                      href="#pratica"
                      className="block text-sm hover:text-primary transition-colors"
                    >
                      Visualização e Prática
                    </Link>
                  </nav>

                  <Separator className="my-4" />

                  <h4 className="font-medium text-sm mb-2">
                    Estruturas Relacionadas:
                  </h4>
                  <div className="space-y-1.5">
                    <Link
                      href="/estruturas/queues"
                      className="block text-xs text-muted-foreground hover:text-primary"
                    >
                      • Filas (FIFO)
                    </Link>
                    <Link
                      href="/estruturas/listas-ligadas"
                      className="block text-xs text-muted-foreground hover:text-primary"
                    >
                      • Listas Ligadas
                    </Link>
                    <Link
                      href="/estruturas/arrays"
                      className="block text-xs text-muted-foreground hover:text-primary"
                    >
                      • Arrays e Vetores
                    </Link>
                  </div>
                </div>

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
