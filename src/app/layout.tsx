import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aprenda Estruturas de Dados',
  description:
    'O projeto consiste no desenvolvimento de um sistema educacional interativo com o objetivo de facilitar o aprendizado de estruturas de dados por alunos universitários. A ideia principal é oferecer uma plataforma amigável e intuitiva, construída com Next.js, permitindo que os estudantes tenham acesso fácil a conteúdos teóricos e exemplos práticos relacionados às principais estruturas de dados, tais como filas, pilhas, listas, árvores, grafos e tabelas hash.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          'antialiased min-h-screen flex flex-col',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <header className="border-b bg-background">
          <div className="container mx-auto flex items-center justify-between p-4">
            <Link
              href="/"
              className="font-bold text-xl flex items-center gap-2"
            >
              <span className="text-primary">DataStructure</span>
              <span>Learn</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Início
              </Link>
              <Link
                href="/estruturas"
                className="text-sm font-medium hover:text-primary"
              >
                Estruturas
              </Link>
              <Link
                href="/sobre"
                className="text-sm font-medium hover:text-primary"
              >
                Sobre
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 bg-background">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DataStructure Learn | Desenvolvido
            com Next.js
          </div>
        </footer>
      </body>
    </html>
  );
}
