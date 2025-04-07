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

type OperationType =
  | 'add'
  | 'insert'
  | 'remove'
  | 'get'
  | 'indexOf'
  | 'size'
  | 'isEmpty';

interface Challenge {
  id: number;
  description: string;
  type: OperationType;
  input?: string;
  expectedOutput?: string | boolean | number;
  completed: boolean;
}

export default function ListOperations() {
  const [list, setList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [operationType, setOperationType] = useState<OperationType>('add');
  const [result, setResult] = useState<string | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      description: "Adicione os elementos 'A', 'B' e 'C' ao final da lista.",
      type: 'add',
      completed: false,
    },
    {
      id: 2,
      description: "Insira o elemento 'X' na posição 1 da lista.",
      type: 'insert',
      completed: false,
    },
    {
      id: 3,
      description: 'Obtenha o elemento que está na posição 2 da lista.',
      type: 'get',
      completed: false,
    },
    {
      id: 4,
      description: 'Remova o elemento da posição 0 da lista.',
      type: 'remove',
      completed: false,
    },
    {
      id: 5,
      description: "Em qual posição está o elemento 'B'? Use indexOf.",
      type: 'indexOf',
      completed: false,
    },
    {
      id: 6,
      description: 'Verifique quantos elementos a lista possui atualmente.',
      type: 'size',
      completed: false,
    },
  ]);

  const executeOperation = () => {
    let operationResult: string | number | boolean = '';

    switch (operationType) {
      case 'add':
        if (!inputValue.trim()) {
          toast.error('Entrada inválida', {
            description: 'Digite um valor para adicionar à lista.',
          });
          return;
        }
        setList([...list, inputValue]);
        operationResult = `Elemento "${inputValue}" adicionado ao final da lista`;
        setInputValue('');
        break;

      case 'insert':
        if (!inputValue.trim()) {
          toast.error('Entrada inválida', {
            description: 'Digite um valor para inserir na lista.',
          });
          return;
        }

        const insertIndex = parseInt(inputIndex);
        if (
          isNaN(insertIndex) ||
          insertIndex < 0 ||
          insertIndex > list.length
        ) {
          toast.error('Índice inválido', {
            description: `O índice deve estar entre 0 e ${list.length}.`,
          });
          return;
        }

        const newList = [...list];
        newList.splice(insertIndex, 0, inputValue);
        setList(newList);
        operationResult = `Elemento "${inputValue}" inserido na posição ${insertIndex}`;
        setInputValue('');
        setInputIndex('');
        break;

      case 'remove':
        if (list.length === 0) {
          toast.error('Lista vazia', {
            description: 'Não é possível remover de uma lista vazia.',
          });
          return;
        }

        const removeIndex = parseInt(inputIndex);
        if (
          isNaN(removeIndex) ||
          removeIndex < 0 ||
          removeIndex >= list.length
        ) {
          toast.error('Índice inválido', {
            description: `O índice deve estar entre 0 e ${list.length - 1}.`,
          });
          return;
        }

        const removedItem = list[removeIndex];
        const listAfterRemoval = [...list];
        listAfterRemoval.splice(removeIndex, 1);
        setList(listAfterRemoval);
        operationResult = `Elemento "${removedItem}" removido da posição ${removeIndex}`;
        setInputIndex('');
        break;

      case 'get':
        if (list.length === 0) {
          toast.error('Lista vazia', {
            description: 'Não é possível obter elemento de uma lista vazia.',
          });
          return;
        }

        const getIndex = parseInt(inputIndex);
        if (isNaN(getIndex) || getIndex < 0 || getIndex >= list.length) {
          toast.error('Índice inválido', {
            description: `O índice deve estar entre 0 e ${list.length - 1}.`,
          });
          return;
        }

        operationResult = `O elemento na posição ${getIndex} é "${list[getIndex]}"`;
        break;

      case 'indexOf':
        if (list.length === 0) {
          toast.error('Lista vazia', {
            description: 'Não é possível buscar em uma lista vazia.',
          });
          return;
        }

        if (!inputValue.trim()) {
          toast.error('Entrada inválida', {
            description: 'Digite um valor para buscar na lista.',
          });
          return;
        }

        const foundIndex = list.indexOf(inputValue);
        operationResult =
          foundIndex >= 0
            ? `O elemento "${inputValue}" está na posição ${foundIndex}`
            : `O elemento "${inputValue}" não foi encontrado na lista`;
        setInputValue('');
        break;

      case 'size':
        operationResult = `A lista contém ${list.length} elemento(s)`;
        break;

      case 'isEmpty':
        operationResult =
          list.length === 0
            ? 'Verdadeiro (lista vazia)'
            : 'Falso (lista não está vazia)';
        break;
    }

    setResult(String(operationResult));

    // Verificar se algum desafio foi concluído
    checkChallengeCompletion(operationType, inputValue, inputIndex);
  };

  const checkChallengeCompletion = (
    type: OperationType,
    value: string,
    index: string,
  ) => {
    setChallenges(
      challenges.map((challenge) => {
        if (challenge.completed) return challenge;

        if (type === 'add' && challenge.id === 1 && challenge.type === type) {
          // Verificar se A, B e C foram adicionados
          if (list.includes('A') && list.includes('B') && value === 'C') {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'insert' &&
          challenge.id === 2 &&
          challenge.type === type
        ) {
          // Verificar se X foi inserido na posição 1
          if (value === 'X' && index === '1') {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'get' &&
          challenge.id === 3 &&
          challenge.type === type
        ) {
          // Verificar se elemento na posição 2 foi obtido
          if (index === '2' && list.length > 2) {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'remove' &&
          challenge.id === 4 &&
          challenge.type === type
        ) {
          // Verificar se elemento na posição 0 foi removido
          if (index === '0') {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'indexOf' &&
          challenge.id === 5 &&
          challenge.type === type
        ) {
          // Verificar se a posição de B foi verificada
          if (value === 'B' && list.includes('B')) {
            return { ...challenge, completed: true };
          }
        } else if (
          type === 'size' &&
          challenge.id === 6 &&
          challenge.type === type
        ) {
          // Verificar se tamanho foi verificado
          return { ...challenge, completed: true };
        }

        return challenge;
      }),
    );
  };

  const resetChallenges = () => {
    setList([]);
    setInputValue('');
    setInputIndex('');
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
          Pratique as operações de Lista
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Utilize os controles abaixo para praticar as operações básicas de uma
          lista e complete os desafios.
        </p>
      </div>

      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start gap-2">
            <div className="font-medium mt-1">Lista atual:</div>
            <div className="flex-1 p-2 bg-background rounded border min-h-[2.5rem]">
              {list.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {list.map((item, index) => (
                    <div
                      key={index}
                      className="px-2 py-1 bg-muted rounded text-sm"
                    >
                      [{index}]: {item}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Lista vazia
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
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
                  <SelectItem value="add">Add/Append</SelectItem>
                  <SelectItem value="insert">Insert</SelectItem>
                  <SelectItem value="remove">Remove</SelectItem>
                  <SelectItem value="get">Get</SelectItem>
                  <SelectItem value="indexOf">IndexOf</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                  <SelectItem value="isEmpty">IsEmpty</SelectItem>
                </SelectContent>
              </Select>

              {(operationType === 'add' ||
                operationType === 'insert' ||
                operationType === 'indexOf') && (
                <Input
                  placeholder="Digite um valor..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
              )}

              {(operationType === 'insert' ||
                operationType === 'remove' ||
                operationType === 'get') && (
                <Input
                  placeholder="Índice..."
                  value={inputIndex}
                  onChange={(e) => setInputIndex(e.target.value)}
                  type="number"
                  min="0"
                  max={list.length}
                  className="w-24"
                />
              )}

              <Button onClick={executeOperation}>Executar</Button>
            </div>
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
