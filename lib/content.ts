export type ProjectCategory = "residencial" | "corporativo";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  city: string;
  year: number;
  image: string;
  imageAlt: string;
  area?: string;
  scope?: string[];
  summary?: string;
  description?: string;
  gallery?: { src: string; alt: string }[];
};

export type Service = {
  slug: string;
  ordinal: string;
  name: string;
  tagline: string;
  description: string;
  forWho?: string[];
  includes?: string[];
  steps?: { name: string; description: string }[];
  faq?: { q: string; a: string }[];
  relatedProjectSlugs?: string[];
  differentiators?: { title: string; description: string }[];
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
};

export type Pillar = {
  ordinal: string;
  name: string;
  description: string;
};

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const studio = {
  name: "MM Studio Design",
  shortName: "MM Studio",
  tagline: "Espaços que respiram sua história.",
  manifesto:
    "Cada projeto é uma maneira de criar lugares vivos, conscientes e feitos para acolher quem os habita.",
  cities: ["Fortaleza"],
  phone: "(85) 9.9647-7447",
  phoneHref: "tel:+5585996477447",
  email: "mmstudiodesign@gmail.com",
  whatsapp: "https://wa.me/5585996477447",
  instagram: "https://instagram.com/mmstudio.design",
  instagramHandle: "@mmstudio.design",
};

export const navigation = [
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contato", href: "/contato" },
];

export const heroFeature = {
  image: unsplash("1616486338812-3dadae4b4ace", 2000),
  imageAlt: "Sala residencial com plantas, luz natural e tons terrosos",
  projectName: "Casa JV",
  projectCity: "Fortaleza · CE",
  projectCategory: "residencial",
  projectYear: 2024,
};

export const projects: Project[] = [
  {
    slug: "casa-jv",
    name: "Casa JV",
    category: "residencial",
    city: "Fortaleza · CE",
    year: 2024,
    image: unsplash("1616486338812-3dadae4b4ace"),
    imageAlt: "Sala residencial com plantas, luz natural e tons terrosos",
    area: "180m²",
    scope: ["Projeto de Interiores", "Execução de Obras"],
    summary:
      "Uma casa de família repensada para abraçar a luz natural e os hábitos do cotidiano.",
    description:
      "Reforma completa de uma residência em Fortaleza, com integração entre cozinha, sala e área externa. A paleta combina tons de areia, madeira natural e verde-musgo. Móveis sob medida em madeira de reflorestamento.",
    gallery: [
      { src: unsplash("1600210492486-724fe5c67fb0"), alt: "Sala íntima" },
      { src: unsplash("1600585154340-be6161a56a0c"), alt: "Vista panorâmica" },
      { src: unsplash("1618221195710-dd6b41faaea6"), alt: "Quarto principal" },
    ],
  },
  {
    slug: "apartamento-ls",
    name: "Apartamento LS",
    category: "residencial",
    city: "Fortaleza · CE",
    year: 2024,
    image: unsplash("1618221195710-dd6b41faaea6"),
    imageAlt: "Apartamento moderno com paleta neutra e mobiliário curvo",
    area: "95m²",
    scope: ["Consultoria Completa", "Projeto de Interiores"],
    summary:
      "Apartamento jovem repensado para acolher trabalho remoto e momentos de descanso.",
  },
  {
    slug: "quarto-jr",
    name: "Quarto JR",
    category: "residencial",
    city: "Fortaleza · CE",
    year: 2023,
    image: unsplash("1505691938895-1758d7feb511"),
    imageAlt: "Quarto infantil com mobiliário sob medida e paleta suave",
    area: "22m²",
    scope: ["Projeto de Interiores"],
    summary:
      "Quarto infantil sob medida, com soluções de armazenamento e cantinho de leitura.",
  },
  {
    slug: "sala-ma",
    name: "Sala MA",
    category: "corporativo",
    city: "Fortaleza · CE",
    year: 2023,
    image: unsplash("1497366811353-6870744d04b2"),
    imageAlt: "Sala corporativa com mesa central e iluminação difusa",
    area: "60m²",
    scope: ["Projeto de Interiores", "Execução de Obras"],
    summary:
      "Sala de reuniões corporativa com identidade discreta e materialidade quente.",
  },
];

