import {
  Crosshair,
  AlertOctagon,
  AlertTriangle,
} from "lucide-react";

export function formatarId(id: number) {
  return id.toString().padStart(4, "0");
}

export const dataAtual = new Date()

export type CorStat = "ok" | "pendente" | "late" | "muted";

export type Status = "pendente" | "atrasado" | "ok";

function corretorData(date: string): Date {
  const [ano, mes, dia] = date.split("-").map(Number);

  return new Date(ano, mes - 1, dia);
}

export type Prioridade = {
  corStat: "late" | "pendente";
  text: string;
};

export type PagamentoInfo = {
  emissora: string;
  total: number;
  data_emissao: Date;
  data_vencimento: Date;
  data_pagamento: Date | null;
  tipo_pagamento: string;
  codigo_barra: string | null;
  n_boleto: string | null;
};

export function pagamentoStatus(pagamento: PagamentoInfo): Status | undefined {
  if (pagamento.data_pagamento) {
    return "ok"
  }

  if (dataAtual > pagamento.data_vencimento) {
    return "atrasado"
  }

  return "pendente"
}

export type Imovel = {
  id: number;

  logradouro: string;
  complemento: string;
  numero: number

  CEP: string;

  cidade: string;
  estado: string;
  n_interfone: string

  descricao: string;
  inquilino: number;

  pagamentos: PagamentoInfo[];
};

