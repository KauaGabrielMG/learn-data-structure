'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

export default function QueueImplementation() {
  const [activeTab, setActiveTab] = useState('array');
  const [copiedImplementation, setCopiedImplementation] = useState<
    string | null
  >(null);

  const arrayImplementation = `class Queue<T> {
  private items: T[] = [];

  // Adiciona um elemento ao final da fila
  enqueue(element: T): void {
    this.items.push(element);
  }

  // Remove e retorna o elemento do início da fila
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  // Retorna o elemento do início da fila sem removê-lo
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  // Verifica se a fila está vazia
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Retorna o tamanho da fila
  size(): number {
    return this.items.length;
  }

  // Limpa a fila
  clear(): void {
    this.items = [];
  }
}

// Exemplo de uso:
const queue = new Queue<string>();
queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");

console.log(queue.front());  // "A"
console.log(queue.dequeue());  // "A"
console.log(queue.size());  // 2`;

  const linkedListImplementation = `class QueueNode<T> {
  value: T;
  next: QueueNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedQueue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;
  private count: number = 0;

  // Adiciona um elemento ao final da fila
  enqueue(element: T): void {
    const newNode = new QueueNode(element);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }

    this.count++;
  }

  // Remove e retorna o elemento do início da fila
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.head!.value;
    this.head = this.head!.next;

    if (!this.head) {
      this.tail = null;
    }

    this.count--;
    return value;
  }

  // Retorna o elemento do início da fila sem removê-lo
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.head!.value;
  }

  // Verifica se a fila está vazia
  isEmpty(): boolean {
    return this.head === null;
  }

  // Retorna o tamanho da fila
  size(): number {
    return this.count;
  }

  // Limpa a fila
  clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
}

// Exemplo de uso:
const linkedQueue = new LinkedQueue<number>();
linkedQueue.enqueue(1);
linkedQueue.enqueue(2);
linkedQueue.enqueue(3);

console.log(linkedQueue.front());  // 1
console.log(linkedQueue.dequeue());  // 1
console.log(linkedQueue.size());  // 2`;

  const circularQueueImplementation = `class CircularQueue<T> {
  private capacity: number;
  private items: (T | undefined)[];
  private front: number = 0;
  private rear: number = -1;
  private currentSize: number = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.items = new Array(capacity);
  }

  // Adiciona um elemento ao final da fila circular
  enqueue(element: T): boolean {
    if (this.isFull()) {
      return false;
    }

    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = element;
    this.currentSize++;
    return true;
  }

  // Remove e retorna o elemento do início da fila circular
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.items[this.front];
    this.items[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.currentSize--;
    return item;
  }

  // Retorna o elemento do início da fila sem removê-lo
  front(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.front];
  }

  // Verifica se a fila está vazia
  isEmpty(): boolean {
    return this.currentSize === 0;
  }

  // Verifica se a fila está cheia
  isFull(): boolean {
    return this.currentSize === this.capacity;
  }

  // Retorna o tamanho da fila
  size(): number {
    return this.currentSize;
  }

  // Limpa a fila
  clear(): void {
    this.items = new Array(this.capacity);
    this.front = 0;
    this.rear = -1;
    this.currentSize = 0;
  }
}

// Exemplo de uso:
const circularQueue = new CircularQueue<string>(5);
circularQueue.enqueue("A");
circularQueue.enqueue("B");
circularQueue.enqueue("C");

console.log(circularQueue.front());  // "A"
console.log(circularQueue.dequeue());  // "A"
console.log(circularQueue.size());  // 2`;

  const copyToClipboard = (implementation: string, type: string) => {
    navigator.clipboard.writeText(implementation);
    setCopiedImplementation(type);

    toast.success('Código copiado para a área de transferência!', {
      description: `Implementação de fila usando ${type} copiada com sucesso.`,
      duration: 3000,
    });

    setTimeout(() => {
      setCopiedImplementation(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Implementação de Fila</h3>
      <p className="text-sm text-muted-foreground">
        Existem diferentes maneiras de implementar uma fila em
        TypeScript/JavaScript. Abaixo você encontrará implementações usando
        array, lista encadeada e fila circular.
      </p>

      <Tabs defaultValue="array" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="array">Usando Array</TabsTrigger>
          <TabsTrigger value="linked">Usando Lista Encadeada</TabsTrigger>
          <TabsTrigger value="circular">Fila Circular</TabsTrigger>
        </TabsList>

        <TabsContent value="array" className="mt-4">
          <div className="bg-muted rounded-lg">
            <div className="flex justify-between items-center p-2 bg-muted/70 border-b">
              <span className="text-xs font-medium">Queue.ts</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(arrayImplementation, 'array')}
              >
                {copiedImplementation === 'array' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <pre className="font-mono text-sm p-4 overflow-auto">
              <code>{arrayImplementation}</code>
            </pre>
            <div className="p-3 bg-muted/70 border-t text-sm text-muted-foreground">
              <p>
                <strong>Observação:</strong> A implementação usando arrays é
                simples, mas tem uma desvantagem: a operação{' '}
                <code>shift()</code> tem complexidade O(n), pois todos os
                elementos do array precisam ser realocados após a remoção do
                primeiro elemento.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="linked" className="mt-4">
          <div className="bg-muted rounded-lg">
            <div className="flex justify-between items-center p-2 bg-muted/70 border-b">
              <span className="text-xs font-medium">LinkedQueue.ts</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(linkedListImplementation, 'linked')
                }
              >
                {copiedImplementation === 'linked' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <pre className="font-mono text-sm p-4 overflow-auto">
              <code>{linkedListImplementation}</code>
            </pre>
            <div className="p-3 bg-muted/70 border-t text-sm text-muted-foreground">
              <p>
                <strong>Vantagens:</strong> A implementação usando lista
                encadeada oferece operações de enqueue e dequeue com
                complexidade O(1) e não tem limitação de tamanho. Cada nó mantém
                uma referência para o próximo nó na fila.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="circular" className="mt-4">
          <div className="bg-muted rounded-lg">
            <div className="flex justify-between items-center p-2 bg-muted/70 border-b">
              <span className="text-xs font-medium">CircularQueue.ts</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(circularQueueImplementation, 'circular')
                }
              >
                {copiedImplementation === 'circular' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <pre className="font-mono text-sm p-4 overflow-auto">
              <code>{circularQueueImplementation}</code>
            </pre>
            <div className="p-3 bg-muted/70 border-t text-sm text-muted-foreground">
              <p>
                <strong>Observação:</strong> A fila circular tem um tamanho
                fixo, mas utiliza o espaço de maneira mais eficiente. Quando
                chegamos ao final do array, voltamos ao início (comportamento
                circular), reutilizando posições que foram liberadas após
                operações de dequeue.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
