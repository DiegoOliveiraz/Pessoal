const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak, VerticalAlign
} = require('docx');
const fs = require('fs');

const BLUE = "1F4E79";
const LIGHT_BLUE = "D6E4F0";
const MED_BLUE = "2E75B6";
const YELLOW = "FFF2CC";
const GREEN = "E2EFDA";
const RED = "FCE4D6";
const GRAY = "F2F2F2";
const DARK_GRAY = "595959";
const WHITE = "FFFFFF";

const border = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 36, color: WHITE, font: "Arial" })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 28, color: BLUE, font: "Arial" })]
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, color: MED_BLUE, font: "Arial" })]
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...opts })]
  });
}

function bold(text) {
  return new TextRun({ text, bold: true, size: 22, font: "Arial" });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial" })]
  });
}

function numbered(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "numbers", level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial" })]
  });
}

function colorBox(text, fillColor, textColor = "000000") {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: noBorders,
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: fillColor, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        children: [new Paragraph({
          spacing: { before: 60, after: 60 },
          children: [new TextRun({ text, size: 22, font: "Arial", color: textColor })]
        })]
      })]
    })]
  });
}

function colorBoxParagraphs(paragraphs, fillColor) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: noBorders,
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: fillColor, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        children: paragraphs
      })]
    })]
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function spacer() {
  return new Paragraph({ spacing: { before: 100, after: 100 }, children: [new TextRun("")] });
}

function headerBox(text) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: noBorders,
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: BLUE, type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 200, left: 240, right: 240 },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text, bold: true, size: 32, font: "Arial", color: WHITE })]
        })]
      })]
    })]
  });
}

function twoColTable(col1Header, col2Header, rows, col1Width = 4680, col2Width = 4680) {
  const headerRow = new TableRow({
    children: [
      new TableCell({
        borders, width: { size: col1Width, type: WidthType.DXA },
        shading: { fill: BLUE, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: col1Header, bold: true, size: 22, font: "Arial", color: WHITE })] })]
      }),
      new TableCell({
        borders, width: { size: col2Width, type: WidthType.DXA },
        shading: { fill: BLUE, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: col2Header, bold: true, size: 22, font: "Arial", color: WHITE })] })]
      })
    ]
  });
  const dataRows = rows.map(([c1, c2], i) => new TableRow({
    children: [
      new TableCell({
        borders, width: { size: col1Width, type: WidthType.DXA },
        shading: { fill: i % 2 === 0 ? GRAY : WHITE, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: c1, size: 22, font: "Arial" })] })]
      }),
      new TableCell({
        borders, width: { size: col2Width, type: WidthType.DXA },
        shading: { fill: i % 2 === 0 ? GRAY : WHITE, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: c2, size: 22, font: "Arial" })] })]
      })
    ]
  }));
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [col1Width, col2Width],
    rows: [headerRow, ...dataRows]
  });
}

function threeColTable(h1t, h2t, h3t, rows, w1 = 3120, w2 = 3120, w3 = 3120) {
  const headerRow = new TableRow({
    children: [h1t, h2t, h3t].map((h, idx) => new TableCell({
      borders, width: { size: [w1,w2,w3][idx], type: WidthType.DXA },
      shading: { fill: MED_BLUE, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 22, font: "Arial", color: WHITE })] })]
    }))
  });
  const dataRows = rows.map(([c1, c2, c3], i) => new TableRow({
    children: [c1, c2, c3].map((c, idx) => new TableCell({
      borders, width: { size: [w1,w2,w3][idx], type: WidthType.DXA },
      shading: { fill: i % 2 === 0 ? GRAY : WHITE, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: c, size: 22, font: "Arial" })] })]
    }))
  }));
  return new Table({
    width: { size: w1+w2+w3, type: WidthType.DXA },
    columnWidths: [w1, w2, w3],
    rows: [headerRow, ...dataRows]
  });
}

function questionBlock(num, enunciado, alternativas, gabarito, explicacao, erradas, dica) {
  const correctLetter = gabarito;
  const children = [];

  // Question header
  children.push(new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [
      new TextRun({ text: `Questão ${num}  `, bold: true, size: 24, font: "Arial", color: BLUE }),
    ]
  }));

  // Enunciado
  children.push(new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [new TextRun({ text: enunciado, size: 22, font: "Arial" })]
  }));

  // Alternativas
  alternativas.forEach(alt => {
    const isCorrect = alt.startsWith(correctLetter + ')');
    children.push(new Paragraph({
      spacing: { before: 40, after: 40 },
      indent: { left: 360 },
      children: [new TextRun({ text: alt, size: 22, font: "Arial", bold: isCorrect, color: isCorrect ? "276221" : "000000" })]
    }));
  });

  // Gabarito badge
  children.push(spacer());
  children.push(new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: noBorders,
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: GREEN, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        children: [
          new Paragraph({ children: [new TextRun({ text: `✔ Gabarito: ${correctLetter}`, bold: true, size: 22, font: "Arial", color: "276221" })] }),
          new Paragraph({ spacing: { before: 60, after: 0 }, children: [new TextRun({ text: `Explicação: ${explicacao}`, size: 20, font: "Arial" })] })
        ]
      })]
    })]
  }));

  // Por que as outras estão erradas
  if (erradas && erradas.length) {
    children.push(new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [9360],
      rows: [new TableRow({
        children: [new TableCell({
          borders: noBorders,
          width: { size: 9360, type: WidthType.DXA },
          shading: { fill: RED, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 180, right: 180 },
          children: [
            new Paragraph({ children: [new TextRun({ text: "❌ Por que as outras estão erradas:", bold: true, size: 20, font: "Arial", color: "C00000" })] }),
            ...erradas.map(e => new Paragraph({ spacing: { before: 40, after: 0 }, indent: { left: 240 }, children: [new TextRun({ text: `• ${e}`, size: 20, font: "Arial" })] }))
          ]
        })]
      })]
    }));
  }

  // Dica
  children.push(new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: noBorders,
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: YELLOW, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        children: [new Paragraph({ children: [new TextRun({ text: `💡 DICA: ${dica}`, size: 20, font: "Arial", italics: true })] })]
      })]
    })]
  }));

  children.push(spacer());
  return children;
}