export const imoveis: Imovel[] = [
  {
    id: 1,
    logradouro: "Rua das Palmeiras",
    numero: 210,
    complemento: "Casa",
    CEP: "00000-000",
    cidade: "São Paulo",
    estado: "SP",
    n_interfone: "1",
    descricao:
      "Imóvel com baixo volume de despesas mensais, com contas principais de energia e aluguel em dia, apresentando baixa incidência de pendências financeiras.",
    inquilino: 1,

    pagamentos: [
      {
        emissora: "ENEL",
        total: 184.9,
        data_emissao: corretorData("2026-06-01"),
        data_vencimento: corretorData("2026-06-10"),
        data_pagamento: corretorData("2026-06-09"),
        tipo_pagamento: "Conta de energia",
        codigo_barra: "846700000018449000240209624061000001000000001",
        n_boleto: "ENL-10001",
      },

      {
        emissora: "ALUGUEL",
        total: 3200,
        data_emissao: corretorData("2026-06-01"),
        data_vencimento: corretorData("2026-06-05"),
        data_pagamento: corretorData("2026-06-05"),
        tipo_pagamento: "Aluguel",
        codigo_barra: null,
        n_boleto: "ALG-10001",
      },
    ],
  },

  {
    id: 2,
    logradouro: "Av. Central",
    numero: 890,
    complemento: "Apt 45",
    CEP: "00000-000",
    cidade: "São Paulo",
    estado: "SP",
    n_interfone: "45",
    descricao:
      "Imóvel com fluxo moderado de pagamentos mensais, apresentando algumas contas de serviços recorrentes como gás e aluguel com histórico recente de pendências.",
    inquilino: 2,

    pagamentos: [
      {
        emissora: "COMGÁS",
        total: 210.45,
        data_emissao: corretorData("2026-06-03"),
        data_vencimento: corretorData("2026-06-15"),
        data_pagamento: null,
        tipo_pagamento: "Gás",
        codigo_barra: "846100000021104500240206615000000000000000001",
        n_boleto: "CMG-20001",
      },

      {
        emissora: "ALUGUEL",
        total: 2850,
        data_emissao: corretorData("2026-06-01"),
        data_vencimento: corretorData("2026-06-08"),
        data_pagamento: null,
        tipo_pagamento: "Aluguel",
        codigo_barra: null,
        n_boleto: "ALG-20001",
      },

      {
        emissora: "ENEL",
        total: 167.32,
        data_emissao: corretorData("2026-05-28"),
        data_vencimento: corretorData("2026-06-06"),
        data_pagamento: corretorData("2026-06-06"),
        tipo_pagamento: "Conta de energia",
        codigo_barra: null,
        n_boleto: "ENL-20001",
      },
    ],
  },

  {
    id: 3,
    logradouro: "Rua João Pedro",
    numero: 700,
    complemento: "Apt 203",
    CEP: "00000-000",
    cidade: "São Paulo",
    estado: "SP",
    n_interfone: "203",
    descricao:
      "Imóvel com alto volume de contas mensais, incluindo múltiplos serviços como água, energia e aluguel, com histórico de atrasos e pagamentos pendentes recorrentes.",
    inquilino: 7,

    pagamentos: [
      {
        emissora: "SABESP",
        total: 98.12,
        data_emissao: corretorData("2026-05-25"),
        data_vencimento: corretorData("2026-06-02"),
        data_pagamento: corretorData("2026-06-02"),
        tipo_pagamento: "Água",
        codigo_barra: null,
        n_boleto: "SAB-30001",
      },

      {
        emissora: "ENEL",
        total: 220.54,
        data_emissao: corretorData("2026-05-22"),
        data_vencimento: corretorData("2026-06-01"),
        data_pagamento: null,
        tipo_pagamento: "Energia",
        codigo_barra: null,
        n_boleto: "ENL-30001",
      },

      {
        emissora: "ALUGUEL",
        total: 4100,
        data_emissao: corretorData("2026-06-01"),
        data_vencimento: corretorData("2026-06-05"),
        data_pagamento: null,
        tipo_pagamento: "Aluguel",
        codigo_barra: null,
        n_boleto: "ALG-30001",
      },

      {
        emissora: "VIVO",
        total: 149.9,
        data_emissao: corretorData("2026-05-20"),
        data_vencimento: corretorData("2026-05-29"),
        data_pagamento: corretorData("2026-05-30"),
        tipo_pagamento: "Internet",
        codigo_barra: null,
        n_boleto: "VIV-30001",
      },
    ],
  },

  {
    id: 4,
    logradouro: "Av. Ribeiro",
    numero: 861,
    complemento: "Apt 77",
    CEP: "00000-000",
    cidade: "São Paulo",
    estado: "SP",
    n_interfone: "77",
    descricao:
      "Imóvel com custo mensal controlado, concentrado principalmente em aluguel e serviços de internet e gás, com pagamentos majoritariamente em dia.",
    inquilino: 6,

    pagamentos: [
      {
        emissora: "CLARO",
        total: 129.99,
        data_emissao: corretorData("2026-06-01"),
        data_vencimento: corretorData("2026-06-10"),
        data_pagamento: corretorData("2026-06-09"),
        tipo_pagamento: "Internet",
        codigo_barra: null,
        n_boleto: "CLR-40001",
      },

      {
        emissora: "COMGÁS",
        total: 94.75,
        data_emissao: corretorData("2026-06-02"),
        data_vencimento: corretorData("2026-06-13"),
        data_pagamento: null,
        tipo_pagamento: "Gás",
        codigo_barra: null,
        n_boleto: "CMG-40001",
      },

      {
        emissora: "ALUGUEL",
        total: 2600,
        data_emissao: corretorData("2026-06-01"),
        data_vencimento: corretorData("2026-06-06"),
        data_pagamento: corretorData("2026-06-06"),
        tipo_pagamento: "Aluguel",
        codigo_barra: null,
        n_boleto: "ALG-40001",
      },
    ],
  },

  {
    id: 7,
    logradouro: "Rua Verde",
    numero: 312,
    complemento: "Apt 12",
    CEP: "00000-000",
    cidade: "São Paulo",
    estado: "SP",
    n_interfone: "12",
    descricao:
      "Imóvel de alto custo mensal devido à soma de aluguel e múltiplas contas de consumo, apresentando variação entre pagamentos efetuados e algumas pendências pontuais.",
    inquilino: 7,

    pagamentos: [
      {
        emissora: "ALUGUEL",
        total: 5200,
        data_emissao: corretorData("2026-06-01"),
        data_vencimento: corretorData("2026-06-05"),
        data_pagamento: corretorData("2026-06-05"),
        tipo_pagamento: "Aluguel",
        codigo_barra: null,
        n_boleto: "ALG-70001",
      },

      {
        emissora: "ENEL",
        total: 312.48,
        data_emissao: corretorData("2026-05-29"),
        data_vencimento: corretorData("2026-06-08"),
        data_pagamento: null,
        tipo_pagamento: "Energia",
        codigo_barra: null,
        n_boleto: "ENL-70001",
      },

      {
        emissora: "COMGÁS",
        total: 201.7,
        data_emissao: corretorData("2026-06-02"),
        data_vencimento: corretorData("2026-06-14"),
        data_pagamento: null,
        tipo_pagamento: "Gás",
        codigo_barra: null,
        n_boleto: "CMG-70001",
      },

      {
        emissora: "VIVO",
        total: 179.9,
        data_emissao: corretorData("2026-05-25"),
        data_vencimento: corretorData("2026-06-02"),
        data_pagamento: corretorData("2026-06-01"),
        tipo_pagamento: "Internet",
        codigo_barra: null,
        n_boleto: "VIV-70001",
      },
    ],
  },
];

