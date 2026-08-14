const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak
} = require('docx');
const fs = require('fs');

// ─── Helpers ────────────────────────────────────────────────────────────────
const GRAY_BG   = "E8EAF6";
const BLUE_BG   = "D5E8F0";
const GREEN_BG  = "D4EDDA";
const YELLOW_BG = "FFF9C4";
const RED_BG    = "FADBD8";
const HEADER_BG = "1565C0";

const border = { style: BorderStyle.SINGLE, size: 1, color: "BDBDBD" };
const borders = { top: border, bottom: border, left: border, right: border };

function cell(text, opts = {}) {
  const { bold = false, fill = "FFFFFF", span = 1, align = AlignmentType.LEFT } = opts;
  return new TableCell({
    borders,
    width: { size: opts.width || 2000, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    columnSpan: span,
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, bold, size: 20, font: "Arial" })]
    })]
  });
}

function hcell(text, width = 2000) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "1565C0", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, bold: true, size: 20, color: "FFFFFF", font: "Arial" })]
    })]
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 160 },
    children: [new TextRun({ text, bold: true, size: 36, color: "1565C0", font: "Arial" })]
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 28, color: "0D47A1", font: "Arial" })]
  });
}
function h3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, bold: true, size: 24, color: "1976D2", font: "Arial" })]
  });
}
function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...opts })]
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22, font: "Arial" })]
  });
}
function numbered(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "numbers", level },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22, font: "Arial" })]
  });
}
function highlight(text, fill = YELLOW_BG) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    shading: { fill, type: ShadingType.CLEAR },
    indent: { left: 360 },
    children: [new TextRun({ text, size: 22, font: "Arial", bold: true })]
  });
}
function tip(text) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    shading: { fill: YELLOW_BG, type: ShadingType.CLEAR },
    indent: { left: 360 },
    border: { left: { style: BorderStyle.THICK, size: 12, color: "F9A825" } },
    children: [new TextRun({ text: "💡 DICA: " + text, size: 22, font: "Arial" })]
  });
}
function warningBox(text) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    shading: { fill: RED_BG, type: ShadingType.CLEAR },
    indent: { left: 360 },
    border: { left: { style: BorderStyle.THICK, size: 12, color: "C62828" } },
    children: [new TextRun({ text: "⚠️ ATENÇÃO: " + text, size: 22, font: "Arial", bold: true })]
  });
}
function space() { return new Paragraph({ spacing: { after: 100 }, children: [new TextRun("")] }); }

// ─── Question builder ────────────────────────────────────────────────────────
function buildQuestion(num, enunciado, alternativas, gabarito, explicacao, dica, erros) {
  const items = [];
  items.push(new Paragraph({
    spacing: { before: 240, after: 100 },
    children: [
      new TextRun({ text: `Questão ${num} — `, bold: true, size: 24, color: "1565C0", font: "Arial" }),
    ]
  }));
  items.push(new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: enunciado, size: 22, font: "Arial" })]
  }));
  alternativas.forEach(alt => {
    const isCorrect = alt.startsWith(gabarito);
    items.push(new Paragraph({
      numbering: { reference: "none-ref", level: 0 },
      spacing: { after: 60 },
      shading: isCorrect ? { fill: GREEN_BG, type: ShadingType.CLEAR } : undefined,
      children: [new TextRun({ text: alt, size: 22, font: "Arial", bold: isCorrect })]
    }));
  });
  items.push(space());
  items.push(new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: "✅ Gabarito: ", bold: true, size: 22, color: "1B5E20", font: "Arial" }),
      new TextRun({ text: gabarito, size: 22, font: "Arial" })
    ]
  }));
  items.push(new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: "📖 Explicação: ", bold: true, size: 22, color: "0D47A1", font: "Arial" }),
      new TextRun({ text: explicacao, size: 22, font: "Arial" })
    ]
  }));
  if (erros) {
    items.push(new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: "❌ Por que as outras estão erradas: ", bold: true, size: 22, color: "B71C1C", font: "Arial" }),
        new TextRun({ text: erros, size: 22, font: "Arial" })
      ]
    }));
  }
  items.push(new Paragraph({
    spacing: { after: 140 },
    shading: { fill: YELLOW_BG, type: ShadingType.CLEAR },
    indent: { left: 240 },
    children: [new TextRun({ text: "💡 " + dica, size: 21, font: "Arial", italics: true })]
  }));
  items.push(new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" } },
    children: [new TextRun("")]
  }));
  return items;
}

// ─── Two-column comparison table helper ─────────────────────────────────────
function twoColTable(headers, rows, widths = [4680, 4680]) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ children: headers.map((h, i) => hcell(h, widths[i])) }),
      ...rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, { width: widths[i] })) }))
    ]
  });
}
function threeColTable(headers, rows, widths = [3120, 3120, 3120]) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ children: headers.map((h, i) => hcell(h, widths[i])) }),
      ...rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, { width: widths[i] })) }))
    ]
  });
}
function fourColTable(headers, rows, widths = [2340, 2340, 2340, 2340]) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ children: headers.map((h, i) => hcell(h, widths[i])) }),
      ...rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, { width: widths[i] })) }))
    ]
  });
}

// ═══════════════════════════════════════════════════════════════════════════
//  BUILD DOCUMENT
// ═══════════════════════════════════════════════════════════════════════════
const children = [];