// ============================================================
// QUESTIONS DATA
// ============================================================
const questions = [
  // === USE CASE DIAGRAM (from FocarMarcelo.pdf) ===
  {
    num: 1,
    enunciado: "O que é um diagrama de caso de uso?",
    alternativas: [
      "A) É um artefato que permite a representação de classes e objetos de um projeto de software.",
      "B) Um diagrama de caso de uso é uma representação da interação de um usuário com o sistema, que mostra a relação entre o usuário e os diferentes casos de uso em que o usuário está envolvido.",
      "C) É um diagrama que apresenta um modelo de implantação de arquitetura de software.",
      "D) É um diagrama que apresenta a relação entre as atividades realizadas dentro de um caso de uso específico.",
      "E) É um diagrama utilizado para representar histórias de usuários."
    ],
    gabarito: "B",
    explicacao: "O diagrama de caso de uso representa a interação dos usuários (atores) com o sistema, mostrando as funcionalidades oferecidas sob o ponto de vista externo. Ele responde: quem usa o sistema, o que o sistema oferece e quais interações existem.",
    erradas: [
      "A) Diagrama de classes representa classes e objetos — não casos de uso.",
      "C) Diagrama de implantação trata de arquitetura física/servidores.",
      "D) Diagrama de atividades descreve o fluxo interno de um processo.",
      "E) Histórias de usuário são artefatos ágeis distintos dos diagramas UML formais."
    ],
    dica: "Caso de uso = visão EXTERNA do sistema. Mostra O QUE o sistema faz (não COMO). Ator + Funcionalidade + Relação."
  },
  {
    num: 2,
    enunciado: "Qual figura geométrica representa um caso de uso em um diagrama de caso de uso?",
    alternativas: [
      "A) Elipse.",
      "B) Pessoa com traços (boneco palito).",
      "C) Uma seta com a informação <<include>>.",
      "D) Uma seta com a informação <<extend>>.",
      "E) Um retângulo."
    ],
    gabarito: "A",
    explicacao: "No padrão UML, um caso de uso é sempre representado por uma elipse (óvalo) contendo o nome da funcionalidade. O retângulo representa o limite do sistema (boundary), e o boneco palito representa o ator.",
    erradas: [
      "B) O boneco palito representa o ATOR, não o caso de uso.",
      "C/D) Setas com estereótipos são relacionamentos, não casos de uso.",
      "E) O retângulo é o limite/fronteira do sistema."
    ],
    dica: "Memorize: ELIPSE = caso de uso | BONECO = ator | RETÂNGULO = limite do sistema. É assim em toda prova de UML."
  },
  {
    num: 3,
    enunciado: "Para que serve uma relação <<extend>> no diagrama de caso de uso?",
    alternativas: [
      "A) Serve para representar uma dependência de um ator com um caso de uso.",
      "B) É utilizada como uma representação de igualdade entre casos de uso.",
      "C) É utilizada para representar que um caso de uso aumenta a funcionalidade e as características existentes em outro caso de uso.",
      "D) A relação extend é utilizada para representar que um caso de uso inclui funcionalidades em um ator, aumentando a capacidade de realizar tarefas.",
      "E) É a relação que permite informar os limites do sistema."
    ],
    gabarito: "C",
    explicacao: "O <<extend>> representa comportamento OPCIONAL: o caso de uso filho pode ou não ser executado quando o caso de uso pai é acionado. Ele 'estende' (adiciona funcionalidade extra) ao caso de uso base.",
    erradas: [
      "A) A relação entre ator e caso de uso é chamada de associação simples (linha reta).",
      "B) Igualdade não existe como conceito em diagramas de caso de uso.",
      "D) Extend não age sobre atores — é relação entre casos de uso.",
      "E) O limite é representado pelo retângulo (boundary)."
    ],
    dica: "EXTEND = OPCIONAL. 'Pode acontecer'. Ex.: 'Enviar lembrete' <<extend>> 'Agendar consulta' — o lembrete só é enviado se o sistema estiver configurado. Se sempre acontece = <<include>>."
  },
  {
    num: 4,
    enunciado: "Para que serve uma relação do tipo <<include>> no diagrama de caso de uso?",
    alternativas: [
      "A) Esta relação serve para demonstrar dependência entre um ator e um caso de uso.",
      "B) Esta relação permite representar a multiplicidade entre casos de uso.",
      "C) Esta relação demonstra um acoplamento de atores.",
      "D) Esta relação demonstra que um caso de uso é realizado antes de outro caso de uso, mas apenas quando mais de um ator existe no diagrama.",
      "E) É uma relação que implica que o comportamento do caso de uso incluído é inserido no comportamento do caso de uso inclusor."
    ],
    gabarito: "E",
    explicacao: "O <<include>> indica que o caso de uso base OBRIGATORIAMENTE executa o caso de uso incluído como parte de seu fluxo. O caso de uso incluído não pode existir sozinho — depende do caso base para ser acionado.",
    erradas: [
      "A) A dependência ator-caso de uso é uma associação simples.",
      "B) Multiplicidade é conceito de diagrama de classes, não de casos de uso.",
      "C) Atores não são acoplados entre si por <<include>>.",
      "D) Include não depende de quantidade de atores — é relação entre casos de uso."
    ],
    dica: "INCLUDE = OBRIGATÓRIO. 'Sempre acontece'. Ex.: 'Agendar consulta' <<include>> 'Verificar disponibilidade' — sempre que agendar, obrigatoriamente verifica disponibilidade."
  },
  {
    num: 5,
    enunciado: "Uma das relações presentes no diagrama de caso de uso é chamada de generalização. O que ela representa?",
    alternativas: [
      "A) Esta relação representa que dois casos de uso apresentam comportamentos gerais de todos os casos de uso do diagrama.",
      "B) Esta relação é utilizada para informar que o caso de uso remove funcionalidades de outro.",
      "C) Esta relação permite informar que o caso de uso aumenta as funcionalidades presentes em um ator.",
      "D) Esta é uma relação de pai-filho, onde o filho herda as funcionalidades do pai e torna-se mais especializado. Pode ocorrer entre atores ou entre casos de uso.",
      "E) Esta relação é utilizada somente entre casos de uso e atores para representar igualdade de funcionalidades."
    ],
    gabarito: "D",
    explicacao: "A generalização é uma relação de herança: o filho herda os comportamentos do pai e pode especializar ou sobrescrever funcionalidades. Ocorre entre atores (ex.: 'Administrador' herda de 'Usuário') ou entre casos de uso.",
    erradas: [
      "A) Generalização não representa todos os casos de uso — é uma relação específica entre dois elementos.",
      "B) Generalização adiciona/especializa, nunca remove funcionalidades.",
      "C) Age sobre casos de uso ou atores, não especificamente em atores.",
      "E) Igualdade não é um conceito de UML para diagramas de caso de uso."
    ],
    dica: "Generalização = HERANÇA da UML aplicada aos casos de uso. O filho SUBSTITUI o pai sem quebrar o fluxo — diferente do extend, onde o pai não pode ser substituído pelo filho."
  },
  {
    num: 6,
    enunciado: "Analise o seguinte cenário: 'Ao realizar uma compra em um sistema de e-commerce, o sistema sempre valida o pagamento antes de concluir o pedido. Opcionalmente, o cliente pode aplicar um cupom de desconto.' Qual é a combinação correta de relacionamentos?",
    alternativas: [
      "A) Validar Pagamento <<extend>> Realizar Compra; Aplicar Cupom <<include>> Realizar Compra.",
      "B) Realizar Compra <<include>> Validar Pagamento; Aplicar Cupom <<extend>> Realizar Compra.",
      "C) Realizar Compra <<extend>> Validar Pagamento; Aplicar Cupom <<include>> Realizar Compra.",
      "D) Validar Pagamento <<include>> Realizar Compra; Aplicar Cupom <<extend>> Realizar Compra.",
      "E) Realizar Compra <<include>> Aplicar Cupom; Realizar Compra <<extend>> Validar Pagamento."
    ],
    gabarito: "B",
    explicacao: "Validar Pagamento é SEMPRE executado (obrigatório) → <<include>>. Aplicar Cupom é OPCIONAL → <<extend>>. Na notação UML: o caso de uso principal é o que 'inclui', e o extend parte do caso de uso filho em direção ao caso base.",
    erradas: [
      "A) Inverte a lógica: validar pagamento é obrigatório (include), não opcional (extend).",
      "C) Extend e include estão invertidos para os dois.",
      "D) Inverte a direção do include: quem inclui é 'Realizar Compra', não 'Validar Pagamento'.",
      "E) Cupom é opcional (extend), não obrigatório (include)."
    ],
    dica: "Regra de ouro: OBRIGATÓRIO = include | OPCIONAL = extend. Sempre pergunte: 'Isso SEMPRE acontece?' Se sim → include. Se 'às vezes' → extend."
  },
  {
    num: 7,
    enunciado: "Em um diagrama de caso de uso, onde os atores são representados graficamente?",
    alternativas: [
      "A) Dentro do retângulo que delimita o sistema.",
      "B) Fora do retângulo que delimita o sistema.",
      "C) Dentro das elipses que representam os casos de uso.",
      "D) Dentro de retângulos menores, dentro do limite do sistema.",
      "E) Em qualquer posição, pois sua localização não tem significado semântico."
    ],
    gabarito: "B",
    explicacao: "Os atores são entidades EXTERNAS ao sistema — por isso são representados FORA do retângulo (boundary) que delimita o escopo do sistema. Eles interagem com os casos de uso que ficam dentro do boundary.",
    erradas: [
      "A) O interior do retângulo é reservado para os casos de uso (funcionalidades do sistema).",
      "C) As elipses contêm os nomes das funcionalidades, não os atores.",
      "D) Atores não ficam em retângulos internos.",
      "E) A posição tem significado claro: dentro = pertence ao sistema; fora = externo ao sistema."
    ],
    dica: "ATOR = externo → FORA do retângulo. CASO DE USO = funcionalidade do sistema → DENTRO do retângulo. Essa distinção é sempre cobrada em prova."
  },
  {
    num: 8,
    enunciado: "Qual das alternativas abaixo descreve corretamente a diferença entre <<include>> e <<extend>> no diagrama de caso de uso?",
    alternativas: [
      "A) Include é opcional e extend é obrigatório.",
      "B) Include é obrigatório e extend é opcional.",
      "C) Include e extend são sinônimos com notações diferentes.",
      "D) Include representa herança entre atores e extend representa herança entre casos de uso.",
      "E) Include é usado apenas entre atores e extend apenas entre casos de uso."
    ],
    gabarito: "B",
    explicacao: "<<include>> indica comportamento obrigatório: sempre que o caso de uso base for executado, o incluído também será. <<extend>> indica comportamento opcional: pode ou não ser executado, dependendo de uma condição.",
    erradas: [
      "A) Inversão clássica — é exatamente o contrário.",
      "C) São conceitos completamente distintos com semânticas opostas.",
      "D) Herança entre atores/casos de uso é chamada de generalização, não include/extend.",
      "E) Ambos são relações entre casos de uso, não envolvem atores diretamente."
    ],
    dica: "Macete: IN-clude = IN-dispensável (obrigatório). EX-tend = EX-tra (opcional). Ou ainda: Include = SEMPRE; Extend = TALVEZ."
  },
  {
    num: 9,
    enunciado: "Qual é o propósito principal do diagrama de caso de uso segundo a UML?",
    alternativas: [
      "A) Detalhar o algoritmo interno de cada funcionalidade do sistema.",
      "B) Representar a estrutura de banco de dados e as entidades do sistema.",
      "C) Fornecer uma visão de alto nível do sistema, transmitindo os requisitos em linguagem compreensível para stakeholders.",
      "D) Substituir completamente a documentação técnica em projetos ágeis.",
      "E) Modelar a comunicação entre objetos em tempo de execução."
    ],
    gabarito: "C",
    explicacao: "O diagrama de caso de uso tem como propósito fornecer uma visão de alto nível, acessível tanto para a equipe técnica quanto para stakeholders sem conhecimento técnico. Ele transmite o QUE o sistema faz, sem detalhar COMO.",
    erradas: [
      "A) Detalhamento de algoritmos é feito por diagramas de atividade ou sequência.",
      "B) Banco de dados é modelado pelo diagrama Entidade-Relacionamento (ER) ou diagrama de classes.",
      "D) O diagrama não substitui documentação técnica — complementa com visão de negócio.",
      "E) Comunicação entre objetos em execução é responsabilidade do diagrama de sequência."
    ],
    dica: "Diagrama de caso de uso = comunicação com stakeholders. É o diagrama mais acessível da UML — qualquer pessoa entende mesmo sem conhecimento técnico."
  },
  {
    num: 10,
    enunciado: "Um sistema hospitalar possui as seguintes funcionalidades: 'Agendar Consulta', 'Verificar Disponibilidade do Médico', 'Cadastrar Paciente' e 'Enviar Lembrete por SMS'. Sabe-se que 'Verificar Disponibilidade' e 'Cadastrar Paciente' sempre ocorrem ao agendar. O lembrete é enviado somente se o paciente optar por isso. Qual sequência de relacionamentos está CORRETA?",
    alternativas: [
      "A) Agendar Consulta <<extend>> Verificar Disponibilidade; Agendar Consulta <<extend>> Cadastrar Paciente; Enviar Lembrete <<include>> Agendar Consulta.",
      "B) Agendar Consulta <<include>> Verificar Disponibilidade; Agendar Consulta <<include>> Cadastrar Paciente; Enviar Lembrete <<extend>> Agendar Consulta.",
      "C) Verificar Disponibilidade <<include>> Agendar Consulta; Cadastrar Paciente <<include>> Agendar Consulta; Agendar Consulta <<extend>> Enviar Lembrete.",
      "D) Agendar Consulta <<include>> Enviar Lembrete; Verificar Disponibilidade <<extend>> Agendar Consulta.",
      "E) Todos os relacionamentos devem ser <<include>>, pois todas as funcionalidades são parte do agendamento."
    ],
    gabarito: "B",
    explicacao: "Verificar Disponibilidade e Cadastrar Paciente são OBRIGATÓRIOS ao agendar → <<include>> partindo de 'Agendar Consulta'. Enviar Lembrete é OPCIONAL (só se o paciente optar) → <<extend>> partindo de 'Enviar Lembrete' em direção a 'Agendar Consulta'.",
    erradas: [
      "A) Verificar e Cadastrar são obrigatórios, não opcionais — devem ser <<include>>, não <<extend>>.",
      "C) A direção do include está invertida — quem inclui é 'Agendar Consulta'.",
      "D) Lembrete é opcional (extend), não obrigatório (include).",
      "E) O lembrete é claramente opcional — não pode ser <<include>>."
    ],
    dica: "Para identificar include/extend: leia o enunciado e procure palavras como 'sempre', 'obrigatoriamente' (→ include) e 'opcionalmente', 'somente se', 'pode' (→ extend)."
  },
  {
    num: 11,
    enunciado: "Qual das alternativas abaixo descreve corretamente o conceito de 'ator' em um diagrama de caso de uso?",
    alternativas: [
      "A) É um módulo do sistema que executa uma funcionalidade automaticamente.",
      "B) É qualquer entidade que desempenha um papel em um sistema, podendo ser uma pessoa, outro sistema ou um dispositivo externo.",
      "C) É exclusivamente um usuário humano que interage com o sistema.",
      "D) É um componente interno do sistema que processa regras de negócio.",
      "E) É o administrador do banco de dados responsável por manter os dados do sistema."
    ],
    gabarito: "B",
    explicacao: "Um ator em UML é qualquer entidade EXTERNA que interage com o sistema: pode ser uma pessoa (paciente, vendedor), outro sistema (API de pagamento, sistema de notificação) ou um dispositivo (sensor, impressora). O critério é ser externo ao sistema modelado.",
    erradas: [
      "A) Módulos internos do sistema não são atores — ficam dentro do boundary.",
      "C) Atores não são exclusivamente humanos — sistemas externos também são atores.",
      "D) Componentes internos pertencem ao sistema e ficam dentro do retângulo.",
      "E) O DBA pode ser um ator se interagir com o sistema, mas a definição restrita está errada."
    ],
    dica: "Ator = EXTERNO ao sistema. Se a entidade está DENTRO do retângulo (boundary), não é ator — é uma funcionalidade do sistema."
  },
  {
    num: 12,
    enunciado: "Sobre as etapas de criação de um diagrama de caso de uso, qual é a ordem correta das primeiras quatro etapas?",
    alternativas: [
      "A) Identificar atores → Coletar informações → Conectar casos de uso → Identificar casos de uso.",
      "B) Coletar fontes de informação → Identificar potenciais atores → Identificar possíveis casos de uso → Conectar casos de uso.",
      "C) Identificar casos de uso → Identificar atores → Coletar informações → Documentar casos de uso.",
      "D) Conectar casos de uso → Identificar atores → Coletar informações → Editar casos de uso.",
      "E) Documentar casos de uso → Coletar informações → Identificar atores → Conectar casos de uso."
    ],
    gabarito: "B",
    explicacao: "A sequência correta de Bittner e Spence (2003) começa com: (1) Coletar fontes de informação, (2) Identificar potenciais atores, (3) Identificar possíveis casos de uso, (4) Conectar casos de uso. A lógica é: primeiro entender o contexto, depois identificar quem interage, depois o quê, depois como se conectam.",
    erradas: [
      "A) Identificar atores antes de coletar informações inverte a lógica — precisamos entender o domínio primeiro.",
      "C) Identificar casos de uso antes dos atores e da coleta de informações é prematuro.",
      "D) Conectar antes de identificar é impossível logicamente.",
      "E) Documentar ao final, não ao início do processo."
    ],
    dica: "Memorize: COLETA → ATORES → CASOS DE USO → CONEXÃO. Primeiro entende o contexto, depois identifica quem usa, depois o quê, depois conecta."
  },
  {
    num: 13,
    enunciado: "Qual é a diferença fundamental entre a relação de generalização e a relação <<extend>> em um diagrama de caso de uso?",
    alternativas: [
      "A) Não há diferença — são sinônimos na notação UML.",
      "B) Na generalização, o caso de uso filho pode substituir o pai sem quebrar o fluxo; no extend, o caso de uso pai não pode ser substituído pelo filho.",
      "C) Generalização é usada apenas entre atores; extend é usado apenas entre casos de uso.",
      "D) Na generalização, o comportamento é obrigatório; no extend, o comportamento é herdado.",
      "E) Extend é uma forma simplificada de generalização usada em projetos ágeis."
    ],
    gabarito: "B",
    explicacao: "Na generalização, o filho herda e especializa o pai — podendo substituí-lo sem quebrar o fluxo (princípio da substituição de Liskov aplicado a casos de uso). No extend, o caso de uso filho acrescenta funcionalidade ao pai, mas o pai continua existindo independentemente.",
    erradas: [
      "A) São relações completamente distintas com semânticas e notações diferentes.",
      "C) Generalização pode ocorrer entre atores OU entre casos de uso.",
      "D) O comportamento na generalização não é necessariamente obrigatório.",
      "E) Extend não é uma simplificação de generalização — são conceitos independentes."
    ],
    dica: "Generalização = herança (filho SUBSTITUI pai). Extend = extensão opcional (filho ACRESCENTA ao pai, mas não o substitui). Questões de prova frequentemente confundem os dois."
  },
  // === FROM Resumo_Simulado_Requisitos-1.pdf (REVISÃO - 2 questões) ===
  {
    num: 14,
    enunciado: "[REVISÃO] Um sistema de e-commerce está sendo desenvolvido. Qual das alternativas a seguir representa um requisito FUNCIONAL?",
    alternativas: [
      "A) O sistema deve processar 1.000 transações por segundo.",
      "B) O sistema deve garantir disponibilidade de 99,9% ao mês.",
      "C) O sistema deve permitir que o usuário adicione produtos ao carrinho de compras.",
      "D) O sistema deve ter tempo de resposta inferior a 3 segundos.",
      "E) O sistema deve ser compatível com os navegadores Chrome e Firefox."
    ],
    gabarito: "C",
    explicacao: "Requisitos funcionais descrevem O QUE o sistema faz — ações, tarefas e serviços. 'Adicionar produtos ao carrinho' é uma funcionalidade executada pelo usuário. As demais (A, B, D, E) são requisitos não funcionais: desempenho, disponibilidade, tempo de resposta e compatibilidade.",
    erradas: [
      "A) 1.000 transações/segundo é métrica de desempenho → RNF.",
      "B) 99,9% de disponibilidade é métrica de disponibilidade → RNF.",
      "D) Tempo de resposta é métrica mensurável de desempenho → RNF.",
      "E) Compatibilidade com navegadores é portabilidade → RNF."
    ],
    dica: "RF responde 'O que o sistema FAZ?'. RNF responde 'Como o sistema DEVE SER?'. Se der para medir em segundos, %, MB ou quantidade → é RNF."
  },
  {
    num: 15,
    enunciado: "[REVISÃO] Sobre o acrônimo INVEST para avaliação de histórias de usuário, qual característica NÃO faz parte do acrônimo?",
    alternativas: [
      "A) Independente.",
      "B) Verificável.",
      "C) Negociável.",
      "D) Estimável.",
      "E) Testável."
    ],
    gabarito: "B",
    explicacao: "INVEST = Independent (Independente), Negotiable (Negociável), Valuable (Valiosa), Estimable (Estimável), Small (Pequena), Testable (Testável). 'Verificável' não está no acrônimo INVEST — é atributo de qualidade de requisitos clássicos (SRS). O V do INVEST é 'Valuable' (Valiosa).",
    erradas: [
      "A) I = Independent (Independente) — faz parte do INVEST.",
      "C) N = Negotiable (Negociável) — faz parte do INVEST.",
      "D) E = Estimable (Estimável) — faz parte do INVEST.",
      "E) T = Testable (Testável) — faz parte do INVEST."
    ],
    dica: "V do INVEST = VALUABLE (Valiosa), NÃO Verificável. Verificável é de engenharia de requisitos clássica. No INVEST ágil, o equivalente de verificação é o T de Testable."
  },
  // === NEW QUESTIONS ON USE CASE DIAGRAMS ===
  {
    num: 16,
    enunciado: "Em um diagrama de caso de uso de um sistema bancário, o caso de uso 'Realizar Saque' sempre exige 'Autenticar Usuário'. Ocasionalmente, se o saldo for insuficiente, o sistema pode 'Oferecer Cheque Especial'. Qual é a modelagem correta?",
    alternativas: [
      "A) Autenticar Usuário <<extend>> Realizar Saque; Oferecer Cheque Especial <<include>> Realizar Saque.",
      "B) Realizar Saque <<include>> Autenticar Usuário; Oferecer Cheque Especial <<extend>> Realizar Saque.",
      "C) Realizar Saque <<extend>> Autenticar Usuário; Realizar Saque <<include>> Oferecer Cheque Especial.",
      "D) Autenticar Usuário <<include>> Realizar Saque; Oferecer Cheque Especial <<extend>> Realizar Saque.",
      "E) Realizar Saque <<include>> Autenticar Usuário; Realizar Saque <<extend>> Oferecer Cheque Especial."
    ],
    gabarito: "B",
    explicacao: "'Autenticar Usuário' é OBRIGATÓRIO ao realizar um saque → 'Realizar Saque' <<include>> 'Autenticar Usuário'. 'Oferecer Cheque Especial' é OPCIONAL (só se saldo insuficiente) → 'Oferecer Cheque Especial' <<extend>> 'Realizar Saque'.",
    erradas: [
      "A) Autenticação é obrigatória (include), não opcional (extend). Cheque especial é opcional (extend), não obrigatório (include).",
      "C) A autenticação nunca é extend — é um pré-requisito obrigatório.",
      "D) A direção do include está invertida — 'Realizar Saque' inclui 'Autenticar', não o contrário.",
      "E) A alternativa E está correta na primeira parte, mas errada na segunda: o extend parte do filho (Cheque Especial) em direção ao pai (Realizar Saque), não o contrário."
    ],
    dica: "A direção do extend: a seta parte do caso filho (opcional) em direção ao caso base. A direção do include: a seta parte do caso base em direção ao caso incluído."
  },
  {
    num: 17,
    enunciado: "Num sistema de biblioteca, o 'Funcionário' pode 'Cadastrar Exemplares', 'Cadastrar Usuários' e 'Cadastrar Reservas'. Um 'Administrador' herda todas as funcionalidades do 'Funcionário' e também pode 'Gerar Relatórios'. Qual relação representa corretamente a hierarquia entre os atores?",
    alternativas: [
      "A) Funcionário <<include>> Administrador.",
      "B) Administrador <<extend>> Funcionário.",
      "C) Generalização: Administrador herda de Funcionário.",
      "D) Funcionário <<extend>> Administrador.",
      "E) Administrador <<include>> Funcionário."
    ],
    gabarito: "C",
    explicacao: "A hierarquia entre atores é representada por GENERALIZAÇÃO (herança). O Administrador é uma especialização do Funcionário — herda todas as suas interações e acrescenta 'Gerar Relatórios'. <<include>> e <<extend>> são relações entre casos de uso, não entre atores.",
    erradas: [
      "A) <<include>> é relação entre casos de uso, não entre atores.",
      "B) <<extend>> é relação entre casos de uso, não entre atores.",
      "D) <<extend>> entre atores não existe como conceito UML padrão.",
      "E) <<include>> entre atores não existe como conceito UML padrão."
    ],
    dica: "Herança entre ATORES = GENERALIZAÇÃO. Herança entre CASOS DE USO = também generalização. Include e extend NUNCA se aplicam a atores — são exclusivos para relacionamentos entre casos de uso."
  },
  {
    num: 18,
    enunciado: "Qual das afirmativas a seguir está INCORRETA sobre o diagrama de caso de uso?",
    alternativas: [
      "A) O diagrama de caso de uso pode ser usado tanto pela equipe de desenvolvimento quanto pelos stakeholders.",
      "B) O diagrama de caso de uso detalha como cada funcionalidade é internamente implementada.",
      "C) Os atores representam entidades externas que interagem com o sistema.",
      "D) O limite do sistema (boundary) define o escopo das funcionalidades modeladas.",
      "E) O diagrama de caso de uso é amplamente utilizado na criação de casos de teste."
    ],
    gabarito: "B",
    explicacao: "O diagrama de caso de uso descreve O QUE o sistema faz sob a perspectiva do usuário, sem detalhar COMO é implementado internamente. O detalhamento interno é responsabilidade de outros diagramas UML, como o diagrama de sequência ou de atividades.",
    erradas: [
      "A) Correto — é uma ferramenta de comunicação para equipes técnicas e não técnicas.",
      "C) Correto — atores são entidades externas ao boundary do sistema.",
      "D) Correto — o retângulo define o escopo e o que pertence ou não ao sistema.",
      "E) Correto — casos de uso servem de base para elaboração de casos de teste."
    ],
    dica: "Diagrama de caso de uso = visão EXTERNA (O quê). Diagrama de sequência = visão INTERNA (Como). Essa distinção é clássica em questões de análise e projeto de sistemas."
  },
  {
    num: 19,
    enunciado: "Em que situação o diagrama de caso de uso se mostra mais eficaz como ferramenta de comunicação?",
    alternativas: [
      "A) Quando a equipe precisa detalhar os algoritmos de cada módulo do sistema.",
      "B) Quando é necessário apresentar as funcionalidades do sistema para stakeholders que não possuem conhecimento técnico.",
      "C) Quando o foco é na modelagem física do banco de dados.",
      "D) Quando a equipe precisa documentar a comunicação entre objetos em tempo de execução.",
      "E) Quando o projeto segue metodologias ágeis e não utiliza documentação formal."
    ],
    gabarito: "B",
    explicacao: "O diagrama de caso de uso é especialmente eficaz para comunicar funcionalidades a stakeholders não técnicos, pois utiliza linguagem visual simples. Pesquisas mostraram que eles transmitem a intenção do sistema de forma mais simplificada do que diagramas de classes.",
    erradas: [
      "A) Algoritmos são detalhados em fluxogramas ou pseudocódigo, não em diagramas de caso de uso.",
      "C) Banco de dados usa diagrama ER (Entidade-Relacionamento), não caso de uso.",
      "D) Comunicação entre objetos usa diagrama de sequência ou colaboração.",
      "E) Mesmo em metodologias ágeis, diagramas de caso de uso podem complementar histórias de usuário."
    ],
    dica: "Caso de uso = 'linguagem de negócio'. É o diagrama mais acessível da UML, ideal para reuniões com clientes e apresentações para stakeholders não técnicos."
  },
  {
    num: 20,
    enunciado: "Qual elemento do diagrama de caso de uso define o escopo do sistema, separando o que é interno do que é externo?",
    alternativas: [
      "A) As elipses que representam os casos de uso.",
      "B) As setas de relacionamento entre casos de uso.",
      "C) O retângulo que envolve todos os casos de uso.",
      "D) O boneco palito que representa os atores.",
      "E) Os estereótipos <<include>> e <<extend>>."
    ],
    gabarito: "C",
    explicacao: "O retângulo (boundary ou limite do sistema) define o escopo do que o sistema engloba. Tudo que está DENTRO representa funcionalidades do sistema (casos de uso). Tudo que está FORA representa entidades externas (atores).",
    erradas: [
      "A) As elipses representam funcionalidades, não o escopo.",
      "B) As setas representam relacionamentos, não o escopo.",
      "D) Os bonecos representam atores externos — ficam fora do boundary.",
      "E) Estereótipos são tipos de relacionamentos, não delimitadores de escopo."
    ],
    dica: "Boundary (retângulo) = fronteira do sistema. Memorize: DENTRO do retângulo = funcionalidades do sistema. FORA = atores (mundo externo)."
  },
  {
    num: 21,
    enunciado: "Em que contexto o uso combinado de histórias de usuário E diagrama de caso de uso é mais recomendado?",
    alternativas: [
      "A) Sempre que o projeto seguir o modelo cascata (Waterfall).",
      "B) Quando a história do usuário é simples e pode ser documentada em poucas palavras.",
      "C) Quando a história do usuário é complexa e cheia de detalhes, necessitando de representação visual complementar.",
      "D) Apenas quando o cliente exigir documentação formal aprovada por auditoria.",
      "E) Quando o diagrama de caso de uso for obrigatório pela norma UML."
    ],
    gabarito: "C",
    explicacao: "Segundo o material didático, quando uma história de usuário é complexa e possui muitos detalhes, o diagrama de caso de uso combinado com a história de usuário descrita é uma boa opção — o diagrama fornece visualização estrutural enquanto a história captura o contexto de negócio.",
    erradas: [
      "A) O uso não é exclusivo do modelo cascata — pode ser usado em qualquer metodologia.",
      "B) Para histórias simples, a própria história de usuário é suficiente — o diagrama seria overhead desnecessário.",
      "D) A auditoria não é critério para decidir sobre diagramas de caso de uso.",
      "E) UML não obriga o uso de diagramas de caso de uso em nenhum cenário."
    ],
    dica: "Diagrama de caso de uso e user story NÃO são excludentes. Para histórias simples: só a user story basta. Para histórias complexas: combinação dos dois é mais eficaz."
  },
  {
    num: 22,
    enunciado: "Um analista modela um sistema e percebe que dois casos de uso ('Validar CPF' e 'Validar CNPJ') possuem comportamento muito similar, mas cada um é específico para um tipo de cliente. Qual relação UML é mais adequada para representar essa situação?",
    alternativas: [
      "A) 'Validar CPF' <<include>> 'Validar CNPJ'.",
      "B) 'Validar CPF' <<extend>> 'Validar CNPJ'.",
      "C) Generalização: ambos herdam de 'Validar Cliente', que representa o comportamento comum.",
      "D) Associação direta entre os dois casos de uso sem estereótipos.",
      "E) Dependência: 'Validar CNPJ' depende de 'Validar CPF'."
    ],
    gabarito: "C",
    explicacao: "Quando dois casos de uso compartilham comportamento comum mas são especializações distintas, a generalização é a relação adequada. Cria-se um caso de uso pai ('Validar Cliente') e cada um dos filhos ('Validar CPF', 'Validar CNPJ') herda e especializa.",
    erradas: [
      "A) <<include>> implica que um sempre executa o outro, o que não é o caso aqui.",
      "B) <<extend>> implica extensão opcional de um sobre o outro, também inadequado.",
      "D) Associação direta entre casos de uso não é uma relação UML padronizada.",
      "E) Dependência não captura a semântica de herança/especialização do cenário."
    ],
    dica: "Comportamento COMUM entre casos de uso = candidato a GENERALIZAÇÃO (cria um caso 'pai' abstrato). Include/extend são para comportamentos obrigatórios/opcionais dentro de um fluxo, não para especialização."
  },
  {
    num: 23,
    enunciado: "Sobre as técnicas de coleta de informações para elaborar um diagrama de caso de uso, qual das seguintes NÃO é citada como técnica válida?",
    alternativas: [
      "A) Observar os funcionários no trabalho.",
      "B) Realizar entrevistas com especialistas do domínio.",
      "C) Criar o banco de dados do sistema e analisar suas tabelas.",
      "D) Revisar formulários existentes, documentação e manuais.",
      "E) Brainstorming com todos os envolvidos."
    ],
    gabarito: "C",
    explicacao: "Criar o banco de dados é uma atividade de projeto/implementação, não de levantamento de requisitos para o diagrama de caso de uso. As técnicas válidas incluem: observação, entrevistas, brainstorming, revisão de documentação, participação nos processos, sondagens e discussão com especialistas.",
    erradas: [
      "A) Observar funcionários é técnica válida e recomendada — revela processos não verbalizados.",
      "B) Entrevistas com especialistas é uma das principais técnicas de elicitação.",
      "D) Revisar documentação existente é essencial para entender o contexto e regras de negócio.",
      "E) Brainstorming é citado explicitamente como técnica válida no material didático."
    ],
    dica: "Técnicas para diagrama de caso de uso são as mesmas de elicitação de requisitos: entrevistas, observação, brainstorming, análise de documentos. Banco de dados = projeto, não levantamento."
  },
  {
    num: 24,
    enunciado: "Qual das seguintes afirmativas sobre o diagrama de caso de uso é CORRETA?",
    alternativas: [
      "A) O diagrama substitui completamente a necessidade de outros diagramas UML.",
      "B) O diagrama de caso de uso só é válido em projetos que não utilizam metodologias ágeis.",
      "C) O diagrama de caso de uso pode ser usado na criação de casos de teste.",
      "D) O diagrama de caso de uso detalha a lógica de programação de cada funcionalidade.",
      "E) Apenas analistas de sistemas podem interpretar um diagrama de caso de uso."
    ],
    gabarito: "C",
    explicacao: "O diagrama de caso de uso é amplamente utilizado na criação de casos de teste, pois cada caso de uso pode gerar um ou mais cenários de teste. Além disso, é acessível a qualquer stakeholder, não somente a analistas.",
    erradas: [
      "A) O diagrama oferece visão de alto nível — outros diagramas (sequência, classes, atividades) complementam com detalhes.",
      "B) Mesmo em metodologias ágeis o diagrama pode complementar histórias de usuário.",
      "D) Lógica de programação é detalhada por diagramas de atividade, sequência ou pseudocódigo.",
      "E) A grande vantagem do diagrama de caso de uso é justamente ser compreensível por não técnicos."
    ],
    dica: "Caso de uso → casos de teste. Cada caso de uso se transforma em um ou mais cenários de teste. Isso é um uso prático muito cobrado em prova."
  },
  {
    num: 25,
    enunciado: "Considere o enunciado: 'Os pacientes visitam o médico na clínica para exames médicos.' Ao modelar esse sistema em um diagrama de caso de uso, quais são os atores identificados?",
    alternativas: [
      "A) Apenas 'paciente'.",
      "B) Apenas 'médico'.",
      "C) 'Paciente' e 'médico'.",
      "D) 'Paciente', 'médico' e 'exame médico'.",
      "E) 'Clínica' e 'exame médico'."
    ],
    gabarito: "C",
    explicacao: "Para identificar atores, procura-se termos que retratam funções/papéis no sistema. No enunciado, 'médico' e 'paciente' são os papéis identificados. 'Exame médico' é um processo (caso de uso) e 'clínica' é o contexto (pode ser o sistema), não um ator.",
    erradas: [
      "A) O médico também é ator — interage diretamente com o sistema.",
      "B) O paciente também é ator — solicita e participa dos processos.",
      "D) 'Exame médico' é uma funcionalidade (caso de uso), não um ator.",
      "E) 'Clínica' representa o sistema/contexto; 'exame médico' é funcionalidade — nenhum dos dois é ator."
    ],
    dica: "Para identificar atores: procure PAPÉIS (substantivos que representam funções de quem interage com o sistema). 'Paciente', 'médico', 'vendedor', 'administrador' são atores típicos."
  },
  {
    num: 26,
    enunciado: "Em um sistema de matrículas universitário, quando um aluno tenta se matricular em uma disciplina, o sistema SEMPRE verifica se há pré-requisitos cumpridos. Se o aluno tiver acúmulo de débitos, o sistema PODE bloquear a matrícula. Qual é a modelagem correta?",
    alternativas: [
      "A) Matricular em Disciplina <<extend>> Verificar Pré-requisitos; Bloquear Matrícula <<include>> Matricular em Disciplina.",
      "B) Matricular em Disciplina <<include>> Verificar Pré-requisitos; Bloquear Matrícula <<extend>> Matricular em Disciplina.",
      "C) Verificar Pré-requisitos <<include>> Matricular em Disciplina; Matricular em Disciplina <<extend>> Bloquear Matrícula.",
      "D) Matricular em Disciplina <<extend>> Verificar Pré-requisitos; Matricular em Disciplina <<extend>> Bloquear Matrícula.",
      "E) Verificar Pré-requisitos <<extend>> Matricular em Disciplina; Bloquear Matrícula <<extend>> Matricular em Disciplina."
    ],
    gabarito: "B",
    explicacao: "Verificar pré-requisitos é OBRIGATÓRIO (sempre ocorre) → 'Matricular' <<include>> 'Verificar Pré-requisitos'. Bloquear matrícula é OPCIONAL (só se houver débitos) → 'Bloquear Matrícula' <<extend>> 'Matricular em Disciplina'.",
    erradas: [
      "A) Verificar pré-requisitos é obrigatório (include), não opcional (extend).",
      "C) A direção do include está invertida.",
      "D) Verificar pré-requisitos é obrigatório — não pode ser extend.",
      "E) Verificar pré-requisitos é obrigatório — não pode ser extend."
    ],
    dica: "Palavras-chave para identificar o relacionamento: 'SEMPRE', 'obrigatoriamente' → include. 'PODE', 'às vezes', 'se houver', 'opcionalmente' → extend."
  },
  {
    num: 27,
    enunciado: "Qual das alternativas descreve corretamente o que deve ser feito APÓS identificar os atores potenciais na elaboração de um diagrama de caso de uso?",
    alternativas: [
      "A) Documentar imediatamente os casos de uso na especificação formal.",
      "B) Identificar os possíveis casos de uso que os atores podem acionar.",
      "C) Criar o banco de dados do sistema para suportar os atores.",
      "D) Verificar a visão final do diagrama para confirmar se está correto.",
      "E) Editar os casos de uso existentes para remover redundâncias."
    ],
    gabarito: "B",
    explicacao: "Conforme a sequência de Bittner e Spence: após identificar os atores (etapa 2), deve-se identificar os possíveis casos de uso (etapa 3), respondendo: 'De quais bens e serviços os atores podem recorrer?' Só depois conectam-se casos de uso e atores (etapa 4).",
    erradas: [
      "A) A documentação formal (etapa 8) vem muito depois da identificação de atores.",
      "C) Banco de dados é atividade de projeto, não de modelagem de caso de uso.",
      "D) Verificar a visão (etapa 10) é a última etapa do processo.",
      "E) Editar casos de uso (etapa 7) vem após a conexão e descoberta de mais casos de uso."
    ],
    dica: "Ordem das etapas: Coletar → Atores → Casos de Uso → Conectar → Descrever Atores → Mais Casos → Editar → Documentar → Relacionar → Verificar. Após atores: sempre 'identificar casos de uso'."
  },
  {
    num: 28,
    enunciado: "No contexto do diagrama de caso de uso, o que é o 'limite do sistema' (system boundary)?",
    alternativas: [
      "A) A quantidade máxima de atores que um sistema pode suportar.",
      "B) O número de casos de uso que podem ser modelados em um único diagrama.",
      "C) O retângulo que envolve todos os casos de uso, definindo o escopo e o alcance do sistema.",
      "D) A lista de requisitos não funcionais do sistema.",
      "E) O conjunto de restrições técnicas que limitam o desenvolvimento do sistema."
    ],
    gabarito: "C",
    explicacao: "O limite do sistema (system boundary) é representado por um retângulo que envolve todos os casos de uso do sistema, definindo claramente o que pertence ao escopo do sistema e o que é externo. Um sistema não pode ter funcionalidades infinitas, portanto o boundary é essencial.",
    erradas: [
      "A) Não existe limite numérico de atores definido pelo boundary.",
      "B) O número de casos de uso em um diagrama não é definido pelo conceito de boundary.",
      "D) Requisitos não funcionais são documentados separadamente, não pelo boundary.",
      "E) Restrições técnicas são requisitos não funcionais, não o boundary do diagrama."
    ],
    dica: "Boundary (retângulo) = ESCOPO do sistema. Tudo DENTRO = pertence ao sistema. Tudo FORA = externo ao sistema. É a fronteira visual que separa o sistema do mundo externo."
  },
  {
    num: 29,
    enunciado: "Qual das afirmativas a seguir sobre a relação <<include>> está INCORRETA?",
    alternativas: [
      "A) O caso de uso incluído é executado sempre que o caso de uso base for acionado.",
      "B) O caso de uso incluído pode existir sozinho, independentemente do caso de uso base.",
      "C) A direção da seta aponta do caso de uso base para o caso de uso incluído.",
      "D) O estereótipo <<include>> identifica o tipo do relacionamento.",
      "E) O include é usado para representar comportamentos obrigatórios compartilhados."
    ],
    gabarito: "B",
    explicacao: "O caso de uso incluído NÃO pode existir sozinho — ele depende do caso de uso base para ser acionado. Por exemplo, 'Verificar disponibilidade' não faz sentido sem 'Agendar consulta'. Esta é uma regra fundamental do <<include>>.",
    erradas: [
      "A) Correto — o include é sempre executado junto com o caso base.",
      "C) Correto — a seta parte do caso base (que inclui) em direção ao caso incluído.",
      "D) Correto — <<include>> é o estereótipo que identifica esse tipo de relacionamento.",
      "E) Correto — include representa comportamentos obrigatórios reutilizáveis entre casos de uso."
    ],
    dica: "O caso de uso INCLUÍDO não vive sozinho — é dependente do caso base. Diferente do extend, onde o caso de uso filho pode ser visto de forma mais independente."
  },
  {
    num: 30,
    enunciado: "Identifique o único caso de uso que NÃO deve ter relação <<include>> com 'Realizar Login' em um sistema de internet banking: 'Consultar Saldo', 'Realizar Transferência', 'Pagar Boleto' e 'Acessar Página Inicial do Banco'.",
    alternativas: [
      "A) Consultar Saldo.",
      "B) Realizar Transferência.",
      "C) Pagar Boleto.",
      "D) Acessar Página Inicial do Banco.",
      "E) Todos devem ter <<include>> com 'Realizar Login'."
    ],
    gabarito: "D",
    explicacao: "'Acessar Página Inicial do Banco' é uma funcionalidade pública que não requer autenticação — qualquer usuário acessa sem login. As demais (Consultar Saldo, Realizar Transferência, Pagar Boleto) requerem autenticação obrigatória, configurando <<include>> com 'Realizar Login'.",
    erradas: [
      "A) Consultar saldo requer login obrigatório → deve ter <<include>>.",
      "B) Transferência requer login obrigatório → deve ter <<include>>.",
      "C) Pagar boleto requer login obrigatório → deve ter <<include>>.",
      "E) A página inicial é pública — não requer login, portanto não deve ter <<include>>."
    ],
    dica: "Em sistemas bancários, use <<include>> com 'Realizar Login' apenas para funcionalidades que EXIGEM autenticação. Páginas públicas, informativos e acesso geral não exigem login."
  },
  {
    num: 31,
    enunciado: "Em um sistema de vendas online, o analista modelou: 'Realizar Compra <<include>> Validar Pagamento' e 'Aplicar Cupom <<extend>> Realizar Compra'. Qual das afirmativas está CORRETA sobre esse modelo?",
    alternativas: [
      "A) O modelo está errado porque <<include>> nunca parte do caso de uso principal.",
      "B) O modelo está errado porque cupom deveria ser <<include>>, já que sempre pode ser usado.",
      "C) O modelo está correto: validar pagamento é obrigatório e aplicar cupom é opcional.",
      "D) O modelo está errado porque <<extend>> nunca parte do caso de uso filho.",
      "E) O modelo está correto, mas a direção das setas deveria ser invertida em ambos os casos."
    ],
    gabarito: "C",
    explicacao: "O modelo está correto. 'Realizar Compra' inclui obrigatoriamente 'Validar Pagamento' (toda compra exige validação). 'Aplicar Cupom' estende 'Realizar Compra' de forma opcional (nem toda compra usa cupom). Tanto a semântica quanto a direção das setas estão corretas.",
    erradas: [
      "A) O <<include>> parte sim do caso de uso principal (base) em direção ao incluído — está correto no modelo.",
      "B) Cupom é opcional por natureza — <<extend>> está correto.",
      "D) O <<extend>> parte do caso de uso filho (Aplicar Cupom) em direção ao caso base (Realizar Compra) — está correto.",
      "E) As direções das setas no modelo apresentado estão corretas — não precisam ser invertidas."
    ],
    dica: "Valide um modelo de caso de uso sempre verificando: (1) a semântica (obrigatório/opcional) e (2) a direção das setas. Include: base → incluído. Extend: filho → base."
  },
  {
    num: 32,
    enunciado: "Qual das alternativas descreve uma situação em que a generalização entre ATORES é a relação mais adequada?",
    alternativas: [
      "A) Quando um caso de uso deve ser executado antes de outro, independentemente do ator.",
      "B) Quando dois atores compartilham a maioria das interações com o sistema, e um deles possui interações adicionais exclusivas.",
      "C) Quando um ator pode opcionalmente estender as funcionalidades de outro ator.",
      "D) Quando dois atores sempre realizam os mesmos casos de uso juntos.",
      "E) Quando dois atores são externos ao sistema e interagem com os mesmos servidores."
    ],
    gabarito: "B",
    explicacao: "A generalização entre atores ocorre quando um ator (filho) herda todas as interações de outro ator (pai) e ainda possui interações exclusivas. Ex.: 'Administrador' herda tudo do 'Funcionário' e adiciona 'Gerar Relatórios'. É a relação pai-filho aplicada a atores.",
    erradas: [
      "A) A sequência de execução de casos de uso é representada por <<include>>, não generalização.",
      "C) 'Estender opcionalidades' entre atores não é o conceito de generalização — e extend não se aplica a atores.",
      "D) Atores que sempre realizam os mesmos casos de uso podem compartilhar uma generalização, mas o critério definitivo é a herança de comportamento com especialização.",
      "E) A localização dos servidores não define relacionamentos UML entre atores."
    ],
    dica: "Generalização entre atores = HERANÇA. O ator filho herda TODAS as interações do pai E adiciona suas próprias. Pense: 'Administrador É UM Funcionário (com poderes extras)'."
  },
  {
    num: 33,
    enunciado: "No diagrama de caso de uso, a relação de dependência entre dois casos de uso se caracteriza por:",
    alternativas: [
      "A) Um caso de uso depender de outro para definir seus atores.",
      "B) Um ou mais elementos do modelo requererem outros elementos para sua especificação ou implementação, criando uma dependência semântica.",
      "C) Dois atores que precisam interagir antes de acessar um caso de uso.",
      "D) Um caso de uso que só pode ser executado após todos os outros casos de uso do diagrama.",
      "E) Uma relação exclusiva entre sistemas externos (atores não humanos) e casos de uso."
    ],
    gabarito: "B",
    explicacao: "Uma dependência em UML significa que um elemento requer outro para sua especificação ou implementação — a semântica do elemento dependente é estruturalmente dependente do elemento fornecedor. Representa um vínculo mais genérico do que include ou extend.",
    erradas: [
      "A) Atores são identificados independentemente das dependências entre casos de uso.",
      "C) A interação entre atores não é definida por dependências entre casos de uso.",
      "D) A dependência não define ordem de execução global de todos os casos de uso.",
      "E) Dependências podem existir entre qualquer tipo de caso de uso, não apenas com sistemas externos."
    ],
    dica: "Dependência em UML = um elemento 'precisa de' outro para existir ou funcionar. É uma relação mais genérica — include e extend são formas especializadas de dependência com semântica mais precisa."
  },
  {
    num: 34,
    enunciado: "Um sistema de RH possui os seguintes casos de uso: 'Registrar Ponto', 'Calcular Horas Extras', 'Gerar Relatório de Frequência' e 'Emitir Aviso de Atraso'. Sabe-se que: calcular horas extras SEMPRE ocorre ao registrar ponto; gerar relatório é uma funcionalidade independente; emitir aviso de atraso ocorre SOMENTE quando há atraso detectado. Qual modelagem está correta?",
    alternativas: [
      "A) Registrar Ponto <<extend>> Calcular Horas Extras; Emitir Aviso de Atraso <<include>> Registrar Ponto.",
      "B) Registrar Ponto <<include>> Calcular Horas Extras; Emitir Aviso de Atraso <<extend>> Registrar Ponto.",
      "C) Calcular Horas Extras <<include>> Registrar Ponto; Registrar Ponto <<extend>> Emitir Aviso de Atraso.",
      "D) Registrar Ponto <<include>> Emitir Aviso de Atraso; Calcular Horas Extras <<extend>> Registrar Ponto.",
      "E) Todos os casos de uso têm relação <<include>> entre si."
    ],
    gabarito: "B",
    explicacao: "'Calcular Horas Extras' SEMPRE ocorre ao registrar ponto → <<include>>. 'Emitir Aviso de Atraso' ocorre SOMENTE quando há atraso (condicional) → <<extend>>. 'Gerar Relatório' é independente — não se relaciona por include ou extend com 'Registrar Ponto'.",
    erradas: [
      "A) Calcular horas extras é obrigatório (include), não opcional (extend). Emitir aviso é opcional (extend), não obrigatório (include).",
      "C) A direção do include está invertida.",
      "D) Emitir aviso é opcional (extend), não obrigatório (include). Calcular horas é obrigatório (include), não opcional (extend).",
      "E) Nem todos os casos de uso se relacionam — Gerar Relatório é independente."
    ],
    dica: "Sempre mapeie os relacionamentos antes de modelar: liste O QUE é obrigatório (include), O QUE é opcional (extend) e O QUE é independente (sem relação direta). Não force relacionamentos onde não existem."
  },
  {
    num: 35,
    enunciado: "Analise as seguintes afirmativas sobre o diagrama de caso de uso e identifique a CORRETA:",
    alternativas: [
      "A) O diagrama de caso de uso descreve detalhadamente como o sistema implementa suas funcionalidades.",
      "B) Um ator sempre representa um ser humano que interage diretamente com a interface gráfica do sistema.",
      "C) O diagrama de caso de uso é útil tanto para a equipe interna de desenvolvimento quanto para stakeholders externos, pois transmite requisitos em linguagem acessível.",
      "D) O <<extend>> representa um comportamento obrigatório que sempre ocorre quando o caso de uso base é executado.",
      "E) O limite do sistema (boundary) é representado por uma elipse que envolve os casos de uso."
    ],
    gabarito: "C",
    explicacao: "O diagrama de caso de uso é reconhecido por sua dupla utilidade: serve para a equipe técnica entender o escopo e para os stakeholders (clientes, gestores) entenderem as funcionalidades em linguagem visual acessível. Pesquisas confirmam que são mais facilmente interpretados do que diagramas de classes.",
    erradas: [
      "A) O diagrama descreve O QUE o sistema faz, não COMO implementa internamente.",
      "B) Atores podem ser outros sistemas, APIs, sensores — não apenas humanos.",
      "D) <<extend>> é OPCIONAL (pode ou não ocorrer). O obrigatório é <<include>>.",
      "E) O boundary é um RETÂNGULO, não uma elipse. A elipse representa o caso de uso."
    ],
    dica: "Revisão final: ELIPSE = caso de uso | BONECO = ator | RETÂNGULO = boundary | INCLUDE = obrigatório | EXTEND = opcional | GENERALIZAÇÃO = herança. Esses conceitos são o núcleo de toda questão sobre diagrama de caso de uso."
  }
];

