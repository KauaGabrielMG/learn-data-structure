import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/sonner';

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
    'Sistema educacional interativo para facilitar o aprendizado de estruturas de dados por alunos universitários.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased min-h-screen flex flex-col',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu de navegação</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/"
                      className="text-sm font-medium hover:text-primary"
                    >
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
                </SheetContent>
              </Sheet>
              <Link
                href="/"
                className="font-bold text-xl flex items-center gap-1"
              >
                <span className="text-primary">DataStructure</span>
                <span>Learn</span>
              </Link>
            </div>
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
              <Button variant="secondary" size="sm">
                Entrar
              </Button>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t py-6 bg-muted/40">
          <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-3">DataStructure Learn</h3>
              <p className="text-sm text-muted-foreground">
                Plataforma educacional interativa para facilitar o aprendizado
                de estruturas de dados.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Página inicial
                  </Link>
                </li>
                <li>
                  <Link href="/estruturas" className="hover:text-primary">
                    Estruturas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Recursos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tutoriais" className="hover:text-primary">
                    Tutoriais
                  </Link>
                </li>
                <li>
                  <Link href="/documentacao" className="hover:text-primary">
                    Documentação
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/termos" className="hover:text-primary">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="hover:text-primary">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DataStructure Learn | Desenvolvido
            com Next.js
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