// ── CAPA ────────────────────────────────────────────────────────────────────
children.push(
  new Paragraph({ spacing: { before: 1440, after: 120 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "ARQUITETURAS DE SOFTWARE", bold: true, size: 52, color: "1565C0", font: "Arial" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
    children: [new TextRun({ text: "Material de Estudo Completo — 35 Questões", size: 32, color: "455A64", font: "Arial" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
    children: [new TextRun({ text: "Prof. Esp. Leonardo Dias | UniFOA | Sistemas de Informação", size: 24, color: "607D8B", font: "Arial" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 1440 },
    children: [new TextRun({ text: "Padrões de Design · Docker · Contêineres · Arquiteturas Distribuídas", size: 22, italics: true, color: "78909C", font: "Arial" })] }),
  new Paragraph({ children: [new PageBreak()] })
);

// ── SUMÁRIO TEXTUAL ─────────────────────────────────────────────────────────
children.push(h1("SUMÁRIO"));
const sumario = [
  "1. Introdução aos Conteúdos Cobrados",
  "2. Resumo Teórico Completo",
  "   2.1 Padrões de Design (Design Patterns)",
  "   2.2 Docker e Contêineres",
  "   2.3 Arquiteturas Distribuídas e Microsserviços (Revisão)",
  "3. Tabelas-Resumo dos Principais Conceitos",
  "4. Questões de Fixação (35 Questões)",
  "5. Gabarito Comentado Detalhado",
  "6. Principais Erros que os Alunos Cometem",
  "7. Revisão Rápida para a Prova",
  "8. Mapa Mental (Formato Textual)",
  "9. Checklist Final de Revisão",
];
sumario.forEach(s => children.push(bullet(s)));
children.push(space(), new Paragraph({ children: [new PageBreak()] }));

// ── 1. INTRODUÇÃO ────────────────────────────────────────────────────────────
children.push(h1("1. INTRODUÇÃO AOS CONTEÚDOS COBRADOS"));
children.push(para("Este material cobre integralmente os tópicos avaliados na disciplina Arquiteturas de Software, com foco especial nos conteúdos das atividades mais recentes (Padrões de Design e Docker/Contêineres) e revisão dos fundamentos da primeira prova."));
children.push(h2("Tópicos cobertos na avaliação atual"));
const topics = [
  "Padrões de Design: conceito, benefícios, categorias (Criacionais, Estruturais, Comportamentais)",
  "Padrões específicos: Factory Method, Adapter, Observer, Singleton, Strategy, Module, Decorator",
  "Padrões mais usados no frontend JavaScript (React, Angular, Vue)",
  "Docker e Contêineres: conceito, diferença de VMs, imagens, Dockerfile",
  "Estrutura de projeto com múltiplos contêineres (Front-end, Back-end, Banco de Dados)",
  "Docker Compose: função, vantagens e uso",
  "Volumes e persistência de dados",
  "Classificação dos contêineres: estático, dinâmico, persistente",
  "Fluxo de comunicação entre contêineres",
  "REVISÃO: Microsserviços, MVC, Escalabilidade, Arquiteturas Distribuídas (máximo 2 questões)",
];
topics.forEach(t => children.push(bullet(t)));
children.push(space(), new Paragraph({ children: [new PageBreak()] }));

// ── 2. RESUMO TEÓRICO ────────────────────────────────────────────────────────
children.push(h1("2. RESUMO TEÓRICO COMPLETO"));

// 2.1 Padrões de Design
children.push(h2("2.1 Padrões de Design (Design Patterns)"));
children.push(h3("O que são?"));
children.push(para("Padrões de design são soluções gerais, reutilizáveis e testadas para problemas recorrentes no desenvolvimento de software. Não são código pronto, mas uma forma de pensar e estruturar o código — análogos a uma receita de bolo: o passo a passo validado que pode ser adaptado a diferentes contextos."));
children.push(h3("Origem"));
children.push(bullet("Conceito originado na Arquitetura Civil por Christopher Alexander (anos 1970)"));
children.push(bullet("Aplicado ao software pelo Gang of Four (GoF) em 1994 no livro Design Patterns: Elements of Reusable Object-Oriented Software"));
children.push(h3("Por que usar? — Benefícios Principais"));

children.push(twoColTable(
  ["Benefício", "Explicação"],
  [
    ["Reduz Acoplamento", "Componentes dependem menos uns dos outros. Analogia: TV que aceita qualquer controle universal."],
    ["Aumenta Reutilização", "Soluções aplicáveis em vários contextos. Analogia: carregador USB-C universal."],
    ["Facilita Manutenção", "Código organizado e previsível. Analogia: fiação em conduítes — fácil de trocar."],
    ["Linguagem Comum", "Devs se comunicam com precisão. 'Vamos usar Observer aqui' — todos entendem."],
  ]
));
children.push(space());

children.push(h3("Classificação dos Padrões (GoF) — 3 Categorias"));
children.push(threeColTable(
  ["Categoria", "Foco", "Exemplos"],
  [
    ["Criacionais", "Como criar objetos sem acoplamento forte", "Singleton, Factory Method, Abstract Factory, Builder, Prototype"],
    ["Estruturais", "Como objetos se relacionam e se organizam", "Adapter, Facade, Composite, Proxy, Decorator"],
    ["Comportamentais", "Comunicação e distribuição de responsabilidades", "Observer, Strategy, Command, State, Chain of Responsibility"],
  ]
));
children.push(space());
children.push(warningBox("Factory Method (não apenas 'Factory') pertence à categoria CRIACIONAL. Esta distinção aparece em prova!"));

children.push(h3("Padrões em Detalhes — Os Mais Cobrados"));

const patterns = [
  ["Singleton", "Criacional", "Garante que uma classe tenha somente UMA instância global. Útil para configurações, conexões de banco, logs.", "Classe Configuracao que guarda taxa de desconto — qualquer import retorna sempre a mesma instância."],
  ["Factory Method", "Criacional", "Centraliza a criação de objetos de forma padronizada, evitando repetição e escondendo a lógica de construção.", "fabricaProduto.js — função criarProduto(tipo) retorna objetos diferentes conforme o tipo."],
  ["Adapter", "Estrutural", "Permite que interfaces incompatíveis trabalhem juntas. Converte a interface de uma classe para outra esperada.", "Adaptador de tomada elétrica: plugue americano → tomada brasileira. No software: adaptar diferentes provedores de pagamento para uma interface única."],
  ["Facade", "Estrutural", "Fornece interface simplificada para um subsistema complexo.", "Módulo que expõe apenas os métodos necessários de um sistema grande."],
  ["Observer (Pub/Sub)", "Comportamental", "Define dependência 1:N onde, ao mudar estado, todos os dependentes são notificados automaticamente.", "Jornal e assinantes: quando sai nova edição, todos assinantes recebem. No código: addEventListener no browser, Redux, RabbitMQ."],
  ["Strategy", "Comportamental", "Define família de algoritmos intercambiáveis. O cliente escolhe a estratégia em tempo de execução.", "estrategiaDesconto.js: DescontoPadrao usa percentual do Singleton; DescontoFidelidade aplica 10% fixo. O consumidor troca a estratégia sem mudar o restante do código."],
  ["Command", "Comportamental", "Encapsula uma ação em um objeto executável. Permite enfileirar, registrar ou desfazer operações.", "comandoCriarPedido.js — método executar() cria o pedido, salva no repositório e notifica observadores."],
  ["Repository", "Comportamental*", "Camada de abstração entre aplicação e fonte de dados. A lógica de negócio não conhece o banco diretamente.", "repositorioPedido.js com métodos salvar() e listar(). Se migrar de memória para MongoDB, só o repositório muda."],
  ["Module", "Comportamental*", "Encapsula lógica e evita poluição do escopo global. Hoje implementado com ES Modules (import/export).", "Módulo de validação de formulários. Cada arquivo JS é naturalmente um módulo."],
  ["Decorator", "Estrutural", "Adiciona responsabilidades a objetos dinamicamente, sem herança. Em Angular/NestJS: @Component, @Injectable.", "Higher-order components (HOC) em React. Decorators em classes TypeScript/NestJS."],
];

children.push(fourColTable(
  ["Padrão", "Categoria", "O que faz", "Exemplo prático"],
  patterns.map(p => [p[0], p[1], p[2].substring(0, 120) + (p[2].length > 120 ? "..." : ""), p[3].substring(0, 100)]),
  [1400, 1100, 3700, 3160]
));
children.push(space());

children.push(h3("Padrões mais usados no Frontend JavaScript"));
children.push(para("Segundo o material da disciplina, os padrões mais frequentes no frontend (React, Angular, Vue) são:"));
children.push(bullet("Singleton — gerenciador de tema, serviço de autenticação compartilhado"));
children.push(bullet("Observer / Pub-Sub — eventos do DOM (addEventListener), Redux, Vuex"));
children.push(bullet("Strategy — validadores de senha com diferentes regras"));
children.push(bullet("Decorator — @Component e @Injectable no Angular; HOCs e hooks no React"));
children.push(bullet("Module — ES Modules (import/export), encapsulamento de lógica"));
children.push(highlight("Resposta da Questão 5: Singleton, Observer, Strategy, Decorator e Module", GREEN_BG));

children.push(h3("Diferença: Padrão de Projeto vs. Padrão Arquitetural"));
children.push(twoColTable(
  ["Padrão de Projeto (Design Pattern)", "Padrão Arquitetural"],
  [
    ["Foco em nível de código (classes e objetos)", "Foco em nível de sistema (módulos, camadas, componentes)"],
    ["Ex: Observer, Singleton, Factory", "Ex: MVC, Microsserviços, Camadas"],
    ["Analogia: design dos móveis dentro dos cômodos", "Analogia: planta da casa (como os cômodos se organizam)"],
  ]
));
children.push(space());

// 2.2 Docker e Contêineres
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h2("2.2 Docker e Contêineres"));

children.push(h3("O que é um Contêiner?"));
children.push(para("Um contêiner é um ambiente isolado que contém o código da aplicação, suas dependências, configurações e tudo necessário para executá-la corretamente. Diferente das VMs, os contêineres compartilham o kernel do sistema operacional do host, tornando-se mais leves e rápidos."));

children.push(h3("Contêiner vs. Máquina Virtual"));
children.push(fourColTable(
  ["Aspecto", "Máquina Virtual", "Contêiner", "Vantagem"],
  [
    ["Isolamento", "Total (inclui o SO)", "Parcial (compartilha o kernel)", "—"],
    ["Inicialização", "Lento (segundos/minutos)", "Rápido (frações de segundo)", "Contêiner"],
    ["Tamanho", "Gigabytes", "Megabytes", "Contêiner"],
    ["Uso de recursos", "Alto", "Baixo", "Contêiner"],
    ["Portabilidade", "Limitada", "Alta", "Contêiner"],
    ["Ideal para", "Infraestruturas tradicionais", "Microsserviços / DevOps", "—"],
  ],
  [2000, 2340, 2340, 2680]
));
children.push(space());
children.push(warningBox("A característica que explica o tamanho em MB e inicialização rápida dos contêineres é o COMPARTILHAMENTO DO KERNEL do SO do host — não é Alpine, não é Kubernetes."));

children.push(h3("Conceitos Fundamentais do Docker"));
children.push(twoColTable(
  ["Conceito", "Definição"],
  [
    ["Imagem", "Modelo imutável (receita/molde) que contém tudo o que o contêiner precisa"],
    ["Contêiner", "Instância em execução de uma imagem"],
    ["Dockerfile", "Script de instruções para construir uma imagem"],
    ["Registry", "Repositório de imagens (ex: Docker Hub)"],
    ["Docker Compose", "Ferramenta para definir e executar múltiplos contêineres de forma integrada"],
    ["Volume", "Mecanismo de persistência de dados que sobrevive ao ciclo de vida do contêiner"],
  ]
));
children.push(space());

children.push(h3("Arquitetura de 3 Contêineres (Projeto Completo)"));
children.push(para("Um projeto completo com Front-end, Back-end e Banco de Dados possui 3 contêineres, cada um com papel distinto:"));

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [1560, 2000, 1800, 1800, 2200],
  rows: [
    new TableRow({ children: [hcell("Contêiner",1560), hcell("Imagem Base",2000), hcell("Classificação",1800), hcell("Usa Volume?",1800), hcell("Função Principal",2200)] }),
    new TableRow({ children: [cell("Front-End",{width:1560}), cell("nginx:alpine",{width:2000}), cell("ESTÁTICO",{width:1800,bold:true}), cell("Não necessário",{width:1800}), cell("Servir arquivos HTML/CSS/JS ao navegador",{width:2200})] }),
    new TableRow({ children: [cell("Back-End",{width:1560}), cell("node:alpine",{width:2000}), cell("DINÂMICO / LÓGICO",{width:1800,bold:true}), cell("Opcional",{width:1800}), cell("Processar regras de negócio e responder à API",{width:2200})] }),
    new TableRow({ children: [cell("Banco de Dados",{width:1560}), cell("mongo/mysql/postgres",{width:2000}), cell("PERSISTENTE",{width:1800,bold:true}), cell("FUNDAMENTAL",{width:1800,fill:RED_BG,bold:true}), cell("Armazenar e recuperar dados da aplicação",{width:2200})] }),
  ]
}));
children.push(space());

children.push(h3("Por que o Banco de Dados precisa de Volumes?"));
children.push(para("Contêineres são efêmeros: quando são desligados ou recriados, seus dados internos se perdem. O volume mapeia um diretório do host para dentro do contêiner, garantindo que os dados do banco sejam persistidos mesmo após reinicializações."));
children.push(highlight("Volumes = garantia de que os dados não se percam quando o contêiner é desligado ou recriado.", GREEN_BG));

children.push(h3("Docker Compose — Função Principal"));
children.push(para("O Docker Compose permite definir e executar múltiplos contêineres de uma aplicação ao mesmo tempo, descrevendo toda a estrutura em um único arquivo (docker-compose.yml). Ao iniciar, cria automaticamente: os contêineres configurados E a rede interna para comunicação entre eles."));
children.push(warningBox("Docker Compose NÃO gerencia recursos de produção como CPU/memória (isso é Kubernetes). NÃO armazena imagens no Registry (isso é docker push/pull). NÃO fornece Nginx+Node em um único contêiner."));

children.push(h3("Fluxo de Comunicação entre os 3 Contêineres"));
children.push(para("Fluxo correto de uma requisição completa:"));
children.push(numbered("Usuário interage com o Front-end (interface no navegador)"));
children.push(numbered("Front-end envia requisição HTTP ao Back-end (via rede interna Docker)"));
children.push(numbered("Back-end processa as regras de negócio e consulta o Banco de Dados"));
children.push(numbered("Banco de Dados retorna os dados ao Back-end"));
children.push(numbered("Back-end devolve a resposta ao Front-end"));
children.push(numbered("Front-end exibe o resultado ao usuário"));
children.push(highlight("IMPORTANTE: O Front-end NUNCA se comunica diretamente com o Banco de Dados. O Back-end é sempre o intermediário.", RED_BG));

// 2.3 Revisão
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(h2("2.3 Revisão — Arquiteturas Distribuídas e Microsserviços"));
children.push(para("(Conteúdo da 1ª prova — máximo 2 questões de revisão incluídas no simulado)"));

children.push(twoColTable(
  ["Conceito", "Definição Rápida"],
  [
    ["Arquitetura de Software", "Estrutura fundamental de um sistema: componentes, relações e princípios que guiam seu projeto e evolução."],
    ["Modularidade", "Divisão em partes coesas e fracamente acopladas."],
    ["Escalabilidade Vertical", "Mais CPU/memória na mesma máquina."],
    ["Escalabilidade Horizontal", "Adicionar novas instâncias (Docker/Kubernetes)."],
    ["MVC", "Model (dados+lógica), View (interface), Controller (intermediário). Regras de negócio ficam no MODEL."],
    ["Microsserviços", "Serviços pequenos, independentes, comunicam-se via APIs. Escala granular."],
    ["Teorema CAP", "Consistência, Disponibilidade, Tolerância a Partições — só 2 ao mesmo tempo."],
    ["Circuit Breaker", "Evita falhas em cascata interrompendo chamadas a serviços com problema."],
    ["API Gateway", "Ponto central que organiza e roteia o acesso aos microsserviços."],
    ["SOA", "Precursor dos microsserviços. Serviços independentes com interfaces bem definidas."],
    ["Monorepo", "Todos os serviços no mesmo repositório. Facilita CI/CD unificado."],
    ["Multirepo", "Cada serviço em repositório separado. Maior autonomia por serviço."],
  ]
));
children.push(space(), new Paragraph({ children: [new PageBreak()] }));

// ── 3. TABELAS-RESUMO ────────────────────────────────────────────────────────
children.push(h1("3. TABELAS-RESUMO DOS PRINCIPAIS CONCEITOS"));

children.push(h2("Classificação dos Padrões de Design (GoF)"));
children.push(threeColTable(
  ["Padrão", "Categoria", "Analogia"],
  [
    ["Singleton", "Criacional", "Um único gerente que toma todas as decisões da empresa"],
    ["Factory Method", "Criacional", "Chef de cozinha que prepara pratos diferentes sob demanda"],
    ["Builder", "Criacional", "Construtor que monta uma casa etapa por etapa"],
    ["Adapter", "Estrutural", "Adaptador de tomada elétrica (plugue incompatível)"],
    ["Facade", "Estrutural", "Painel de controle único para sistema complexo"],
    ["Decorator", "Estrutural", "@Anotações em classes; HOC no React"],
    ["Observer", "Comportamental", "Jornal e assinantes — notificação automática"],
    ["Strategy", "Comportamental", "GPS com diferentes rotas — troca o algoritmo em tempo real"],
    ["Command", "Comportamental", "Botão desfazer (Ctrl+Z) — ação encapsulada em objeto"],
    ["Repository", "Comportamental*", "Balcão de atendimento — a aplicação não sabe de onde vêm os dados"],
  ],
  [2400, 2400, 4560]
));
children.push(space());

children.push(h2("Comparativo: Contêiner vs. VM vs. Bare Metal"));
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [2340, 2340, 2340, 2340],
  rows: [
    new TableRow({ children: [hcell("Aspecto",2340), hcell("Bare Metal",2340), hcell("VM",2340), hcell("Contêiner",2340)] }),
    ...([
      ["Isolamento", "Nenhum", "Total (SO próprio)", "Parcial (kernel compartilhado)"],
      ["Tamanho", "—", "Gigabytes", "Megabytes"],
      ["Inicialização", "Minutos", "Segundos/Minutos", "Frações de segundo"],
      ["Portabilidade", "Baixa", "Média", "Alta"],
      ["Uso ideal", "Aplicações legadas", "Infraestrutura tradicional", "Microsserviços / DevOps"],
    ]).map(r => new TableRow({ children: r.map((c, i) => cell(c, { width: 2340 })) }))
  ]
}));
children.push(space(), new Paragraph({ children: [new PageBreak()] }));