// ============================================================
// BUILD DOCUMENT
// ============================================================
const children = [];

// COVER
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [9360],
  rows: [new TableRow({
    children: [new TableCell({
      borders: noBorders,
      width: { size: 9360, type: WidthType.DXA },
      shading: { fill: BLUE, type: ShadingType.CLEAR },
      margins: { top: 400, bottom: 400, left: 300, right: 300 },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "ANÁLISE E ENGENHARIA DE REQUISITOS", bold: true, size: 40, font: "Arial", color: WHITE })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 }, children: [new TextRun({ text: "Diagrama de Caso de Uso + Revisão de Requisitos", size: 28, font: "Arial", color: "BDD7EE" })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 100 }, children: [new TextRun({ text: "Material Completo para Prova — 35 Questões Comentadas", bold: true, size: 24, font: "Arial", color: YELLOW })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 200 }, children: [new TextRun({ text: "SI – UNIFOA | 3º Período | 2026", size: 22, font: "Arial", color: "BDD7EE" })] }),
      ]
    })]
  })]
}));

children.push(spacer());

// TABLE OF CONTENTS
children.push(headerBox("ÍNDICE DO MATERIAL"));
children.push(spacer());
[
  "1. Introdução aos Conteúdos Cobrados",
  "2. Resumo Teórico Completo",
  "3. Tabelas-Resumo dos Principais Conceitos",
  "4. Questões de Fixação (35 Questões)",
  "5. Gabarito Comentado Detalhado",
  "6. Principais Erros dos Alunos",
  "7. Revisão Rápida para a Prova",
  "8. Mapa Mental Textual",
  "9. Checklist Final de Revisão"
].forEach(item => children.push(numbered(item)));
children.push(pageBreak());

