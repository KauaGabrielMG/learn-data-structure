'use client';

import { usePathname, useParams } from 'next/navigation';

export function DebugPath() {
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md text-sm">
      <h3 className="font-medium">Informações de Depuração</h3>
      <div>
        <p>
          <strong>Pathname:</strong> {pathname}
        </p>
        <p>
          <strong>Params:</strong> {JSON.stringify(params)}
        </p>
      </div>
    </div>
  );
}
