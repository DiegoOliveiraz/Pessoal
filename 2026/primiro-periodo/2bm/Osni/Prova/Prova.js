const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak, PageNumber, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

const BLUE = "1F4E79";
const LIGHT_BLUE = "D6E4F0";
const DARK_BLUE = "2E75B6";
const GREEN = "1E7B34";
const LIGHT_GREEN = "D9EAD3";
const RED = "C00000";
const LIGHT_RED = "FFEBEB";
const YELLOW_BG = "FFF2CC";
const ORANGE = "C55A11";
const GRAY_BG = "F2F2F2";
const WHITE = "FFFFFF";
const BLACK = "000000";

const border = { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" };
const borders = { top: border, bottom: border, left: border, right: border };

function h1(text, color = BLUE) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [new TextRun({ text, bold: true, size: 32, color, font: "Arial" })]
  });
}

function h2(text, color = DARK_BLUE) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, bold: true, size: 26, color, font: "Arial" })]
  });
}

function h3(text, color = BLACK) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 22, color, font: "Arial" })]
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...opts })]
  });
}

function pMixed(runs, spacing = { before: 80, after: 80 }) {
  return new Paragraph({ spacing, children: runs });
}

function run(text, opts = {}) {
  return new TextRun({ text, size: 22, font: "Arial", ...opts });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...opts })]
  });
}

function bulletMixed(runs) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 60, after: 60 },
    children: runs
  });
}

function numbered(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "numbers", level: 0 },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...opts })]
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function blankLine() {
  return new Paragraph({ spacing: { before: 60, after: 60 }, children: [new TextRun("")] });
}

function infoBox(text, bg = YELLOW_BG, borderColor = ORANGE) {
  const b = { style: BorderStyle.SINGLE, size: 4, color: borderColor };
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: b, bottom: b, left: b, right: b },
      shading: { fill: bg, type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 200, right: 200 },
      width: { size: 9360, type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text, size: 22, font: "Arial" })] })]
    })]})],
  });
}

function sectionBox(title, content, bg = LIGHT_BLUE, titleColor = BLUE) {
  const tb = { style: BorderStyle.SINGLE, size: 4, color: titleColor };
  const rows = [];
  // Title row
  rows.push(new TableRow({ children: [new TableCell({
    borders: { top: tb, bottom: tb, left: tb, right: tb },
    shading: { fill: titleColor, type: ShadingType.CLEAR },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    width: { size: 9360, type: WidthType.DXA },
    children: [new Paragraph({ children: [new TextRun({ text: title, size: 24, bold: true, font: "Arial", color: WHITE })] })]
  })]}));
  // Content rows
  content.forEach(line => {
    rows.push(new TableRow({ children: [new TableCell({
      borders: { top: tb, bottom: tb, left: tb, right: tb },
      shading: { fill: bg, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 160, right: 160 },
      width: { size: 9360, type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: line, size: 22, font: "Arial" })] })]
    })]}));
  });
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360], rows });
}

function makeTable(headers, rows, colWidths) {
  const total = colWidths.reduce((a,b)=>a+b,0);
  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      borders,
      shading: { fill: DARK_BLUE, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      width: { size: colWidths[i], type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: h, size: 20, bold: true, font: "Arial", color: WHITE })] })]
    }))
  });
  const dataRows = rows.map((row, ri) => new TableRow({
    children: row.map((cell, i) => new TableCell({
      borders,
      shading: { fill: ri % 2 === 0 ? WHITE : GRAY_BG, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      width: { size: colWidths[i], type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20, font: "Arial" })] })]
    }))
  }));
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: colWidths, rows: [headerRow, ...dataRows] });
}

function questionHeader(num, enunciado) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({ children: [new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 4, color: DARK_BLUE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: DARK_BLUE }, left: { style: BorderStyle.SINGLE, size: 4, color: DARK_BLUE }, right: { style: BorderStyle.SINGLE, size: 4, color: DARK_BLUE } },
        shading: { fill: DARK_BLUE, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 160, right: 160 },
        width: { size: 9360, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: `QUESTÃO ${num}`, size: 24, bold: true, font: "Arial", color: WHITE })] })]
      })]}),
      new TableRow({ children: [new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 1, color: DARK_BLUE }, bottom: { style: BorderStyle.SINGLE, size: 1, color: DARK_BLUE }, left: { style: BorderStyle.SINGLE, size: 4, color: DARK_BLUE }, right: { style: BorderStyle.SINGLE, size: 4, color: DARK_BLUE } },
        shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 160, right: 160 },
        width: { size: 9360, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: enunciado, size: 22, font: "Arial" })] })]
      })]}),
    ]
  });
}

function alternativa(letra, texto, correta = false) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({ text: `${letra}) `, size: 22, bold: true, font: "Arial", color: correta ? GREEN : BLACK }),
      new TextRun({ text: texto, size: 22, font: "Arial", color: correta ? GREEN : BLACK })
    ]
  });
}

function gabarito(letra, explicacao, dica) {
  const tb = { style: BorderStyle.SINGLE, size: 3, color: GREEN };
  const rows = [
    new TableRow({ children: [new TableCell({
      borders: { top: tb, bottom: tb, left: tb, right: tb },
      shading: { fill: GREEN, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 160, right: 160 },
      width: { size: 9360, type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: `✔ GABARITO: ${letra}`, size: 22, bold: true, font: "Arial", color: WHITE })] })]
    })]}),
    new TableRow({ children: [new TableCell({
      borders: { top: tb, bottom: tb, left: tb, right: tb },
      shading: { fill: LIGHT_GREEN, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 160, right: 160 },
      width: { size: 9360, type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: explicacao, size: 22, font: "Arial" })] })]
    })]}),
  ];
  if (dica) {
    rows.push(new TableRow({ children: [new TableCell({
      borders: { top: tb, bottom: tb, left: tb, right: tb },
      shading: { fill: YELLOW_BG, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 160, right: 160 },
      width: { size: 9360, type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: `💡 DICA: ${dica}`, size: 22, font: "Arial", bold: true, color: ORANGE })] })]
    })]}));
  }
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360], rows });
}

