'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function StackVisualization() {
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [animating, setAnimating] = useState<number | null>(null);
  const [operationText, setOperationText] = useState('');

  const maxStackSize = 8;

  const push = () => {
    if (!inputValue.trim()) {
      toast.error('Entrada inválida', {
        description: 'Por favor, insira um valor para adicionar à pilha.',
      });
      return;
    }

    if (stack.length >= maxStackSize) {
      toast.error('Pilha cheia', {
        description: 'A pilha atingiu seu tamanho máximo.',
      });
      return;
    }

    setOperationText(`Adicionando "${inputValue}" ao topo da pilha...`);
    setStack([...stack, inputValue]);
    setAnimating(stack.length);

    setTimeout(() => {
      setAnimating(null);
      setOperationText(`"${inputValue}" foi adicionado ao topo da pilha.`);
      setInputValue('');
    }, 1000);
  };

  const pop = () => {
    if (stack.length === 0) {
      toast.error('Pilha vazia', {
        description: 'Não é possível remover de uma pilha vazia.',
      });
      return;
    }

    const topIndex = stack.length - 1;
    const removedItem = stack[topIndex];
    setOperationText(`Removendo "${removedItem}" do topo da pilha...`);
    setAnimating(topIndex);

    setTimeout(() => {
      setStack(stack.slice(0, -1));
      setAnimating(null);
      setOperationText(`"${removedItem}" foi removido do topo da pilha.`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Visualização da Pilha</h3>

        <div className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground">
            {operationText ||
              'Utilize os controles abaixo para adicionar ou remover elementos da pilha.'}
          </div>

          <div className="bg-muted/50 border rounded-lg p-8 flex items-center justify-center">
            {stack.length > 0 ? (
              <div className="flex flex-col items-center">
                {[...stack].reverse().map((item, reverseIndex) => {
                  // Convert reverseIndex back to the actual index in the array
                  const actualIndex = stack.length - 1 - reverseIndex;
                  return (
                    <div
                      key={actualIndex}
                      className="flex items-center justify-center relative w-full"
                    >
                      <div
                        className={`
                          w-48 h-12 border-2 rounded my-1 flex items-center justify-center text-lg font-medium
                          ${
                            animating === actualIndex
                              ? 'animate-pulse bg-primary/20 border-primary'
                              : 'bg-background border-border'
                          }
                        `}
                      >
                        {item}
                      </div>
                      <div className="absolute right-0 -mr-16 text-xs">
                        {actualIndex === stack.length - 1 && '← Topo'}
                        {actualIndex === 0 && '← Base'}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-muted-foreground p-8">Pilha vazia</div>
            )}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-1 gap-2">
              <Input
                placeholder="Digite um valor..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && push()}
                className="flex-1"
              />
              <Button
                onClick={push}
                disabled={animating !== null || stack.length >= maxStackSize}
              >
                Push
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={pop}
              disabled={animating !== null || stack.length === 0}
            >
              Pop
            </Button>
          </div>
        </div>

        {stack.length > 0 && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            <div className="font-medium">Estado atual da pilha:</div>
            <div className="mt-1">
              <div>Topo: {stack[stack.length - 1]}</div>
              <div>Tamanho: {stack.length}</div>
              <div className="mt-2">
                Elementos (do topo para a base):{' '}
                {[...stack].reverse().join(', ')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