export const alertas = [
  {
    icon: Crosshair,
    title: "I.A: Boleto não emitido - Av. Santos, 351",
    desc: "Já faz 3 dias que o boleto da conta de luz do apt 27 não foi emitido",
    time: "Hoje, 10:00",
    corStat: "muted",
  },

  {
    icon: AlertOctagon,
    title: "Conta de luz atrasada - R. Faria Lima, 681",
    desc: "Apt 096 está com 13 dias de atraso",
    corStat: "late",
  },

  {
    icon: AlertTriangle,
    title: "Vencimento em 9 dias - R. Bela Vista, 06",
    desc: "Conta de gás do apt 97 pendente",
    corStat: "pendente",
  },

  {
    icon: AlertOctagon,
    title: "Aluguel atrasado - Rua João Pedro, 700",
    desc: "Inquilino Fernanda Ribeira — 5 dias de atraso",
    corStat: "late",
  },

  {
    icon: AlertTriangle,
    title: "Manutenção agendada - Av. Central, 890",
    desc: "Visita técnica marcada para 22/07/26",
    corStat: "pendente",
  },
];

export const movimentacoes = [
  {
    dot: "ok",
    desc: "Pix recebido - Ana Costa",
    value: 301.56,
    date: corretorData("2026-06-07"),
  },

  {
    dot: "late",
    desc: "Pagamento ComGás (com atraso)",
    value: -94.62,
    date: corretorData("2026-06-07"),
  },

  {
    dot: "ok",
    desc: "Pix recebido - Renato Oliveira",
    value: 213.12,
    date: corretorData("2026-06-06"),
  },

  {
    dot: "ok",
    desc: "Imóvel Apt 97, Av. Barros - Cadastrado",
    value: 0,
    date: corretorData("2026-06-06"),
  },

  {
    dot: "pendente",
    desc: "Pagamento Enel - Av. Ribeiro, 861/Apt 97",
    value: -68.38,
    date: corretorData("2026-06-06"),
  },

  {
    dot: "ok",
    desc: "Aluguel pago - Rua das Palmeiras",
    value: 119.95,
    date: corretorData("2026-06-05"),
  },

  {
    dot: "ok",
    desc: "Pix recebido - Marina Souza",
    value: 890,
    date: corretorData("2026-06-05"),
  },

  {
    dot: "late",
    desc: "Multa atraso - Rua João Pedro, 700",
    value: -22.4,
    date: corretorData("2026-06-04"),
  },
];

export function getStatusImovel(imovel?: Imovel): Status | undefined {
  if (!imovel) {
    return undefined;
  }
  if (
    imovel.pagamentos.some(
      (pagamento) => pagamentoStatus(pagamento) === "atrasado"
    )
  ) {
    return "atrasado";
  }

  if (
    imovel.pagamentos.some(
      (pagamento) => pagamentoStatus(pagamento) === "pendente"
    )
  ) {
    return "pendente";
  }

  return "ok";
}

