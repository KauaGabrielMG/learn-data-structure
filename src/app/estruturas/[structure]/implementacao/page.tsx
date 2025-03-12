import QueueImplementation from '@/components/queue/queue-implementation';
import { Card, CardContent } from '@/components/ui/card';

export default function QueueImplementationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Implementação de Fila
        </h1>
        <p className="text-muted-foreground mt-2">
          Veja diferentes formas de implementar uma fila em
          TypeScript/JavaScript.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <QueueImplementation />
        </CardContent>
      </Card>
    </div>
  );
}