// ── 4. QUESTÕES ──────────────────────────────────────────────────────────────
children.push(h1("4. QUESTÕES DE FIXAÇÃO — 35 QUESTÕES"));
children.push(para("Instruções: selecione a alternativa correta em cada questão. O gabarito comentado está na seção 5."));
children.push(space());

const questoes = [
  // Q1
  {n:1, e:"Qual das opções representa um benefício direto do uso de padrões de design?",
   a:["A) Aumento do tamanho do código-fonte.","B) Dificuldade na manutenção do sistema.","C) Redução do acoplamento entre componentes.","D) Maior dependência entre classes e objetos."],
   g:"C",
   ex:"Padrões de design são projetados exatamente para reduzir o acoplamento, tornando os componentes mais independentes e fáceis de substituir ou modificar. As alternativas A, B e D descrevem problemas — exatamente o oposto do que os padrões resolvem.",
   erros:"A: padrões costumam reduzir código repetido, não aumentar; B: facilitam a manutenção; D: reduzem, não aumentam dependências.",
   dica:"Pense: padrões = soluções para problemas. As opções erradas descrevem PROBLEMAS, não benefícios."},
  // Q2
  {n:2, e:"O Factory Method é um padrão pertencente a qual categoria?",
   a:["A) Estrutural","B) Comportamental","C) Arquitetural","D) Criacional"],
   g:"D",
   ex:"O Factory Method é um padrão Criacional — foca em como criar objetos sem acoplamento forte entre quem cria e o que é criado. A categoria Criacional inclui: Singleton, Factory Method, Abstract Factory, Builder e Prototype.",
   erros:"A: Estrutural é sobre composição de objetos (Adapter, Facade...); B: Comportamental é sobre comunicação (Observer, Strategy...); C: 'Arquitetural' não é uma das 3 categorias GoF.",
   dica:"Mnemônico: CEC — Criacional cria, Estrutural estrutura, Comportamental comporta. Factory = cria objetos = Criacional."},
  // Q3
  {n:3, e:"O que melhor define um padrão de design?",
   a:["A) Uma solução genérica e testada para problemas recorrentes de desenvolvimento.","B) Um código reutilizável criado apenas para linguagens orientadas a objetos.","C) Um modelo de interface gráfica pronto para uso.","D) Um algoritmo que resolve qualquer problema de software automaticamente."],
   g:"A",
   ex:"Padrões de design são soluções gerais, reutilizáveis e testadas para problemas recorrentes — não são código pronto, mas uma forma de pensar e estruturar o código, aplicáveis em diferentes linguagens e contextos.",
   erros:"B: não são exclusivos de OO, embora sejam muito usados nesse paradigma; C: não são modelos de UI; D: não resolvem 'qualquer problema' automaticamente.",
   dica:"A palavra-chave da definição clássica do GoF: 'solução geral e testada para problemas recorrentes'."},
  // Q4
  {n:4, e:"Qual analogia representa corretamente o papel de um Adapter Pattern?",
   a:["A) Um jornal que envia notícias aos seus assinantes.","B) Um adaptador de tomada que permite conectar plugues de diferentes padrões.","C) Um livro de receitas que ensina a preparar diferentes bolos.","D) Um controle remoto universal que substitui o original da TV."],
   g:"B",
   ex:"O Adapter é um padrão Estrutural que permite que interfaces incompatíveis trabalhem juntas — exatamente como um adaptador de tomada que permite conectar plugues de padrões diferentes (ex: americano em tomada brasileira).",
   erros:"A: descreve o Observer (publicador e assinantes); C: descreve o Factory ou Template Method; D: descreve redução de dependência/acoplamento em geral.",
   dica:"Adapter = adaptador físico. Incompatibilidade → compatibilidade. Observer = jornal + assinantes."},
  // Q5
  {n:5, e:"Quais padrões de design são mais utilizados no frontend JavaScript?",
   a:["A) Adapter, Facade, Prototype e Builder","B) Singleton, Observer, Strategy, Decorator e Module","C) Factory, Repository, Chain of Responsibility e State","D) Repository, Adapter, Proxy e Command"],
   g:"B",
   ex:"No frontend JavaScript (React, Angular, Vue), os padrões mais frequentes são: Singleton (serviços compartilhados), Observer/Pub-Sub (eventos do DOM, Redux), Strategy (validadores), Decorator (@Component, HOCs) e Module (ES Modules).",
   erros:"A: Adapter e Facade são estruturais mas não os mais típicos do frontend; C e D: esses padrões são mais comuns no backend Node.js.",
   dica:"SSDOM: Singleton, Strategy, Decorator, Observer, Module — os 5 do frontend JS."},
  // Q6
  {n:6, e:"Na arquitetura de três contêineres (Front-End, Back-End e Banco de Dados), o contêiner de Banco de Dados é classificado como Persistente. Por que o uso de volumes é considerado fundamental para este tipo de contêiner, diferentemente dos outros?",
   a:["A) Porque os volumes garantem que as informações e os registros (dados) não se percam quando o contêiner é desligado ou recriado.","B) Porque o Front-end armazena em volumes o código-fonte da aplicação antes que ele seja servido pelo Nginx.","C) Porque o Banco de Dados precisa de volumes para se comunicar com o Back-end, garantindo a integridade da conexão.","D) Porque o Back-end necessita de um volume para salvar os logs e o Banco de Dados depende desses logs para funcionar."],
   g:"A",
   ex:"Contêineres são efêmeros: ao serem removidos ou recriados, seus dados internos se perdem. O volume é um mapeamento para o host que persiste os dados do banco independentemente do ciclo de vida do contêiner. Isso é fundamental para banco de dados, pois dados são valiosos e não podem ser perdidos.",
   erros:"B: o Nginx serve arquivos estáticos já presentes na imagem; C: volumes não são usados para comunicação entre contêineres (isso é feito pela rede interna Docker); D: logs do back-end são independentes do banco.",
   dica:"Volume = persistência. Contêiner sem volume = dado temporário que some ao desligar. Banco precisa de dado permanente."},
  // Q7
  {n:7, e:"Qual característica fundamental dos contêineres, em comparação com as Máquinas Virtuais (VMs), contribui diretamente para seu tamanho reduzido (Megabytes) e tempo de inicialização rápido?",
   a:["A) A exigência de imagens baseadas em distribuições Linux leves, como a versão Alpine, para todas as aplicações.","B) A exclusividade para uso em arquiteturas baseadas em microsserviços, que naturalmente utilizam menos recursos que infraestruturas tradicionais.","C) O compartilhamento do kernel do sistema operacional do host, o que elimina a necessidade de incluir um sistema operacional completo em cada instância.","D) O uso de ferramentas de orquestração como o Kubernetes, que otimiza o uso de recursos de rede e CPU."],
   g:"C",
   ex:"A diferença fundamental é que contêineres COMPARTILHAM o kernel do SO do host. VMs precisam de um SO completo (kernel próprio) em cada instância, por isso são da ordem de Gigabytes. Contêineres precisam apenas da aplicação e suas dependências, por isso são Megabytes e iniciam em frações de segundo.",
   erros:"A: Alpine é opcional, não obrigatório; contêineres continuam mais leves mesmo com imagens non-Alpine; B: contêineres não são exclusivos de microsserviços; D: Kubernetes é orquestração, não responsável pelo tamanho da imagem.",
   dica:"VM = apartamento com cozinha própria. Contêiner = quarto em república compartilhando cozinha (kernel). Por isso o contêiner é menor e mais rápido!"},
  // Q8
  {n:8, e:"Em um projeto que utiliza Docker para conteinerizar um Front-end e um Back-end, qual é a principal função da ferramenta Docker Compose?",
   a:["A) Definir e executar múltiplos contêineres de uma aplicação de forma integrada (ex: Back-end e Front-end), criando automaticamente a rede interna para comunicação entre eles.","B) Fornecer o servidor web Nginx para o Front-end e o interpretador Node.js para o Back-end em um único contêiner unificado.","C) Gerenciar a alocação de recursos de CPU, memória e armazenamento para os contêineres em produção, característica do Kubernetes.","D) Construir as imagens do contêiner a partir dos Dockerfiles e armazená-las no Registry (ex: Docker Hub)."],
   g:"A",
   ex:"O Docker Compose orquestra múltiplos contêineres em conjunto, descrevendo toda a estrutura no arquivo docker-compose.yml. Ao iniciar, cria automaticamente os contêineres configurados e a rede interna que permite comunicação entre eles.",
   erros:"B: cada contêiner tem sua própria imagem, não são unificados; C: gerenciamento de recursos em produção é função do Kubernetes, não do Compose; D: construir e armazenar imagens é função do docker build e docker push/Registry.",
   dica:"Compose = orquestração SIMPLES (dev/test). Kubernetes = orquestração COMPLEXA (produção em escala)."},
  // Q9
  {n:9, e:"A imagem de contêiner utilizada para o Front-End é tipicamente baseada em Nginx (por exemplo, nginx:alpine). Qual das alternativas descreve corretamente o seu papel principal e a sua classificação?",
   a:["A) É classificada como Dinâmica, sendo responsável por executar o código JavaScript no servidor e aplicar as regras de negócio.","B) É classificada como Lógica e Dinâmica, mantendo um processo ativo para processar requisições e consultar o banco de dados.","C) É classificada como Persistente, sendo o único contêiner que necessita de volumes para garantir a integridade dos dados.","D) É classificada como Estática, sendo responsável por servir os arquivos estáticos da interface (HTML, CSS e JavaScript) ao navegador do usuário."],
   g:"D",
   ex:"O Nginx é um servidor web que distribui arquivos estáticos (HTML, CSS, JS já construídos). Não executa lógica de negócio. Por isso o Front-end é classificado como ESTÁTICO — entrega conteúdo pronto ao navegador, sem processar requisições dinâmicas.",
   erros:"A e B: descrevem o Back-end (Node.js), que é dinâmico e processa lógica; C: o contêiner persistente é o Banco de Dados, não o Front-end.",
   dica:"Front = Nginx = Estático. Back = Node.js = Dinâmico. BD = mongo/mysql = Persistente. Memorize os 3 perfis!"},
  // Q10
  {n:10, e:"Em uma transação completa, onde o usuário interage com o Front-end e este precisa consultar dados no Banco de Dados, qual é o fluxo de comunicação e responsabilidade correto entre os contêineres?",
   a:["A) Front-end (envia requisição) → Banco de Dados (consulta direta), pois ambos são acessíveis externamente ao usuário.","B) Front-end (envia requisição) → Back-end (processa regras e consulta o DB) → Banco de Dados (retorna dados), e o resultado final é devolvido ao Front-end via Back-end.","C) Back-end (requisição) → Front-end (apresentação) → Banco de Dados (armazenamento).","D) Front-end (requisição) → Banco de Dados (consulta) → Back-end (processamento)."],
   g:"B",
   ex:"O fluxo correto é: Front-end → Back-end → Banco de Dados → Back-end → Front-end. O Back-end é SEMPRE o intermediário entre o Front-end e o Banco de Dados. O banco de dados não se comunica diretamente com o front-end por questões de segurança, arquitetura e responsabilidade de camadas.",
   erros:"A: front-end nunca acessa diretamente o banco — isso seria uma falha grave de segurança; C: a sequência está invertida; D: o banco não processa regras de negócio.",
   dica:"Regra de ouro: Front → Back → Banco. Nunca pule o Back-end! É como um cliente que só fala com o garçom, nunca vai direto à cozinha."},
  // Q11 — nova
  {n:11, e:"No padrão Observer, quando um evento ocorre no publicador (subject), o que acontece automaticamente com todos os seus observadores inscritos?",
   a:["A) Eles são destruídos e recriados com o novo estado.","B) Eles são notificados automaticamente e podem reagir ao evento de forma independente.","C) Apenas o primeiro observador inscrito recebe a notificação, em ordem de prioridade.","D) Eles precisam consultar periodicamente o publicador para verificar se houve mudança."],
   g:"B",
   ex:"O Observer (Pub/Sub) é um padrão comportamental que define dependência 1:N: quando o estado do publicador muda, TODOS os observadores inscritos são notificados automaticamente e cada um pode reagir de forma independente. O acoplamento é baixo pois o publicador não conhece os observadores individualmente.",
   erros:"A: observadores não são destruídos; C: todos os inscritos recebem (não só o primeiro); D: a consulta periódica (polling) é o oposto do Observer — no Observer a notificação é PUSH, não PULL.",
   dica:"Observer = PUSH automático. Polling = PULL manual. No jornal, a editora envia para os assinantes — não os assinantes que ligam perguntando se saiu nova edição!"},
  // Q12 — nova
  {n:12, e:"Qual padrão de design garante que exista apenas uma instância de uma classe em toda a aplicação, fornecendo um ponto de acesso global a essa instância?",
   a:["A) Factory Method","B) Observer","C) Singleton","D) Repository","E) Strategy"],
   g:"C",
   ex:"O Singleton é um padrão Criacional que restringe a instanciação de uma classe a um único objeto. No código: o construtor verifica se já existe uma instância e retorna ela em vez de criar nova. Útil para configurações globais, conexões de banco, gerenciadores de log.",
   erros:"A: Factory cria objetos, mas pode criar múltiplos; B: Observer gerencia notificações; D: Repository abstrai acesso a dados; E: Strategy troca algoritmos em tempo de execução.",
   dica:"Singleton = 'único' (single). Se você precisar garantir 'só um existe', pense Singleton."},
  // Q13 — nova
  {n:13, e:"No projeto pedido-simples, o padrão Strategy foi implementado para o cálculo de descontos. Qual é o principal benefício desse padrão nesse contexto?",
   a:["A) Garantir que apenas um desconto seja calculado por pedido, evitando duplicidades.","B) Permitir trocar o algoritmo de cálculo de desconto em tempo de execução sem modificar o código que consome o resultado.","C) Armazenar os descontos aplicados em um banco de dados para auditoria posterior.","D) Centralizar todas as regras de desconto em um único arquivo impossível de modificar."],
   g:"B",
   ex:"O Strategy permite isolar comportamentos intercambiáveis. No projeto: DescontoPadrao e DescontoFidelidade implementam a mesma interface, e o app.js pode escolher qual usar em tempo de execução sem saber os detalhes internos de cada algoritmo. Isso facilita adicionar novos tipos de desconto sem tocar no código existente.",
   erros:"A: não é sobre evitar duplicidades; C: armazenamento é papel do Repository; D: Strategy promove FLEXIBILIDADE, não rigidez.",
   dica:"Strategy = trocar algoritmo em tempo de execução. Pense em GPS: você muda a rota (algoritmo) sem mudar o destino (objetivo)."},
  // Q14 — nova
  {n:14, e:"O padrão Repository tem como objetivo principal:",
   a:["A) Garantir que exista apenas uma conexão com o banco de dados em toda a aplicação.","B) Criar objetos de diferentes tipos a partir de uma função ou método centralizado.","C) Servir como camada intermediária entre a aplicação e a fonte de dados, isolando o acesso ao armazenamento.","D) Notificar componentes interessados quando o estado dos dados muda."],
   g:"C",
   ex:"O Repository abstrai o acesso a dados: a lógica de negócio usa métodos como salvar() e listar() sem se importar se os dados estão em memória, arquivo ou banco relacional. Permite trocar a implementação (ex: de memória para MongoDB) sem mudar a lógica de negócio.",
   erros:"A: isso é Singleton; B: isso é Factory; D: isso é Observer.",
   dica:"Repository = balcão de pedidos. A cozinha (lógica) pede sem saber de onde vem o ingrediente (DB)."},
  // Q15 — nova
  {n:15, e:"Qual das alternativas descreve corretamente a diferença entre a imagem do contêiner de Back-End (Node.js) e a imagem do contêiner de Front-End (Nginx)?",
   a:["A) Ambas são imagens dinâmicas, a diferença é apenas a linguagem de programação utilizada.","B) A imagem do Back-End é dinâmica e executa código JavaScript no servidor; a do Front-End é estática e serve arquivos construídos ao navegador.","C) A imagem do Front-End é dinâmica porque o Nginx processa requisições em tempo real; a do Back-End é estática pois não usa banco de dados.","D) A imagem do Back-End é persistente e necessita de volumes; a do Front-End é dinâmica."],
   g:"B",
   ex:"Back-End (node:alpine): dinâmico, mantém processo ativo, processa requisições, aplica regras de negócio, acessa banco. Front-End (nginx:alpine): estático, distribui os arquivos já construídos (HTML/CSS/JS), não processa lógica de aplicação. Essa distinção é fundamental para classificar os contêineres.",
   erros:"A: não são ambas dinâmicas; C: Nginx não é dinâmico — ele serve arquivos; D: persistente é o banco de dados.",
   dica:"Node = processa = dinâmico. Nginx = entrega = estático. Banco = guarda = persistente. Três palavras para três imagens!"},
  // Q16 — nova
  {n:16, e:"Em uma aplicação conteinerizada com Docker Compose, como os contêineres de Front-end e Back-end se comunicam entre si?",
   a:["A) Por meio de endereços IP externos (públicos) expostos ao usuário final.","B) Através de uma rede interna criada automaticamente pelo Docker, onde cada contêiner é identificado pelo seu nome no arquivo docker-compose.yml.","C) Apenas por meio de variáveis de ambiente compartilhadas no mesmo arquivo .env.","D) Por chamadas diretas ao sistema operacional host, sem intermediários."],
   g:"B",
   ex:"O Docker (e o Docker Compose) cria automaticamente uma rede interna privada. Dentro dessa rede, cada contêiner é identificado pelo nome definido no docker-compose.yml (ex: 'api' e 'front'). O front-end pode chamar http://api:3000 para se comunicar com o back-end sem usar IPs externos.",
   erros:"A: IPs externos não são necessários para comunicação interna entre contêineres; C: variáveis de ambiente configuram, mas não são o canal de comunicação HTTP; D: contêineres não fazem chamadas diretas ao SO host.",
   dica:"Rede interna Docker = DNS automático. O nome do serviço no Compose vira o hostname na rede."},
  // Q17 — nova
  {n:17, e:"Qual dos seguintes NÃO é um conceito fundamental do Docker?",
   a:["A) Imagem — modelo imutável que contém tudo o que o contêiner precisa","B) Dockerfile — script de instruções para construir uma imagem","C) Pod — unidade básica de agendamento de contêineres no Docker","D) Registry — repositório de imagens como o Docker Hub"],
   g:"C",
   ex:"Pod é um conceito do KUBERNETES, não do Docker. No Kubernetes, um Pod é a menor unidade de implantação e pode conter um ou mais contêineres. No Docker puro, os conceitos fundamentais são: Imagem, Contêiner, Dockerfile e Registry.",
   erros:"A, B e D: são todos conceitos corretos e fundamentais do Docker.",
   dica:"Pod = Kubernetes. Imagem/Contêiner/Dockerfile/Registry = Docker. Não confunda as ferramentas!"},
  // Q18 — nova
  {n:18, e:"O padrão Command encapsula uma ação em um objeto. Qual é uma das principais vantagens dessa abordagem?",
   a:["A) Eliminar a necessidade de banco de dados para armazenar o histórico de operações.","B) Permitir enfileirar, registrar histórico e potencialmente desfazer (undo) operações com facilidade.","C) Garantir que apenas um comando seja executado por vez em toda a aplicação.","D) Forçar que todas as operações sejam síncronas para garantir a ordem de execução."],
   g:"B",
   ex:"O Command transforma operações em objetos, o que permite: enfileirar comandos para execução posterior (workers/filas), registrar histórico para auditoria, implementar undo/redo e enviar comandos para outros sistemas. No projeto pedido-simples, o comandoCriarPedido.js encapsula criar+salvar+notificar em um único objeto.",
   erros:"A: o banco ainda é necessário; C: não há restrição de execução única; D: Command pode ser síncrono ou assíncrono.",
   dica:"Command = Ctrl+Z habilitado. Se a ação é um objeto, você pode guardá-la, repeti-la, ou desfazê-la!"},
  // Q19 — nova
  {n:19, e:"No contexto do padrão de projeto Adapter, qual problema ele resolve?",
   a:["A) Garante que apenas uma instância de um adaptador exista na aplicação.","B) Permite que classes com interfaces incompatíveis trabalhem juntas sem modificar o código original.","C) Adiciona novas funcionalidades a uma classe existente por meio de herança múltipla.","D) Cria objetos de diferentes tipos a partir de um método centralizado."],
   g:"B",
   ex:"O Adapter é um padrão Estrutural que converte a interface de uma classe em outra esperada pelo cliente. Permite integrar sistemas com APIs diferentes sem reescrever o código existente. Ex: adaptar diferentes provedores de pagamento (PayPal, Stripe) para uma interface única na aplicação.",
   erros:"A: isso é Singleton; C: Decorator adiciona funcionalidades dinamicamente, não Adapter; D: isso é Factory.",
   dica:"Adapter = plug converter. Código antigo + nova API = Adapter no meio para fazer funcionar juntos."},
  // Q20 — nova
  {n:20, e:"No ecossistema JavaScript backend (Node.js/NestJS), qual padrão é tipicamente usado para evitar criar múltiplas conexões com o banco de dados e garantir reuso da conexão existente?",
   a:["A) Observer","B) Command","C) Singleton","D) Repository","E) Factory"],
   g:"C",
   ex:"O Singleton garante que apenas uma instância exista. No backend Node.js, a conexão com o banco (MongoDB, PostgreSQL) é um recurso caro. O Singleton garante que todos os módulos reutilizem a mesma conexão já estabelecida, evitando criar dezenas de conexões desnecessárias.",
   erros:"A: Observer gerencia eventos/notificações; B: Command encapsula ações; D: Repository abstrai acesso a dados mas não gerencia a conexão; E: Factory cria objetos variados.",
   dica:"Singleton no backend = uma conexão de banco compartilhada por todos. Economiza recursos!"},
  // Q21 — nova
  {n:21, e:"Qual das alternativas melhor descreve o padrão Decorator?",
   a:["A) Substitui uma classe por outra com interface compatível para adicionar funcionalidades.","B) Adiciona responsabilidades a objetos de forma dinâmica, sem usar herança direta, por meio de envolvimento (wrapping).","C) Garante que objetos de uma família sejam criados de forma coesa e compatível.","D) Define uma interface para criação de objetos, deixando as subclasses decidirem quais instanciar."],
   g:"B",
   ex:"O Decorator 'embrulha' um objeto com funcionalidades adicionais. No Angular/NestJS, @Component e @Injectable são decorators que adicionam metadados às classes. Em React, HOCs (Higher-Order Components) são a expressão do Decorator. A vantagem: extensibilidade sem herança.",
   erros:"A: descreve Adapter (compatibilidade de interface); C: descreve Abstract Factory (família de objetos); D: descreve Factory Method.",
   dica:"Decorator = presente embrulhado. O objeto original está lá, mas com camadas extras de funcionalidade ao redor."},
  // Q22 — nova
  {n:22, e:"Qual é a diferença fundamental entre Docker Compose e Kubernetes?",
   a:["A) Docker Compose cria imagens; Kubernetes executa contêineres.","B) Docker Compose é usado para orquestração simples em desenvolvimento/testes; Kubernetes é para orquestração complexa em produção com escala.","C) Docker Compose só suporta contêineres Linux; Kubernetes suporta qualquer sistema operacional.","D) Docker Compose cria redes internas; Kubernetes não suporta redes entre contêineres."],
   g:"B",
   ex:"Docker Compose é ideal para definir e executar múltiplos contêineres localmente (desenvolvimento, testes, CI). Kubernetes é a ferramenta de orquestração de produção, gerenciando centenas/milhares de contêineres com features como auto-scaling, self-healing, rolling updates e balanceamento de carga avançado.",
   erros:"A: ambos podem usar imagens existentes; C: ambos suportam Linux como base; D: Kubernetes também cria redes entre Pods.",
   dica:"Compose = orquestração para o desenvolvedor. Kubernetes = orquestração para o operador de produção."},
  // Q23 — nova
  {n:23, e:"No projeto pedido-simples, qual é o papel do arquivo app.js em relação aos padrões de design implementados?",
   a:["A) Implementa o padrão Singleton para garantir uma única instância da aplicação.","B) Define as estratégias de desconto que serão usadas pelos outros módulos.","C) Orquestra todos os padrões em funcionamento, criando produtos, aplicando descontos, montando pedidos e executando os comandos.","D) Atua como repositório central de dados, armazenando os pedidos criados."],
   g:"C",
   ex:"O app.js é o 'maestro' da aplicação: (1) usa Factory para criar produtos; (2) usa Strategy para aplicar descontos; (3) monta o pedido; (4) executa o Command que salva no Repository e dispara o Observer. Ele orquestra todos os padrões sem implementar nenhum deles diretamente.",
   erros:"A: o Singleton está em configuracao.js; B: as estratégias estão em estrategiaDesconto.js; D: o repositório está em repositorioPedido.js.",
   dica:"app.js = maestro da orquestra. Cada músico (padrão) sabe seu papel; o maestro coordena todos."},
  // Q24 — nova
  {n:24, e:"Um desenvolvedor percebe que, ao adicionar um novo tipo de produto ao sistema, precisou alterar código em 10 arquivos diferentes. Qual princípio/padrão, se aplicado, reduziria essa necessidade?",
   a:["A) Observer — para notificar todos os módulos quando um produto novo for criado.","B) Factory — para centralizar a criação de produtos em um único lugar, evitando que a lógica de construção se espalhe pelo código.","C) Singleton — para garantir que apenas um produto seja criado por vez.","D) Command — para encapsular a criação de produto em um objeto executável."],
   g:"B",
   ex:"O Factory centraliza a lógica de criação. Se a criação de produtos está espalhada por 10 arquivos, adicionar um novo tipo exige alterar todos os 10. Com Factory, a lógica de criação fica em um único lugar (fabricaProduto.js); adicionar novo tipo = alterar apenas o Factory. Isso aplica o princípio Open/Closed (aberto para extensão, fechado para modificação).",
   erros:"A: Observer é para notificações, não criação; C: Singleton é para instância única, não centralização de criação de tipos; D: Command encapsula ações, não cria tipos de objetos.",
   dica:"'Preciso alterar muitos lugares para criar um tipo' = sinal de que precisa de Factory!"},
  // Q25 — nova
  {n:25, e:"Qual afirmação descreve corretamente a relação entre o padrão Singleton e o padrão Strategy no projeto pedido-simples?",
   a:["A) O Strategy cria uma instância do Singleton para cada estratégia de desconto aplicada.","B) O Singleton (configuracao.js) fornece o percentual de desconto padrão que a classe DescontoPadrao (Strategy) utiliza.","C) O Singleton e o Strategy são independentes e não se relacionam no projeto.","D) O Strategy gerencia a instância única do Singleton para garantir consistência."],
   g:"B",
   ex:"No projeto pedido-simples há uma relação direta: o configuracao.js (Singleton) armazena o percentualDescontoPadrao. O estrategiaDesconto.js (Strategy) — especificamente a classe DescontoPadrao — consulta essa configuração do Singleton para calcular o desconto. O Singleton fornece o dado; o Strategy define como usá-lo.",
   erros:"A: o Strategy não cria instâncias do Singleton; C: eles se relacionam diretamente; D: o Strategy não gerencia o Singleton.",
   dica:"No mapa de dependências: Singleton → (fornece config para) → Strategy. Memorize: Singleton alimenta Strategy."},
  // Q26 — nova
  {n:26, e:"Em qual situação o uso do padrão Facade é mais indicado?",
   a:["A) Quando é necessário garantir que apenas uma instância de uma classe exista no sistema.","B) Quando um subsistema é complexo e precisa de uma interface simplificada para os clientes.","C) Quando diferentes algoritmos intercambiáveis precisam ser aplicados ao mesmo problema.","D) Quando é necessário notificar múltiplos componentes sobre mudanças de estado."],
   g:"B",
   ex:"O Facade fornece uma interface simplificada para um subsistema complexo. Em monólitos, o Facade evita que o código fique 'espaguete', expondo apenas os métodos essenciais de um módulo grande. Ex: uma classe EmailService que internamente usa SMTP, autenticação, templates e filas — mas expõe apenas enviar(destinatario, mensagem).",
   erros:"A: isso é Singleton; C: isso é Strategy; D: isso é Observer.",
   dica:"Facade = fachada de prédio. Você vê só a entrada bonita, não toda a estrutura interna."},
  // Q27 — nova
  {n:27, e:"Qual das alternativas a seguir NÃO representa uma boa prática no uso de contêineres Docker?",
   a:["A) Criar imagens pequenas, minimizando o número de camadas e usando versões alpine.","B) Usar variáveis de ambiente para configuração, evitando informações fixas no Dockerfile.","C) Armazenar credenciais de banco de dados diretamente no código da imagem para facilitar o acesso.","D) Versionar o Dockerfile e o docker-compose.yml no repositório de código."],
   g:"C",
   ex:"Armazenar credenciais diretamente no código ou na imagem é uma grave falha de segurança. Quem tiver acesso à imagem terá acesso às credenciais. A prática correta é usar variáveis de ambiente, arquivos .env (não versionados) ou sistemas de gerenciamento de segredos (Docker Secrets, Vault).",
   erros:"A, B e D: são todas boas práticas recomendadas para o uso de Docker.",
   dica:"Nunca credencial hardcoded em imagem! Use variáveis de ambiente ou Docker Secrets."},
  // Q28 — nova
  {n:28, e:"Qual é a principal diferença entre uma Imagem Docker e um Contêiner Docker?",
   a:["A) A imagem é executável; o contêiner é apenas um arquivo de configuração.","B) A imagem é um modelo imutável (molde); o contêiner é uma instância em execução desse molde.","C) A imagem armazena os dados da aplicação; o contêiner armazena o código.","D) A imagem é criada pelo Docker Compose; o contêiner é criado pelo Dockerfile."],
   g:"B",
   ex:"A imagem é o 'molde' — imutável, contém código, dependências e configurações. O contêiner é a 'instância em execução' da imagem. Uma imagem pode gerar múltiplos contêineres. Analogia: a imagem é a classe (molde); o contêiner é o objeto (instância em execução).",
   erros:"A: a imagem não é diretamente executável — ela origina contêineres; C: ambos têm código; D: o Dockerfile cria a imagem, o docker run/Compose cria o contêiner.",
   dica:"Imagem : Contêiner = Classe : Objeto = Forma de bolo : Bolo assado. O molde (imagem) pode fazer vários bolos (contêineres)!"},
  // Q29 — nova
  {n:29, e:"No padrão arquitetural MVC, onde devem ser implementadas as regras de negócio, como cálculo de desconto e validação de CPF?",
   a:["A) Na View, para que o resultado apareça imediatamente na interface.","B) No Controller, pois ele coordena toda a aplicação.","C) No Model, que representa dados e lógica de negócio.","D) No Banco de Dados, em stored procedures, para centralizar a lógica."],
   g:"C",
   ex:"No MVC, o Model é responsável pelos dados E pela lógica de negócio. Métodos como calcularDesconto() e validarCPF() pertencem ao Model. Colocar lógica no Controller gera o anti-pattern 'Fat Controller / God Object', que dificulta testes e manutenção.",
   erros:"A: View só apresenta dados, sem lógica; B: Controller apenas coordena, não deve ter lógica de negócio complexa; D: stored procedures acoplam o sistema ao banco e dificultam portabilidade.",
   dica:"Model = dado + regra. View = apresentação. Controller = coordenador. Regra de negócio = sempre no Model!"},
  // Q30 — nova
  {n:30, e:"Qual é o principal desafio das arquiteturas distribuídas relacionado ao Teorema CAP?",
   a:["A) A dificuldade de escrever código orientado a objetos em ambientes distribuídos.","B) A impossibilidade de garantir simultaneamente Consistência, Disponibilidade e Tolerância a Partições em um sistema distribuído.","C) O alto custo de licenciamento de ferramentas de monitoramento distribuído.","D) A necessidade de usar apenas bancos de dados relacionais em sistemas distribuídos."],
   g:"B",
   ex:"O Teorema CAP (Eric Brewer, 2000) afirma que sistemas distribuídos não podem garantir simultaneamente os 3 atributos: Consistência (todos os nós veem os mesmos dados), Disponibilidade (toda requisição recebe resposta) e Tolerância a Partições (sistema funciona mesmo com falha de comunicação). É necessário escolher 2 dos 3.",
   erros:"A: OOP não tem relação com o CAP; C: custo de ferramentas não é o tema; D: bancos NoSQL são comuns em distribuídos justamente pela flexibilidade com CAP.",
   dica:"CAP = C+A+P, só 2 ao mesmo tempo. SQL ≈ CA. MongoDB ≈ AP. Essa questão aparece em provas de arquitetura!"},
  // Q31 — revisão
  {n:31, e:"[REVISÃO] Qual é a principal diferença entre a Arquitetura Monolítica e a Arquitetura de Microsserviços?",
   a:["A) A arquitetura monolítica só pode ser usada com bancos de dados NoSQL.","B) No monolito, toda a aplicação está em uma única unidade; nos microsserviços, cada funcionalidade é um serviço independente que pode usar tecnologias diferentes.","C) Microsserviços são sempre mais simples de implementar e devem ser usados em qualquer projeto.","D) O monolito é exclusivo para aplicações frontend; microsserviços para backend."],
   g:"B",
   ex:"Monolito: única aplicação com todas as regras, dados e interfaces. Simples no início, difícil de escalar em sistemas grandes. Microsserviços: múltiplos serviços independentes, cada um com seu banco e tecnologia. Escala granular, mas com maior complexidade operacional (Kubernetes, CI/CD, monitoramento).",
   erros:"A: monolito é independente do tipo de banco; C: microsserviços são indicados para sistemas grandes/complexos, não para qualquer projeto; D: ambos são para sistema completo.",
   dica:"Para sistemas pequenos/equipes reduzidas → Monolito. Para sistemas grandes/equipes distribuídas → Microsserviços."},
  // Q32 — revisão
  {n:32, e:"[REVISÃO] Qual método de avaliação arquitetural analisa os impactos das decisões de arquitetura nos atributos de qualidade ANTES da implementação?",
   a:["A) TDD (Test-Driven Development)","B) ATAM (Architecture Tradeoff Analysis Method)","C) SCRUM","D) Clean Architecture","E) SOLID"],
   g:"B",
   ex:"O ATAM (Architecture Tradeoff Analysis Method) permite avaliar a arquitetura ANTES de construir o sistema, identificando riscos, trade-offs e pontos fracos nos atributos de qualidade. Complementa-se com o SAAM, que foca em manutenibilidade. São as técnicas formais de avaliação arquitetural cobertas na disciplina.",
   erros:"A: TDD é técnica de desenvolvimento com testes; C: Scrum é metodologia ágil de gestão; D: Clean Architecture é estilo de organização de código; E: SOLID são princípios de design orientado a objetos.",
   dica:"ATAM = Análise de Trade-offs Arquiteturais. Avalia ANTES de implementar. SAAM = foco em manutenibilidade."},
  // Q33 — nova
  {n:33, e:"No arquivo docker-compose.yml, ao configurar o serviço de banco de dados, qual configuração é essencial para garantir que os dados não sejam perdidos entre reinicializações do contêiner?",
   a:["A) A configuração de porta (ports) para expor o banco externamente.","B) A configuração de volumes para mapear o diretório de dados do banco para o sistema host.","C) A configuração de redes (networks) para conectar o banco ao back-end.","D) A configuração de variáveis de ambiente (environment) com usuário e senha."],
   g:"B",
   ex:"A configuração de volumes é essencial para persistência. Sem ela, ao remover ou recriar o contêiner do banco, todos os dados se perdem. Com volumes, o diretório de dados do banco (ex: /var/lib/mysql) é mapeado para uma pasta no host, persistindo os dados independentemente do ciclo de vida do contêiner.",
   erros:"A: portas são para acesso externo, não persistência; C: networks garantem comunicação, não persistência; D: variáveis de ambiente configuram acesso, não persistem dados.",
   dica:"volumes: = persistência no docker-compose.yml. Sem isso, o banco perde dados ao reiniciar!"},
  // Q34 — nova
  {n:34, e:"Qual padrão de design é mais adequado para implementar um sistema de notificações onde, ao concluir uma compra, múltiplos sistemas (e-mail, SMS, atualização de estoque, analytics) precisam ser acionados de forma desacoplada?",
   a:["A) Singleton — para garantir que apenas um notificador exista.","B) Factory — para criar instâncias dos diferentes sistemas de notificação.","C) Observer / Pub-Sub — para que os sistemas se inscrevam e sejam notificados automaticamente quando o evento de compra ocorrer.","D) Strategy — para alternar entre diferentes algoritmos de notificação em tempo de execução."],
   g:"C",
   ex:"O Observer (Publish/Subscribe) é ideal quando múltiplos componentes independentes precisam reagir ao mesmo evento. O sistema de compras (publicador) emite o evento 'compra finalizada'; cada sistema de notificação (assinante) reage de forma independente. Isso garante baixo acoplamento — adicionar novo sistema de notificação não exige mudar o código de compra.",
   erros:"A: Singleton não gerencia notificações; B: Factory criaria objetos, mas não gerencia o fluxo de eventos; D: Strategy é para algoritmos alternativos, não para múltiplos receptores simultâneos.",
   dica:"1 evento → N reações independentes = Observer. Compra finalizada → e-mail + SMS + estoque = Observer clássico!"},
  // Q35 — nova
  {n:35, e:"Analisando a estrutura de projeto docker-compose com Front-End (nginx:alpine), Back-End (node:alpine) e Banco de Dados (mongo), qual sequência descreve corretamente o estado (efêmero vs persistente) de cada contêiner?",
   a:["A) Front-End: Persistente, Back-End: Efêmero, Banco de Dados: Efêmero","B) Todos os três contêineres são efêmeros pois usam imagens Alpine.","C) Front-End: Efêmero, Back-End: Efêmero, Banco de Dados: Necessita de Persistência","D) Front-End: Persistente, Back-End: Persistente, Banco de Dados: Efêmero"],
   g:"C",
   ex:"Front-End e Back-End são efêmeros (stateless): podem ser recriados facilmente sem perda de dados, pois código e dependências estão na imagem. O Banco de Dados NECESSITA de persistência: contém os dados da aplicação que precisam sobreviver ao ciclo de vida do contêiner, exigindo volumes.",
   erros:"A e D: invertidas a classificação do banco; B: Alpine é imagem leve, não determina o estado de persistência.",
   dica:"Stateless = efêmero (pode morrer e renascer). Stateful = precisa de volume. BD é sempre stateful!"},
];

