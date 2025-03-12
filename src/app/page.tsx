'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  ListChecks,
  BookOpen,
  ArrowRight,
  Search,
  BarChart3,
  Activity,
} from 'lucide-react';
import { DataStructureGrid } from '@/components/data-structure-grid';
import { RecentStructures } from '@/components/recent-structures';
import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';

// Features do sistema
const features = [
  {
    title: 'Aprendizado Visual',
    description: 'Visualizações animadas de operações em estruturas de dados',
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Exercícios Práticos',
    description: 'Exercícios interativos para aplicar conceitos aprendidos',
    icon: <ListChecks className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Material Teórico',
    description: 'Explicações claras e acessíveis sobre cada estrutura',
    icon: <BookOpen className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Análise de Complexidade',
    description: 'Comparações de eficiência e casos de uso',
    icon: <Clock className="h-10 w-10 text-primary" />,
  },
];

export default function Home() {
  const { dataStructures, progress, setCurrentStructure } = useAppContext();

  // Reseta a estrutura atual ao carregar a página inicial
  useEffect(() => {
    setCurrentStructure('');
  }, [setCurrentStructure]);

  // Calcula estatísticas do progresso
  const completedStructures = Object.values(progress).filter(
    (item) => item.completed,
  ).length;
  const totalStructures = dataStructures.length;
  const progressPercentage =
    totalStructures > 0
      ? Math.round((completedStructures / totalStructures) * 100)
      : 0;

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-primary text-primary-foreground flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="bg-background/20 backdrop-blur-sm border-primary-foreground/10 text-primary-foreground"
                >
                  Plataforma de Aprendizado
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Aprenda Estruturas de Dados de Forma Interativa
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Visualize e compreenda estruturas de dados com exemplos
                  práticos e animações interativas
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/estruturas">
                  <Button size="lg" className="gap-1.5">
                    Começar agora <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {Object.keys(progress).length > 0 && (
                <div className="bg-background/20 border border-primary-foreground/10 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-primary-foreground">
                      Seu progresso
                    </div>
                    <div className="text-sm">
                      {completedStructures} de {totalStructures} estruturas
                    </div>
                  </div>
                  <div className="w-full bg-background/30 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-background h-full rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border bg-background/50 backdrop-blur md:aspect-video lg:aspect-square">
                {/* Aqui mostramos as estruturas de dados mais recentes do contexto */}
                <div className="flex h-full items-center justify-center bg-muted/30">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {dataStructures.slice(0, 4).map((structure, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center rounded-md bg-background p-4 shadow-sm"
                      >
                        <div className="text-3xl mb-2">{structure.icon}</div>
                        <div className="text-sm font-medium text-black">
                          {structure.title}
                        </div>
                        {progress[structure.id]?.completed && (
                          <Badge variant="secondary" className="mt-2">
                            Concluído
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Structures Section - Appears if user has visited structures */}
      {Object.keys(progress).length > 0 && (
        <section className="w-full py-8 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Sua atividade recente</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <RecentStructures />
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Seu progresso</CardTitle>
                  <CardDescription>
                    Continue de onde parou ou explore novas estruturas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Progresso total:</span>
                      <span>{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted h-2.5 rounded-full">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-2xl font-bold text-primary">
                          {completedStructures}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Estruturas concluídas
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-2xl font-bold text-primary">
                          {totalStructures - completedStructures}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Estruturas restantes
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center flex-col">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2"></div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Recursos da Plataforma
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nossa plataforma educacional interativa facilita o aprendizado de
              estruturas de dados para alunos universitários através das
              seguintes funcionalidades:
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12">
          {features.map((feature, i) => (
            <Card key={i} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-4" />

      {/* Data Structures Cards - Using DataStructureGrid component */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline">Aprenda na prática</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Explore as Estruturas de Dados
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Clique em qualquer estrutura para acessar exemplos interativos,
                visualizações e exercícios práticos.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-6xl py-12">
            <DataStructureGrid />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary-foreground/10 px-3 py-1 text-sm">
              Está pronto para começar?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comece sua jornada no aprendizado de Estruturas de Dados
            </h2>
            <p className="max-w-[600px] text-primary-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nossa plataforma está pronta para ajudar você a dominar as
              estruturas de dados fundamentais. Aprenda no seu próprio ritmo com
              exemplos interativos e visualizações claras.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:justify-center">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-green-600 dark:text-green-500" />
                <span>Exemplos interativos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-green-600 dark:text-green-500" />
                <span>Visualizações animadas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-green-600 dark:text-green-500" />
                <span>Exercícios práticos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-green-600 dark:text-green-500" />
                <span>Conteúdo teórico completo</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="gap-1.5 bg-background text-primary hover:bg-background/90"
              >
                Explorar agora <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