// ============================================================
// PART 1 - INTRODUCTION
// ============================================================
children.push(headerBox("PARTE 1 — INTRODUÇÃO AOS CONTEÚDOS COBRADOS"));
children.push(spacer());

children.push(h2("Conteúdos Principais da Prova"));
children.push(p("Esta prova aborda dois grandes blocos de conteúdo:"));
children.push(spacer());

children.push(colorBoxParagraphs([
  new Paragraph({ children: [new TextRun({ text: "BLOCO 1 — Diagrama de Caso de Uso (UML)", bold: true, size: 24, font: "Arial", color: BLUE })] }),
  new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: "• Conceito e propósito do diagrama de caso de uso", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Elementos: ator, caso de uso, boundary, relacionamentos", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Relações: <<include>>, <<extend>>, generalização, dependência", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Etapas de elaboração do diagrama (10 passos)", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Comparação com histórias de usuário em contexto ágil", size: 22, font: "Arial" })] }),
], LIGHT_BLUE));

children.push(spacer());

children.push(colorBoxParagraphs([
  new Paragraph({ children: [new TextRun({ text: "BLOCO 2 — Revisão de Requisitos (conteúdo anterior)", bold: true, size: 24, font: "Arial", color: BLUE })] }),
  new Paragraph({ spacing: { before: 60, after: 40 }, children: [new TextRun({ text: "• Requisitos funcionais vs. não funcionais", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Critério INVEST para histórias de usuário", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Técnicas de elicitação de requisitos", size: 22, font: "Arial" })] }),
], GREEN));

