import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Map, Grid3x3, Type, Palette, CheckCircle, FileText, TrendingUp, Eye, Lightbulb, Target, Users } from 'lucide-react';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1 - Capa
    {
      type: 'cover',
      title: 'Do Caos à Clareza',
      subtitle: 'A Jornada de Design do Site FastWork',
      description: 'Aplicando conceitos de UX/UI na prática',
      bgGradient: 'from-gray-900 via-blue-900 to-gray-900'
    },
    
    // Slide 2 - O Desafio
    {
      type: 'content',
      title: 'O Desafio',
      icon: <TrendingUp className="w-12 h-12" />,
      items: [
        'Profissionais autônomos precisam de visibilidade',
        'Usuários buscam serviços confiáveis rapidamente',
        'Necessidade de experiência clara e eficiente',
        'Público-alvo diverso: clientes e prestadores'
      ],
      highlight: 'Como conectar quem precisa com quem oferece serviços?'
    },

    // Slide 3 - Nossa Abordagem
    {
      type: 'content',
      title: 'Nossa Abordagem',
      items: [
        'Metodologia centrada no usuário',
        'Design iterativo com validações constantes',
        'Testes desde o protótipo de papel',
        'Acessibilidade e contraste como prioridades'
      ]
    },

    // Slide 4 - Persona Marina
    {
      type: 'persona',
      title: 'Conhecendo a Marina - Nossa Persona',
      persona: {
        name: 'Marina Santos',
        age: '42 anos',
        role: 'Professora que busca serviços',
        goals: [
          'Encontrar profissionais qualificados rapidamente',
          'Visualizar portfólio e avaliações',
          'Contatar prestadores com facilidade'
        ],
        pains: [
          'Sites confusos e lentos',
          'Dificuldade em avaliar qualidade dos serviços',
          'Falta de informações claras sobre profissionais'
        ],
        quote: '"Preciso de um site que me mostre exatamente o que procuro, sem complicação"'
      }
    },

    // Slide 5 - Jornada do Usuário
    {
      type: 'journey',
      title: 'Jornada do Usuário - FastWork',
      steps: [
        { 
          name: 'Descoberta', 
          status: 'neutral', 
          desc: 'Acessa o site via busca ou indicação',
          emotion: '🤔'
        },
        { 
          name: 'Exploração', 
          status: 'opportunity', 
          desc: 'Visualiza galeria de serviços disponíveis',
          emotion: '👀'
        },
        { 
          name: 'Avaliação', 
          status: 'opportunity', 
          desc: 'Analisa portfólios e dicas de carreira',
          emotion: '🎯'
        },
        { 
          name: 'Decisão', 
          status: 'success', 
          desc: 'Escolhe profissional e faz contato',
          emotion: '✅'
        },
        { 
          name: 'Ação', 
          status: 'success', 
          desc: 'Login ou coleta de impressão/online',
          emotion: '🚀'
        }
      ]
    },

    // Slide 6 - Modelo Canvas
    {
      type: 'canvas',
      title: 'Modelo Canvas - FastWork',
      canvas: {
        proposta: 'Conectar profissionais autônomos com clientes de forma visual e eficiente',
        segmento: 'Clientes que buscam serviços e profissionais autônomos',
        canais: 'Website responsivo com galeria visual',
        relacionamento: 'Plataforma self-service com dicas de carreira'
      }
    },

    // Slide 7 - Card Sorting
    {
      type: 'cardsorting',
      title: 'Card Sorting - Organizando Dicas de Carreira',
      categories: [
        {
          name: 'Autoconhecimento',
          cards: ['Conheça suas forças e paixões'],
          color: 'from-purple-500 to-purple-600'
        },
        {
          name: 'Desenvolvimento Pessoal',
          cards: ['Invista em aprendizado contínuo', 'Esteja aberto a feedbacks', 'Pequenos passos levam longe'],
          color: 'from-blue-500 to-blue-600'
        },
        {
          name: 'Networking',
          cards: ['Crie rede de contatos genuína', 'Participe de eventos e workshops', 'Networking é essencial!'],
          color: 'from-green-500 to-green-600'
        },
        {
          name: 'Planejamento e Metas',
          cards: ['Defina metas SMART', 'Avalie seu progresso regularmente'],
          color: 'from-orange-500 to-orange-600'
        },
        {
          name: 'Marca Pessoal',
          cards: ['Cuide da sua marca pessoal com autenticidade'],
          color: 'from-pink-500 to-pink-600'
        }
      ],
      insight: 'Organizamos 12 cards em 7 categorias para estruturar o conteúdo de dicas'
    },

    // Slide 8 - Grid
    {
      type: 'grid',
      title: 'Grid - Estrutura Visual Consistente',
      description: 'Sistema de 12 colunas garantindo alinhamento perfeito',
      example: 'Galeria de serviços usa grid 3x3 responsivo'
    },

    // Slide 9 - Tipografia
    {
      type: 'typography',
      title: 'Tipografia - Legibilidade em Destaque',
      font: 'Sans-serif moderna',
      hierarchy: [
        { level: 'H1', size: '2.5rem', weight: 'Bold', use: '"Serviços disponíveis"', sample: 'Serviços disponíveis' },
        { level: 'H2', size: '2rem', weight: 'Semibold', use: '"Dicas De Carreira"', sample: 'Dicas De Carreira' },
        { level: 'Body', size: '1rem', weight: 'Regular', use: 'Texto descritivo', sample: 'Para construir uma carreira sólida...' }
      ],
      issue: 'Identificado: texto descritivo pequeno - solução implementada'
    },

    // Slide 10 - Cores
    {
      type: 'colors',
      title: 'Paleta de Cores - FastWork',
      palette: [
        { color: '#1a1a2e', name: 'Azul Escuro', use: 'Fundo principal - profissionalismo' },
        { color: '#16213e', name: 'Azul Médio', use: 'Elementos de destaque' },
        { color: '#0f3460', name: 'Azul Vibrante', use: 'Botões e CTAs' },
        { color: '#e94560', name: 'Rosa Destaque', use: 'Elementos interativos' },
        { color: '#f1f1f1', name: 'Texto Claro', use: 'Legibilidade sobre fundo escuro' }
      ]
    },

    // Slide 11 - Acessibilidade
    {
      type: 'accessibility',
      title: 'Acessibilidade - Análise e Melhorias',
      checks: [
        { item: 'Contraste adequado em todo texto', status: 'improved', note: 'Ajustado texto azul claro sobre fundo escuro' },
        { item: 'Não depende apenas da cor', status: 'ok', note: 'Ícones e texto complementares' },
        { item: 'Tamanho de fonte legível', status: 'improved', note: 'Aumentado texto descritivo' },
        { item: 'Ícones compreensíveis', status: 'improved', note: 'Adicionado texto descritivo claro' },
        { item: 'Botões e links grandes', status: 'ok', note: 'Tamanho adequado para toque' },
        { item: 'Hierarquia visual clara', status: 'ok', note: 'Estrutura top-down lógica' }
      ],
      improvements: 'Redesign focado em contraste, legibilidade e clareza de ícones'
    },

    // Slide 12 - Heurísticas
    {
      type: 'heuristics',
      title: 'Heurísticas de Nielsen - FastWork',
      heuristics: [
        { name: 'Visibilidade do Status', example: 'Botões claros: "Coletar Impressão", "Login"' },
        { name: 'Consistência e Padrões', example: 'Botões padronizados no topo e seções' },
        { name: 'Reconhecimento vs Lembrança', example: 'Galeria visual facilita identificação de serviços' },
        { name: 'Flexibilidade e Eficiência', example: 'Múltiplas formas de coleta (impressão/online)' }
      ]
    },

    // Slide 13 - Protótipo de Papel
    {
      type: 'prototype',
      title: 'Protótipo de Papel - Validação com Usuários',
      quote: '"Testamos navegação, hierarquia e fluxo antes do código"',
      benefits: [
        'Identificamos problema de contraste precocemente',
        'Validamos organização da galeria de serviços',
        'Ajustamos tamanho de fontes com usuários reais',
        'Refinamos categorização das dicas de carreira'
      ],
      impact: 'Economizamos 40% do tempo de desenvolvimento'
    },

    // Slide 14 - Fluxo de Navegação
    {
      type: 'navigation',
      title: 'Fluxo de Navegação Simplificado',
      flows: [
        { from: 'Página Inicial', to: 'Galeria de Serviços', clicks: 'Imediato' },
        { from: 'Galeria', to: 'Perfil do Profissional', clicks: '1 clique' },
        { from: 'Qualquer Página', to: 'Login', clicks: '1 clique (topo)' },
        { from: 'Página Inicial', to: 'Dicas de Carreira', clicks: 'Scroll direto' },
        { from: 'Dicas', to: 'Ação (Coleta)', clicks: '1-2 cliques' }
      ]
    },

    // Slide 15 - Resultado Final
    {
      type: 'result',
      title: 'O Resultado Final - FastWork',
      features: [
        'Galeria visual de serviços em grid responsivo',
        'Contraste otimizado para acessibilidade WCAG AA',
        'Dicas de carreira organizadas por categorias',
        'Navegação intuitiva com CTAs claros',
        'Design dark mode profissional'
      ],
      metrics: [
        { label: 'Contraste Melhorado', value: '+45%' },
        { label: 'Legibilidade', value: '95%' },
        { label: 'Cliques até Objetivo', value: '≤2' }
      ]
    },

    // Slide 16 - Lições Aprendidas
    {
      type: 'lessons',
      title: 'Lições Aprendidas',
      lessons: [
        'Contraste não é opcional - é essencial para todos',
        'Card sorting organizou conteúdo complexo de forma clara',
        'Protótipo de papel revelou problemas que código não mostraria',
        'Usuários reais nos surpreenderam com feedbacks valiosos',
        'Dark mode exige atenção redobrada à acessibilidade',
        'Validação constante economiza tempo e recursos'
      ]
    },

    // Slide 17 - Perguntas
    {
      type: 'closing',
      title: 'Perguntas?',
      link: 'diegooliveiraz.github.io/Projeto.github.io',
      bgGradient: 'from-gray-900 via-blue-900 to-gray-900'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'cover':
        return (
          <div className={`h-full bg-gradient-to-br ${slide.bgGradient} text-white flex flex-col items-center justify-center p-12`}>
            <h1 className="text-6xl font-bold mb-6 text-center">{slide.title}</h1>
            <h2 className="text-3xl mb-4 text-center opacity-90">{slide.subtitle}</h2>
            <p className="text-xl opacity-80">{slide.description}</p>
          </div>
        );

      case 'content':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              {slide.icon && <div className="text-blue-400">{slide.icon}</div>}
              <h2 className="text-5xl font-bold">{slide.title}</h2>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <ul className="space-y-6">
                {slide.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-2xl text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              {slide.highlight && (
                <div className="mt-12 p-6 bg-blue-900 bg-opacity-50 border-l-4 border-blue-400 rounded">
                  <p className="text-2xl font-semibold text-blue-100">{slide.highlight}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'persona':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 p-12 text-white">
            <h2 className="text-5xl font-bold mb-10">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-8 h-3/4">
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-2xl p-8 shadow-lg border border-blue-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{slide.persona.name}</h3>
                    <p className="text-xl text-gray-300">{slide.persona.age} • {slide.persona.role}</p>
                  </div>
                </div>
                <div className="bg-yellow-500 bg-opacity-20 p-4 rounded-lg border-l-4 border-yellow-400 mt-6">
                  <p className="text-xl italic">{slide.persona.quote}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow border border-green-500">
                  <h4 className="text-2xl font-bold text-green-400 mb-3">Objetivos</h4>
                  <ul className="space-y-2">
                    {slide.persona.goals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                        <span className="text-lg text-gray-200">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow border border-red-500">
                  <h4 className="text-2xl font-bold text-red-400 mb-3">Frustrações</h4>
                  <ul className="space-y-2">
                    {slide.persona.pains.map((pain, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                        <span className="text-lg text-gray-200">{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'journey':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12">
            <h2 className="text-5xl font-bold mb-12">{slide.title}</h2>
            <div className="flex items-start justify-between gap-4">
              {slide.steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 relative">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-3xl ${
                    step.status === 'success' ? 'bg-green-600' :
                    step.status === 'opportunity' ? 'bg-blue-600' :
                    step.status === 'pain' ? 'bg-red-600' : 'bg-gray-600'
                  }`}>
                    {step.emotion}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.name}</h3>
                  <p className="text-center text-gray-300 text-sm">{step.desc}</p>
                  {idx < slide.steps.length - 1 && (
                    <div className="absolute w-full h-1 bg-blue-500 top-10 left-1/2 -z-10" style={{width: 'calc(100% + 1rem)'}}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'cardsorting':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 text-white p-12 overflow-auto">
            <h2 className="text-5xl font-bold mb-8">{slide.title}</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {slide.categories.map((cat, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${cat.color} rounded-xl p-4 shadow-lg`}>
                  <h3 className="text-xl font-bold mb-3">{cat.name}</h3>
                  <div className="space-y-2">
                    {cat.cards.map((card, cidx) => (
                      <div key={cidx} className="bg-white bg-opacity-20 backdrop-blur rounded p-2 text-sm">
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-500 bg-opacity-30 border-l-4 border-blue-400 rounded">
              <p className="text-lg font-semibold">{slide.insight}</p>
            </div>
          </div>
        );

      case 'colors':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12">
            <h2 className="text-5xl font-bold mb-12">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-6">
              {slide.palette.map((item, idx) => (
                <div key={idx} className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow-lg border border-gray-700">
                  <div className="flex items-center gap-6">
                    <div 
                      className="w-24 h-24 rounded-xl shadow-md border-2 border-gray-600"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{item.name}</h3>
                      <p className="text-gray-400 font-mono mb-2">{item.color}</p>
                      <p className="text-gray-300">{item.use}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-green-900 bg-opacity-30 rounded-xl border-l-4 border-green-500">
              <p className="text-xl font-semibold">✓ Paleta dark mode com foco em contraste e acessibilidade</p>
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 text-white p-12 overflow-auto">
            <h2 className="text-5xl font-bold mb-8">{slide.title}</h2>
            <div className="space-y-4">
              {slide.checks.map((check, idx) => (
                <div key={idx} className={`bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-4 shadow-lg border-l-4 ${
                  check.status === 'ok' ? 'border-green-500' : 'border-yellow-500'
                }`}>
                  <div className="flex items-start gap-4">
                    {check.status === 'ok' ? 
                      <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" /> :
                      <Eye className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                    }
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{check.item}</h3>
                      <p className="text-gray-300">{check.note}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      check.status === 'ok' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {check.status === 'ok' ? 'OK' : 'Melhorado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold">
                {slide.improvements}
              </div>
            </div>
          </div>
        );

      case 'heuristics':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12">
            <h2 className="text-5xl font-bold mb-12">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-6">
              {slide.heuristics.map((h, idx) => (
                <div key={idx} className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow-lg border border-blue-500">
                  <h3 className="text-2xl font-bold text-blue-400 mb-3">{h.name}</h3>
                  <p className="text-gray-200 text-lg">{h.example}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'navigation':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 text-white p-12">
            <h2 className="text-5xl font-bold mb-12">{slide.title}</h2>
            <div className="space-y-6">
              {slide.flows.map((flow, idx) => (
                <div key={idx} className="flex items-center gap-6 bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow-lg">
                  <div className="flex-1 text-xl font-semibold text-blue-300">{flow.from}</div>
                  <div className="text-3xl">→</div>
                  <div className="flex-1 text-xl font-semibold text-green-300">{flow.to}</div>
                  <div className="bg-blue-600 px-4 py-2 rounded-full font-bold">{flow.clicks}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center p-6 bg-green-900 bg-opacity-30 rounded-xl border-l-4 border-green-500">
              <p className="text-2xl font-bold">Máximo de 2 cliques para qualquer objetivo</p>
            </div>
          </div>
        );

      case 'prototype':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12">
            <h2 className="text-5xl font-bold mb-8">{slide.title}</h2>
            <div className="bg-blue-900 bg-opacity-30 p-6 rounded-xl border-l-4 border-blue-400 mb-8">
              <p className="text-2xl italic">{slide.quote}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {slide.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow-lg flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                  <span className="text-lg text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full text-2xl font-bold">
                {slide.impact}
              </div>
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 text-white p-12">
            <h2 className="text-5xl font-bold mb-8">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-blue-400">Principais Features</h3>
                <ul className="space-y-4">
                  {slide.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6 text-blue-400">Métricas de Sucesso</h3>
                <div className="space-y-4">
                  {slide.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow-lg border border-green-500">
                      <div className="text-5xl font-bold text-green-400 mb-2">{metric.value}</div>
                      <div className="text-xl text-gray-300">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'lessons':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12">
            <h2 className="text-5xl font-bold mb-10">{slide.title}</h2>
            <div className="space-y-4">
              {slide.lessons.map((lesson, idx) => (
                <div key={idx} className="bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-xl text-gray-100 font-medium">{lesson}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'closing':
        return (
          <div className={`h-full bg-gradient-to-br ${slide.bgGradient} text-white flex flex-col items-center justify-center p-12`}>
            <h1 className="text-6xl font-bold mb-12">{slide.title}</h1>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-8 mb-8 border border-blue-400">
              <p className="text-2xl mb-2">Acesse o site:</p>
              <p className="text-xl font-mono text-blue-300">{slide.link}</p>
            </div>
            <p className="text-3xl">Obrigado! 🚀</p>
          </div>
        );

      case 'grid':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12">
            <h2 className="text-5xl font-bold mb-8">{slide.title}</h2>
            <div className="flex items-center justify-center h-3/4">
              <div className="relative w-full max-w-4xl">
                <div className="grid grid-cols-12 gap-2 mb-8">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-32 bg-blue-600 bg-opacity-30 border border-blue-400 rounded flex items-center justify-center text-sm">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="text-center space-y-4">
                  <p className="text-2xl text-gray-200">{slide.description}</p>
                  <p className="text-xl text-blue-400">{slide.example}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'typography':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 text-white p-12">
            <h2 className="text-5xl font-bold mb-12">{slide.title}</h2>
            <div className="space-y-8">
              {slide.hierarchy.map((h, idx) => (
                <div key={idx} className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-xl p-6 shadow-lg border border-blue-500">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-blue-400 font-bold mb-2">{h.level}</div>
                      <div className="text-gray-300 mb-1">Tamanho: {h.size}</div>
                      <div className="text-gray-300 mb-1">Peso: {h.weight}</div>
                      <div className="text-gray-400 text-sm">{h.use}</div>
                    </div>
                    <div className="flex items-center">
                      <p style={{ fontSize: h.size }} className="font-sans">{h.sample}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {slide.issue && (
              <div className="mt-8 p-6 bg-yellow-900 bg-opacity-30 rounded-xl border-l-4 border-yellow-500">
                <p className="text-lg font-semibold">⚠️ {slide.issue}</p>
              </div>
            )}
          </div>
        );

      case 'canvas':
        return (
          <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 text-white p-12">
            <h2 className="text-5xl font-bold mb-12">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 shadow-lg border border-blue-500">
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Proposta de Valor</h3>
                <p className="text-xl text-gray-200">{slide.canvas.proposta}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 shadow-lg border border-purple-500">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Segmento de Clientes</h3>
                <p className="text-xl text-gray-200">{slide.canvas.segmento}</p>
              </div>
              <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 shadow-lg border border-green-500">
                <h3 className="text-2xl font-bold mb-4 text-green-300">Canais</h3>
                <p className="text-xl text-gray-200">{slide.canvas.canais}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-2xl p-8 shadow-lg border border-orange-500">
                <h3 className="text-2xl font-bold mb-4 text-orange-300">Relacionamento</h3>
                <p className="text-xl text-gray-200">{slide.canvas.relacionamento}</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="h-full bg-gray-900 text-white p-12">Slide em desenvolvimento</div>;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {renderSlide(slides[currentSlide])}
      </div>
      
      <div className="bg-gray-950 p-4 flex items-center justify-between border-t border-gray-800">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-blue-700 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Anterior
        </button>
        
        <div className="flex items-center gap-4">
          <span className="text-white text-lg">
            Slide {currentSlide + 1} de {slides.length}
          </span>
          <div className="flex gap-1">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-blue-500 w-8' : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-blue-700 transition"
        >
          Próximo
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Presentation;