import * as React from 'react';
import { GalleryVerticalEnd, Minus, Plus } from 'lucide-react';

import { SearchForm } from '@/components/search-form';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Arrays e Vetores',
      url: '/estruturas/arrays',
      description: 'Coleções indexadas de elementos do mesmo tipo',
    },
    {
      title: 'Listas Ligadas',
      url: '/estruturas/listas-ligadas',
      description: 'Sequências de nós conectados por ponteiros',
    },
    {
      title: 'Pilhas (Stacks)',
      url: '/estruturas/pilhas',
      description: 'Estrutura LIFO (Last-In-First-Out)',
    },
    {
      title: 'Filas (Queues)',
      url: '/estruturas/filas',
      description: 'Estrutura FIFO (First-In-First-Out)',
    },
    {
      title: 'Árvores Binárias',
      url: '/estruturas/arvores-binarias',
      description: 'Nós com no máximo dois filhos',
    },
    {
      title: 'Árvores AVL',
      url: '/estruturas/arvores-avl',
      description: 'Árvores binárias balanceadas',
    },
    {
      title: 'Tabelas Hash',
      url: '/estruturas/tabelas-hash',
      description: 'Mapeamento chave-valor eficiente',
    },
    {
      title: 'Grafos',
      url: '/estruturas/grafos',
      description: 'Conjunto de vértices conectados por arestas',
    },
    {
      title: 'Heaps',
      url: '/estruturas/heaps',
      description: 'Árvores binárias para filas de prioridade',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">
                    Aprendendo estrutura de dados
                  </span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{' '}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {/* {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              // isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null} */}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