children.push(pageBreak());

// ============================================================
// PART 2 - THEORETICAL SUMMARY
// ============================================================
children.push(headerBox("PARTE 2 — RESUMO TEÓRICO COMPLETO"));
children.push(spacer());

children.push(h2("1. Diagrama de Caso de Uso — Fundamentos"));
children.push(p("O diagrama de caso de uso é uma representação da interação de usuários com o sistema, mostrando as funcionalidades oferecidas sob o ponto de vista externo. Ele responde três perguntas fundamentais:"));
children.push(bullet("Quem usa o sistema? (atores)"));
children.push(bullet("O que o sistema oferece? (casos de uso)"));
children.push(bullet("Quais interações existem? (relacionamentos)"));
children.push(spacer());
children.push(colorBox("DEFINIÇÃO: O diagrama de caso de uso descreve O QUE o sistema faz do ponto de vista do usuário, sem detalhar COMO ele faz. É o diagrama mais acessível da UML, compreensível por stakeholders não técnicos.", YELLOW));
children.push(spacer());

children.push(h3("1.1 Elementos Principais"));
children.push(twoColTable("Elemento", "Descrição + Representação Gráfica", [
  ["ATOR", "Entidade externa que interage com o sistema. Pode ser pessoa, outro sistema ou dispositivo. Representado como boneco palito (FORA do boundary)."],
  ["CASO DE USO", "Funcionalidade distinta do sistema. Representado como elipse (DENTRO do boundary)."],
  ["BOUNDARY (Limite)", "Retângulo que envolve todos os casos de uso, definindo o escopo do sistema."],
  ["ASSOCIAÇÃO", "Linha reta que conecta um ator a um caso de uso. Representa a interação básica."],
  ["<<INCLUDE>>", "Seta tracejada com estereótipo. Comportamento OBRIGATÓRIO: sempre executado com o caso base."],
  ["<<EXTEND>>", "Seta tracejada com estereótipo. Comportamento OPCIONAL: pode ou não ser executado."],
  ["GENERALIZAÇÃO", "Seta com triângulo. Herança entre atores ou entre casos de uso."],
]));
children.push(spacer());