// ===== DOCUMENT =====
const doc = new Document({
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "alpha", levels: [{ level: 0, format: LevelFormat.LOWER_LETTER, text: "%1)", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 32, bold: true, font: "Arial", color: BLUE }, paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, font: "Arial", color: DARK_BLUE }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 22, bold: true, font: "Arial", color: BLACK }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 }
      }
    },
    children: [

      // ========== CAPA ==========
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1440, after: 240 },
        children: [new TextRun({ text: "MATERIAL DE ESTUDO COMPLETO", size: 40, bold: true, font: "Arial", color: BLUE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 120 },
        children: [new TextRun({ text: "Serviços de Redes de Computadores", size: 32, bold: true, font: "Arial", color: DARK_BLUE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 120 },
        children: [new TextRun({ text: "3º Período — Sistemas de Informação", size: 26, font: "Arial", color: ORANGE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 600 },
        children: [new TextRun({ text: "Focado na Prova — 35 Questões Comentadas", size: 24, font: "Arial", italics: true, color: "555555" })]
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows: [new TableRow({ children: [new TableCell({
          borders: { top: { style: BorderStyle.SINGLE, size: 6, color: DARK_BLUE }, bottom: { style: BorderStyle.SINGLE, size: 6, color: DARK_BLUE }, left: { style: BorderStyle.SINGLE, size: 6, color: DARK_BLUE }, right: { style: BorderStyle.SINGLE, size: 6, color: DARK_BLUE } },
          shading: { fill: LIGHT_BLUE, type: ShadingType.CLEAR },
          margins: { top: 200, bottom: 200, left: 240, right: 240 },
          width: { size: 9360, type: WidthType.DXA },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "📡 Bloco 1 – Modelo OSI e Redes no Dia a Dia", size: 22, font: "Arial", bold: true, color: BLUE })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🔌 Bloco 2 – Camada Física e Camada de Enlace", size: 22, font: "Arial", bold: true, color: BLUE })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🗺 Bloco 3 – Endereçamento IPv4 e Roteamento", size: 22, font: "Arial", bold: true, color: BLUE })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🚦 Bloco 4 – Transporte TCP e UDP", size: 22, font: "Arial", bold: true, color: BLUE })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "📶 Bloco 5 – DHCP, DNS, VLANs e Diagnóstico", size: 22, font: "Arial", bold: true, color: BLUE })] }),
          ]
        })]})]
      }),
      pageBreak(),

      // ========== SEÇÃO 1: INTRODUÇÃO ==========
      h1("1. INTRODUÇÃO — CONTEÚDOS COBRADOS NA PROVA"),
      p("Este material cobre integralmente os temas das provas formativas AVD 2, com ênfase especial nos assuntos presentes nas questões fornecidas. Estão incluídas 35 questões comentadas com gabarito detalhado, dicas de memorização e análise dos erros mais comuns."),
      blankLine(),
      makeTable(
        ["BLOCO", "CONTEÚDO PRINCIPAL", "PESO ESTIMADO"],
        [
          ["1 – OSI/Redes", "Modelo OSI, tipos de rede (PAN/LAN/MAN/WAN), ferramentas", "Alto"],
          ["2 – Física/Enlace", "Meios de transmissão, MAC, Switch, CSMA/CD, CSMA/CA", "Alto"],
          ["3 – IPv4/Sub-redes", "Classes, CIDR, cálculo de hosts, broadcast, roteamento", "Muito Alto"],
          ["4 – TCP/UDP", "Three-Way Handshake, portas, confiabilidade, streaming", "Muito Alto"],
          ["5 – Serviços", "DHCP, DNS, VLANs, diagnóstico de rede, comandos", "Alto"],
        ],
        [2000, 4000, 3360]
      ),
      blankLine(),
      pageBreak(),

      // ========== SEÇÃO 2: RESUMO TEÓRICO ==========
      h1("2. RESUMO TEÓRICO COMPLETO"),

      // 2.1 Modelo OSI
      h2("2.1 Modelo OSI — As 7 Camadas"),
      p("O Modelo OSI (Open Systems Interconnection) é um modelo teórico de referência criado pela ISO que divide a comunicação em rede em 7 camadas, cada uma com função específica. Permite que fabricantes diferentes criem equipamentos compatíveis entre si."),
      blankLine(),
      makeTable(
        ["CAMADA", "NOME", "FUNÇÃO PRINCIPAL", "PROTOCOLOS/DISPOSITIVOS"],
        [
          ["7", "Aplicação", "Interface com o usuário. Serviços de rede.", "HTTP, HTTPS, FTP, DNS, DHCP, SMTP"],
          ["6", "Apresentação", "Criptografia, compressão, tradução de formatos.", "TLS/SSL, JPEG, MPEG"],
          ["5", "Sessão", "Controle de sessões e diálogos entre processos.", "NetBIOS, RPC"],
          ["4", "Transporte", "Entrega fim a fim, controle de fluxo.", "TCP, UDP"],
          ["3", "Rede", "Endereçamento lógico e roteamento.", "IP, ICMP, IPSec — Roteador"],
          ["2", "Enlace", "Transmissão entre nós adjacentes, endereço MAC.", "Ethernet, Wi-Fi — Switch, Bridge"],
          ["1", "Física", "Bits pelo meio físico — sinais elétricos, ópticos, rádio.", "Cabos, conectores, Hub"],
        ],
        [1000, 1600, 3200, 3560]
      ),
      blankLine(),
      infoBox("🧠 MNEMÔNICO OSI (de cima para baixo): 'Ases Podem Ser Terríveis Rindo Em Festas' → Aplicação, Apresentação, Sessão, Transporte, Rede, Enlace, Física"),
      blankLine(),

      h2("2.2 Tipos de Rede por Abrangência"),
      makeTable(
        ["TIPO", "NOME COMPLETO", "ABRANGÊNCIA", "EXEMPLO"],
        [
          ["PAN", "Personal Area Network", "Até ~10 metros", "Bluetooth entre celular e fone"],
          ["LAN", "Local Area Network", "Até ~1 km", "Rede de um escritório ou escola"],
          ["MAN", "Metropolitan Area Network", "Até ~50 km", "Rede de uma cidade"],
          ["WAN", "Wide Area Network", "Países/continentes", "Internet, VPN entre filiais"],
          ["WLAN", "Wireless LAN", "Igual à LAN, sem fio", "Wi-Fi da sua casa"],
        ],
        [900, 2200, 2000, 4260]
      ),
      blankLine(),

      h2("2.3 Camada Física (Camada 1)"),
      p("A camada física transmite bits pelo meio. Não há endereçamento — apenas fluxo de bits brutos. Define tensões, pulsos de luz, sinais de rádio e velocidade de transmissão (bps)."),
      blankLine(),
      makeTable(
        ["MEIO", "VELOCIDADE", "VANTAGENS", "DESVANTAGENS"],
        [
          ["Par trançado (Cat5e/Cat6)", "100Mbps – 10Gbps", "Barato, fácil instalação", "Limitado a ~100m, susceptível a EMI"],
          ["Fibra óptica", "10Gbps – 100Tbps", "Alta velocidade, imune a EMI, longas distâncias", "Custo alto, frágil"],
          ["Cabo coaxial", "Até ~1Gbps", "Boa blindagem", "Em desuso em redes modernas"],
          ["Wi-Fi (802.11)", "54Mbps – 9,6Gbps (Wi-Fi 6)", "Mobilidade, sem cabos", "Interferência, segurança menor"],
        ],
        [2000, 2000, 2500, 2860]
      ),
      blankLine(),

      h2("2.4 Camada de Enlace (Camada 2)"),
      p("Responsável pela transmissão confiável de dados entre dois nós diretamente conectados. Usa endereços MAC (48 bits, notação hexadecimal: AA:BB:CC:DD:EE:FF) para identificar dispositivos na LAN."),
      bullet("Enquadramento (Framing): organiza bits em quadros (frames) com cabeçalho, dados e trailer."),
      bullet("Endereçamento MAC: identifica origem e destino dentro da LAN."),
      bullet("Controle de acesso ao meio: CSMA/CD (Ethernet cabeado) ou CSMA/CA (Wi-Fi)."),
      bullet("Detecção de erros: usa CRC (Cyclic Redundancy Check)."),
      blankLine(),
      makeTable(
        ["MECANISMO", "ONDE USADO", "FUNÇÃO"],
        [
          ["CSMA/CD", "Ethernet cabeado (half-duplex)", "Detecta colisão após ela ocorrer e retransmite após backoff aleatório"],
          ["CSMA/CA", "Wi-Fi (802.11)", "Tenta EVITAR colisão antes de transmitir, pois detectar colisão no ar é difícil"],
          ["CRC", "Ambos", "Verifica integridade do quadro — detecta erros mas NÃO os corrige"],
        ],
        [2000, 2500, 4860]
      ),
      blankLine(),
      infoBox("🔑 DIFERENÇA CHAVE — MAC vs IP:\nMAC = endereço FÍSICO, gravado no hardware, identifica dispositivo na LAN (Camada 2).\nIP = endereço LÓGICO, configurado por software, identifica dispositivo na Internet (Camada 3).\nAnalogía: MAC = CPF (identidade única). IP = CEP (onde você está agora)."),
      blankLine(),

      h2("2.5 Endereçamento IPv4"),
      p("Um endereço IPv4 tem 32 bits, escrito em 4 octetos decimais separados por ponto (ex.: 192.168.1.10). Cada octeto vai de 0 a 255. O endereço é dividido em: parte de rede (identificada pela máscara) e parte de host."),
      blankLine(),
      makeTable(
        ["CLASSE", "1º OCTETO", "MÁSCARA PADRÃO", "USO / FINALIDADE", "EXEMPLO PRIVADO"],
        [
          ["A", "1 – 126", "255.0.0.0 (/8)", "Redes muito grandes — poucos roteadores, muitos hosts", "10.0.0.0/8"],
          ["B", "128 – 191", "255.255.0.0 (/16)", "Redes médias — universidades, empresas médias", "172.16.0.0/12"],
          ["C", "192 – 223", "255.255.255.0 (/24)", "Redes pequenas — mais comuns em uso real", "192.168.0.0/16"],
          ["D", "224 – 239", "—", "Multicast — transmissão para grupos", "—"],
          ["E", "240 – 255", "—", "Experimental / Reservado", "—"],
        ],
        [800, 1400, 1800, 2900, 2460]
      ),
      blankLine(),
      p("Endereços privados (RFC 1918) — NÃO roteados na Internet pública:", { bold: true }),
      bullet("Classe A: 10.0.0.0 – 10.255.255.255"),
      bullet("Classe B: 172.16.0.0 – 172.31.255.255"),
      bullet("Classe C: 192.168.0.0 – 192.168.255.255"),
      blankLine(),
      p("Endereços especiais IPv4:", { bold: true }),
      makeTable(
        ["ENDEREÇO", "NOME", "FUNÇÃO / QUANDO USAR"],
        [
          ["127.0.0.1", "Loopback", "Testa a pilha TCP/IP local — 'ping 127.0.0.1' não sai da máquina"],
          ["0.0.0.0", "Endereço inválido / qualquer", "Indica 'qualquer interface' em regras de firewall ou roteamento"],
          ["255.255.255.255", "Broadcast limitado", "Envia para todos os hosts da rede local sem conhecer o IP da rede"],
          ["169.254.x.x", "APIPA", "Atribuído automaticamente quando DHCP falha (Windows auto-configura)"],
          ["X.X.X.0", "Endereço de rede", "Identifica a sub-rede. Não pode ser atribuído a hosts."],
          ["X.X.X.255 (ou final)", "Broadcast dirigido", "Envia para todos os hosts de uma sub-rede específica"],
        ],
        [2200, 2000, 5160]
      ),
      blankLine(),

      h2("2.6 Cálculo de Sub-redes (CIDR)"),
      p("A máscara de sub-rede define quais bits do IP identificam a rede e quais identificam o host. Na notação CIDR, /24 = 24 bits para rede, 8 bits para hosts."),
      blankLine(),
      infoBox("📐 FÓRMULAS ESSENCIAIS:\n• Hosts utilizáveis = 2^(bits de host) - 2\n• Bits de host = 32 - prefixo CIDR\n• Número de sub-redes = 2^(bits emprestados)\n• Subtrai 2: um endereço = endereço de rede, outro = broadcast"),
      blankLine(),
      makeTable(
        ["CIDR", "MÁSCARA", "BITS HOST", "HOSTS ÚTEIS", "SUB-REDES (de /24)"],
        [
          ["/24", "255.255.255.0", "8", "254", "1"],
          ["/25", "255.255.255.128", "7", "126", "2"],
          ["/26", "255.255.255.192", "6", "62", "4"],
          ["/27", "255.255.255.224", "5", "30", "8"],
          ["/28", "255.255.255.240", "4", "14", "16"],
          ["/29", "255.255.255.248", "3", "6", "32"],
          ["/30", "255.255.255.252", "2", "2", "64"],
        ],
        [1200, 2400, 1400, 1680, 2680]
      ),
      blankLine(),

      h2("2.7 TCP vs UDP"),
      makeTable(
        ["CARACTERÍSTICA", "TCP", "UDP"],
        [
          ["Orientado a conexão?", "✔ Sim (3-way handshake)", "✘ Não"],
          ["Confiabilidade", "✔ Garantida (ACK + retransmissão)", "✘ Sem garantia (best-effort)"],
          ["Ordenação dos dados", "✔ Garantida", "✘ Não garantida"],
          ["Velocidade", "Mais lento (mais overhead)", "Mais rápido (menos overhead)"],
          ["Cabeçalho", "20–60 bytes", "8 bytes"],
          ["Controle de fluxo", "✔ Sliding window", "✘ Não"],
          ["Uso típico", "HTTP, HTTPS, FTP, SMTP, SSH", "DNS, DHCP, VoIP, streaming, jogos"],
        ],
        [2800, 3280, 3280]
      ),
      blankLine(),
      p("Three-Way Handshake do TCP:", { bold: true }),
      numbered("SYN — cliente envia segmento com flag SYN para iniciar conexão."),
      numbered("SYN-ACK — servidor responde confirmando e enviando seu próprio SYN."),
      numbered("ACK — cliente confirma. Conexão estabelecida. Dados começam a fluir."),
      blankLine(),

      h2("2.8 Portas de Rede — Well-Known Ports"),
      makeTable(
        ["PORTA", "PROTOCOLO", "SERVIÇO", "PROTOCOLO TRANSPORTE"],
        [
          ["20/21", "FTP", "Transferência de arquivos", "TCP"],
          ["22", "SSH", "Acesso remoto seguro", "TCP"],
          ["23", "Telnet", "Acesso remoto (sem criptografia)", "TCP"],
          ["25", "SMTP", "Envio de e-mail", "TCP"],
          ["53", "DNS", "Resolução de nomes de domínio", "UDP/TCP"],
          ["67/68", "DHCP", "Atribuição automática de IPs", "UDP"],
          ["80", "HTTP", "Navegação web (sem criptografia)", "TCP"],
          ["110", "POP3", "Recebimento de e-mail (baixa e apaga)", "TCP"],
          ["143", "IMAP", "Recebimento de e-mail (mantém no servidor)", "TCP"],
          ["443", "HTTPS", "Navegação web segura (TLS/SSL)", "TCP"],
        ],
        [1000, 1200, 4000, 3160]
      ),
      blankLine(),

      h2("2.9 DHCP — Dynamic Host Configuration Protocol"),
      p("O DHCP é o serviço responsável por atribuir automaticamente configurações de rede aos dispositivos (endereço IP, máscara, gateway e DNS). Elimina a necessidade de configuração manual em cada máquina."),
      p("Sequência DORA (processo de negociação DHCP):", { bold: true }),
      makeTable(
        ["ETAPA", "QUEM ENVIA", "O QUE FAZ"],
        [
          ["D — DISCOVER", "Cliente (broadcast)", "Anuncia na rede: 'Existe algum servidor DHCP?'"],
          ["O — OFFER", "Servidor DHCP (unicast/broadcast)", "Oferece um IP disponível ao cliente"],
          ["R — REQUEST", "Cliente (broadcast)", "Solicita formalmente o IP oferecido"],
          ["A — ACKNOWLEDGE", "Servidor DHCP", "Confirma a atribuição e fornece todas as configurações"],
        ],
        [2000, 2800, 4560]
      ),
      blankLine(),

      h2("2.10 DNS — Domain Name System"),
      p("O DNS traduz nomes de domínio (ex.: www.google.com) em endereços IP (ex.: 142.250.219.196). Sem DNS, o usuário precisaria memorizar IPs para acessar sites."),
      p("Quando um computador consegue acessar sites por IP direto mas não por nome de domínio, o problema está no DNS — é o primeiro serviço a ser investigado."),
      blankLine(),

      h2("2.11 VLANs (Virtual Local Area Networks)"),
      p("VLANs são redes locais virtuais criadas logicamente dentro de switches físicos, permitindo segmentar a rede sem precisar de infraestrutura física separada."),
      bullet("Segurança: dispositivos de VLANs diferentes não se comunicam sem passar por um roteador."),
      bullet("Desempenho: reduz domínio de broadcast — menos tráfego desnecessário em cada segmento."),
      bullet("Organização: divide a rede por departamento/função (ex.: RH, TI, Visitantes)."),
      bullet("Flexibilidade: um mesmo switch pode servir múltiplas VLANs simultâneas."),
      blankLine(),

      h2("2.12 Equipamentos de Rede e Suas Camadas"),
      makeTable(
        ["EQUIPAMENTO", "CAMADA OSI", "FUNÇÃO PRINCIPAL", "ENDEREÇAMENTO USADO"],
        [
          ["Hub", "Camada 1 (Física)", "Repassa o sinal para TODAS as portas — sem inteligência", "Nenhum (broadcast puro)"],
          ["Switch", "Camada 2 (Enlace)", "Repassa quadros apenas para a porta correta via tabela MAC", "Endereço MAC"],
          ["Roteador", "Camada 3 (Rede)", "Encaminha pacotes entre redes diferentes", "Endereço IP"],
          ["Access Point", "Camada 2 (Enlace)", "Conecta dispositivos Wi-Fi à rede cabeada", "Endereço MAC"],
          ["Modem", "Camada 1/2", "Modula/demodula sinal para transmissão (DSL, cabo, fibra)", "Varia"],
          ["Firewall", "Camadas 3/4/7", "Filtra tráfego por IP, porta ou conteúdo", "IP e Porta"],
        ],
        [1800, 2000, 3200, 2360]
      ),
      blankLine(),

      h2("2.13 Ferramentas de Diagnóstico"),
      makeTable(
        ["COMANDO", "SISTEMA", "O QUE FAZ"],
        [
          ["ipconfig", "Windows", "Exibe IP, máscara, gateway e DNS da máquina"],
          ["ifconfig / ip a", "Linux", "Equivalente ao ipconfig — mostra configurações de rede"],
          ["ping <destino>", "Ambos", "Testa alcançabilidade de um host (usa ICMP Echo Request/Reply)"],
          ["tracert <destino>", "Windows", "Mostra o caminho (roteadores) até o destino"],
          ["traceroute <destino>", "Linux", "Equivalente ao tracert no Windows"],
          ["nslookup <domínio>", "Ambos", "Resolve nome DNS para IP — testa o serviço DNS"],
          ["netstat", "Ambos", "Exibe conexões ativas e portas em uso"],
        ],
        [2200, 1400, 5760]
      ),
      blankLine(),
      pageBreak(),

      // ========== SEÇÃO 3: QUESTÕES ==========
      h1("3. QUESTÕES DE FIXAÇÃO — 35 QUESTÕES COMENTADAS"),
      blankLine(),
      infoBox("📌 As questões 1 e 2 são de REVISÃO do Guia de Redes (primeira prova). As demais focam no conteúdo atual da prova."),
      blankLine(),

      // ===== Q1 =====
      questionHeader(1, "Uma empresa possui escritórios em três cidades diferentes, interligados por uma rede corporativa que cobre centenas de quilômetros. Qual tipo de rede melhor descreve essa infraestrutura?"),
      alternativa("A", "PAN — pois conecta dispositivos pessoais de diferentes usuários.", false),
      alternativa("B", "LAN — pois conecta computadores em uma área restrita.", false),
      alternativa("C", "WLAN — pois a conexão pode ser feita sem fio entre filiais.", false),
      alternativa("D", "MAN — pois abrange uma região metropolitana.", false),
      alternativa("E", "WAN — pois interliga redes geograficamente distantes entre cidades/países.", true),
      gabarito("E", "WAN (Wide Area Network) é o tipo correto. A abrangência geográfica é o critério de classificação: PAN=pessoal (metros), LAN=local (até ~1km, mesmo prédio), MAN=metropolitana (mesma cidade, até ~50km), WAN=longa distância (entre cidades/países). Três escritórios em cidades diferentes = centenas de km = WAN. A Internet é o maior exemplo de WAN.", "PAN=pessoal, LAN=local, MAN=metrô, WAN=mundial. Quando cair 'cidades diferentes' ou 'países' → sempre WAN."),
      blankLine(),

      // ===== Q2 =====
      questionHeader(2, "Um técnico precisa comparar a fibra óptica e o cabo de par trançado (Cat6) para uma instalação entre dois andares do mesmo prédio, priorizando custo e facilidade de manutenção. Qual afirmação é correta?"),
      alternativa("A", "A fibra óptica é melhor porque é mais barata e fácil de instalar.", false),
      alternativa("B", "O par trançado Cat6 suporta até 10Gbps em até 100m e tem menor custo de instalação que a fibra.", true),
      alternativa("C", "O par trançado é imune a interferências eletromagnéticas, sendo superior à fibra.", false),
      alternativa("D", "A fibra óptica transmite dados através de sinais elétricos.", false),
      alternativa("E", "O cabo coaxial é a alternativa mais moderna e recomendada.", false),
      gabarito("B", "Cat6 suporta até 10Gbps (em distâncias curtas) ou 1Gbps até 100m, com custo muito inferior à fibra e instalação simples com conectores RJ-45. Para andares de um mesmo prédio (curtas distâncias), é a solução custo-benefício ideal. Erros: A) Fibra é mais cara; C) Quem é imune a EMI é a FIBRA (usa luz, não eletricidade!); D) Fibra usa pulsos de LUZ, não elétricos; E) Coaxial está em desuso.", "Fibra = cara, rápida, imune a EMI, longas distâncias. Par trançado = barato, prático, até 100m, sujeito a EMI."),
      blankLine(),
      pageBreak(),

      // ===== Q3 =====
      questionHeader(3, "Uma empresa está desenvolvendo uma aplicação de chamada de voz em tempo real pela Internet (VoIP). Qual protocolo de transporte é mais adequado e por quê?"),
      alternativa("A", "TCP — pois garante que todos os pacotes de voz cheguem sem perda, melhorando a qualidade.", false),
      alternativa("B", "UDP — pois tem menor latência e overhead, sendo ideal para transmissão em tempo real onde pequenas perdas são aceitáveis.", true),
      alternativa("C", "FTP — pois foi projetado para transmissões de áudio e vídeo em tempo real.", false),
      alternativa("D", "SMTP — pois gerencia o envio de dados de voz entre os usuários.", false),
      alternativa("E", "HTTPS — pois criptografa a voz garantindo segurança e qualidade simultâneas.", false),
      gabarito("B", "VoIP (chamada de voz em tempo real) usa UDP porque: latência baixa é crítica — uma pausa de 1 segundo para retransmitir é pior do que perder um fragmento de voz; os dados precisam chegar em tempo real, não podem esperar retransmissões. O TCP seria inadequado pois o Three-Way Handshake e as retransmissões causariam atraso inaceitável. FTP, SMTP e HTTPS são protocolos/serviços de aplicação, não de transporte.", "Regra: tempo real + aceita perdas = UDP. Integridade obrigatória + pode esperar = TCP."),
      blankLine(),

      // ===== Q4 =====
      questionHeader(4, "Uma empresa está transferindo um documento jurídico sigiloso que não pode sofrer nenhuma perda de dados pela rede. Qual protocolo de transporte deve ser utilizado?"),
      alternativa("A", "UDP — pois é mais rápido e eficiente para grandes volumes de dados.", false),
      alternativa("B", "ICMP — pois verifica a integridade dos pacotes durante a transmissão.", false),
      alternativa("C", "TCP — pois garante entrega confiável, ordenada e com confirmação de recebimento.", true),
      alternativa("D", "DNS — pois traduz o endereço de destino e garante entrega correta.", false),
      alternativa("E", "ARP — pois descobre o endereço correto do destinatário.", false),
      gabarito("C", "TCP é o protocolo correto para transmissão de documentos que exigem integridade total. O TCP garante: entrega de todos os segmentos (ACK + retransmissão em caso de perda), ordenação dos dados (controle de sequência), e controle de fluxo e congestionamento. ICMP é protocolo de diagnóstico (ping), DNS resolve nomes, ARP descobre endereços MAC.", "Documentos, e-mails, páginas web, arquivos = TCP. Voz, vídeo ao vivo, jogos = UDP."),
      blankLine(),

      // ===== Q5 =====
      questionHeader(5, "Explique a diferença fundamental entre um protocolo orientado à conexão e um protocolo não orientado à conexão, citando um exemplo de cada um."),
      alternativa("A", "Protocolos orientados à conexão são mais rápidos porque não precisam estabelecer sessão antes de enviar dados.", false),
      alternativa("B", "Um protocolo orientado à conexão (ex.: TCP) estabelece uma sessão antes da transmissão, garantindo confiabilidade. Um protocolo não orientado à conexão (ex.: UDP) envia dados imediatamente sem estabelecer sessão.", true),
      alternativa("C", "Protocolos não orientados à conexão são mais confiáveis porque enviam os dados de forma mais segura.", false),
      alternativa("D", "TCP e UDP são equivalentes em confiabilidade, diferindo apenas na velocidade de transmissão.", false),
      alternativa("E", "Protocolos orientados à conexão utilizam o endereço MAC para identificar o destinatário antes da transmissão.", false),
      gabarito("B", "Protocolo ORIENTADO à conexão (TCP): estabelece conexão via Three-Way Handshake antes de enviar dados, garante entrega, ordenação e retransmissão em caso de falha — CONFIÁVEL mas mais lento. Protocolo NÃO ORIENTADO à conexão (UDP): envia dados imediatamente sem handshake, sem confirmação, sem retransmissão — RÁPIDO mas não confiável. A confiabilidade influencia diretamente o tipo de aplicação adequada.", "Lembre: 'conexão = confiança = TCP'. 'Sem conexão = sem garantia = UDP'."),
      blankLine(),

      // ===== Q6 =====
      questionHeader(6, "Um servidor corporativo possui os seguintes serviços ativos: servidor web seguro, serviço de resolução de nomes e acesso remoto por terminal seguro. Quais são as portas normalmente utilizadas por esses serviços?"),
      alternativa("A", "Servidor web seguro: porta 80 / Resolução de nomes: porta 53 / Acesso remoto seguro: porta 23.", false),
      alternativa("B", "Servidor web seguro: porta 443 / Resolução de nomes: porta 53 / Acesso remoto seguro: porta 22.", true),
      alternativa("C", "Servidor web seguro: porta 443 / Resolução de nomes: porta 21 / Acesso remoto seguro: porta 22.", false),
      alternativa("D", "Servidor web seguro: porta 8080 / Resolução de nomes: porta 110 / Acesso remoto seguro: porta 25.", false),
      alternativa("E", "Servidor web seguro: porta 443 / Resolução de nomes: porta 67 / Acesso remoto seguro: porta 23.", false),
      gabarito("B", "Servidor web SEGURO = HTTPS = porta 443 (TCP). Sem segurança = HTTP = porta 80. Serviço de resolução de nomes = DNS = porta 53 (UDP/TCP). Acesso remoto por terminal SEGURO = SSH = porta 22 (TCP). Telnet (porta 23) é acesso remoto SEM criptografia — não confundir. FTP = 21, SMTP = 25, POP3 = 110, DHCP = 67/68.", "HTTPS=443, HTTP=80, SSH=22, Telnet=23, DNS=53, FTP=21, SMTP=25. 'S' de Seguro = 443 (web) e 22 (terminal)."),
      blankLine(),
      pageBreak(),

      // ===== Q7 =====
      questionHeader(7, "Uma estação de trabalho foi conectada pela primeira vez a uma rede corporativa e recebeu automaticamente: IP, máscara de sub-rede, gateway e DNS. Qual é a sequência correta do processo DHCP?"),
      alternativa("A", "OFFER → DISCOVER → REQUEST → ACKNOWLEDGE.", false),
      alternativa("B", "DISCOVER → REQUEST → OFFER → ACKNOWLEDGE.", false),
      alternativa("C", "DISCOVER → OFFER → REQUEST → ACKNOWLEDGE.", true),
      alternativa("D", "REQUEST → DISCOVER → OFFER → ACKNOWLEDGE.", false),
      alternativa("E", "ACKNOWLEDGE → DISCOVER → OFFER → REQUEST.", false),
      gabarito("C", "O processo DHCP segue a sigla DORA: D=DISCOVER (cliente faz broadcast procurando servidor DHCP), O=OFFER (servidor DHCP oferece um IP disponível), R=REQUEST (cliente solicita formalmente o IP oferecido), A=ACKNOWLEDGE (servidor confirma e entrega IP, máscara, gateway e DNS). Sem DHCP, cada máquina precisaria ser configurada manualmente.", "DORA = Discover, Offer, Request, Acknowledge. Memorize como nome próprio: 'DORA configurou a rede'."),
      blankLine(),

      // ===== Q8 =====
      questionHeader(8, "Um computador consegue acessar páginas web digitando diretamente o endereço IP, mas não consegue acessá-las usando o nome de domínio. Qual serviço deve ser investigado primeiro?"),
      alternativa("A", "DHCP — pois o IP atribuído automaticamente pode estar incorreto.", false),
      alternativa("B", "Gateway padrão — pois sem gateway o computador não acessa a Internet.", false),
      alternativa("C", "DNS — pois o acesso por IP funciona, mas a resolução de nomes para IP está falhando.", true),
      alternativa("D", "Firewall — pois pode estar bloqueando o tráfego web.", false),
      alternativa("E", "Switch — pois pode haver falha no encaminhamento de quadros.", false),
      gabarito("C", "Se o computador acessa por IP direto, a conectividade de rede está OK (gateway, rota, firewall estão funcionando). O problema é que o nome de domínio não está sendo traduzido para IP. Essa é exatamente a função do DNS. O serviço DNS deve ser investigado: está configurado corretamente? O servidor DNS está acessível? O comando 'nslookup google.com' confirmaria ou negaria o problema.", "Acessa por IP mas não por nome = problema de DNS. Acessa nada = problema de gateway/conectividade."),
      blankLine(),

      // ===== Q9 =====
      questionHeader(9, "Analise o endereço IP 10.25.30.40. Identifique a classe, a máscara padrão e se é público ou privado."),
      alternativa("A", "Classe B / Máscara 255.255.0.0 / Público.", false),
      alternativa("B", "Classe A / Máscara 255.0.0.0 / Privado.", true),
      alternativa("C", "Classe C / Máscara 255.255.255.0 / Privado.", false),
      alternativa("D", "Classe A / Máscara 255.0.0.0 / Público.", false),
      alternativa("E", "Classe B / Máscara 255.255.0.0 / Privado.", false),
      gabarito("B", "O primeiro octeto é 10. A Classe A vai de 1 a 126 no primeiro octeto → é Classe A. Máscara padrão da Classe A = 255.0.0.0 (/8). O endereço 10.0.0.0/8 é um bloco PRIVADO (RFC 1918) — não é roteável na Internet pública. Endereços privados: 10.x.x.x (Classe A), 172.16-31.x.x (Classe B), 192.168.x.x (Classe C).", "Primeiro octeto: 1-126=A, 128-191=B, 192-223=C. Privados: 10.x.x.x, 172.16-31.x.x, 192.168.x.x."),
      blankLine(),

      // ===== Q10 =====
      questionHeader(10, "Analise o endereço IP 172.20.100.5. Identifique a classe, a máscara padrão e se é público ou privado."),
      alternativa("A", "Classe A / Máscara 255.0.0.0 / Privado.", false),
      alternativa("B", "Classe C / Máscara 255.255.255.0 / Público.", false),
      alternativa("C", "Classe B / Máscara 255.255.0.0 / Privado.", true),
      alternativa("D", "Classe B / Máscara 255.255.0.0 / Público.", false),
      alternativa("E", "Classe D / Sem máscara / Multicast.", false),
      gabarito("C", "Primeiro octeto = 172. A Classe B vai de 128 a 191 → é Classe B. Máscara padrão = 255.255.0.0 (/16). O endereço 172.20.x.x é privado — os endereços privados da Classe B são de 172.16.0.0 a 172.31.255.255. Como 172.20 está nesse intervalo, é PRIVADO.", "Classe B privada vai de 172.16 a 172.31 no terceiro octeto. 172.20 está nessa faixa = privado."),
      blankLine(),
      pageBreak(),

      // ===== Q11 =====
      questionHeader(11, "Analise o endereço 192.168.10.200. Identifique a classe, máscara padrão e se é público ou privado."),
      alternativa("A", "Classe B / 255.255.0.0 / Privado.", false),
      alternativa("B", "Classe C / 255.255.255.0 / Público.", false),
      alternativa("C", "Classe C / 255.255.255.0 / Privado.", true),
      alternativa("D", "Classe A / 255.0.0.0 / Privado.", false),
      alternativa("E", "Classe C / 255.255.255.0 / Privado — mas não pode ser atribuído a hosts.", false),
      gabarito("C", "Primeiro octeto = 192. A Classe C vai de 192 a 223 → é Classe C. Máscara padrão = 255.255.255.0 (/24). O endereço 192.168.10.200 pertence ao bloco 192.168.0.0/16 que é PRIVADO (RFC 1918). É um endereço válido para hosts (não é endereço de rede nem broadcast).", "192.168.x.x sempre privado. Classe C: 192-223 no primeiro octeto, máscara /24."),
      blankLine(),

      // ===== Q12 =====
      questionHeader(12, "Analise o endereço 200.100.50.25. Identifique a classe, máscara padrão e se é público ou privado."),
      alternativa("A", "Classe C / 255.255.255.0 / Público.", true),
      alternativa("B", "Classe C / 255.255.255.0 / Privado.", false),
      alternativa("C", "Classe B / 255.255.0.0 / Público.", false),
      alternativa("D", "Classe D / Sem máscara / Multicast.", false),
      alternativa("E", "Classe A / 255.0.0.0 / Público.", false),
      gabarito("A", "Primeiro octeto = 200. A Classe C vai de 192 a 223 → é Classe C. Máscara padrão = 255.255.255.0. Este endereço NÃO pertence a nenhum bloco privado (privados Classe C são apenas 192.168.x.x). Portanto, é um endereço PÚBLICO, roteável na Internet.", "Endereços 200.x.x.x são Classe C públicos — não confundir com 192.168.x.x (privados)."),
      blankLine(),

      // ===== Q13 =====
      questionHeader(13, "Uma empresa recebeu a rede 192.168.50.0/24 e precisa dividi-la em 4 sub-redes de mesmo tamanho. Qual será a nova máscara de sub-rede?"),
      alternativa("A", "/25 — 255.255.255.128 — 2 sub-redes de 126 hosts cada.", false),
      alternativa("B", "/26 — 255.255.255.192 — 4 sub-redes de 62 hosts cada.", true),
      alternativa("C", "/27 — 255.255.255.224 — 8 sub-redes de 30 hosts cada.", false),
      alternativa("D", "/28 — 255.255.255.240 — 16 sub-redes de 14 hosts cada.", false),
      alternativa("E", "/24 — 255.255.255.0 — 1 sub-rede de 254 hosts.", false),
      gabarito("B", "Para criar 4 sub-redes precisamos de 2 bits emprestados (2² = 4). Partindo de /24, adicionamos 2 bits: 24+2 = /26. Máscara = 255.255.255.192. Cada sub-rede terá 32-26=6 bits de host → 2⁶-2 = 62 hosts úteis. As 4 sub-redes seriam: 192.168.50.0/26, 192.168.50.64/26, 192.168.50.128/26, 192.168.50.192/26.", "Sub-redes = 2^(bits emprestados). Para 4: 2²=4, então emprestar 2 bits. Adicione 2 ao prefixo: /24 → /26."),
      blankLine(),

      // ===== Q14 =====
      questionHeader(14, "Seguindo o planejamento da questão anterior (192.168.50.0/26), qual é o intervalo de endereços da primeira sub-rede e quantos hosts válidos ela possui?"),
      alternativa("A", "192.168.50.0 – 192.168.50.63 / 62 hosts válidos.", true),
      alternativa("B", "192.168.50.0 – 192.168.50.64 / 63 hosts válidos.", false),
      alternativa("C", "192.168.50.1 – 192.168.50.63 / 63 hosts válidos.", false),
      alternativa("D", "192.168.50.0 – 192.168.50.255 / 254 hosts válidos.", false),
      alternativa("E", "192.168.50.1 – 192.168.50.62 / 62 hosts válidos.", false),
      gabarito("A", "A primeira sub-rede 192.168.50.0/26 vai de .0 a .63: endereço de rede = 192.168.50.0, broadcast = 192.168.50.63, hosts válidos = .1 a .62 = 62 hosts. A alternativa A está correta ao afirmar que o intervalo é .0 a .63 com 62 hosts válidos. A C está errada porque indica 63 hosts (esqueceu de subtrair o broadcast). A E indica apenas os hosts (sem rede e broadcast), mas afirma 62 — seria correto o número mas o intervalo incorreto.", "Intervalo da sub-rede inclui endereço de rede (.0) e broadcast (.63). Hosts válidos = intervalo – 2 extremos."),
      blankLine(),
      pageBreak(),

      // ===== Q15 =====
      questionHeader(15, "Os Computadores A (192.168.1.10/24) e B (192.168.2.20/24) estão no mesmo switch, mas não se comunicam via ping. Eles pertencem à mesma rede?"),
      alternativa("A", "Sim — ambos usam a mesma máscara /24, então estão na mesma rede.", false),
      alternativa("B", "Sim — por estarem no mesmo switch, sempre pertencem à mesma rede.", false),
      alternativa("C", "Não — computador A está na rede 192.168.1.0 e computador B está na rede 192.168.2.0, que são redes diferentes.", true),
      alternativa("D", "Não — porque a máscara /24 impede a comunicação direta entre dispositivos.", false),
      alternativa("E", "Sim — o switch resolve o problema de redes diferentes automaticamente.", false),
      gabarito("C", "Aplicando a máscara /24 (255.255.255.0): Computador A: 192.168.1.10 AND 255.255.255.0 = rede 192.168.1.0. Computador B: 192.168.2.20 AND 255.255.255.0 = rede 192.168.2.0. São REDES DIFERENTES. O switch opera em Camada 2 e não faz roteamento entre redes — isso é função do roteador. Para resolver sem roteador: mudar um dos IPs para a mesma faixa (ex.: B para 192.168.1.20).", "Máscara /24 = os 3 primeiros octetos identificam a rede. 192.168.1.x ≠ 192.168.2.x → redes diferentes!"),
      blankLine(),

      // ===== Q16 =====
      questionHeader(16, "Uma escola deseja segmentar sua rede em três grupos: Administração, Professores e Laboratório de Informática. Qual tecnologia permite fazer isso de forma lógica em um mesmo switch, sem precisar de hardware separado?"),
      alternativa("A", "NAT — pois traduz endereços IP entre os diferentes grupos.", false),
      alternativa("B", "DHCP — pois atribui IPs diferentes para cada grupo automaticamente.", false),
      alternativa("C", "VLAN — pois cria redes locais virtuais dentro de um mesmo equipamento físico.", true),
      alternativa("D", "DNS — pois resolve nomes diferentes para cada departamento.", false),
      alternativa("E", "Firewall — pois bloqueia a comunicação entre os grupos.", false),
      gabarito("C", "VLAN (Virtual LAN) permite segmentar logicamente a rede em grupos independentes dentro de um mesmo switch físico. Cada VLAN cria um domínio de broadcast separado, aumentando segurança (grupos não se comunicam sem roteador), desempenho (menos broadcast) e organização (cada departamento na sua VLAN). DHCP distribui IPs mas não segmenta a rede; NAT traduz endereços; Firewall bloqueia tráfego mas não cria segmentos.", "VLAN = segmentação lógica no switch. 1 switch físico → múltiplas redes virtuais."),
      blankLine(),

      // ===== Q17 =====
      questionHeader(17, "Em uma rede Ethernet, dois computadores tentam transmitir dados simultaneamente pelo mesmo meio compartilhado, causando colisão. Qual mecanismo da camada de enlace lida com esse problema?"),
      alternativa("A", "CSMA/CA — evita colisões em redes sem fio antecipando a transmissão.", false),
      alternativa("B", "CRC — detecta e corrige automaticamente todos os erros de transmissão.", false),
      alternativa("C", "ARP — descobre o endereço MAC do destinatário para evitar conflitos.", false),
      alternativa("D", "CSMA/CD — detecta a colisão e agenda a retransmissão após backoff aleatório.", true),
      alternativa("E", "DNS — resolve nomes para IPs evitando conflitos de endereço.", false),
      gabarito("D", "CSMA/CD (Carrier Sense Multiple Access with Collision Detection) é o protocolo usado no Ethernet cabeado half-duplex. Quando uma colisão é detectada: todos param de transmitir, enviam sinal de jam (aviso), esperam tempo aleatório (backoff exponencial) e retransmitem. Importante: CRC detecta erros mas NÃO os corrige automaticamente — apenas indica que o quadro deve ser descartado. CSMA/CA é para Wi-Fi (evitar, não detectar).", "CD = Collision DETECTION (Ethernet, detecta depois). CA = Collision AVOIDANCE (Wi-Fi, evita antes)."),
      blankLine(),

      // ===== Q18 =====
      questionHeader(18, "O que é o endereço MAC e qual é a sua função dentro de uma rede de computadores?"),
      alternativa("A", "É um endereço lógico de 32 bits, configurado por software, que identifica dispositivos na Internet.", false),
      alternativa("B", "É um endereço físico de 48 bits, gravado no hardware da placa de rede, que identifica dispositivos dentro da rede local (Camada 2).", true),
      alternativa("C", "É um endereço virtual criado pelo roteador para identificar dispositivos em redes externas.", false),
      alternativa("D", "É um endereço de 128 bits usado pelo protocolo IPv6 para identificar dispositivos em redes locais.", false),
      alternativa("E", "É um número de porta lógica usado pela camada de transporte para identificar processos em execução.", false),
      gabarito("B", "MAC (Media Access Control) address é o endereço FÍSICO de 48 bits (6 bytes) em notação hexadecimal (AA:BB:CC:DD:EE:FF), gravado na placa de rede (NIC) pelo fabricante. Ele é usado na Camada 2 (Enlace) para identificar dispositivos dentro da LAN. O switch usa a tabela MAC para decidir para qual porta enviar os quadros. MAC ≠ IP: MAC é permanente e local; IP é configurável e global.", "MAC = 48 bits, hexadecimal, hardware, Camada 2, local. IP = 32 bits, decimal, software, Camada 3, global."),
      blankLine(),
      pageBreak(),

      // ===== Q19 =====
      questionHeader(19, "Um administrador capturou tráfego com Wireshark e identificou os flags SYN, SYN-ACK e ACK em sequência para a porta 443. O que está ocorrendo?"),
      alternativa("A", "Transferência de arquivos via FTP na porta 443.", false),
      alternativa("B", "Consulta DNS para resolução de nome de domínio.", false),
      alternativa("C", "Estabelecimento de conexão HTTPS via Three-Way Handshake, seguido de navegação web segura.", true),
      alternativa("D", "Transmissão de streaming de vídeo via UDP com handshake de qualidade.", false),
      alternativa("E", "Abertura de sessão SSH com handshake de três vias na porta 443.", false),
      gabarito("C", "SYN → SYN-ACK → ACK = exatamente o Three-Way Handshake do TCP. Porta 443 = HTTPS (HTTP seguro com TLS/SSL). Conclusão: é o estabelecimento de uma conexão HTTPS. Erros: FTP usa portas 20/21; DNS usa UDP na porta 53 (sem 3-way handshake para consultas); UDP NÃO faz Three-Way Handshake; SSH usa TCP mas na porta 22, não 443.", "Porta 443 = HTTPS. SYN+SYN-ACK+ACK = Three-Way Handshake do TCP. Sempre que ver as duas juntas = HTTPS."),
      blankLine(),

      // ===== Q20 =====
      questionHeader(20, "Por que jogos online em tempo real normalmente utilizam UDP em vez de TCP?"),
      alternativa("A", "TCP reduz a latência ao controlar o fluxo de dados automaticamente.", false),
      alternativa("B", "UDP é mais confiável que TCP para transmissão de dados em ambientes de alto tráfego.", false),
      alternativa("C", "UDP utiliza criptografia nativa que protege os dados dos jogadores.", false),
      alternativa("D", "UDP não establece conexão, não faz retransmissões e tem cabeçalho menor, reduzindo a latência — e jogos aceitam pequenas perdas de pacotes.", true),
      alternativa("E", "TCP é incompatível com roteadores utilizados em servidores de games.", false),
      gabarito("D", "Jogos online priorizam VELOCIDADE sobre CONFIABILIDADE. Perder um frame de posição é aceitável; travar para retransmitir é inaceitável. UDP: cabeçalho de 8 bytes (vs 20+ do TCP), sem handshake (envia imediatamente), sem retransmissões, sem controle de congestionamento. Exemplos reais: Counter-Strike, Fortnite, LoL — todos usam UDP para comunicação em tempo real.", "Jogos e vídeo ao vivo = UDP (velocidade > confiabilidade). Bancos e e-mail = TCP (confiabilidade > velocidade)."),
      blankLine(),

      // ===== Q21 =====
      questionHeader(21, "Qual é a função principal da Camada 3 (Rede) do Modelo OSI e qual dispositivo opera nessa camada?"),
      alternativa("A", "Transmitir bits pelo meio físico. Dispositivo: Hub.", false),
      alternativa("B", "Controlar acesso ao meio e detectar erros. Dispositivo: Switch.", false),
      alternativa("C", "Realizar o roteamento de pacotes entre redes diferentes usando endereços IP. Dispositivo: Roteador.", true),
      alternativa("D", "Gerenciar sessões entre aplicações. Dispositivo: Servidor de Aplicação.", false),
      alternativa("E", "Criptografar e comprimir dados. Dispositivo: Firewall.", false),
      gabarito("C", "A Camada 3 (Rede) é responsável pelo endereçamento LÓGICO (IP) e pelo ROTEAMENTO — decidir o melhor caminho para os pacotes chegarem ao destino, mesmo que passem por múltiplas redes. O dispositivo que opera nessa camada é o ROTEADOR. Comparação: Hub=C1, Switch=C2, Roteador=C3. O protocolo IP opera na Camada 3.", "Camada 1=Hub (bits), Camada 2=Switch (MAC), Camada 3=Roteador (IP). Decorar: 1-2-3 = Hub-Switch-Roteador."),
      blankLine(),

      // ===== Q22 =====
      questionHeader(22, "Qual é a diferença entre roteamento estático e roteamento dinâmico?"),
      alternativa("A", "Roteamento estático é mais rápido porque usa protocolos que trocam informações automaticamente; dinâmico é configurado manualmente.", false),
      alternativa("B", "Roteamento estático é configurado manualmente pelo administrador e não se adapta a falhas. Roteamento dinâmico usa protocolos (RIP, OSPF, BGP) que atualizam rotas automaticamente.", true),
      alternativa("C", "Roteamento dinâmico é exclusivo de redes WAN e estático é usado apenas em LANs.", false),
      alternativa("D", "Ambos funcionam da mesma forma, diferindo apenas no protocolo de transporte utilizado.", false),
      alternativa("E", "Roteamento dinâmico usa endereços MAC e estático usa endereços IP para encaminhar pacotes.", false),
      gabarito("B", "ESTÁTICO: o administrador configura manualmente cada rota. Vantagem: simples, sem overhead de protocolos. Desvantagem: não se adapta a falhas — se uma rota cai, o tráfego não é desviado automaticamente. DINÂMICO: roteadores trocam informações entre si via protocolos (RIP=distância, OSPF=estado de enlace, BGP=Internet). Vantagem: adapta-se a falhas e mudanças. Desvantagem: mais complexo e usa banda.", "Estático = manual, simples, não adapta. Dinâmico = automático (RIP/OSPF/BGP), complexo, adapta a falhas."),
      blankLine(),
      pageBreak(),

      // ===== Q23 =====
      questionHeader(23, "Qual é a função do gateway padrão (default gateway) na configuração de rede de um host?"),
      alternativa("A", "Traduzir nomes de domínio para endereços IP na rede local.", false),
      alternativa("B", "Atribuir endereços IP automaticamente para os dispositivos da rede.", false),
      alternativa("C", "Filtrar pacotes maliciosos antes de chegarem ao dispositivo final.", false),
      alternativa("D", "Ser o endereço IP do roteador para onde o host envia pacotes destinados a redes externas.", true),
      alternativa("E", "Identificar o dispositivo dentro da rede local por meio do endereço físico.", false),
      gabarito("D", "O gateway padrão é o endereço IP do roteador (ou interface do roteador) conectado à rede local. Quando um host precisa enviar um pacote para um endereço fora da sua rede, ele envia o pacote para o gateway, que então faz o roteamento para a rede correta. Sem gateway configurado, o host só consegue se comunicar dentro da sua própria sub-rede.", "Gateway = porta de saída para outras redes. Sem gateway = preso na rede local. Com gateway = acessa Internet."),
      blankLine(),

      // ===== Q24 =====
      questionHeader(24, "Qual protocolo é utilizado pelo comando 'ping' e em qual camada do Modelo OSI ele opera?"),
      alternativa("A", "TCP — Camada 4 (Transporte).", false),
      alternativa("B", "UDP — Camada 4 (Transporte).", false),
      alternativa("C", "ICMP — Camada 3 (Rede).", true),
      alternativa("D", "ARP — Camada 2 (Enlace).", false),
      alternativa("E", "DNS — Camada 7 (Aplicação).", false),
      gabarito("C", "O comando ping usa o protocolo ICMP (Internet Control Message Protocol), que opera na Camada 3 (Rede). O ping envia pacotes ICMP Echo Request ao destino e aguarda ICMP Echo Reply. É uma ferramenta de diagnóstico que testa alcançabilidade e mede latência. O traceroute/tracert também usa ICMP para mapear o caminho até o destino.", "ping = ICMP = Camada 3. ARP = Camada 2 (descobre MAC). DNS = Camada 7 (resolve nomes). TCP/UDP = Camada 4."),
      blankLine(),

      // ===== Q25 =====
      questionHeader(25, "Qual é a diferença entre o endereço 127.0.0.1 e o endereço APIPA (169.254.x.x)?"),
      alternativa("A", "127.0.0.1 é atribuído pelo DHCP como endereço de emergência; APIPA é o endereço de loopback.", false),
      alternativa("B", "127.0.0.1 é o endereço de loopback, usado para testar a pilha TCP/IP local; APIPA (169.254.x.x) é atribuído automaticamente quando o DHCP falha.", true),
      alternativa("C", "Ambos são endereços de broadcast — 127.0.0.1 para redes locais e APIPA para redes externas.", false),
      alternativa("D", "127.0.0.1 identifica o servidor DNS da rede; APIPA é o gateway padrão de emergência.", false),
      alternativa("E", "APIPA é um endereço público atribuído pela IANA quando o IP privado está esgotado.", false),
      gabarito("B", "127.0.0.1 (loopback): testa se a pilha de protocolos TCP/IP da máquina está funcionando. O pacote não sai da máquina. 'ping 127.0.0.1' sempre deve responder. APIPA (Automatic Private IP Addressing): quando um cliente Windows não consegue contato com o servidor DHCP, ele auto-configura um endereço na faixa 169.254.0.0/16. Isso indica falha no DHCP e a máquina só se comunica localmente com outros dispositivos APIPA.", "127.0.0.1 = loopback (testa a própria máquina). 169.254.x.x = APIPA (DHCP falhou, endereço de emergência)."),
      blankLine(),

      // ===== Q26 =====
      questionHeader(26, "Uma empresa possui 50 computadores em uma única rede. Qual máscara seria mais adequada para essa situação, evitando desperdício de endereços?"),
      alternativa("A", "/24 — 254 hosts disponíveis. Atende, mas desperdiça ~200 endereços.", false),
      alternativa("B", "/25 — 126 hosts disponíveis. Atende, mas desperdiça ~76 endereços.", false),
      alternativa("C", "/26 — 62 hosts disponíveis. É a menor máscara que atende 50 hosts com pequena folga.", true),
      alternativa("D", "/27 — 30 hosts disponíveis. Insuficiente para 50 computadores.", false),
      alternativa("E", "/28 — 14 hosts disponíveis. Insuficiente para 50 computadores.", false),
      gabarito("C", "Cálculo: /27 = 2^5 - 2 = 30 hosts (insuficiente). /26 = 2^6 - 2 = 62 hosts (suficiente para 50, com folga para crescimento). /25 = 126 hosts (muito mais do que precisa). O conceito aplicado é VLSM (Variable Length Subnet Mask): usar a menor sub-rede possível que atende à demanda, evitando desperdício de endereços IP.", "Para N hosts: encontre o menor 2^x onde x-2 ≥ N. Para 50: 2^6=64, 64-2=62 ≥ 50. Portanto /26."),
      blankLine(),
      pageBreak(),

      // ===== Q27 =====
      questionHeader(27, "Qual é a diferença entre os protocolos HTTP e HTTPS? Por que o HTTPS é considerado essencial atualmente?"),
      alternativa("A", "HTTP usa porta 443 e HTTPS usa porta 80. HTTPS é mais rápido por usar compressão de dados.", false),
      alternativa("B", "HTTP é para páginas estáticas e HTTPS para páginas dinâmicas. Ambos têm a mesma segurança.", false),
      alternativa("C", "HTTP (porta 80) transmite dados em texto puro, sem criptografia. HTTPS (porta 443) criptografa os dados com TLS/SSL, protegendo contra interceptação.", true),
      alternativa("D", "HTTP e HTTPS são equivalentes — a diferença é apenas o provedor de hospedagem.", false),
      alternativa("E", "HTTPS usa UDP enquanto HTTP usa TCP, por isso HTTPS é mais rápido.", false),
      gabarito("C", "HTTP (HyperText Transfer Protocol) usa a porta 80 e transmite dados em texto puro — qualquer um na rede pode interceptar e ler (senhas, dados pessoais). HTTPS = HTTP + TLS/SSL: usa porta 443, criptografa todos os dados entre cliente e servidor, autentica o servidor via certificado digital. É essencial para: e-commerce, internet banking, login, qualquer site que trate dados sensíveis.", "HTTP=80 sem criptografia. HTTPS=443 com TLS/SSL. Ambos usam TCP. O 'S' = Secure = criptografado."),
      blankLine(),

      // ===== Q28 =====
      questionHeader(28, "Qual protocolo é responsável pelo envio de e-mails e em qual porta opera? Qual protocolo é usado para recebimento e qual a diferença entre POP3 e IMAP?"),
      alternativa("A", "Envio: IMAP (porta 143). Recebimento: SMTP (porta 25). POP3 e IMAP são idênticos.", false),
      alternativa("B", "Envio: SMTP (porta 25). Recebimento: POP3 (porta 110) ou IMAP (porta 143). POP3 baixa e remove do servidor; IMAP mantém no servidor e sincroniza.", true),
      alternativa("C", "Envio: FTP (porta 21). Recebimento: HTTP (porta 80). Ambos funcionam sem autenticação.", false),
      alternativa("D", "Envio: DNS (porta 53). Recebimento: DHCP (porta 67). A diferença é apenas na velocidade de entrega.", false),
      alternativa("E", "Envio: SMTP (porta 443). Recebimento: POP3 (porta 22). IMAP é mais antigo que POP3.", false),
      gabarito("B", "SMTP (Simple Mail Transfer Protocol) porta 25: protocolo de ENVIO de e-mails. POP3 (porta 110): baixa os e-mails para o dispositivo e os remove do servidor — bom para uso offline, ruim para múltiplos dispositivos. IMAP (porta 143): mantém e-mails no servidor, sincroniza entre todos os dispositivos — ideal para acesso em celular, tablet e computador simultaneamente.", "SMTP=25 (envia). POP3=110 (baixa e apaga). IMAP=143 (mantém no servidor). IMAP é mais moderno e flexível."),
      blankLine(),

      // ===== Q29 =====
      questionHeader(29, "O que é NAT (Network Address Translation) e qual a sua relação com endereços IP privados e públicos?"),
      alternativa("A", "NAT é um protocolo que distribui endereços IP automaticamente para dispositivos da rede.", false),
      alternativa("B", "NAT traduz endereços IP privados em endereços IP públicos (e vice-versa), permitindo que múltiplos dispositivos de uma rede interna compartilhem um único endereço público.", true),
      alternativa("C", "NAT é responsável por criptografar os pacotes antes de enviá-los para a Internet.", false),
      alternativa("D", "NAT funciona apenas com IPv6 e é incompatível com IPv4.", false),
      alternativa("E", "NAT substitui o DNS na resolução de nomes de domínio para endereços IP.", false),
      gabarito("B", "NAT (Network Address Translation) é uma tecnologia implementada geralmente no roteador que traduz endereços IP privados (não roteáveis na Internet) para o endereço IP público do roteador, permitindo que todos os dispositivos da rede interna acessem a Internet usando um único IP público. Sem NAT, cada dispositivo precisaria de um IP público — o que esgotaria o espaço de endereços IPv4 rapidamente.", "NAT = 'tradutor' de IP privado → IP público. É por isso que você pode ter 10 dispositivos em casa com 1 IP da operadora."),
      blankLine(),
      pageBreak(),

      // ===== Q30 =====
      questionHeader(30, "Qual é a função do switch em uma rede corporativa e como ele diferencia um hub?"),
      alternativa("A", "Switch e hub são equivalentes — ambos enviam dados para todas as portas simultaneamente.", false),
      alternativa("B", "O switch opera na Camada 3 e usa endereços IP. O hub opera na Camada 2 e usa endereços MAC.", false),
      alternativa("C", "O switch aprende endereços MAC e encaminha quadros apenas para a porta correta; o hub repassa o sinal para TODAS as portas sem inteligência.", true),
      alternativa("D", "O switch cria colisões propositais para controlar o tráfego; o hub evita colisões.", false),
      alternativa("E", "O hub é mais moderno que o switch e oferece melhor desempenho em redes atuais.", false),
      gabarito("C", "HUB (Camada 1): repassa o sinal elétrico para TODAS as portas — sem inteligência, cria um único domínio de colisão e broadcast. É obsoleto. SWITCH (Camada 2): aprende a tabela MAC dinamicamente, encaminha quadros somente para a porta onde o destinatário está. Isso cria domínios de colisão separados por porta, aumentando enormemente o desempenho. Cada porta do switch é um domínio de colisão independente.", "Hub = grita para todos (burro). Switch = sussurra para o certo (inteligente). Switch usa MAC, Roteador usa IP."),
      blankLine(),

      // ===== Q31 =====
      questionHeader(31, "O que é FTP e em quais portas opera? Em qual camada do modelo OSI o FTP atua?"),
      alternativa("A", "FTP é um protocolo de Camada 3 para roteamento de arquivos. Porta 80.", false),
      alternativa("B", "FTP (File Transfer Protocol) é um protocolo de Camada 7 para transferência de arquivos. Usa as portas 20 (dados) e 21 (controle) com TCP.", true),
      alternativa("C", "FTP opera na Camada 4 com UDP para maior velocidade de transferência. Porta 53.", false),
      alternativa("D", "FTP é protocolo de e-mail da Camada 7. Porta 25.", false),
      alternativa("E", "FTP usa porta 443 com criptografia TLS/SSL para transferências seguras.", false),
      gabarito("B", "FTP (File Transfer Protocol) é um protocolo da Camada 7 (Aplicação) que permite transferência de arquivos entre cliente e servidor. Usa DUAS portas TCP: porta 21 para canal de controle (comandos e autenticação) e porta 20 para canal de dados (transferência efetiva dos arquivos). Usa TCP pois arquivos exigem integridade total. SFTP e FTPS são versões seguras.", "FTP = 21 (controle) + 20 (dados). TCP. Camada 7. Para transferência segura = SFTP (sobre SSH, porta 22)."),
      blankLine(),

      // ===== Q32 =====
      questionHeader(32, "Qual é a diferença entre IPv4 e IPv6? Por que o IPv6 foi desenvolvido?"),
      alternativa("A", "IPv4 tem 128 bits e IPv6 tem 32 bits. O IPv6 foi criado para ser mais rápido.", false),
      alternativa("B", "IPv4 (32 bits, ~4,3 bilhões de endereços) e IPv6 (128 bits, 340 undecilhões de endereços). O IPv6 foi criado para resolver o esgotamento de endereços IPv4.", true),
      alternativa("C", "IPv4 e IPv6 são idênticos em capacidade, diferindo apenas no formato de escrita.", false),
      alternativa("D", "IPv6 foi desenvolvido para substituir TCP e UDP na camada de transporte.", false),
      alternativa("E", "IPv6 usa notação decimal e IPv4 usa notação hexadecimal.", false),
      gabarito("B", "IPv4: 32 bits, notação decimal pontuada (192.168.1.1), ~4,3 bilhões de endereços — praticamente esgotados. IPv6: 128 bits, notação hexadecimal com ':' (2001:0db8:85a3::8a2e:0370:7334), 3,4 × 10^38 endereços. O IPv6 foi desenvolvido principalmente para resolver o esgotamento de endereços IPv4, além de trazer melhorias em segurança (IPSec nativo), autoconfiguração e eliminação do NAT.", "IPv4=32 bits=decimal. IPv6=128 bits=hexadecimal. 2^32 ≈ 4 bilhões. 2^128 = quantidade astronomicamente maior."),
      blankLine(),
      pageBreak(),

      // ===== Q33 =====
      questionHeader(33, "O que é um firewall e como ele contribui para a segurança de uma rede corporativa?"),
      alternativa("A", "Firewall é um antivírus de rede que elimina vírus dos pacotes antes de chegarem ao destino.", false),
      alternativa("B", "Firewall é um dispositivo ou software que monitora e filtra o tráfego de rede com base em regras, controlando o que pode entrar e sair da rede.", true),
      alternativa("C", "Firewall é responsável por distribuir endereços IP automaticamente na rede.", false),
      alternativa("D", "Firewall opera exclusivamente na Camada 1 e filtra sinais elétricos indesejados.", false),
      alternativa("E", "Firewall substitui o roteador em redes pequenas, realizando roteamento e filtragem simultaneamente.", false),
      gabarito("B", "Firewall é uma barreira de segurança (hardware ou software) que inspeciona o tráfego de rede e aplica regras para permitir ou bloquear pacotes com base em: endereço IP de origem/destino (Camada 3), porta e protocolo (Camada 4), e até conteúdo/aplicação (Camada 7 — firewall de próxima geração). Protege a rede contra acessos não autorizados, ataques DDoS, varredura de portas e outros ataques.", "Firewall = filtro de pacotes. Pode filtrar por IP (C3), porta (C4) ou aplicação (C7). NÃO é antivírus."),
      blankLine(),

      // ===== Q34 =====
      questionHeader(34, "Qual é a importância do serviço DNS em uma rede corporativa com sistema web interno, servidor de e-mails e acesso à Internet?"),
      alternativa("A", "DNS distribui o tráfego entre servidores, garantindo balanceamento de carga.", false),
      alternativa("B", "DNS atribui endereços IP automáticos para todos os dispositivos da rede corporativa.", false),
      alternativa("C", "DNS permite que usuários acessem recursos por nomes amigáveis (como 'intranet.empresa.com') em vez de precisar memorizar endereços IP, traduzindo nomes em IPs.", true),
      alternativa("D", "DNS criptografa as comunicações entre o cliente e o servidor, garantindo confidencialidade.", false),
      alternativa("E", "DNS roteia pacotes entre as sub-redes da empresa, substituindo o roteador.", false),
      gabarito("C", "DNS (Domain Name System) é o 'catálogo telefônico' da Internet/rede. Ele traduz nomes amigáveis em endereços IP: intranet.empresa.com → 192.168.1.100. Sem DNS, usuários precisariam memorizar IPs. Em uma rede corporativa: acesso ao sistema web interno (intranet), envio/recebimento de e-mails (busca o registro MX do domínio), e acesso à Internet (resolve www.google.com) — tudo depende do DNS.", "DNS = tradutor nome → IP. Porta 53, UDP. Sem DNS = tudo funciona por IP, nada por nome de domínio."),
      blankLine(),

      // ===== Q35 =====
      questionHeader(35, "Em um estudo de caso de rede escolar com 3 laboratórios, secretaria, sala dos professores, Wi-Fi para alunos e câmeras IP: qual equipamento seria responsável por fazer o roteamento entre os diferentes setores da rede?"),
      alternativa("A", "Switch — pois interliga todos os computadores e distribui os quadros por endereço MAC.", false),
      alternativa("B", "Hub — pois repassa o sinal para todos os dispositivos da rede.", false),
      alternativa("C", "Access Point — pois gerencia o Wi-Fi dos alunos e professores.", false),
      alternativa("D", "Roteador — pois opera na Camada 3 e encaminha pacotes entre redes/VLANs diferentes usando endereços IP.", true),
      alternativa("E", "Servidor DHCP — pois distribui IPs e define o caminho entre os setores.", false),
      gabarito("D", "O ROTEADOR opera na Camada 3 e é o equipamento responsável pelo roteamento — encaminhar pacotes entre redes ou VLANs diferentes. Na escola: Laboratório 1, Secretaria, Professores e Wi-Fi alunos podem estar em VLANs separadas. Para comunicar entre elas (ou bloquear, dependendo da política), é o roteador (ou switch L3) que toma essa decisão. O Switch (C2) interliga dispositivos na mesma rede. O AP distribui Wi-Fi. O DHCP distribui IPs.", "Switch = mesma rede (C2 / MAC). Roteador = entre redes (C3 / IP). Hub = obsoleto. AP = Wi-Fi."),
      blankLine(),
      pageBreak(),

      // ========== SEÇÃO 4: ERROS COMUNS ==========
      h1("4. PRINCIPAIS ERROS QUE OS ALUNOS COMETEM"),
      blankLine(),
      makeTable(
        ["ERRO COMUM", "CONFUSÃO", "COMO ACERTAR"],
        [
          ["Trocar CSMA/CD e CSMA/CA", "CSMA/CD → Wi-Fi / CSMA/CA → Ethernet", "CD = Collision Detection = Ethernet cabeada. CA = Collision Avoidance = Wi-Fi."],
          ["Confundir MAC e IP", "MAC = lógico / IP = físico", "MAC = físico (hardware, 48 bits, hex). IP = lógico (software, 32 bits, decimal)."],
          ["Trocar portas", "SSH=443, HTTPS=22, FTP=80", "HTTPS=443, SSH=22, HTTP=80, FTP=21, DNS=53, SMTP=25, POP3=110, IMAP=143."],
          ["Dizer que CRC corrige erros", "CRC detecta E corrige erros", "CRC apenas DETECTA — o quadro com erro é descartado e retransmitido pela camada superior."],
          ["Confundir TCP e UDP com camadas", "TCP opera na Camada 3 / IP opera na Camada 4", "TCP/UDP = Camada 4 (Transporte). IP = Camada 3 (Rede)."],
          ["Calcular hosts errado", "Hosts = 2^n (sem subtrair 2)", "SEMPRE subtrair 2: endereço de rede + broadcast. Fórmula: 2^(bits host) - 2."],
          ["Dizer que switch usa IP", "Switch usa endereços IP", "Switch usa endereços MAC (Camada 2). Roteador usa IP (Camada 3)."],
          ["Confundir DHCP e DNS", "DHCP resolve nomes / DNS distribui IPs", "DHCP distribui IPs automático. DNS resolve nomes (domínio → IP)."],
          ["Dizer que fibra sofre EMI", "Fibra óptica sofre interferência elétrica", "Fibra usa LUZ — imune a EMI. Par trançado usa eletricidade — sofre EMI."],
          ["Confundir POP3 e IMAP", "POP3 mantém e-mail no servidor", "POP3 baixa e apaga do servidor. IMAP mantém no servidor e sincroniza."],
        ],
        [2200, 2200, 4960]
      ),
      blankLine(),
      pageBreak(),

      // ========== SEÇÃO 5: REVISÃO RÁPIDA ==========
      h1("5. REVISÃO RÁPIDA PARA A PROVA"),
      blankLine(),

      sectionBox("🎯 OSI — 7 CAMADAS (de baixo para cima)",
        ["C1 – Física: bits, sinais, cabos, Hub",
         "C2 – Enlace: MAC, Switch, Bridge, CSMA/CD, CRC",
         "C3 – Rede: IP, ICMP, Roteador, Roteamento",
         "C4 – Transporte: TCP, UDP, Portas",
         "C5 – Sessão: NetBIOS, controle de sessão",
         "C6 – Apresentação: TLS, criptografia, compressão",
         "C7 – Aplicação: HTTP, HTTPS, FTP, DNS, DHCP, SMTP"],
        LIGHT_BLUE, DARK_BLUE),
      blankLine(),
      sectionBox("🔢 CLASSES IPv4",
        ["Classe A: 1-126 | Máscara /8 | Privado: 10.x.x.x",
         "Classe B: 128-191 | Máscara /16 | Privado: 172.16-31.x.x",
         "Classe C: 192-223 | Máscara /24 | Privado: 192.168.x.x",
         "Classe D: 224-239 | Multicast",
         "Classe E: 240-255 | Experimental"],
        LIGHT_GREEN, GREEN),
      blankLine(),
      sectionBox("📐 TABELA CIDR — DECORAR",
        ["/24 = 254 hosts | /25 = 126 | /26 = 62 | /27 = 30 | /28 = 14 | /29 = 6 | /30 = 2",
         "Fórmula: Hosts = 2^(32 - prefixo) - 2",
         "Para 4 sub-redes: emprestar 2 bits → /24 vira /26",
         "Endereço de rede = primeiro IP da faixa. Broadcast = último IP."],
        YELLOW_BG, ORANGE),
      blankLine(),
      sectionBox("🚦 TCP vs UDP — REGRA DE OURO",
        ["TCP: confiável, ordenado, com conexão (3-way handshake), mais lento",
         "UDP: rápido, sem garantia, sem conexão, cabeçalho menor (8 bytes)",
         "TCP: HTTP(80), HTTPS(443), FTP(21), SSH(22), SMTP(25), POP3(110), IMAP(143)",
         "UDP: DNS(53), DHCP(67/68), VoIP, streaming, jogos online"],
        LIGHT_BLUE, BLUE),
      blankLine(),
      sectionBox("🔑 SERVIÇOS ESSENCIAIS",
        ["DHCP: distribui IP automático — sequência DORA",
         "DNS: traduz nome → IP — porta 53, UDP — nslookup para testar",
         "NAT: IP privado → IP público no roteador",
         "VLAN: segmenta rede logicamente no switch",
         "Firewall: filtra tráfego por IP, porta ou aplicação"],
        LIGHT_GREEN, GREEN),
      blankLine(),
      pageBreak(),

      // ========== SEÇÃO 6: MAPA MENTAL ==========
      h1("6. MAPA MENTAL EM FORMATO TEXTUAL"),
      blankLine(),
      p("REDES DE COMPUTADORES", { bold: true, size: 26 }),
      blankLine(),
      p("├── MODELO OSI (7 camadas)", { bold: true }),
      p("│   ├── C7 Aplicação → HTTP, HTTPS, FTP, DNS, DHCP, SMTP"),
      p("│   ├── C6 Apresentação → TLS/SSL, criptografia"),
      p("│   ├── C5 Sessão → controle de diálogo"),
      p("│   ├── C4 Transporte → TCP (confiável) / UDP (rápido)"),
      p("│   ├── C3 Rede → IP, ICMP, Roteador"),
      p("│   ├── C2 Enlace → MAC, Switch, CSMA/CD, CSMA/CA, CRC"),
      p("│   └── C1 Física → cabos, fibra, Wi-Fi, Hub"),
      blankLine(),
      p("├── ENDEREÇAMENTO IPv4", { bold: true }),
      p("│   ├── Classes → A(1-126), B(128-191), C(192-223), D(224-239), E(240-255)"),
      p("│   ├── Privados → 10.x.x.x | 172.16-31.x.x | 192.168.x.x"),
      p("│   ├── Especiais → 127.0.0.1(loopback), 169.254.x.x(APIPA), 255.255.255.255(broadcast)"),
      p("│   └── CIDR → /24=254h, /25=126h, /26=62h, /27=30h, /28=14h"),
      blankLine(),
      p("├── PROTOCOLOS DE TRANSPORTE", { bold: true }),
      p("│   ├── TCP → 3-way handshake (SYN/SYN-ACK/ACK), ACK, retransmissão, sliding window"),
      p("│   └── UDP → sem conexão, rápido, 8 bytes cabeçalho, jogos/VoIP/streaming"),
      blankLine(),
      p("├── SERVIÇOS DE REDE", { bold: true }),
      p("│   ├── DHCP → DORA, distribui IP/máscara/gateway/DNS automático"),
      p("│   ├── DNS → porta 53 UDP, traduz nome → IP, nslookup"),
      p("│   ├── VLAN → segmentação lógica no switch"),
      p("│   └── NAT → IP privado → IP público"),
      blankLine(),
      p("├── EQUIPAMENTOS", { bold: true }),
      p("│   ├── Hub → C1, broadcast tudo"),
      p("│   ├── Switch → C2, tabela MAC"),
      p("│   ├── Roteador → C3, tabela de roteamento IP"),
      p("│   └── Access Point → C2, Wi-Fi"),
      blankLine(),
      p("└── DIAGNÓSTICO", { bold: true }),
      p("    ├── ipconfig/ifconfig → ver IP, máscara, gateway"),
      p("    ├── ping → ICMP, testa alcançabilidade"),
      p("    ├── tracert/traceroute → mapeia caminho"),
      p("    └── nslookup → testa DNS"),
      blankLine(),
      pageBreak(),

      // ========== SEÇÃO 7: CHECKLIST ==========
      h1("7. CHECKLIST FINAL DE REVISÃO"),
      blankLine(),
      infoBox("Marque cada item conforme revisar. Se não conseguir responder mentalmente, volte ao resumo teórico!"),
      blankLine(),
      makeTable(
        ["✓", "CONTEÚDO", "ONDE ESTÁ NO MATERIAL"],
        [
          ["[ ]", "Sei as 7 camadas OSI e a função de cada uma", "Seção 2.1"],
          ["[ ]", "Sei diferenciar PAN, LAN, MAN e WAN com exemplos", "Seção 2.2"],
          ["[ ]", "Sei as diferenças entre fibra óptica e par trançado", "Seção 2.3 / Q2"],
          ["[ ]", "Sei o que é MAC e o que é IP, e a diferença entre eles", "Seção 2.4 / Q18"],
          ["[ ]", "Sei o que faz CSMA/CD e CSMA/CA e onde cada um é usado", "Seção 2.4 / Q17"],
          ["[ ]", "Sei identificar as Classes A, B, C, D, E pelo primeiro octeto", "Seção 2.5 / Q9-12"],
          ["[ ]", "Sei os endereços privados de cada classe", "Seção 2.5"],
          ["[ ]", "Sei para que serve 127.0.0.1 e 169.254.x.x", "Seção 2.5 / Q25"],
          ["[ ]", "Sei calcular hosts com a fórmula 2^n - 2", "Seção 2.6 / Q13-15"],
          ["[ ]", "Sei a tabela CIDR de /24 a /30", "Seção 2.6"],
          ["[ ]", "Sei dividir uma rede em sub-redes (ex.: /24 em 4 = /26)", "Seção 2.6 / Q13-14"],
          ["[ ]", "Sei o Three-Way Handshake do TCP (SYN, SYN-ACK, ACK)", "Seção 2.7 / Q19"],
          ["[ ]", "Sei quando usar TCP e quando usar UDP", "Seção 2.7 / Q3-5 / Q20"],
          ["[ ]", "Sei as portas: HTTPS=443, SSH=22, HTTP=80, FTP=21, DNS=53", "Seção 2.8 / Q6"],
          ["[ ]", "Sei a sequência DORA do DHCP", "Seção 2.9 / Q7"],
          ["[ ]", "Sei o que é DNS e quando investigá-lo primeiro", "Seção 2.10 / Q8"],
          ["[ ]", "Sei o conceito de VLAN e suas vantagens", "Seção 2.11 / Q16"],
          ["[ ]", "Sei a diferença entre Hub, Switch e Roteador", "Seção 2.12 / Q21 / Q30"],
          ["[ ]", "Sei o que é gateway padrão e por que é importante", "Seção 2.3 / Q23"],
          ["[ ]", "Sei o que é NAT e como funciona", "Q29"],
          ["[ ]", "Sei o que é firewall e como filtra tráfego", "Seção 2.11 / Q33"],
          ["[ ]", "Sei diferenciar POP3 e IMAP", "Seção 2.8 / Q28"],
          ["[ ]", "Sei o que é SMTP e qual porta usa", "Seção 2.8 / Q28"],
          ["[ ]", "Sei usar ping, tracert e nslookup para diagnóstico", "Seção 2.13 / Q24"],
        ],
        [600, 4500, 4260]
      ),
      blankLine(),
      infoBox("💪 Se você marcou todos os itens, está preparado para a prova. Boa sorte!"),
      blankLine(),

      // Rodapé
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: DARK_BLUE } },
        children: [
          new TextRun({ text: "Material de Estudo — Serviços de Redes de Computadores | 3º Período — Sistemas de Informação", size: 18, font: "Arial", color: "666666", italics: true })
        ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('C:\\Users\\RYZEN\\Documents\\Material_Estudo_SRC_35Q.docx', buffer);
  console.log('Arquivo gerado com sucesso!');
}).catch(err => {
  console.error('Erro:', err);
});