questoes.forEach(q => {
  const items = buildQuestion(q.n, q.e, q.a, q.g, q.ex, q.dica, q.erros || "");
  items.forEach(i => children.push(i));
});

children.push(new Paragraph({ children: [new PageBreak()] }));

// ── 6. PRINCIPAIS ERROS ─────────────────────────────────────────────────────
children.push(h1("6. PRINCIPAIS ERROS QUE OS ALUNOS COMETEM"));
const erros = [
  ["Confundir Factory com Factory Method", "Factory Method é o padrão GoF (Criacional). 'Factory' é uma simplificação. Em provas, quando perguntado sobre a categoria, a resposta é CRIACIONAL."],
  ["Confundir Observer com Strategy", "Observer = múltiplos componentes notificados (1:N). Strategy = trocar algoritmo em tempo de execução (1:1). Jornal+assinantes = Observer. GPS com rotas alternativas = Strategy."],
  ["Achar que Alpine é o que torna contêineres leves", "O que torna contêineres leves é o COMPARTILHAMENTO DO KERNEL. Alpine é uma distro leve, mas é opcional."],
  ["Confundir Docker Compose com Kubernetes", "Compose = orquestração simples, desenvolvimento. Kubernetes = orquestração de produção em escala."],
  ["Achar que Front-end acessa diretamente o Banco de Dados", "NUNCA. O Back-end é sempre o intermediário. Front → Back → DB."],
  ["Colocar regras de negócio no Controller (MVC)", "Regras de negócio ficam no MODEL. Controller no MVC é apenas intermediário."],
  ["Confundir Adapter com Facade", "Adapter = compatibilidade de interfaces incompatíveis. Facade = simplificação de subsistema complexo."],
  ["Achar que Volume é usado para comunicação entre contêineres", "Volume = persistência de dados. Comunicação entre contêineres = rede interna Docker."],
  ["Confundir Repository com Singleton", "Repository = abstração do banco. Singleton = instância única. No projeto, o repositório é exportado como instância única, mas são padrões diferentes."],
  ["Marcar 'Arquitetural' como categoria de padrão GoF", "GoF tem 3 categorias: Criacional, Estrutural, Comportamental. 'Arquitetural' não existe como categoria GoF."],
];
erros.forEach(([titulo, desc]) => {
  children.push(new Paragraph({
    spacing: { after: 60, before: 120 },
    children: [new TextRun({ text: "❌ " + titulo, bold: true, size: 22, font: "Arial", color: "B71C1C" })]
  }));
  children.push(new Paragraph({
    spacing: { after: 100 },
    indent: { left: 360 },
    children: [new TextRun({ text: "✅ Correto: " + desc, size: 22, font: "Arial" })]
  }));
});

