'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

export default function QueueVisualization() {
  const [queue, setQueue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [animating, setAnimating] = useState<number | null>(null);
  const [operationText, setOperationText] = useState('');

  const maxQueueSize = 8;

  const enqueue = () => {
    if (!inputValue.trim()) {
      toast.error('Entrada inválida', {
        description: 'Por favor, insira um valor para adicionar à fila.',
      });
      return;
    }

    if (queue.length >= maxQueueSize) {
      toast.error('Fila cheia', {
        description: 'A fila atingiu seu tamanho máximo.',
      });
      return;
    }

    setOperationText(`Adicionando "${inputValue}" ao final da fila...`);
    setQueue([...queue, inputValue]);
    setAnimating(queue.length);

    setTimeout(() => {
      setAnimating(null);
      setOperationText(`"${inputValue}" foi adicionado ao final da fila.`);
      setInputValue('');
    }, 1000);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      toast.error('Fila vazia', {
        description: 'Não é possível remover de uma fila vazia.',
      });
      return;
    }

    const removedItem = queue[0];
    setOperationText(`Removendo "${removedItem}" do início da fila...`);
    setAnimating(0);

    setTimeout(() => {
      setQueue(queue.slice(1));
      setAnimating(null);
      setOperationText(`"${removedItem}" foi removido do início da fila.`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Visualização da Fila</h3>

        <div className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground">
            {operationText ||
              'Utilize os controles abaixo para adicionar ou remover elementos da fila.'}
          </div>

          <div className="bg-muted/50 border rounded-lg p-8 flex items-center justify-center min-h-[150px]">
            {queue.length > 0 ? (
              <div className="flex items-center space-x-1">
                {queue.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`
                        w-14 h-14 border-2 rounded flex items-center justify-center text-lg font-medium
                        ${
                          animating === index
                            ? 'animate-pulse bg-primary/20 border-primary'
                            : 'bg-background border-border'
                        }
                      `}
                    >
                      {item}
                    </div>
                    <div className="text-xs mt-1">
                      {index === 0
                        ? 'Início'
                        : index === queue.length - 1
                        ? 'Final'
                        : ''}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">Fila vazia</div>
            )}
          </div>
        </div>

        {queue.length > 0 && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>←— Saída (Dequeue)</div>
            <div>Entrada (Enqueue) —→</div>
          </div>
        )}

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-1 gap-2">
              <Input
                placeholder="Digite um valor..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enqueue()}
                className="flex-1"
              />
              <Button
                onClick={enqueue}
                disabled={animating !== null || queue.length >= maxQueueSize}
              >
                Enqueue
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={dequeue}
              disabled={animating !== null || queue.length === 0}
            >
              Dequeue
            </Button>
          </div>
        </div>

        {queue.length > 0 && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            <div className="font-medium">Estado atual da fila:</div>
            <div className="flex items-center mt-1 gap-1 flex-wrap">
              <span>Front [</span>
              {queue.map((item, index) => (
                <span key={index}>
                  {item}
                  {index < queue.length - 1 && (
                    <ArrowRight className="inline h-3 w-3 mx-1" />
                  )}
                </span>
              ))}
              <span>] Rear</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
