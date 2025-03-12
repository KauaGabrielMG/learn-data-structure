import QueueVisualization from '@/components/queue/queue-visualization';
import { Card, CardContent } from '@/components/ui/card';

export default function QueueVisualizationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Visualização de Fila
        </h1>
        <p className="text-muted-foreground mt-2">
          Veja como uma fila funciona visualmente através desta demonstração
          interativa.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <QueueVisualization />
        </CardContent>
      </Card>
    </div>
  );
}
