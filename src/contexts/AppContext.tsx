'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface para estruturas de dados
interface DataStructure {
  id: string;
  title: string;
  description: string;
  icon: string;
  created: boolean;
  complexity: 'Básico' | 'Intermediário' | 'Avançado';
  lessons: number;
}

// Definindo o tipo para nosso contexto
interface AppContextType {
  currentStructure: string | null;
  setCurrentStructure: (structure: string) => void;
  progress: {
    [key: string]: {
      completed: boolean;
      lastVisited: Date | null;
    };
  };
  markAsCompleted: (structureId: string) => void;
  updateLastVisited: (structureId: string) => void;
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  dataStructures: DataStructure[];
  getStructureById: (id: string) => DataStructure | undefined;
}

// Lista de estruturas de dados
const dataStructures: DataStructure[] = [
  {
    id: 'lists',
    title: 'Listas',
    created: true,
    description:
      'Estrutura de dados que organiza elementos de forma sequencial com operações de inserção e remoção flexíveis.',
    icon: '📝',
    complexity: 'Básico',
    lessons: 5,
  },
  {
    id: 'stacks',
    title: 'Pilhas',
    created: true,
    description:
      'Estrutura de dados linear que segue o princípio LIFO (Last In, First Out).',
    icon: '📚',
    complexity: 'Básico',
    lessons: 3,
  },
  {
    id: 'queues',
    title: 'Filas',
    created: false,
    description:
      'Estrutura de dados linear que segue o princípio FIFO (First In, First Out).',
    icon: '📋',
    complexity: 'Básico',
    lessons: 5,
  },
  {
    id: 'arvores',
    title: 'Árvores',
    created: false,
    description:
      'Estrutura de dados hierárquica composta de nós que podem ter filhos.',
    icon: '🌳',
    complexity: 'Intermediário',
    lessons: 8,
  },
];

// Criando o contexto com valores iniciais
const AppContext = createContext<AppContextType | undefined>(undefined);

// Componente provedor que envolverá nossa aplicação
export function AppProvider({ children }: { children: ReactNode }) {
  const [currentStructure, setCurrentStructure] = useState<string | null>(null);
  const [progress, setProgress] = useState<AppContextType['progress']>({});
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  // Função para marcar uma estrutura como concluída
  const markAsCompleted = (structureId: string) => {
    setProgress((prev) => ({
      ...prev,
      [structureId]: {
        ...prev[structureId],
        completed: true,
      },
    }));
  };

  // Função para atualizar a última visita a uma estrutura
  const updateLastVisited = (structureId: string) => {
    setProgress((prev) => ({
      ...prev,
      [structureId]: {
        ...prev[structureId],
        lastVisited: new Date(),
      },
    }));
  };

  // Função para alternar a expansão do sidebar
  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  // Função para obter estrutura pelo ID
  const getStructureById = (id: string) => {
    return dataStructures.find((structure) => structure.id === id);
  };

  // Valor que será disponibilizado pelo contexto
  const value = React.useMemo(
    () => ({
      currentStructure,
      setCurrentStructure,
      progress,
      markAsCompleted,
      updateLastVisited,
      sidebarExpanded,
      toggleSidebar,
      dataStructures,
      getStructureById,
    }),
    [currentStructure, progress, sidebarExpanded],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook personalizado para acessar o contexto
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
}