children.push(h3("1.2 Relações entre Casos de Uso — Detalhamento"));
children.push(spacer());

children.push(colorBoxParagraphs([
  new Paragraph({ children: [new TextRun({ text: "<<INCLUDE>> — Comportamento Obrigatório", bold: true, size: 24, font: "Arial", color: "276221" })] }),
  new Paragraph({ spacing: { before: 80, after: 40 }, children: [new TextRun({ text: "• Quando o caso de uso X inclui Y: sempre que X for executado, Y também será.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• O caso de uso incluído (Y) NÃO pode existir sozinho — depende do caso base.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Direção da seta: do caso BASE → para o caso INCLUÍDO.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Exemplo: 'Agendar Consulta' <<include>> 'Verificar Disponibilidade'.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Palavras-chave no enunciado: 'sempre', 'obrigatoriamente', 'todo'.", size: 22, font: "Arial" })] }),
], GREEN));

children.push(spacer());

children.push(colorBoxParagraphs([
  new Paragraph({ children: [new TextRun({ text: "<<EXTEND>> — Comportamento Opcional", bold: true, size: 24, font: "Arial", color: "C00000" })] }),
  new Paragraph({ spacing: { before: 80, after: 40 }, children: [new TextRun({ text: "• Quando o caso de uso Y estende X: ao executar X, Y PODE (mas não necessariamente) ser executado.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• O filho (Y) aumenta a funcionalidade do caso base (X) de forma condicional.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Direção da seta: do caso FILHO (Y) → para o caso BASE (X).", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Exemplo: 'Enviar Lembrete' <<extend>> 'Agendar Consulta'.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Palavras-chave no enunciado: 'pode', 'às vezes', 'opcionalmente', 'somente se'.", size: 22, font: "Arial" })] }),
], RED));

children.push(spacer());

children.push(colorBoxParagraphs([
  new Paragraph({ children: [new TextRun({ text: "GENERALIZAÇÃO — Herança", bold: true, size: 24, font: "Arial", color: MED_BLUE })] }),
  new Paragraph({ spacing: { before: 80, after: 40 }, children: [new TextRun({ text: "• Relação pai-filho onde o filho herda funcionalidades do pai e se torna mais especializado.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Pode ocorrer entre ATORES ou entre CASOS DE USO.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Na generalização, o filho PODE substituir o pai sem quebrar o fluxo.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Diferença do extend: no extend, o pai não pode ser substituído pelo filho.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "• Exemplo: 'Administrador' generaliza 'Funcionário' (herda + adiciona 'Gerar Relatórios').", size: 22, font: "Arial" })] }),
], LIGHT_BLUE));

children.push(spacer());

children.push(h3("1.3 Propósito e Usos do Diagrama"));
children.push(bullet("Visão de alto nível do sistema para stakeholders técnicos e não técnicos."));
children.push(bullet("Identificação das funcionalidades do sistema antes do desenvolvimento."));
children.push(bullet("Base para criação de casos de teste (cada caso de uso gera cenários de teste)."));
children.push(bullet("Complemento às histórias de usuário em histórias complexas."));
children.push(bullet("Comunicação entre equipe de desenvolvimento e clientes."));
children.push(spacer());

children.push(h3("1.4 Etapas de Elaboração (Bittner & Spence, 2003)"));
children.push(numbered("Coletar fontes de informação — Como devo saber disso?"));
children.push(numbered("Identificar potenciais atores — Quem usa os bens e serviços do sistema?"));
children.push(numbered("Identificar possíveis casos de uso — De quais serviços os atores podem recorrer?"));
children.push(numbered("Conectar casos de uso — Quem pode fazer uso dos serviços?"));
children.push(numbered("Descrever os atores — Quem ou o que os atores representam?"));
children.push(numbered("Procurar mais casos de uso — O que mais precisa ser feito?"));
children.push(numbered("Editar casos de uso — O que realmente precisa ser incluído?"));
children.push(numbered("Documentar casos de uso — O que acontece em cada caso de uso?"));
children.push(numbered("Relacionar modelo entre casos de uso — Quais atividades são repetidas?"));
children.push(numbered("Verificar a visão — Está tudo correto?"));
children.push(spacer());

children.push(h2("2. Revisão de Requisitos (Conteúdo Anterior)"));
children.push(spacer());

children.push(twoColTable("Tipo de Requisito", "Definição e Exemplos", [
  ["Requisito FUNCIONAL (RF)", "Descreve O QUE o sistema faz. Ex.: 'O sistema deve permitir login com CPF e senha.'"],
  ["Requisito NÃO FUNCIONAL (RNF)", "Define qualidades e restrições. Ex.: 'Resposta em até 2 segundos.'"],
  ["Requisito de DOMÍNIO", "Especificidades do negócio. Ex.: 'Deve seguir a LGPD.'"],
]));
children.push(spacer());

children.push(colorBox("MACETE INVEST: Independente • Negociável • Valiosa • Estimável • Small (Pequena) • Testável. O V = VALUABLE (Valiosa), NÃO verificável!", YELLOW));
children.push(pageBreak());

// ============================================================
// PART 3 - TABLES
// ============================================================
children.push(headerBox("PARTE 3 — TABELAS-RESUMO DOS PRINCIPAIS CONCEITOS"));
children.push(spacer());

children.push(h2("Tabela 1 — Include × Extend × Generalização"));
children.push(spacer());
children.push(threeColTable("Característica", "<<INCLUDE>>", "<<EXTEND>>",
  [
    ["Obrigatoriedade", "OBRIGATÓRIO (sempre)", "OPCIONAL (condicional)"],
    ["Quem aciona", "O caso de uso BASE", "O caso de uso FILHO"],
    ["Direção da seta", "Base → Incluído", "Filho → Base"],
    ["Dependência", "Incluído depende do base", "Base é independente"],
    ["Palavra-chave", "'sempre', 'obrigatoriamente'", "'pode', 'somente se', 'às vezes'"],
    ["Exemplo", "Compra inclui Validar Pgto", "Cupom extend Compra"],
  ], 3120, 3120, 3120));
children.push(spacer());

children.push(h2("Tabela 2 — Elementos Gráficos do Diagrama"));
children.push(spacer());
children.push(twoColTable("Elemento", "Representação + Localização", [
  ["Ator (humano)", "Boneco palito — FORA do boundary"],
  ["Ator (sistema externo)", "Boneco palito com estereótipo — FORA do boundary"],
  ["Caso de Uso", "Elipse com nome — DENTRO do boundary"],
  ["Boundary (Limite)", "Retângulo que envolve todos os casos de uso"],
  ["Associação (ator↔caso)", "Linha reta sólida"],
  ["<<include>>", "Linha tracejada com seta e estereótipo <<include>>"],
  ["<<extend>>", "Linha tracejada com seta e estereótipo <<extend>>"],
  ["Generalização", "Seta com triângulo fechado (herança UML)"],
]));
children.push(spacer());

children.push(h2("Tabela 3 — Diagrama de Caso de Uso × Histórias de Usuário"));
children.push(spacer());
children.push(twoColTable("Diagrama de Caso de Uso", "Histórias de Usuário (User Story)", [
  ["Formato visual (UML)", "Formato textual"],
  ["Mais detalhado e formal", "Mais rápido e simples de criar"],
  ["Ideal para requisitos complexos", "Ideal para requisitos simples"],
  ["Usado no modelo clássico e pode ser usado no ágil", "Predominante em metodologias ágeis (Scrum)"],
  ["Exige modelagem cuidadosa", "Exige atenção a ambiguidades"],
  ["Melhor para comunicação visual com stakeholders", "Melhor para refinamento iterativo"],
]));
children.push(pageBreak());

// ============================================================
// PART 4 - QUESTIONS
// ============================================================
children.push(headerBox("PARTE 4 — QUESTÕES DE FIXAÇÃO (35 Questões)"));
children.push(spacer());
children.push(colorBox("As questões 1 a 13 e 16 a 35 focam no conteúdo principal (Diagrama de Caso de Uso). As questões 14 e 15 são de revisão do conteúdo anterior (Requisitos). O gabarito de cada questão aparece em verde imediatamente após as alternativas.", LIGHT_BLUE));
children.push(spacer());

questions.forEach(q => {
  const blocks = questionBlock(q.num, q.enunciado, q.alternativas, q.gabarito, q.explicacao, q.erradas, q.dica);
  blocks.forEach(b => children.push(b));
});

children.push(pageBreak());

// ============================================================
// PART 5 - GABARITO
// ============================================================
children.push(headerBox("PARTE 5 — GABARITO CONSOLIDADO"));
children.push(spacer());

const gabaritoRows = [];
for (let i = 0; i < questions.length; i += 5) {
  const slice = questions.slice(i, i + 5);
  const row = slice.map(q => [`Q${q.num}: ${q.gabarito}`]);
  while (row.length < 5) row.push(['—']);
  gabaritoRows.push(row.flat());
}

const gabHeaderRow = new TableRow({
  children: ["Q1-Q5","Q6-Q10","Q11-Q15","Q16-Q20","Q21-Q25","Q26-Q30","Q31-Q35"].slice(0, Math.ceil(questions.length/5)).map((h, idx) => new TableCell({
    borders, width: { size: 1336, type: WidthType.DXA },
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 80, right: 80 },
    children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: "Arial", color: WHITE })] })]
  }))
});

// Simple gabarito table
const gabRows2 = [];
for (let q = 0; q < questions.length; q += 7) {
  const slice = questions.slice(q, q + 7);
  gabRows2.push(slice.map(sq => `Q${sq.num}: ${sq.gabarito}`));
}

const cols7 = 7;
const colW = Math.floor(9360 / cols7);
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: Array(cols7).fill(colW),
  rows: gabRows2.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      borders,
      width: { size: colW, type: WidthType.DXA },
      shading: { fill: ri % 2 === 0 ? LIGHT_BLUE : WHITE, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: cell, bold: true, size: 22, font: "Arial" })] })]
    }))
  }))
}));

