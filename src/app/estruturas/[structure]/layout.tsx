import { DataStructureSidebar } from '@/components/sidebar/data-structure-sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Estruturas de Dados',
  description: 'Aprenda estruturas de dados de forma interativa',
};

export default function DataStructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DataStructureSidebar />
      <main className="flex-1 md:max-h-screen overflow-auto">
        <div className="container py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}
