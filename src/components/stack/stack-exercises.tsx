'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Award, CheckCircle, RefreshCw, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/AppContext';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  completed: boolean;
  component: React.ReactNode;
}

export default function StackExercises() {
  const { markAsCompleted } = useAppContext();
  const [completed, setCompleted] = useState<string[]>([]);

  const markExerciseCompleted = (id: string) => {
    if (!completed.includes(id)) {
      const newCompleted = [...completed, id];
      setCompleted(newCompleted);

      // Se completou todos os exercícios, marca a estrutura como concluída
      if (newCompleted.length === exercises.length) {
        markAsCompleted('stacks');
        toast.success(
          'Parabéns! Você completou todos os exercícios de pilhas!',
        );
      } else {
        toast.success('Exercício concluído!');
      }
    }
  };

  const resetExercises = () => {
    setCompleted([]);
    toast('Progresso dos exercícios reiniciado');
  };

  // Componentes de exercícios individuais
  const ParenthesesValidator = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState<{
      isValid: boolean;
      message: string;
    } | null>(null);

    const validateParentheses = () => {
      if (!expression.trim()) {
        toast.error('Digite uma expressão para validar');
        return;
      }

      const stack: string[] = [];
      let isValid = true;
      let errorChar = '';
      let errorPosition = -1;

      for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (char === '(' || char === '[' || char === '{') {
          stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
          if (stack.length === 0) {
            isValid = false;
            errorChar = char;
            errorPosition = i;
            break;
          }

          const top = stack.pop()!;
          if (
            (char === ')' && top !== '(') ||
            (char === ']' && top !== '[') ||
            (char === '}' && top !== '{')
          ) {
            isValid = false;
            errorChar = char;
            errorPosition = i;
            break;
          }
        }
      }

      if (stack.length > 0) {
        isValid = false;
      }

      if (isValid) {
        setResult({
          isValid: true,
          message: 'Expressão válida! Todos os parênteses estão balanceados.',
        });
        markExerciseCompleted('parentheses');
      } else {
        if (errorPosition !== -1) {
          setResult({
            isValid: false,
            message: `Expressão inválida! Problema com o caractere '${errorChar}' na posição ${
              errorPosition + 1
            }.`,
          });
        } else {
          setResult({
            isValid: false,
            message:
              'Expressão inválida! Existem parênteses abertos que não foram fechados.',
          });
        }
      }
    };

    return (
      <div className="space-y-4">
        <p>
          Digite uma expressão contendo parênteses, colchetes ou chaves, e o
          sistema verificará se todos os caracteres de abertura e fechamento
          estão balanceados.
        </p>

        <div className="flex gap-2">
          <Input
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Ex: ((2+3)*[5-2])/2"
            className="flex-1"
          />
          <Button onClick={validateParentheses}>Validar</Button>
        </div>

        {result && (
          <div
            className={cn(
              'p-3 rounded text-sm flex items-center gap-2',
              result.isValid
                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
            )}
          >
            {result.isValid ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
            <span>{result.message}</span>
          </div>
        )}

        <div className="bg-muted/40 p-3 rounded text-sm">
          <p className="font-medium mb-1">Dica:</p>
          <p>
            Use uma pilha para rastrear os parênteses de abertura. Ao encontrar
            um parêntese de fechamento, verifique se ele corresponde ao último
            parêntese de abertura na pilha.
          </p>
        </div>
      </div>
    );
  };

  const ReverseString = () => {
    const [inputString, setInputString] = useState('');
    const [reversedString, setReversedString] = useState('');
    const [showSolution, setShowSolution] = useState(false);
    const [userReversed, setUserReversed] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const reverseString = () => {
      if (!inputString.trim()) {
        toast.error('Digite uma string para reverter');
        return;
      }

      // Algoritmo de reversão usando pilha
      const stack: string[] = [];
      for (const element of inputString) {
        stack.push(element);
      }

      let reversed = '';
      while (stack.length > 0) {
        reversed += stack.pop();
      }

      setReversedString(reversed);
      setShowSolution(true);
    };

    const checkUserAnswer = () => {
      if (!userReversed.trim()) {
        toast.error('Digite sua resposta antes de verificar');
        return;
      }

      const correct = userReversed === inputString.split('').reverse().join('');
      setIsCorrect(correct);

      if (correct) {
        markExerciseCompleted('reverse');
      }
    };

    return (
      <div className="space-y-4">
        <p>
          Digite uma string e depois implemente a lógica para revertê-la usando
          uma pilha. Você pode ver a solução ou tentar resolver por conta
          própria.
        </p>

        <div className="flex gap-2">
          <Input
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            placeholder="Digite uma string (ex: algoritmo)"
            className="flex-1"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setShowSolution(false)}
            variant="outline"
            className="flex-1"
          >
            Tentar resolver
          </Button>
          <Button
            onClick={reverseString}
            variant="secondary"
            className="flex-1"
          >
            Ver solução
          </Button>
        </div>

        {!showSolution ? (
          <div className="space-y-2">
            <p className="text-sm">Digite a string revertida:</p>
            <div className="flex gap-2">
              <Input
                value={userReversed}
                onChange={(e) => setUserReversed(e.target.value)}
                placeholder="String revertida"
                className="flex-1"
              />
              <Button onClick={checkUserAnswer}>Verificar</Button>
            </div>

            {isCorrect !== null && (
              <div
                className={cn(
                  'p-3 rounded text-sm flex items-center gap-2',
                  isCorrect
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
                )}
              >
                {isCorrect ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                <span>
                  {isCorrect
                    ? 'Correto! Você conseguiu reverter a string!'
                    : 'Incorreto. Tente novamente!'}
                </span>
              </div>
            )}
          </div>
        ) : (
          <>
            {reversedString && (
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded">
                  <p className="font-medium">String original:</p>
                  <p className="text-lg font-mono">{inputString}</p>
                  <p className="font-medium mt-2">String revertida:</p>
                  <p className="text-lg font-mono">{reversedString}</p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-sm border border-blue-100 dark:border-blue-900/30">
                  <p className="font-medium mb-1">Explicação:</p>
                  <ol className="list-decimal ml-4 space-y-1">
                    <li>Criamos uma pilha vazia.</li>
                    <li>
                      Percorremos cada caractere da string original e o
                      adicionamos à pilha.
                    </li>
                    <li>
                      Após adicionar todos os caracteres, criamos uma nova
                      string vazia.
                    </li>
                    <li>
                      Removemos um por um os caracteres da pilha e os
                      concatenamos na nova string.
                    </li>
                    <li>
                      Como a pilha segue o princípio LIFO, os caracteres são
                      retirados na ordem inversa, resultando na string
                      revertida.
                    </li>
                  </ol>
                </div>

                <Button onClick={() => markExerciseCompleted('reverse')}>
                  Marcar como concluído
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const DecimalToBinary = () => {
    const [decimalNumber, setDecimalNumber] = useState('');
    const [binaryResult, setBinaryResult] = useState('');
    const [steps, setSteps] = useState<string[]>([]);
    const [showSolution, setShowSolution] = useState(false);

    const convertToBinary = () => {
      if (!decimalNumber.trim() || isNaN(Number(decimalNumber))) {
        toast.error('Digite um número decimal válido');
        return;
      }

      const decimal = parseInt(decimalNumber);
      if (decimal < 0) {
        toast.error(
          'Por favor, use apenas números positivos para este exercício',
        );
        return;
      }

      // Convertendo para binário usando pilha
      const stack: number[] = [];
      const conversionSteps: string[] = [];
      let num = decimal;

      if (num === 0) {
        stack.push(0);
        conversionSteps.push(`0 ÷ 2 = 0 com resto 0 (Push 0 na pilha)`);
      }

      while (num > 0) {
        const remainder = num % 2;
        stack.push(remainder);
        conversionSteps.push(
          `${num} ÷ 2 = ${Math.floor(
            num / 2,
          )} com resto ${remainder} (Push ${remainder} na pilha)`,
        );
        num = Math.floor(num / 2);
      }

      let binary = '';
      conversionSteps.push(`\nDesempilhando os valores:`);

      while (stack.length > 0) {
        const digit = stack.pop();
        binary += digit;
        conversionSteps.push(`Pop: ${digit}`);
      }

      setBinaryResult(binary);
      setSteps(conversionSteps);
      setShowSolution(true);
      markExerciseCompleted('binary');
    };

    return (
      <div className="space-y-4">
        <p>
          Converta um número decimal para binário usando o algoritmo de divisão
          sucessiva por 2, utilizando uma pilha para armazenar os restos e
          depois desempilhando para formar o número binário.
        </p>

        <div className="flex gap-2">
          <Input
            type="number"
            value={decimalNumber}
            onChange={(e) => setDecimalNumber(e.target.value)}
            placeholder="Digite um número decimal"
            className="flex-1"
          />
          <Button onClick={convertToBinary}>Converter para Binário</Button>
        </div>

        {showSolution && (
          <div className="space-y-4 mt-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-medium">Número decimal:</p>
              <p className="text-lg font-mono">{decimalNumber}</p>
              <p className="font-medium mt-2">Representação binária:</p>
              <p className="text-lg font-mono">{binaryResult}</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-sm border border-blue-100 dark:border-blue-900/30">
              <p className="font-medium mb-2">Passos da conversão:</p>
              <pre className="whitespace-pre-wrap">{steps.join('\n')}</pre>
            </div>

            <div className="bg-muted/40 p-3 rounded text-sm">
              <p className="font-medium mb-1">Por que usar uma pilha?</p>
              <p>
                A pilha é perfeita para este algoritmo porque precisamos
                reverter a ordem dos restos. Como estamos dividindo o número do
                mais significativo para o menos significativo, mas precisamos
                construir o binário do bit mais significativo para o menos
                significativo, a pilha nos permite armazenar e depois recuperar
                os dígitos na ordem correta.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ExpressionEvaluation = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const evaluateExpression = () => {
      if (!expression.trim()) {
        toast.error('Digite uma expressão para avaliar');
        return;
      }

      try {
        // Implementação simplificada - na vida real usaríamos um parser apropriado
        // Isso é apenas para fins educacionais
        setError(null);
        const answer = eval(expression);
        setResult(answer);
        markExerciseCompleted('expression');
      } catch (err) {
        setError('Expressão inválida. Verifique a sintaxe.');
        setResult(null);
      }
    };

    return (
      <div className="space-y-4">
        <p>
          A avaliação de expressões matemáticas é uma aplicação comum de pilhas.
          Digite uma expressão matemática simples e veja o resultado da
          avaliação.
        </p>

        <div className="flex gap-2">
          <Input
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Ex: (3 + 4) * 2"
            className="flex-1"
          />
          <Button onClick={evaluateExpression}>Avaliar</Button>
        </div>

        {result !== null && !error && (
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded text-sm flex items-center gap-2 text-green-800 dark:text-green-400">
            <CheckCircle className="h-4 w-4" />
            <span>Resultado: {result}</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded text-sm flex items-center gap-2 text-red-800 dark:text-red-400">
            <X className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-muted/40 p-3 rounded text-sm">
          <p className="font-medium mb-1">Como funciona:</p>
          <p>
            Para avaliar expressões matemáticas, os compiladores e
            interpretadores usam duas pilhas:
          </p>
          <ol className="list-decimal ml-4 mt-2 space-y-1">
            <li>Pilha de operandos (números)</li>
            <li>Pilha de operadores (+, -, *, /)</li>
          </ol>
          <p className="mt-2">
            Quando um número é encontrado, ele é empilhado na pilha de
            operandos. Quando um operador é encontrado, ele é processado com
            base em sua precedência, desempilhando operandos e aplicando as
            operações conforme necessário.
          </p>
        </div>
      </div>
    );
  };

  const exercises: Exercise[] = [
    {
      id: 'parentheses',
      title: 'Validador de Parênteses',
      description:
        'Verifique se uma expressão tem parênteses, colchetes e chaves balanceados',
      difficulty: 'Fácil',
      completed: completed.includes('parentheses'),
      component: <ParenthesesValidator />,
    },
    {
      id: 'reverse',
      title: 'Inversão de String',
      description: 'Use uma pilha para inverter uma string',
      difficulty: 'Fácil',
      completed: completed.includes('reverse'),
      component: <ReverseString />,
    },
    {
      id: 'binary',
      title: 'Decimal para Binário',
      description: 'Converta números decimais para binário usando uma pilha',
      difficulty: 'Médio',
      completed: completed.includes('binary'),
      component: <DecimalToBinary />,
    },
    {
      id: 'expression',
      title: 'Avaliação de Expressões',
      description:
        'Entenda como as pilhas são usadas para avaliar expressões matemáticas',
      difficulty: 'Difícil',
      completed: completed.includes('expression'),
      component: <ExpressionEvaluation />,
    },
  ];

  const completionPercentage = Math.round(
    (completed.length / exercises.length) * 100,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Exercícios sobre Pilhas</h2>
          <p className="text-muted-foreground">
            Complete estes exercícios para testar seu conhecimento sobre pilhas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {completed.length} de {exercises.length} concluídos
          </Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={resetExercises}
            title="Reiniciar exercícios"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso</span>
          <span>{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {exercises.map((exercise) => (
          <Card
            key={exercise.id}
            className={cn(
              exercise.completed
                ? 'border-green-200 dark:border-green-900'
                : '',
            )}
          >
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="flex items-center gap-2">
                  {exercise.title}
                  {exercise.completed && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={cn(
                    exercise.difficulty === 'Fácil'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                      : exercise.difficulty === 'Médio'
                      ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
                  )}
                >
                  {exercise.difficulty}
                </Badge>
              </div>
              <CardDescription>{exercise.description}</CardDescription>
              <Separator className="mt-2" />
            </CardHeader>
            <CardContent>{exercise.component}</CardContent>
          </Card>
        ))}
      </div>

      {completed.length === exercises.length && (
        <div className="border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/20 rounded-lg p-4 flex items-center gap-3">
          <Award className="h-10 w-10 text-green-500" />
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-400">
              Parabéns!
            </h3>
            <p className="text-sm text-green-700 dark:text-green-500">
              Você completou todos os exercícios relacionados a pilhas! Isso
              demonstra uma ótima compreensão dessa estrutura de dados
              fundamental.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
