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

type OperationType = 'push' | 'pop' | 'peek' | 'isEmpty' | 'size';

interface Challenge {
  id: number;
  description: string;
  type: OperationType;
  input?: string;
  expectedOutput?: string | boolean | number;
  completed: boolean;
}

export default function StackOperations() {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [operationType, setOperationType] = useState<OperationType>('push');
  const [result, setResult] = useState<string | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      description:
        "Adicione os elementos 'X', 'Y' e 'Z' à pilha (nesta ordem).",
      type: 'push',
      completed: false,
    },
    {
      id: 2,
      description: 'Remova o elemento do topo da pilha.',
      type: 'pop',
      expectedOutput: 'Z',
      completed: false,
    },
    {
      id: 3,
      description: 'Verifique qual elemento está no topo da pilha agora.',
      type: 'peek',
      expectedOutput: 'Y',
      completed: false,
    },
    {
      id: 4,
      description: "Adicione os elementos 'W' e 'V' à pilha.",
      type: 'push',
      completed: false,
    },
    {
      id: 5,
      description: 'Verifique quantos elementos a pilha possui atualmente.',
      type: 'size',
      expectedOutput: 4,
      completed: false,
    },
    {
      id: 6,
      description:
        'Esvazie a pilha usando pop e depois verifique se está vazia.',
      type: 'isEmpty',
      expectedOutput: true,
      completed: false,
    },
  ]);

  const executeOperation = () => {
    let operationResult: string | number | boolean = '';

    switch (operationType) {
      case 'push':
        if (!inputValue.trim()) {
          toast.error('Entrada inválida', {
            description: 'Digite um valor para adicionar à pilha.',
          });
          return;
        }
        setStack([...stack, inputValue]);
        operationResult = `Elemento "${inputValue}" adicionado ao topo da pilha`;
        setInputValue('');
        break;

      case 'pop':
        if (stack.length === 0) {
          toast.error('Pilha vazia', {
            description: 'Não é possível remover elementos de uma pilha vazia.',
          });
          return;
        }
        const removed = stack[stack.length - 1];
        setStack(stack.slice(0, -1));
        operationResult = `Elemento "${removed}" removido do topo da pilha`;
        break;

      case 'peek':
        if (stack.length === 0) {
          operationResult = 'A pilha está vazia';
        } else {
          operationResult = `O elemento do topo da pilha é "${
            stack[stack.length - 1]
          }"`;
        }
        break;

      case 'isEmpty':
        operationResult =
          stack.length === 0
            ? 'Verdadeiro (pilha vazia)'
            : 'Falso (pilha não está vazia)';
        break;

      case 'size':
        operationResult = `A pilha contém ${stack.length} elemento(s)`;
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

        if (type === 'push' && challenge.type === type) {
          if (challenge.id === 1) {
            // Verificar se X, Y e Z foram adicionados
            if (
              stack.length >= 2 &&
              value === 'Z' &&
              stack.includes('X') &&
              stack.includes('Y')
            ) {
              return { ...challenge, completed: true };
            }
          } else if (challenge.id === 4) {
            // Verificar se W e V foram adicionados
            if (
              stack.length >= 1 &&
              ((value === 'W' && stack.some((item) => item === 'V')) ||
                (value === 'V' && stack.some((item) => item === 'W')))
            ) {
              return { ...challenge, completed: true };
            }
          }
        } else if (
          type === 'pop' &&
          challenge.id === 2 &&
          challenge.type === type
        ) {
          if (stack.length > 0 && stack[stack.length - 1] === 'Z') {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'peek' &&
          challenge.id === 3 &&
          challenge.type === type
        ) {
          if (stack.length > 0 && stack[stack.length - 1] === 'Y') {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'size' &&
          challenge.id === 5 &&
          challenge.type === type
        ) {
          if (stack.length === 4) {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'isEmpty' &&
          challenge.id === 6 &&
          challenge.type === type
        ) {
          if (stack.length === 0) {
            return { ...challenge, completed: true };
          }
        }

        return challenge;
      }),
    );
  };

  const resetChallenges = () => {
    setStack([]);
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
          Pratique as operações de Pilha
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Utilize os controles abaixo para praticar as operações básicas de uma
          pilha e complete os desafios.
        </p>
      </div>

      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start gap-2">
            <div className="font-medium mt-1">Pilha atual:</div>
            <div className="flex-1 p-2 bg-background rounded border min-h-[2.5rem]">
              {stack.length > 0 ? (
                <div className="flex flex-col space-y-2">
                  {[...stack].reverse().map((item, reverseIndex) => {
                    const actualIndex = stack.length - 1 - reverseIndex;
                    return (
                      <div
                        key={actualIndex}
                        className="px-2 py-1 bg-muted rounded text-sm flex justify-between"
                      >
                        <span>{item}</span>
                        <span className="text-muted-foreground">
                          {actualIndex === stack.length - 1 ? '(topo)' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Pilha vazia
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
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="peek">Peek/Top</SelectItem>
                  <SelectItem value="isEmpty">isEmpty</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>

              {operationType === 'push' && (
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