export const services: Service[] = [
  {
    slug: "consultoria-completa",
    ordinal: "01",
    name: "Consultoria Completa",
    tagline: "Para quem quer começar com clareza.",
    description:
      "Diagnóstico técnico e estético do ambiente, com soluções pontuais e um plano de ação para você executar no seu tempo.",
    forWho: [
      "Você quer ajustes pontuais sem fazer uma reforma completa.",
      "Quer um olhar profissional antes de comprar móveis ou começar uma obra.",
      "Está em outra cidade e precisa de orientação prática à distância.",
    ],
    includes: [
      "Visita técnica e diagnóstico do ambiente.",
      "Paleta de cores, materiais e referências visuais.",
      "Plano de ação priorizado, com pequenas e médias intervenções.",
      "Reunião final com tudo documentado.",
    ],
    steps: [
      { name: "Conversa", description: "Entendemos suas rotinas e expectativas." },
      { name: "Visita", description: "Avaliação presencial ou virtual com fotos detalhadas." },
      { name: "Estudo", description: "Diagnóstico técnico e sugestões de melhorias." },
      { name: "Devolutiva", description: "Plano de ação e próximos passos." },
    ],
    faq: [
      {
        q: "A consultoria substitui um projeto completo?",
        a: "Não. A consultoria é ideal para mudanças pontuais. Se precisa de planta, executivo e detalhamento, vale o Projeto de Interiores.",
      },
    ],
  },
  {
    slug: "projeto-de-interiores",
    ordinal: "02",
    name: "Projeto de Interiores",
    tagline: "Da primeira ideia ao último detalhe.",
    description:
      "Projeto completo de interiores: briefing, estudo, executivo, detalhamento, 3D e curadoria de materiais. Atenção rigorosa ao processo e à atmosfera do espaço.",
    forWho: [
      "Reforma completa de residência ou espaço corporativo.",
      "Imóvel novo na planta que precisa de planejamento desde o início.",
      "Você quer um projeto pensado nos detalhes, com identidade clara.",
    ],
    includes: [
      "Briefing aprofundado e moodboard de direção.",
      "Estudo preliminar e anteprojeto.",
      "Projeto executivo (plantas técnicas, marcenaria, elétrica).",
      "Detalhamento de materiais e mobiliário.",
      "Render 3D dos ambientes principais.",
      "Curadoria de fornecedores e parceiros sustentáveis.",
    ],
    steps: [
      { name: "Conversa", description: "Identidade do projeto, rotinas, restrições, referências." },
      { name: "Estudo", description: "Partido arquitetônico e moodboards." },
      { name: "Projeto", description: "Anteprojeto e executivo completo." },
      { name: "Curadoria", description: "Materiais, mobiliário, iluminação e parceiros." },
    ],
    differentiators: [
      {
        title: "Olhar sustentável",
        description: "Priorizamos materiais responsáveis: madeira de reflorestamento, tintas de base mineral, fornecedores locais.",
      },
      {
        title: "Duas mentes, um projeto",
        description: "Marly e Emilly trabalham juntas em cada decisão, combinando precisão técnica e sensibilidade estética.",
      },
    ],
    faq: [
      {
        q: "Quanto tempo dura um projeto?",
        a: "De 6 a 14 semanas, dependendo da metragem e do nível de detalhamento.",
      },
      {
        q: "Posso contratar só o projeto?",
        a: "Sim, o projeto executivo é entregue com tudo documentado para qualquer obra qualificada executar.",
      },
    ],
    relatedProjectSlugs: ["casa-jv", "apartamento-ls"],
  },
  {
    slug: "execucao-de-obras",
    ordinal: "03",
    name: "Execução de Obras",
    tagline: "Do papel à entrega das chaves.",
    description:
      "Gerenciamento integral da obra: cronograma, fornecedores, compras e acompanhamento técnico. Você acompanha cada passo, sem surpresas.",
    forWho: [
      "Você já tem um projeto pronto e quer alguém de confiança gerenciando a obra.",
      "Quer contratar projeto e execução em um único pacote.",
      "Mora em outra cidade e precisa de acompanhamento técnico local.",
    ],
    includes: [
      "Planejamento de cronograma e orçamento detalhado.",
      "Curadoria e contratação de fornecedores locais.",
      "Gestão de compras com transparência financeira.",
      "Acompanhamento técnico semanal de obra.",
      "Vistoria final e checklist de entrega.",
    ],
    steps: [
      { name: "Planejamento", description: "Cronograma, orçamento, fornecedores." },
      { name: "Compras", description: "Curadoria e aquisição de materiais." },
      { name: "Obra", description: "Execução com acompanhamento semanal." },
      { name: "Entrega", description: "Vistoria final e checklist." },
    ],
    differentiators: [
      {
        title: "Transparência financeira",
        description: "Você acompanha cada compra e cada serviço, sem surpresas no fechamento.",
      },
      {
        title: "Rede local",
        description: "Trabalhamos com fornecedores e profissionais selecionados em Fortaleza.",
      },
    ],
    faq: [
      {
        q: "Vocês executam projetos de outros profissionais?",
        a: "Sim, mediante avaliação técnica do projeto.",
      },
    ],
    relatedProjectSlugs: ["casa-jv", "sala-ma"],
  },
];

