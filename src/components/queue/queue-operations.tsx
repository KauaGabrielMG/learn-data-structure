'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { CheckIcon, XIcon } from 'lucide-react';

type OperationType = 'enqueue' | 'dequeue' | 'front' | 'isEmpty' | 'size';

interface Challenge {
  id: number;
  description: string;
  type: OperationType;
  input?: string;
  expectedOutput?: string | boolean | number;
  completed: boolean;
}

export default function QueueOperations() {
  const [queue, setQueue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [operationType, setOperationType] = useState<OperationType>('enqueue');
  const [result, setResult] = useState<string | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      description: "Adicione os elementos 'A', 'B' e 'C' à fila (nesta ordem).",
      type: 'enqueue',
      completed: false,
    },
    {
      id: 2,
      description: 'Remova o elemento do início da fila.',
      type: 'dequeue',
      expectedOutput: 'A',
      completed: false,
    },
    {
      id: 3,
      description: 'Verifique qual elemento está no início da fila agora.',
      type: 'front',
      expectedOutput: 'B',
      completed: false,
    },
    {
      id: 4,
      description: "Adicione os elementos 'D' e 'E' à fila.",
      type: 'enqueue',
      completed: false,
    },
    {
      id: 5,
      description: 'Verifique quantos elementos a fila possui atualmente.',
      type: 'size',
      expectedOutput: 4,
      completed: false,
    },
    {
      id: 6,
      description:
        'Remova todos os elementos da fila e verifique se está vazia.',
      type: 'isEmpty',
      expectedOutput: true,
      completed: false,
    },
  ]);

  const executeOperation = () => {
    let operationResult: string | number | boolean = '';

    switch (operationType) {
      case 'enqueue':
        if (!inputValue.trim()) {
          toast.error('Entrada inválida', {
            description: 'Digite um valor para adicionar à fila.',
          });
          return;
        }
        setQueue([...queue, inputValue]);
        operationResult = `Elemento "${inputValue}" adicionado ao final da fila`;
        setInputValue('');
        break;

      case 'dequeue':
        if (queue.length === 0) {
          toast.error('Fila vazia', {
            description: 'Não é possível remover elementos de uma fila vazia.',
          });
          return;
        }
        const removed = queue[0];
        setQueue(queue.slice(1));
        operationResult = `Elemento "${removed}" removido do início da fila`;
        break;

      case 'front':
        if (queue.length === 0) {
          operationResult = 'A fila está vazia';
        } else {
          operationResult = `O elemento do início da fila é "${queue[0]}"`;
        }
        break;

      case 'isEmpty':
        operationResult =
          queue.length === 0
            ? 'Verdadeiro (fila vazia)'
            : 'Falso (fila não está vazia)';
        break;

      case 'size':
        operationResult = `A fila contém ${queue.length} elemento(s)`;
        break;
    }

    setResult(String(operationResult));

    // Verificar se algum desafio foi concluído
    checkChallengeCompletion(operationType, inputValue);
  };

  const checkChallengeCompletion = (type: OperationType, value: string) => {
    setChallenges(
      challenges.map((challenge) => {
        if (challenge.completed) return challenge;

        if (type === 'enqueue' && challenge.type === type) {
          if (challenge.id === 1) {
            // Verificar se A, B e C foram adicionados
            if (
              queue.length >= 2 &&
              value === 'C' &&
              queue.includes('A') &&
              queue.includes('B')
            ) {
              return { ...challenge, completed: true };
            }
          } else if (challenge.id === 4) {
            // Verificar se D e E foram adicionados
            if (
              queue.length >= 1 &&
              ((value === 'D' && queue.some((item) => item === 'E')) ||
                (value === 'E' && queue.some((item) => item === 'D')))
            ) {
              return { ...challenge, completed: true };
            }
          }
        } else if (
          type === 'dequeue' &&
          challenge.id === 2 &&
          challenge.type === type
        ) {
          if (queue.length > 0 && queue[0] === 'A') {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'front' &&
          challenge.id === 3 &&
          challenge.type === type
        ) {
          if (queue.length > 0 && queue[0] === 'B') {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'size' &&
          challenge.id === 5 &&
          challenge.type === type
        ) {
          if (queue.length === 4) {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'isEmpty' &&
          challenge.id === 6 &&
          challenge.type === type
        ) {
          if (queue.length === 0) {
            return { ...challenge, completed: true };
          }
        }

        return challenge;
      }),
    );
  };

  const resetChallenges = () => {
    setQueue([]);
    setInputValue('');
    setResult(null);
    setChallenges(
      challenges.map((challenge) => ({ ...challenge, completed: false })),
    );
    toast.success('Desafios reiniciados', {
      description: 'Todos os desafios foram resetados.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">
          Pratique as operações de Fila
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Utilize os controles abaixo para praticar as operações básicas de uma
          fila e complete os desafios.
        </p>
      </div>

      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <div className="font-medium">Fila atual:</div>
            <div className="flex-1 p-2 bg-background rounded border min-h-[2.5rem] flex items-center">
              {queue.length > 0 ? (
                <div className="flex gap-2">
                  {queue.map((item, index) => (
                    <div
                      key={index}
                      className="px-2 py-1 bg-muted rounded text-sm"
                    >
                      {item}
                      {index === 0
                        ? ' (início)'
                        : index === queue.length - 1
                        ? ' (final)'
                        : ''}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Fila vazia
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
            <div className="flex gap-2">
              <Select
                value={operationType}
                onValueChange={(value) =>
                  setOperationType(value as OperationType)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione a operação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enqueue">Enqueue</SelectItem>
                  <SelectItem value="dequeue">Dequeue</SelectItem>
                  <SelectItem value="front">Front/Peek</SelectItem>
                  <SelectItem value="isEmpty">isEmpty</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>

              {operationType === 'enqueue' && (
                <Input
                  placeholder="Digite um valor..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
              )}
            </div>
            <Button onClick={executeOperation}>Executar</Button>
          </div>

          {result && (
            <div className="p-3 bg-muted rounded text-sm">
              <div className="font-medium">Resultado:</div>
              <div>{result}</div>
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/20">
          <h3 className="font-medium">Desafios</h3>
        </div>
        <div className="divide-y">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-4 flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  challenge.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {challenge.completed ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  challenge.id
                )}
              </div>
              <div className="flex-1">
                <p
                  className={
                    challenge.completed
                      ? 'text-muted-foreground line-through'
                      : ''
                  }
                >
                  {challenge.description}
                </p>
              </div>
              <div>
                {challenge.completed ? (
                  <div className="flex items-center text-green-600 gap-1">
                    <CheckIcon className="h-4 w-4" />
                    <span className="text-xs">Concluído</span>
                  </div>
                ) : (
                  <div className="flex items-center text-muted-foreground gap-1">
                    <XIcon className="h-4 w-4" />
                    <span className="text-xs">Pendente</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-muted/20 flex justify-end">
          <Button variant="outline" size="sm" onClick={resetChallenges}>
            Reiniciar Desafios
          </Button>
        </div>
      </div>
    </div>
  );
}
