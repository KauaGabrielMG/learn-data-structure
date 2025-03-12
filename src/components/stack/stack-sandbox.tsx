'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  PlayIcon,
  CopyIcon,
  InfoIcon,
  BookIcon,
  TerminalIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function StackSandbox() {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [stackState, setStackState] = useState<any[]>([]);
  const [selectedExample, setSelectedExample] = useState<string>('');

  // Exemplos pré-definidos
  const examples = {
    básico: `// Implementação básica de Pilha usando Array
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
    console.log(\`Push: \${element}\`);
    return this.items;
  }

  pop() {
    if (this.isEmpty()) {
      console.log("Underflow! A pilha está vazia");
      return "Underflow";
    }
    const item = this.items.pop();
    console.log(\`Pop: \${item}\`);
    return item;
  }

  peek() {
    if (this.isEmpty()) {
      console.log("A pilha está vazia");
      return null;
    }
    const item = this.items[this.items.length - 1];
    console.log(\`Peek: \${item}\`);
    return item;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    console.log(\`Tamanho da pilha: \${this.items.length}\`);
    return this.items.length;
  }

  clear() {
    this.items = [];
    console.log("Pilha limpa");
    return this.items;
  }
}

// Criando uma instância da pilha
const stack = new Stack();

// Testando operações básicas
stack.push(10);
stack.push(20);
stack.push(30);
stack.peek();
stack.size();
stack.pop();
stack.size();
stack.pop();
stack.pop();
stack.pop(); // Tentando remover de uma pilha vazia
`,
    conversãoBinária: `// Conversão de decimal para binário usando pilha
function decimalToBinary(decNumber) {
  const stack = [];
  let number = decNumber;
  let remainder;
  let binaryString = "";

  if (number === 0) {
    return "0";
  }

  while (number > 0) {
    remainder = Math.floor(number % 2);
    stack.push(remainder);
    number = Math.floor(number / 2);
  }

  console.log(\`Pilha após divisões sucessivas: [\${stack.join(", ")}]\`);

  while (stack.length > 0) {
    binaryString += stack.pop().toString();
  }

  return binaryString;
}

// Testando a função com diferentes números
const número = 42;
const binário = decimalToBinary(número);
console.log(\`\${número} em binário é: \${binário}\`);

const número2 = 255;
const binário2 = decimalToBinary(número2);
console.log(\`\${número2} em binário é: \${binário2}\`);
`,
    inversãoString: `// Usando pilha para inverter uma string
function inverterString(str) {
  // Criando uma pilha vazia
  const stack = [];

  // Adicionando cada caractere da string na pilha
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
    console.log(\`Push: \${str[i]}\`);
  }

  // Criando uma string vazia para armazenar o resultado
  let stringInvertida = "";

  // Removendo cada caractere da pilha e adicionando-o à string invertida
  while (stack.length > 0) {
    const char = stack.pop();
    console.log(\`Pop: \${char}\`);
    stringInvertida += char;
  }

  return stringInvertida;
}

// Testando a função com diferentes strings
const original = "Estrutura de dados";
const invertida = inverterString(original);
console.log(\`Original: \${original}\`);
console.log(\`Invertida: \${invertida}\`);
`,
    validaçãoParênteses: `// Validação de expressão com parênteses equilibrados
function validarParenteses(expressao) {
  const stack = [];

  // Mapeamento de parênteses de fechamento para seus parênteses de abertura correspondentes
  const parentesesMap = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  // Percorrendo cada caractere na expressão
  for (let i = 0; i < expressao.length; i++) {
    const char = expressao[i];

    // Se for um parêntese de abertura, colocamos na pilha
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
      console.log(\`Push: \${char}\`);
    }
    // Se for um parêntese de fechamento
    else if (char === ')' || char === '}' || char === ']') {
      // Se a pilha estiver vazia, não há correspondente
      if (stack.length === 0) {
        console.log(\`Erro: Encontrado \${char} sem abertura correspondente\`);
        return false;
      }

      // Pop da pilha e verifica se corresponde ao parentese de fechamento
      const top = stack.pop();
      console.log(\`Pop e comparando: \${top} com \${char}\`);

      if (parentesesMap[char] !== top) {
        console.log(\`Erro: \${char} não corresponde a \${top}\`);
        return false;
      }
    }
  }

  // Se a pilha não estiver vazia, então existem parênteses não fechados
  if (stack.length !== 0) {
    console.log(\`Erro: Existem parênteses não fechados: \${stack.join(', ')}\`);
    return false;
  }

  return true;
}

// Testando com diferentes expressões
const exp1 = "((a + b) * (c - d))";
console.log(\`\${exp1} é válido? \${validarParenteses(exp1)}\`);

const exp2 = "({[a + b]})";
console.log(\`\${exp2} é válido? \${validarParenteses(exp2)}\`);

const exp3 = "([a + b)]";
console.log(\`\${exp3} é válido? \${validarParenteses(exp3)}\`);
`,
    undoRedo: `// Implementação simples de funcionalidade Undo/Redo usando pilhas
class TextEditor {
  constructor() {
    this.text = "";
    this.undoStack = [];
    this.redoStack = [];
  }

  // Adiciona texto
  write(newText) {
    this.undoStack.push(this.text);
    this.text += newText;
    this.redoStack = [];  // Limpa a pilha de redo após uma nova operação
    console.log(\`Texto atual: "\${this.text}"\`);
  }

  // Desfaz a última operação
  undo() {
    if (this.undoStack.length === 0) {
      console.log("Nada para desfazer");
      return;
    }

    this.redoStack.push(this.text);
    this.text = this.undoStack.pop();
    console.log(\`Desfez para: "\${this.text}"\`);
  }

  // Refaz a última operação desfeita
  redo() {
    if (this.redoStack.length === 0) {
      console.log("Nada para refazer");
      return;
    }

    this.undoStack.push(this.text);
    this.text = this.redoStack.pop();
    console.log(\`Refez para: "\${this.text}"\`);
  }
}

// Testando o editor de texto
const editor = new TextEditor();
editor.write("Olá ");
editor.write("mundo!");
editor.undo();
editor.redo();
editor.write(" Como vai?");
editor.undo();
editor.undo();
editor.redo();
`,
  };

  // Atualiza o código quando o exemplo é alterado
  useEffect(() => {
    if (examples[selectedExample as keyof typeof examples]) {
      setCode(examples[selectedExample as keyof typeof examples]);
    }
  }, [selectedExample]);

  // Redireciona console.log para nossa interface
  const createCustomConsole = () => {
    const originalConsoleLog = console.log;
    const logs: string[] = [];

    console.log = (...args) => {
      const message = args.join(' ');
      logs.push(message);
      originalConsoleLog(...args);
    };

    return {
      logs,
      restore: () => {
        console.log = originalConsoleLog;
      },
    };
  };

  // Executa o código digitado e captura o resultado
  const runCode = () => {
    // Limpa a saída anterior
    setOutput([]);
    setStackState([]);

    if (!code.trim()) {
      toast.error('Digite algum código antes de executar!');
      return;
    }

    try {
      // Cria um console customizado para capturar logs
      const customConsole = createCustomConsole();

      // Executa o código do usuário
      const result = new Function(code)();

      // Restaura o console original
      customConsole.restore();

      // Atualiza a saída
      setOutput(customConsole.logs);

      // Tenta extrair o estado da pilha (se existir no escopo global)
      try {
        // @ts-ignore - Acessa a variável "stack" que pode ter sido definida no código do usuário
        if (typeof stack !== 'undefined' && stack.items) {
          setStackState([...stack.items]);
        }
      } catch (e) {
        // Ignora erros se a variável "stack" não existir
      }

      toast.success('Código executado com sucesso!');
    } catch (error: any) {
      setOutput([`Erro: ${error.message}`]);
      toast.error('Erro ao executar o código');
    }
  };

  // Copia o código para a área de transferência
  const copyCode = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success('Código copiado!'))
      .catch(() => toast.error('Não foi possível copiar o código'));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Sandbox de Pilhas</h2>
        <p className="text-muted-foreground">
          Experimente implementar e testar diferentes operações de pilha neste
          ambiente de código interativo.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <BookIcon className="h-4 w-4" />
        <span className="font-medium">Exemplos:</span>
        <Select value={selectedExample} onValueChange={setSelectedExample}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um exemplo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="básico">Implementação Básica</SelectItem>
            <SelectItem value="conversãoBinária">
              Conversão para Binário
            </SelectItem>
            <SelectItem value="inversãoString">Inversão de String</SelectItem>
            <SelectItem value="validaçãoParênteses">
              Validação de Parênteses
            </SelectItem>
            <SelectItem value="undoRedo">Undo/Redo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-4 w-4" />
              <span className="font-medium">Editor de Código</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyCode}>
                <CopyIcon className="h-3.5 w-3.5 mr-1" />
                Copiar
              </Button>
              <Button onClick={runCode}>
                <PlayIcon className="h-3.5 w-3.5 mr-1" />
                Executar
              </Button>
            </div>
          </div>

          <div className="relative min-h-[400px] border rounded-md">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full min-h-[400px] p-4 font-mono text-sm bg-muted resize-none rounded-md"
              placeholder="// Digite seu código aqui..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <InfoIcon className="h-4 w-4" />
              <span className="font-medium">Console</span>
            </div>
            <div className="h-[200px] overflow-y-auto border rounded-md p-3 font-mono text-sm bg-muted/40">
              {output.length > 0 ? (
                output.map((line, index) => (
                  <div
                    key={index}
                    className={cn(
                      'whitespace-pre-wrap mb-1',
                      line.startsWith('Erro:') ? 'text-red-500' : '',
                    )}
                  >
                    {line}
                  </div>
                ))
              ) : (
                <div className="text-muted-foreground text-sm">
                  A saída do console aparecerá aqui após executar o código.
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <InfoIcon className="h-4 w-4" />
              <span className="font-medium">Visualização da Pilha</span>
            </div>
            <div className="border rounded-md p-3 min-h-[150px] max-h-[300px] overflow-y-auto bg-muted/40">
              {stackState.length > 0 ? (
                <div className="flex flex-col-reverse space-y-reverse space-y-2">
                  {stackState.map((item, index) => (
                    <Card
                      key={index}
                      className={cn(
                        'p-2 text-center',
                        index === stackState.length - 1
                          ? 'border-primary bg-primary/10'
                          : '',
                      )}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {index === stackState.length - 1
                            ? 'Topo'
                            : `Índice ${index}`}
                        </span>
                        <span className="font-mono">
                          {JSON.stringify(item)}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  A visualização da pilha aparecerá aqui após executar o código.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg border border-muted-foreground/20">
        <h3 className="font-medium mb-2">Dicas:</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>
            • Utilize{' '}
            <code className="bg-muted px-1 py-0.5 rounded">console.log()</code>{' '}
            para mostrar resultados no console.
          </li>
          <li>
            • Certifique-se de que sua pilha seja uma classe chamada "Stack" com
            uma propriedade "items" para visualização.
          </li>
          <li>
            • Experimente modificar os exemplos para entender como as pilhas
            funcionam.
          </li>
          <li>
            • Para operações de pilha, implemente: push, pop, peek, isEmpty,
            size.
          </li>
        </ul>
      </div>
    </div>
  );
}
