# Aprendendo Estruturas de Dados

Este projeto foi criado para facilitar o aprendizado de estruturas de dados através de visualizações interativas e exemplos práticos. Construído com Next.js, o projeto oferece uma experiência educativa prática para compreender melhor os conceitos fundamentais de estruturas de dados.

## 📚 Estruturas de Dados Abordadas

- **Lista** (Estática)
- **Pilha** (Estruturas de Dados LIFO)

## 🎯 Objetivos

- Visualizar como as estruturas de dados funcionam internamente
- Compreender operações básicas (inserção, remoção, busca)
- Analisar a complexidade de tempo e espaço
- Praticar a implementação de estruturas de dados em JavaScript/TypeScript

## 📋 Funcionalidades

- Visualizações interativas das estruturas de dados
- Exemplos de código para cada estrutura
- Exercícios práticos
- Comparação de desempenho entre diferentes estruturas
- Análise de código com IA (Gemini) - Receba feedback sobre suas implementações

## 🚀 Como Começar

Primeiro, clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/learn-data-structure-2.git
cd learn-data-structure-2
npm install
```

### Configuração da API Gemini

Para utilizar a funcionalidade de análise de código com IA, você precisa configurar a chave de API do Google Gemini:

1. Obtenha uma chave de API no [Google AI Studio](https://aistudio.google.com/)
2. Crie um arquivo `.env.local` na raiz do projeto
3. Adicione sua chave de API: `GEMINI_API_KEY=sua_chave_aqui`

Em seguida, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🧩 Estrutura do Projeto

```text
/app
  /api
    /analyze-code      # API endpoint para análise de código com Gemini
  /components         # Componentes reutilizáveis
  /data-structures    # Implementações de estruturas de dados
  /visualizations     # Componentes de visualização
  /exercises          # Exercícios práticos
  /pages              # Páginas principais da aplicação
```

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [Google Gemini](https://ai.google.dev/) - IA para análise de código
- [React Flow](https://reactflow.dev/) - Para visualizações de grafos e árvores
- [Tailwind CSS](https://tailwindcss.com/) - Para estilização
- [Prism.js](https://prismjs.com/) - Para highlight de código

## 📖 Recursos para Estudo Adicional

- [Visualgo](https://visualgo.net/) - Visualização de algoritmos e estruturas de dados
- [GeeksforGeeks](https://www.geeksforgeeks.org/) - Artigos detalhados sobre estruturas de dados
- [Cracking the Coding Interview](http://www.crackingthecodinginterview.com/) - Livro essencial para entrevistas técnicas

## 👥 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