children.push(pageBreak());

// ============================================================
// PART 6 - COMMON ERRORS
// ============================================================
children.push(headerBox("PARTE 6 — PRINCIPAIS ERROS DOS ALUNOS"));
children.push(spacer());

const errors = [
  ["Erro 1", "Confundir <<include>> e <<extend>>", "Include = OBRIGATÓRIO (sempre acontece). Extend = OPCIONAL (pode acontecer). Inverte-se isso em cerca de 30% das questões."],
  ["Erro 2", "Errar a direção das setas", "Include: seta do caso BASE → caso INCLUÍDO. Extend: seta do caso FILHO → caso BASE. A direção do extend confunde muito!"],
  ["Erro 3", "Aplicar <<include>> e <<extend>> a atores", "<<include>> e <<extend>> são exclusivos para relações entre CASOS DE USO. Entre atores, usa-se GENERALIZAÇÃO."],
  ["Erro 4", "Confundir ator com usuário humano", "Atores podem ser pessoas, outros sistemas, APIs, sensores. Não são exclusivamente humanos."],
  ["Erro 5", "Colocar atores dentro do boundary", "Atores ficam FORA do retângulo. Dentro ficam apenas os casos de uso."],
  ["Erro 6", "Achar que diagrama de caso de uso detalha implementação", "O diagrama mostra O QUE o sistema faz, não COMO. Implementação é responsabilidade de outros diagramas."],
  ["Erro 7", "Confundir generalização com extend", "Na generalização, filho SUBSTITUI pai. No extend, filho apenas ACRESCENTA ao pai (que não pode ser substituído)."],
  ["Erro 8", "V do INVEST como Verificável", "V = VALUABLE (Valiosa). Verificável é atributo de requisitos clássicos (SRS), não do INVEST."],
  ["Erro 9", "Usar RF para o que é RNF", "Se é mensurável em segundos, porcentagem, MB → é RNF. RF = ação que o sistema executa."],
  ["Erro 10", "Ignorar que user story e caso de uso podem coexistir", "Em histórias complexas, usar ambos é recomendado. Não são mutuamente excludentes."],
];