children.push(new Paragraph({ children: [new PageBreak()] }));

// ── 7. REVISÃO RÁPIDA ────────────────────────────────────────────────────────
children.push(h1("7. REVISÃO RÁPIDA PARA A PROVA"));
children.push(h2("Respostas-Relâmpago — Padrões de Design"));
children.push(twoColTable(
  ["Pergunta-relâmpago", "Resposta"],
  [
    ["Factory Method pertence a qual categoria?", "CRIACIONAL"],
    ["Qual padrão usa a analogia do jornal com assinantes?", "OBSERVER"],
    ["Qual padrão converte interface incompatível?", "ADAPTER"],
    ["Qual padrão garante uma única instância global?", "SINGLETON"],
    ["Qual padrão troca algoritmos em tempo de execução?", "STRATEGY"],
    ["Quais são os 5 padrões mais usados no frontend JS?", "Singleton, Observer, Strategy, Decorator, Module"],
    ["Qual é a diferença entre Padrão de Projeto e Arquitetural?", "Projeto = nível de código; Arquitetural = nível de sistema"],
    ["Quais são as 3 categorias GoF?", "Criacional, Estrutural, Comportamental"],
    ["O Command encapsula o quê?", "Uma ação em um objeto executável"],
    ["Para que serve o Repository?", "Abstrai o acesso a dados, isolando lógica do banco"],
  ]
));
children.push(space());
children.push(h2("Respostas-Relâmpago — Docker e Contêineres"));
children.push(twoColTable(
  ["Pergunta-relâmpago", "Resposta"],
  [
    ["Por que contêineres são Megabytes e rápidos?", "Compartilham o kernel do SO do host"],
    ["Front-end usa qual imagem?", "nginx:alpine — classificação: ESTÁTICA"],
    ["Back-end usa qual imagem?", "node:alpine — classificação: DINÂMICA"],
    ["Banco de dados usa qual imagem?", "mongo/mysql/postgres — classificação: PERSISTENTE"],
    ["O que Docker Compose faz?", "Define e executa múltiplos contêineres de forma integrada"],
    ["Para que serve um volume?", "Persistir dados que não se percam ao recriar o contêiner"],
    ["Qual contêiner DEVE ter volume?", "Banco de Dados (obrigatório)"],
    ["O Front-end pode acessar o DB diretamente?", "NÃO. Sempre passa pelo Back-end."],
    ["Imagem vs. Contêiner?", "Imagem = molde (classe); Contêiner = instância em execução"],
    ["Compose vs. Kubernetes?", "Compose = dev/simples; K8s = produção/escala"],
  ]
));
children.push(space(), new Paragraph({ children: [new PageBreak()] }));