export function getStatusColor(stats?: Status): CorStat {
  if (stats == "atrasado") {
    return "late";
  }
  if (stats == "pendente") {
    return "pendente";
  }
  return "ok";
}

export function pendenciaTotal(imovel: Imovel | undefined) {
  if (!imovel) {
    return 0;
  }

  return imovel.pagamentos.filter(
      (pagamento) =>
        pagamentoStatus(pagamento) === "pendente"
      ).reduce(
        (total, pagamento) => total + pagamento.total, 0
      )
  };

export function efetuadoTotal(imovel: Imovel | undefined) {
  if (!imovel) {
    return 0;
  }

  return imovel.pagamentos.filter(
    (pagamento) => pagamentoStatus(pagamento) == "ok"
  ).reduce(
    (total, pagamento) => total + pagamento.total, 0
  )
}

export function atrasoTotal(imovel: Imovel | undefined) {
  if (!imovel) {
    return 0;
  }

  return imovel.pagamentos.filter(
    (pagamento) => pagamentoStatus(pagamento) == "atrasado"
  ).reduce(
    (total, pagamento) => total + pagamento.total, 0
  )
}

export function gastoMensal(imovel: Imovel | undefined) {
  if (!imovel) {
    return 0;
  }

  return (
    pendenciaTotal(imovel) +
    atrasoTotal(imovel) +
    efetuadoTotal(imovel)
  );
} // Gasto de mês por mês

export const totalPendencias = imoveis.reduce(
  (total, imovel) => total + pendenciaTotal(imovel) + atrasoTotal(imovel), 0
);

export const custoTotal = imoveis.reduce(
  (total, imovel) => total + pendenciaTotal(imovel) + atrasoTotal(imovel) + efetuadoTotal(imovel), 0
);

export const gastoTotal = imoveis.reduce(
  (total, imovel) => total + pendenciaTotal(imovel) + atrasoTotal(imovel) + efetuadoTotal(imovel), 0 // Gasto de todos imóveis
)

export const qtd_atrasados = imoveis
  .flatMap((imovel) => imovel.pagamentos)
  .filter((p) => pagamentoStatus(p) === "atrasado").length;

export const qtd_pendentes = imoveis
  .flatMap((imovel) => imovel.pagamentos)
  .filter((p) => pagamentoStatus(p) === "pendente").length;

export const qtd_efetuados = imoveis
  .flatMap((imovel) => imovel.pagamentos)
  .filter((p) => pagamentoStatus(p) === "ok").length;

const custoEfetuadoDashboard = imoveis.reduce(
  (total, imovel) => total + efetuadoTotal(imovel), 0
  );

const custoPendenteDashboard = imoveis.reduce(
  (total, imovel) => total + pendenciaTotal(imovel), 0
  );

const custoAtrasadoDashboard = imoveis.reduce(
  (total, imovel) => total + atrasoTotal(imovel), 0
  );

const totalImoveis = imoveis.length

export function getInitials(name: string | undefined) {
  if (name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  }
  return ""
}

export type Inquilino = {
  id: number,
  nome: string;
  email: string;
  telefone: string;
  dt_cadastrado: Date;
  cpf: string;
  observacoes: string;
};

