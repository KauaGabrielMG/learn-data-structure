'use client';

import StackOperations from '@/components/stack/stack-operations';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ExemploStackOperationsPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/estruturas">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Estruturas
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Operações de Pilha Interativas</h1>
      </div>

      <p className="text-lg text-muted-foreground mb-8">
        Esta página demonstra o uso do componente StackOperations para
        visualizar e interagir com pilhas.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">O que são pilhas?</h2>
          <p className="mb-2">
            Pilhas são estruturas de dados que seguem o princípio LIFO (Last In,
            First Out), onde o último elemento adicionado é o primeiro a ser
            removido.
          </p>
          <p>
            As operações principais de uma pilha são push (adicionar), pop
            (remover), peek (visualizar o topo), isEmpty (verificar se está
            vazia) e size (tamanho).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Por que são importantes?
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Utilizadas em algoritmos de busca em profundidade</li>
            <li>Implementação de função &quot;desfazer&quot; em editores</li>
            <li>Avaliação de expressões matemáticas</li>
            <li>Validação de sintaxe (como parênteses equilibrados)</li>
          </ul>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="border p-6 rounded-md bg-card shadow-sm">
        <StackOperations />
      </div>
    </div>
  );
}