// ── 8. MAPA MENTAL ───────────────────────────────────────────────────────────
children.push(h1("8. MAPA MENTAL (FORMATO TEXTUAL)"));
children.push(h2("ARQUITETURAS DE SOFTWARE"));
const mapa = [
  "PADRÕES DE DESIGN",
  "  ├─ Definição: soluções gerais e testadas para problemas recorrentes",
  "  ├─ Origem: GoF 1994 — Design Patterns",
  "  ├─ CRIACIONAIS (como criar objetos)",
  "  │    ├─ Singleton ← uma única instância global",
  "  │    ├─ Factory Method ← centraliza criação de objetos",
  "  │    ├─ Builder, Abstract Factory, Prototype",
  "  ├─ ESTRUTURAIS (como objetos se organizam)",
  "  │    ├─ Adapter ← compatibilidade de interfaces",
  "  │    ├─ Facade ← interface simplificada de subsistema",
  "  │    ├─ Decorator ← adiciona comportamento dinamicamente",
  "  │    ├─ Proxy, Composite",
  "  ├─ COMPORTAMENTAIS (comunicação entre objetos)",
  "  │    ├─ Observer ← notificação 1:N (jornal+assinantes)",
  "  │    ├─ Strategy ← algoritmos intercambiáveis",
  "  │    ├─ Command ← ação encapsulada em objeto",
  "  │    ├─ Repository ← abstração do acesso a dados",
  "  │    ├─ Module, State, Chain of Responsibility",
  "  └─ Frontend JS: Singleton, Observer, Strategy, Decorator, Module",
  "",
  "DOCKER E CONTÊINERES",
  "  ├─ Contêiner vs VM: compartilha kernel → menor + mais rápido",
  "  ├─ Imagem = molde imutável; Contêiner = instância em execução",
  "  ├─ Dockerfile = script para construir imagem",
  "  ├─ Registry = repositório de imagens (Docker Hub)",
  "  ├─ 3 CONTÊINERES",
  "  │    ├─ Front-End (nginx:alpine) — ESTÁTICO — sem volume",
  "  │    ├─ Back-End (node:alpine) — DINÂMICO — volume opcional",
  "  │    └─ Banco de Dados (mongo/mysql) — PERSISTENTE — volume OBRIGATÓRIO",
  "  ├─ Docker Compose: orquestra múltiplos contêineres + rede interna",
  "  ├─ Volume: persistência de dados além do ciclo de vida do contêiner",
  "  └─ Fluxo: Front → Back → Banco → Back → Front",
  "",
  "REVISÃO — FUNDAMENTOS",
  "  ├─ Arquitetura = estrutura fundamental (componentes + relações + princípios)",
  "  ├─ MVC: Model (lógica+dado) / View (interface) / Controller (intermediário)",
  "  ├─ Microsserviços: serviços pequenos, independentes, comunicam via API",
  "  ├─ Teorema CAP: Consistência + Disponibilidade + Tolerância a Partições (só 2/3)",
  "  ├─ Circuit Breaker: evita falhas em cascata",
  "  ├─ API Gateway: roteamento central para microsserviços",
  "  └─ ATAM: avaliação de trade-offs arquiteturais antes da implementação",
];
mapa.forEach(linha => {
  children.push(new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text: linha, size: 20, font: "Courier New" })]
  }));
});