export const inquilinos: Inquilino[] = [
  {
    id: 0,
    nome: "Cheila Nogueira",
    email: "cheila.nog@email.com",
    telefone: "(85) 992981-2160",
    dt_cadastrado: corretorData("2024-07-30"),
    cpf: "000-000-000-00",
    observacoes:
      "Inquilina com histórico estável de pagamentos, sem registros recentes de atraso e baixa incidência de pendências financeiras.",
  },
  {
    id: 1,
    nome: "Ana Beatriz Souza",
    email: "ana.souza@email.com",
    telefone: "(11) 98765-4321",
    dt_cadastrado: corretorData("2025-05-04"),
    cpf: "000-000-000-00",
    observacoes:
      "Apresenta leve histórico de atrasos em contas de consumo, mas mantém regularização dos pagamentos de aluguel em dia.",
  },
  {
    id: 2,
    nome: "Carlos Henrique Lima",
    email: "carlos.lima@email.com",
    telefone: "(21) 99812-3344",
    dt_cadastrado: corretorData("2022-08-21"),
    cpf: "000-000-000-00",
    observacoes:
      "Perfil com recorrência de atrasos em contas mensais, exigindo monitoramento constante de pendências financeiras.",
  },
  {
    id: 3,
    nome: "Marina Oliveira Costa",
    email: "marina.costa@email.com",
    telefone: "(31) 99700-1122",
    dt_cadastrado: corretorData("2022-03-01"),
    cpf: "000-000-000-00",
    observacoes:
      "Histórico consistente de pagamentos, com baixa frequência de atrasos e boa organização financeira geral.",
  },
  {
    id: 6,
    nome: "Pedro Almeida Rocha",
    email: "pedro.rocha@email.com",
    telefone: "(48) 99123-7788",
    dt_cadastrado: corretorData("2022-01-29"),
    cpf: "000-000-000-00",
    observacoes:
      "Inquilino com bom histórico de adimplência, apresentando apenas atrasos pontuais já regularizados.",
  },
  {
    id: 5,
    nome: "Juliana Pereira Mendes",
    email: "juliana.mendes@email.com",
    telefone: "(11) 98800-5566",
    dt_cadastrado: corretorData("2021-12-11"),
    cpf: "000-000-000-00",
    observacoes:
      "Possui histórico misto de pagamentos, com períodos de atraso intercalados com regularizações completas.",
  },
  {
    id: 7,
    nome: "Rafael Nogueira",
    email: "rafael.nog@email.com",
    telefone: "(85) 99411-2200",
    dt_cadastrado: corretorData("2024-10-19"),
    cpf: "000-000-000-00",
    observacoes:
      "Perfil recente com bom comportamento inicial de pagamentos, ainda em fase de consolidação de histórico financeiro.",
  },
];

export function getInquilino(idInquilino: number | undefined) {
  return inquilinos.find(
    (inquilino) => inquilino.id === idInquilino
  )
}

export function getImovel(idImovel: number) {
  return imoveis.find(
    (imovel) => imovel.id === idImovel
  )
}

export function getAdimplencia(imovel: Imovel) {
  const total = imovel.pagamentos.length;

  if (total === 0) return "0%";

  const pagos = imovel.pagamentos.filter(
    (pagamento) => pagamentoStatus(pagamento) === "ok"
  ).length;

  const porcentagem = Math.round((pagos / total) * 100);

  return `${porcentagem}%`;
}
type Notificacao = {
  titulo: string;
  data: Date;
  tipo: "ok" | "pendente" | "atrasado";
};

export const notificacoes: Notificacao[] = [
  {
    titulo: "Pagamento de: Ana Costa recebido",
    data: corretorData("2026-06-13"),
    tipo: "ok",
  },

  {
    titulo: "Novo imóvel: Rua Oliveira - Apt 76 cadastrado",
    data: corretorData("2026-06-11"),
    tipo: "pendente",
  },

  {
    titulo: "Novo inquilino: Arthur da Silva cadastrado",
    data: corretorData("2026-06-12"),
    tipo: "atrasado",
  },

  {
    titulo: "Mensagem enviada para: rafael.nog@email.com",
    data: corretorData("2026-06-12"),
    tipo: "pendente",
  },
];


export const statsDashboard = [
  {
    label: "Pagamento efetuado",
    value: custoEfetuadoDashboard.toFixed(2),
    note: qtd_efetuados + " boletos pagos",
    corStat: "ok",
  },

  {
    label: "Pagamento pendente",
    value: custoPendenteDashboard.toFixed(2),
    note: qtd_pendentes + " boletos pendentes",
    corStat: "pendente",
  },

  {
    label: "Pagamento atrasado",
    value: custoAtrasadoDashboard.toFixed(2),
    note: qtd_atrasados + " boletos atrasados",
    corStat: "late",
  },

  {
    label: "Imóveis cadastrados",
    value: totalImoveis,
    note: "",
    corStat: "muted",
  },
];

