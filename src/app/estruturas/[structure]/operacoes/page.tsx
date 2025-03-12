import QueueOperations from '@/components/queue/queue-operations';
import { Card, CardContent } from '@/components/ui/card';

export default function QueueOperationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Operações de Fila</h1>
        <p className="text-muted-foreground mt-2">
          Pratique as operações básicas de uma fila e complete os desafios
          propostos.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <QueueOperations />
        </CardContent>
      </Card>
    </div>
  );
}