export const founders: Founder[] = [
  {
    name: "Marly Martins",
    role: "Co-fundadora · Design sustentável",
    bio: "Arquiteta com olhar único para design sustentável. Sua jornada começou em 2020 com o desejo de transformar espaços e vidas com escolhas conscientes, dos materiais aos fornecedores.",
  },
  {
    name: "Emilly Lorrany",
    role: "Co-fundadora · Inovação de processo",
    bio: "Sonhava criar espaços inspiradores e juntou-se ao MM Studio com projetos inovadores. Foca em traduzir a vontade do cliente em soluções concretas, do briefing à execução.",
  },
];

export const foundersPortrait = {
  src: "/marly-emilly.png",
  alt: "Marly Martins e Emilly Lorrany, sócias da MM Studio Design",
};

export const pillars: Pillar[] = [
  {
    ordinal: "01",
    name: "Sustentabilidade",
    description:
      "Escolhas conscientes em materiais e fornecedores. Cada decisão pesa o impacto antes da estética.",
  },
  {
    ordinal: "02",
    name: "Funcionalidade",
    description:
      "Beleza sem função não dura. Estudamos rotinas reais para que o espaço trabalhe a seu favor.",
  },
  {
    ordinal: "03",
    name: "Identidade",
    description:
      "Cada projeto reflete quem habita o espaço, não a moda do momento.",
  },
];

export const processSteps = [
  {
    ordinal: "01",
    name: "Conversa",
    description:
      "Escutamos suas ideias, rotinas e referências. É aqui que nasce a identidade do projeto.",
  },
  {
    ordinal: "02",
    name: "Estudo",
    description:
      "Partido inicial, moodboards e estudos para alinhar a direção criativa e técnica.",
  },
  {
    ordinal: "03",
    name: "Projeto",
    description:
      "Anteprojeto, executivo, detalhamento e especificações. Tudo pronto para a obra.",
  },
  {
    ordinal: "04",
    name: "Obra",
    description:
      "Acompanhamento técnico e curadoria de fornecedores até a entrega das chaves.",
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  residencial: "Residencial",
  corporativo: "Corporativo",
};
