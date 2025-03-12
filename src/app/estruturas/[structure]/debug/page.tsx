import { DebugPath } from '@/components/debug/debug-path';
import { Card, CardContent } from '@/components/ui/card';

export default function DebugPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Depuração da Rota</h1>
        <p className="text-muted-foreground mt-2">
          Esta página ajuda a verificar se a estrutura de rotas está funcionando
          corretamente.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <DebugPath />
        </CardContent>
      </Card>
    </div>
  );
}
