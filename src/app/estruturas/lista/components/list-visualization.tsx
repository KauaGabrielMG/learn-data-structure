'use client';
import React, { useState, useEffect } from 'react';

interface NodeProps {
  value: string;
  highlighted?: boolean;
  auxPointer?: boolean;
  primPointer?: boolean;
  ultPointer?: boolean;
}

const ListVisualization: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

  // Código a ser animado
  const code = `def remover_fim(self):
  if self.quant == 1:
    self.prim = self.ult = None
  else:
    aux = self.prim
    while aux.prox != self.ult:
      aux = aux.prox
    aux.prox = None
    self.ult = aux
    self.quant -= 1`;

  // Estados da lista em cada passo da animação
  const listStates = [
    {
      nodes: [
        { value: 'A', highlighted: false },
        { value: 'B', highlighted: false },
        { value: 'C', highlighted: false },
        { value: 'D', highlighted: false },
      ],
      aux: null,
      prim: 0,
      ult: 3,
      quant: 4,
      description: 'Estado inicial: lista com 4 nós',
      lineHighlight: null,
    },
    {
      nodes: [
        { value: 'A', highlighted: true },
        { value: 'B', highlighted: false },
        { value: 'C', highlighted: false },
        { value: 'D', highlighted: false },
      ],
      aux: 0,
      prim: 0,
      ult: 3,
      quant: 4,
      description: 'Linha 5: aux = self.prim',
      lineHighlight: 5,
    },
    {
      nodes: [
        { value: 'A', highlighted: false },
        { value: 'B', highlighted: true },
        { value: 'C', highlighted: false },
        { value: 'D', highlighted: false },
      ],
      aux: 1,
      prim: 0,
      ult: 3,
      quant: 4,
      description: 'Linha 7: aux = aux.prox (primeira iteração)',
      lineHighlight: 7,
    },
    {
      nodes: [
        { value: 'A', highlighted: false },
        { value: 'B', highlighted: false },
        { value: 'C', highlighted: true },
        { value: 'D', highlighted: false },
      ],
      aux: 2,
      prim: 0,
      ult: 3,
      quant: 4,
      description: 'Linha 7: aux = aux.prox (segunda iteração)',
      lineHighlight: 7,
    },
    {
      nodes: [
        { value: 'A', highlighted: false },
        { value: 'B', highlighted: false },
        { value: 'C', highlighted: true },
        { value: 'D', highlighted: false },
      ],
      aux: 2,
      prim: 0,
      ult: 3,
      quant: 4,
      description: 'aux.prox == self.ult, saindo do loop',
      lineHighlight: 6,
    },
    {
      nodes: [
        { value: 'A', highlighted: false },
        { value: 'B', highlighted: false },
        { value: 'C', highlighted: true },
        { value: 'D', highlighted: false },
      ],
      aux: 2,
      prim: 0,
      ult: 3,
      quant: 4,
      description: 'Linha 8: aux.prox = None',
      lineHighlight: 8,
    },
    {
      nodes: [
        { value: 'A', highlighted: false },
        { value: 'B', highlighted: false },
        { value: 'C', highlighted: true },
      ],
      aux: 2,
      prim: 0,
      ult: 2,
      quant: 4,
      description: 'Removendo D da lista',
      lineHighlight: 8,
    },
    {
      nodes: [
        { value: 'A', highlighted: false },
        { value: 'B', highlighted: false },
        { value: 'C', highlighted: true },
      ],
      aux: 2,
      prim: 0,
      ult: 2,
      quant: 4,
      description: 'Linha 9: self.ult = aux',
      lineHighlight: 9,
    },
    {
      nodes: [
        { value: 'A', highlighted: false },
        { value: 'B', highlighted: false },
        { value: 'C', highlighted: false },
      ],
      aux: 2,
      prim: 0,
      ult: 2,
      quant: 3,
      description: 'Linha 10: self.quant -= 1',
      lineHighlight: 10,
    },
  ];

  // Controle da animação
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && step < listStates.length - 1) {
      timer = setTimeout(() => {
        setStep(step + 1);
        setHighlightedLine(listStates[step + 1].lineHighlight);
      }, speed);
    } else if (step >= listStates.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, step, speed]);

  // Reiniciar a animação
  const resetAnimation = () => {
    setStep(0);
    setIsPlaying(false);
    setHighlightedLine(null);
  };

  // Renderizar um nó da lista
  const Node: React.FC<NodeProps> = ({
    value,
    highlighted,
    auxPointer,
    primPointer,
    ultPointer,
  }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          {auxPointer && (
            <div className="absolute -top-8 text-blue-500 font-bold">aux</div>
          )}
          {primPointer && (
            <div className="absolute -top-8 left-0 text-green-500 font-bold">
              prim
            </div>
          )}
          {ultPointer && (
            <div className="absolute -top-8 right-0 text-red-500 font-bold">
              ult
            </div>
          )}
          <div
            className={`flex border-2 ${
              highlighted
                ? 'bg-yellow-200 border-yellow-500'
                : 'bg-white border-gray-300'
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center border-r-2 border-gray-300">
              {value}
            </div>
            <div className="w-10 h-10 flex items-center justify-center">→</div>
          </div>
        </div>
      </div>
    );
  };

  // Estado atual da animação
  const currentState = listStates[step];

  return (
    <div className="flex flex-col w-full p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Simulação: Remover fim da lista
      </h2>

      <div className="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6">
        {/* Lado esquerdo - Código */}
        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Código</h3>
          <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
            {code.split('\n').map((line, index) => (
              <div
                key={index}
                className={`${
                  highlightedLine === index + 1
                    ? 'bg-yellow-500 text-black'
                    : ''
                }`}
              >
                {index + 1} {line}
              </div>
            ))}
          </pre>
        </div>

        {/* Lado direito - Visualização */}
        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Visualização</h3>
          <div className="mb-4 text-center font-medium text-gray-700">
            {currentState.description}
          </div>
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-2">
              <span className="font-bold">quant={currentState.quant}</span>
            </div>
            <div className="flex items-center space-x-3">
              {currentState.nodes.map((node, index) => (
                <React.Fragment key={index}>
                  <Node
                    value={node.value}
                    highlighted={node.highlighted}
                    auxPointer={currentState.aux === index}
                    primPointer={currentState.prim === index}
                    ultPointer={currentState.ult === index}
                  />
                  {index < currentState.nodes.length - 1 && (
                    <div className="w-3 h-1 bg-black"></div>
                  )}
                  {index === currentState.nodes.length - 1 && (
                    <div className="flex items-center justify-center border-2 border-gray-300 w-14 h-10">
                      None
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controles da animação */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-6 bg-white p-4 rounded-lg shadow">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isPlaying ? 'Pausar' : 'Iniciar'}
        </button>

        <button
          onClick={resetAnimation}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reiniciar
        </button>

        <button
          disabled={step <= 0}
          onClick={() => {
            setStep(Math.max(0, step - 1));
            setHighlightedLine(listStates[Math.max(0, step - 1)].lineHighlight);
            setIsPlaying(false);
          }}
          className={`px-4 py-2 ${
            step <= 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-600'
          } text-white rounded`}
        >
          Anterior
        </button>

        <button
          disabled={step >= listStates.length - 1}
          onClick={() => {
            setStep(Math.min(listStates.length - 1, step + 1));
            setHighlightedLine(
              listStates[Math.min(listStates.length - 1, step + 1)]
                .lineHighlight,
            );
            setIsPlaying(false);
          }}
          className={`px-4 py-2 ${
            step >= listStates.length - 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-600'
          } text-white rounded`}
        >
          Próximo
        </button>

        <div className="flex items-center">
          <label className="mr-2">Velocidade:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value="2000">Lento</option>
            <option value="1000">Normal</option>
            <option value="500">Rápido</option>
          </select>
        </div>

        <div className="w-full md:w-auto">
          <div className="flex items-center">
            <span className="mr-2">
              Passo: {step + 1}/{listStates.length}
            </span>
            <div className="w-48 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${((step + 1) / listStates.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListVisualization;