export function getPagamentoPrioridade(imovel: Imovel | undefined) {
  if (!imovel || imovel.pagamentos.length === 0) return undefined;

  const pagamentos = imovel.pagamentos;

  const pagos = pagamentos
    .filter((p) => pagamentoStatus(p) === "ok")
    .sort((a, b) => b.data_vencimento.getTime() - a.data_vencimento.getTime());

  if (pagos.length > 0) return pagos[0];

  const pendentes = pagamentos
    .filter((p) => pagamentoStatus(p) === "pendente")
    .sort((a, b) => a.data_vencimento.getTime() - b.data_vencimento.getTime());

  if (pendentes.length > 0) return pendentes[0];

  const atrasados = pagamentos
    .filter((p) => pagamentoStatus(p) === "atrasado")
    .sort((a, b) => b.data_vencimento.getTime() - a.data_vencimento.getTime());

  if (atrasados.length > 0) return atrasados[0];

  return undefined;
}

export function getPagamentosPrioridadeLista(imovel: Imovel | undefined, n: number | null = null) {
  if (!imovel || imovel.pagamentos.length === 0) return [];

  const pagamentos = [...imovel.pagamentos];

  const pendentes = pagamentos
    .filter((p) => pagamentoStatus(p) === "pendente")
    .sort((a, b) => a.data_vencimento.getTime() - b.data_vencimento.getTime());

  const atrasados = pagamentos
    .filter((p) => pagamentoStatus(p) === "atrasado")
    .sort((a, b) => b.data_vencimento.getTime() - a.data_vencimento.getTime());

  const resultado: PagamentoInfo[] = [];

  resultado.push(...atrasados);

  resultado.push(...pendentes);

  if (!n) {
    return resultado;
  }
  
  return resultado.slice(0, n);
}

export function getImoveis_fromInquilino(idInquilino: number) {
  return imoveis.filter(
    (imovel) => imovel.inquilino === idInquilino
  )
}

type Plano = "Solo" | "Starter" | "Prêmium" | "Custom";

type User = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  dt_cadastro: Date;
  descricao: string;
  plano: Plano;
};

export const usuarios: User[] = [
  {
    id: 101,
    nome: "Gabriel Martins Ferreira",
    telefone: "(11) 94567-8890",
    email: "gabriel.martins@gmail.com",
    dt_cadastro: corretorData("2025-02-14"),
    descricao: "Administrador de carteira de imóveis comerciais.",
    plano: "Prêmium",
  },
  {
    id: 102,
    nome: "Camila Rocha Almeida",
    telefone: "(11) 98877-6655",
    email: "camila.rocha@gmail.com",
    dt_cadastro: corretorData("2024-10-03"),
    descricao: "Especialista em gestão de locações residenciais.",
    plano: "Starter",
  },
  {
    id: 103,
    nome: "Felipe Andrade Souza",
    telefone: "(11) 97766-4433",
    email: "felipe.andrade@gmail.com",
    dt_cadastro: corretorData("2023-06-18"),
    descricao: "Focado em análise financeira de contratos imobiliários.",
    plano: "Solo",
  },
  {
    id: 104,
    nome: "Larissa Teixeira Costa",
    telefone: "(11) 99654-2211",
    email: "larissa.teixeira@gmail.com",
    dt_cadastro: corretorData("2025-01-09"),
    descricao: "Consultora de expansão imobiliária e investimentos.",
    plano: "Custom",
  },
  {
    id: 105,
    nome: "Silvia Yendes",
    telefone: "(11) 817171-7018",
    email: "silvia.Y@gmail.com",
    dt_cadastro: corretorData("2024-08-27"),
    descricao: "CEO de imobiliária de alto padrão e atendimento VIP.",
    plano: "Prêmium",
  },
];