children.push(new Paragraph({ children: [new PageBreak()] }));

// ── 9. CHECKLIST ─────────────────────────────────────────────────────────────
children.push(h1("9. CHECKLIST FINAL DE REVISÃO"));
children.push(para("Marque cada item após revisar:"));

const checkItems = [
  "[ ] Sei definir e exemplificar os 3 tipos de padrões GoF (Criacional, Estrutural, Comportamental)",
  "[ ] Sei classificar corretamente: Factory Method → Criacional; Adapter → Estrutural; Observer → Comportamental",
  "[ ] Sei a analogia do Observer (jornal + assinantes) e do Adapter (adaptador de tomada)",
  "[ ] Sei os 5 padrões mais usados no frontend JS: Singleton, Observer, Strategy, Decorator, Module",
  "[ ] Sei a diferença entre Padrão de Projeto (código) e Padrão Arquitetural (sistema)",
  "[ ] Conheço o projeto pedido-simples: Singleton (config) → Strategy (desconto) → Factory (produto) → Command → Repository → Observer",
  "[ ] Sei por que contêineres são leves: COMPARTILHAMENTO DO KERNEL do SO host",
  "[ ] Sei diferenciar Imagem (molde) de Contêiner (instância em execução)",
  "[ ] Sei classificar os 3 contêineres: Front-End (Estático/Nginx), Back-End (Dinâmico/Node), BD (Persistente/mongo)",
  "[ ] Sei por que o BD precisa de volume: dados não se perdem ao reiniciar o contêiner",
  "[ ] Sei a função do Docker Compose: orquestrar múltiplos contêineres + criar rede interna",
  "[ ] Sei o fluxo correto: Front-End → Back-End → Banco de Dados (nunca Front → BD diretamente)",
  "[ ] Sei a diferença entre Docker Compose (dev) e Kubernetes (produção)",
  "[ ] Sei o Teorema CAP: Consistência, Disponibilidade, Tolerância a Partições (só 2/3)",
  "[ ] Sei onde ficam as regras de negócio no MVC: no MODEL",
  "[ ] Conheço o ATAM como método de avaliação arquitetural",
  "[ ] Sei que 'Arquitetural' NÃO é uma das 3 categorias GoF",
  "[ ] Sei que o Front-end nunca acessa o BD diretamente",
  "[ ] Sei que volumes NÃO são para comunicação (redes Docker fazem isso)",
  "[ ] Revisei os principais erros e sei evitá-los",
];
checkItems.forEach(item => children.push(bullet(item)));

children.push(space(), space());
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 480 },
  children: [new TextRun({ text: "Bons estudos e boa prova! 🎯", bold: true, size: 28, color: "1565C0", font: "Arial" })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Prof. Esp. Leonardo Dias | UniFOA | Arquiteturas de Software", size: 20, color: "607D8B", font: "Arial", italics: true })]
}));

// ═══════════════════════════════════════════════════════════════════════════
//  ASSEMBLE DOCUMENT
// ═══════════════════════════════════════════════════════════════════════════
const doc = new Document({
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } } },
      ]},
      { reference: "numbers", levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
      ]},
      { reference: "none-ref", levels: [
        { level: 0, format: LevelFormat.NONE, text: "", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
      ]},
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 }
      }
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:\\Users\\RYZEN\\Documents\\Github\\pessoal\\2bm\\leo\\prova\\prova.docx", buffer);
  console.log("Done!");
}).catch(e => { console.error(e); process.exit(1); });