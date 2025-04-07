"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

// Array de estruturas de dados (igual ao utilizado na página inicial)
const dataStructures = [
  {
    id: "lists",
    title: "Listas",
    description:
      "Estrutura de dados linear que permite armazenar uma coleção de elementos.",
    icon: "📝",
    complexity: "Básico",
    lessons: 6,
    topics: [
      "Conceitos",
      "Visualização",
      "Operações",
      "Implementação",
      "Exercícios",
    ],
  },
];

export function DataStructureSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);

  // Obter o ID da estrutura de dados atual a partir de useParams, que é mais confiável
  const currentStructureId = (params?.structure as string) || "";

  // Para debug - você pode remover isso depois
  console.log("Pathname:", pathname);
  console.log("Params:", params);
  console.log("CurrentStructureId:", currentStructureId);

  // Componente da sidebar para uso em desktop e dentro do Sheet para mobile
  const SidebarContent = () => (
    <ScrollArea className="h-full py-4">
      <div className="space-y-4 py-2 px-3">
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          Estruturas de Dados
        </h2>

        <div className="space-y-3">
          {dataStructures.map((structure) => {
            const isActive = currentStructureId === structure.id;
            return (
              <Accordion
                key={structure.id}
                type="single"
                collapsible
                defaultValue={isActive ? structure.id : undefined}
              >
                <AccordionItem value={structure.id} className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "py-2 px-3 text-sm rounded-md hover:bg-muted transition-colors",
                      isActive && "bg-muted font-medium"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{structure.icon}</span>
                      <span>{structure.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2 px-2">
                    <div className="pl-8 space-y-1">
                      {structure.topics.map((topic, i) => (
                        <Link
                          key={i}
                          href={`/estruturas/${
                            structure.id
                          }/${topic.toLowerCase()}`}
                          className={cn(
                            "block py-1 px-3 text-sm rounded-md text-muted-foreground hover:bg-muted transition-colors",
                            pathname ===
                              `/estruturas/${
                                structure.id
                              }/${topic.toLowerCase()}` &&
                              "bg-muted/60 font-medium text-foreground"
                          )}
                        >
                          {topic}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t">
          <Link href="/">
            <Button variant="outline" size="sm" className="w-full">
              Voltar à Página Inicial
            </Button>
          </Link>
        </div>
      </div>
    </ScrollArea>
  );

  return (
    <>
      {/* Sidebar para desktop - Vamos remover o "hidden" para depuração */}
      <aside className="md:flex md:w-64 lg:w-72 flex-col border-r min-h-screen">
        <SidebarContent />
      </aside>

      {/* Menu móvel */}
      <div className="md:hidden sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Menu de navegação"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {dataStructures.find((s) => s.id === currentStructureId)?.icon ||
              "📚"}
          </span>
          <span className="font-medium">
            {dataStructures.find((s) => s.id === currentStructureId)?.title ||
              "Estruturas de Dados"}
          </span>
        </div>
      </div>
    </>
  );
}