errors.forEach(([num, titulo, desc]) => {
  children.push(new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2000, 7360],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders, width: { size: 2000, type: WidthType.DXA },
          shading: { fill: "C00000", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: num, bold: true, size: 20, font: "Arial", color: WHITE })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: titulo, bold: true, size: 18, font: "Arial", color: WHITE })] })
          ]
        }),
        new TableCell({
          borders, width: { size: 7360, type: WidthType.DXA },
          shading: { fill: RED, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: desc, size: 20, font: "Arial" })] })]
        })
      ]
    })]
  }));
  children.push(spacer());
});

children.push(pageBreak());

// ============================================================
// PART 7 - QUICK REVIEW
// ============================================================
children.push(headerBox("PARTE 7 — REVISÃO RÁPIDA PARA A PROVA"));
children.push(spacer());

children.push(colorBoxParagraphs([
  new Paragraph({ children: [new TextRun({ text: "⚡ RESUMO RELÂMPAGO — Diagrama de Caso de Uso", bold: true, size: 26, font: "Arial", color: BLUE })] }),
  new Paragraph({ spacing: { before: 100, after: 40 }, children: [new TextRun({ text: "ELIPSE = caso de uso | BONECO = ator | RETÂNGULO = boundary (limite do sistema)", bold: true, size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "ATOR = fora do retângulo | CASO DE USO = dentro do retângulo", bold: true, size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "INCLUDE = OBRIGATÓRIO = SEMPRE. Seta: base → incluído.", bold: true, size: 22, font: "Arial", color: "276221" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "EXTEND = OPCIONAL = TALVEZ. Seta: filho → base.", bold: true, size: 22, font: "Arial", color: "C00000" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "GENERALIZAÇÃO = HERANÇA (entre atores OU entre casos de uso)", bold: true, size: 22, font: "Arial", color: MED_BLUE })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Include/Extend = NUNCA entre atores. Generalização = SIM entre atores.", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "Ator = pessoa OU sistema externo OU dispositivo (não apenas humano!)", size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 80 }, children: [new TextRun({ text: "Diagrama de caso de uso = O QUE o sistema faz (NÃO como implementa).", size: 22, font: "Arial" })] }),
], YELLOW));

children.push(spacer());

children.push(colorBoxParagraphs([
  new Paragraph({ children: [new TextRun({ text: "⚡ REVISÃO DE REQUISITOS", bold: true, size: 26, font: "Arial", color: BLUE })] }),
  new Paragraph({ spacing: { before: 100, after: 40 }, children: [new TextRun({ text: "RF = O que o sistema FAZ (ação, funcionalidade).", bold: true, size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "RNF = Como o sistema DEVE SER (mensurável: segundos, %, MB).", bold: true, size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 40 }, children: [new TextRun({ text: "INVEST: I-N-V-E-S-T = Independente, Negociável, VALUABLE, Estimável, Small, Testável.", bold: true, size: 22, font: "Arial" })] }),
  new Paragraph({ spacing: { before: 40, after: 80 }, children: [new TextRun({ text: "V do INVEST = VALUABLE (Valiosa). NÃO é Verificável!", bold: true, size: 22, font: "Arial", color: "C00000" })] }),
], GREEN));

children.push(pageBreak());

// ============================================================
// PART 8 - MIND MAP
// ============================================================
children.push(headerBox("PARTE 8 — MAPA MENTAL TEXTUAL"));
children.push(spacer());

const mindMapContent = [
  "📌 DIAGRAMA DE CASO DE USO",
  "   ├── ELEMENTOS",
  "   │   ├── ATOR → boneco palito → FORA do boundary",
  "   │   │   ├── Humano (paciente, vendedor, admin)",
  "   │   │   └── Não humano (API, sistema externo, sensor)",
  "   │   ├── CASO DE USO → elipse → DENTRO do boundary",
  "   │   │   └── Representa funcionalidade distinta",
  "   │   └── BOUNDARY → retângulo → define o ESCOPO",
  "   ├── RELACIONAMENTOS",
  "   │   ├── ASSOCIAÇÃO → linha reta → ator ↔ caso de uso",
  "   │   ├── <<INCLUDE>> → OBRIGATÓRIO → base → incluído",
  "   │   │   ├── Sempre executado junto com caso base",
  "   │   │   └── Incluído NÃO existe sozinho",
  "   │   ├── <<EXTEND>> → OPCIONAL → filho → base",
  "   │   │   ├── Pode ou não ser executado",
  "   │   │   └── Depende de condição/contexto",
  "   │   ├── GENERALIZAÇÃO → herança → triângulo",
  "   │   │   ├── Entre ATORES: Admin herda de Funcionário",
  "   │   │   └── Entre CASOS DE USO: filho substitui pai",
  "   │   └── DEPENDÊNCIA → elemento requer outro elemento",
  "   ├── PROPÓSITO",
  "   │   ├── Visão de alto nível (O QUE, não COMO)",
  "   │   ├── Comunicação com stakeholders não técnicos",
  "   │   └── Base para casos de teste",
  "   └── ETAPAS (10 passos)",
  "       ├── 1. Coletar informações",
  "       ├── 2. Identificar atores",
  "       ├── 3. Identificar casos de uso",
  "       ├── 4. Conectar casos de uso",
  "       ├── 5. Descrever atores",
  "       ├── 6. Procurar mais casos de uso",
  "       ├── 7. Editar casos de uso",
  "       ├── 8. Documentar",
  "       ├── 9. Relacionar modelo",
  "       └── 10. Verificar visão",
  "",
  "📌 REQUISITOS (REVISÃO)",
  "   ├── RF → O que o sistema FAZ",
  "   ├── RNF → Como o sistema DEVE SER (mensurável)",
  "   └── INVEST → I-N-V-E-S-T",
  "       ├── I = Independente",
  "       ├── N = Negociável",
  "       ├── V = Valuable (VALIOSA)",
  "       ├── E = Estimável",
  "       ├── S = Small (Pequena)",
  "       └── T = Testável",
];

children.push(new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [9360],
  rows: [new TableRow({
    children: [new TableCell({
      borders: noBorders,
      width: { size: 9360, type: WidthType.DXA },
      shading: { fill: "1A1A2E", type: ShadingType.CLEAR },
      margins: { top: 160, bottom: 160, left: 200, right: 200 },
      children: mindMapContent.map(line => new Paragraph({
        spacing: { before: 20, after: 20 },
        children: [new TextRun({ text: line, size: 18, font: "Courier New", color: "00FF88" })]
      }))
    })]
  })]
}));

children.push(pageBreak());

// ============================================================
// PART 9 - CHECKLIST
// ============================================================
children.push(headerBox("PARTE 9 — CHECKLIST FINAL DE REVISÃO"));
children.push(spacer());

const checklistItems = [
  "[ ] Sei diferenciar ator, caso de uso e boundary no diagrama",
  "[ ] Sei que <<include>> = OBRIGATÓRIO e a seta vai do base para o incluído",
  "[ ] Sei que <<extend>> = OPCIONAL e a seta vai do filho para o base",
  "[ ] Sei que generalização = herança (pode ser entre atores OU entre casos de uso)",
  "[ ] Sei que <<include>> e <<extend>> NÃO se aplicam a atores",
  "[ ] Sei que atores ficam FORA do retângulo (boundary)",
  "[ ] Sei que ator pode ser pessoa, sistema externo ou dispositivo",
  "[ ] Sei que o diagrama mostra O QUE o sistema faz (não COMO)",
  "[ ] Sei as 10 etapas de elaboração do diagrama (ordem correta)",
  "[ ] Sei a diferença entre generalização e extend (substituição vs. extensão)",
  "[ ] Sei que o diagrama serve para comunicar com stakeholders não técnicos",
  "[ ] Sei que casos de uso geram casos de teste",
  "[ ] Sei a diferença entre diagrama de caso de uso e histórias de usuário",
  "[ ] Sei que em histórias complexas, ambos podem ser usados juntos",
  "[ ] Sei que RF = O que o sistema FAZ (não mensurável em si)",
  "[ ] Sei que RNF = mensurável (segundos, %, MB, etc.)",
  "[ ] Sei que V do INVEST = VALUABLE (Valiosa), não Verificável",
  "[ ] Conheço o formato padrão de história de usuário (Como... quero... para...)",
  "[ ] Sei identificar palavras-chave: 'sempre' = include; 'pode/às vezes' = extend",
  "[ ] Revisei todos os 35 gabaritos e entendi por que as demais alternativas estão erradas",
];

checklistItems.forEach(item => {
  children.push(new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({
      children: [new TableCell({
        borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder },
        width: { size: 9360, type: WidthType.DXA },
        shading: { fill: checklistItems.indexOf(item) % 2 === 0 ? GRAY : WHITE, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 180, right: 180 },
        children: [new Paragraph({ children: [new TextRun({ text: item, size: 22, font: "Arial", font: "Courier New" })] })]
      })]
    })]
  }));
});

children.push(spacer());
children.push(colorBox("🎯 BOA PROVA! Lembre: INCLUDE = SEMPRE | EXTEND = TALVEZ | GENERALIZAÇÃO = HERANÇA", BLUE, WHITE));

// ============================================================
// ASSEMBLE DOCUMENT
// ============================================================
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: WHITE },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('C:\\Users\\RYZEN\\Documents\\Github\\Material_Estudo_CasosDeUso_Requisitos.docx', buffer);
  console.log('Document created successfully!');
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});