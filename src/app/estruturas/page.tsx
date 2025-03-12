import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const dataStructures = [
  {
    id: 'queues',
    title: 'Filas',
    description:
      'Estrutura de dados linear que segue o princípio FIFO (First In, First Out).',
    icon: '📋',
    complexity: 'Básico',
    lessons: 5,
  },
  {
    id: 'stacks',
    title: 'Pilhas',
    description:
      'Estrutura de dados linear que segue o princípio LIFO (Last In, First Out).',
    icon: '📚',
    complexity: 'Básico',
    lessons: 4,
  },
  // ...outros itens
];

export default function EstruturasPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">
        Escolha uma Estrutura de Dados
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataStructures.map((structure) => (
          <Card key={structure.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{structure.icon}</span>
                <CardTitle>{structure.title}</CardTitle>
              </div>
              <CardDescription>{structure.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/estruturas/${structure.id}`} className="w-full">
                <Button className="w-full">Explorar</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
