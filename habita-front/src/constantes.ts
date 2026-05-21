import {
  Crosshair,
  AlertOctagon,
  AlertTriangle,
} from "lucide-react";

export function formatarId(id: number) {
  return id.toString().padStart(4, "0");
}

export const dataAtual = corretorData("2026-06-13")

export type CorStat = "ok" | "pending" | "late" | "muted";

export type Status = "pendente" | "atrasado" | "ok";

function corretorData(date: string): Date {
  const [ano, mes, dia] = date.split("-").map(Number);

  return new Date(ano, mes - 1, dia);
}

export type Prioridade = {
  corStat: "late" | "pending";
  text: string;
};

export type PagamentoInfo = {
  desc: string;
  status: Status;
  value: number;
  date: Date;
};

export type Imovel = {
  id: number;

  logradouro: string;
  complemento: string;
  descricao: string;
  inquilino: number;

  pagamentos: PagamentoInfo[];

  dashboard: {
    status: string;
    corStat: "ok" | "pending" | "late";
    date: Date;
  };

  relatorio: {
    gasto: number;
    gastoStatus: "atraso" | "ok";
    prioridades: Prioridade[];
  };
};

export const imoveis: Imovel[] = [
  {
    id: 1,

    logradouro: "Rua das Palmeiras, 210",
    complemento: "Casa",
    descricao: "dddddddddddddd",
    inquilino: 1,

    pagamentos: [
      {
        desc: "Conta de luz",
        status: "ok",
        value: 200,
        date: corretorData("2026-05-27"),
      },

      {
        desc: "Aluguel",
        status: "ok",
        value: 3150,
        date: corretorData("2026-06-01"),
      },
    ],

    dashboard: {
      status: "Em dia",
      corStat: "ok",
      date: corretorData("2026-06-01"),
    },

    relatorio: {
      gasto: 312.4,
      gastoStatus: "ok",

      prioridades: [
        {
          corStat: "pending",
          text: "Conta de água vence em 8 dias",
        },
      ],
    },
  },

  {
    id: 2,

    logradouro: "Av. Central, 890",
    complemento: "Apt 45",
    descricao: "aaaaaaaaaa",
    inquilino: 2,

    pagamentos: [
      {
        desc: "Conta Enel",
        status: "ok",
        value: 187.32,
        date: corretorData("2026-05-28"),
      },

      {
        desc: "Conta ComGás",
        status: "pendente",
        value: 214.09,
        date: corretorData("2026-07-18"),
      },

      {
        desc: "Aluguel",
        status: "atrasado",
        value: 298.44,
        date: corretorData("2026-06-09"),
      },
    ],

    dashboard: {
      status: "Pendente",
      corStat: "pending",
      date: corretorData("2026-07-21"),
    },

    relatorio: {
      gasto: 482.12,
      gastoStatus: "atraso",

      prioridades: [
        {
          corStat: "late",
          text: "Aluguel atrasado há 3 dias",
        },

        {
          corStat: "pending",
          text: "Conta de luz vence amanhã",
        },
      ],
    },
  },

  {
    id: 3,

    logradouro: "Rua João Pedro, 700",
    complemento: "Apt 203",
    descricao: "xxxxxxxxxx",
    inquilino: 3,

    pagamentos: [
      {
        desc: "Conta Sabesp",
        status: "ok",
        value: 92.14,
        date: corretorData("2026-06-02"),
      },

      {
        desc: "Aluguel",
        status: "pendente",
        value: 144.88,
        date: corretorData("2026-07-24"),
      },

      {
        desc: "Conta Enel",
        status: "atrasado",
        value: 176.51,
        date: corretorData("2026-06-01"),
      },

      {
        desc: "Conta Água",
        status: "ok",
        value: 176.51,
        date: corretorData("2026-06-01"),
      },
    ],

    dashboard: {
      status: "Atrasado",
      corStat: "late",
      date: corretorData("2026-06-03"),
    },

    relatorio: {
      gasto: 627.8,
      gastoStatus: "atraso",

      prioridades: [
        {
          corStat: "late",
          text: "Aluguel vencido em 03/06/26",
        },

        {
          corStat: "late",
          text: "Multa por atraso aplicada",
        },
      ],
    },
  },

  {
    id: 4,

    logradouro: "Av. Ribeiro, 861",
    complemento: "Apt 77",
    descricao: "ttttttttttttt",
    inquilino: 6,

    pagamentos: [
      {
        desc: "Conta Aluguel",
        status: "ok",
        value: 74.21,
        date: corretorData("2026-06-07"),
      },

      {
        desc: "Conta Comgás",
        status: "pendente",
        value: 98.1,
        date: corretorData("2026-07-13"),
      },

      {
        desc: "Claro",
        status: "atrasado",
        value: 120.75,
        date: corretorData("2026-06-03"),
      },
    ],

    dashboard: {
      status: "Em dia",
      corStat: "ok",
      date: corretorData("2026-05-28"),
    },

    relatorio: {
      gasto: 198.55,
      gastoStatus: "ok",

      prioridades: [
        {
          corStat: "pending",
          text: "Manutenção agendada para 22/07",
        },
      ],
    },
  },

  {
    id: 7,

    logradouro: "Rua Verde, 312",
    complemento: "Apt 12",
    descricao: "DDDDDDDDDDDDD",
    inquilino: 7,

    pagamentos: [
      {
        desc: "Aluguel",
        status: "ok",
        value: 420,
        date: corretorData("2026-06-03"),
      },

      {
        desc: "Conta Enel",
        status: "ok",
        value: 220,
        date: corretorData("2026-05-30"),
      },

      {
        desc: "Conta ComGás",
        status: "pendente",
        value: 380,
        date: corretorData("2026-07-29"),
      },

      {
        desc: "Conta VIVO",
        status: "ok",
        value: 1700,
        date: corretorData("2026-06-01"),
      },
    ],

    dashboard: {
      status: "Pendente",
      corStat: "pending",
      date: corretorData("2026-07-15"),
    },

    relatorio: {
      gasto: 354,
      gastoStatus: "ok",

      prioridades: [
        {
          corStat: "pending",
          text: "Aluguel vence em 15/07/26",
        },
      ],
    },
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
    corStat: "pending",
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
    corStat: "pending",
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
    dot: "pending",
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
      (pagamento) => pagamento.status === "atrasado"
    )
  ) {
    return "atrasado";
  }

  if (
    imovel.pagamentos.some(
      (pagamento) => pagamento.status === "pendente"
    )
  ) {
    return "pendente";
  }

  return "ok";
}

export function getStatusColor(stats: Status): CorStat {
  if (stats == "atrasado") {
    return "late";
  }
  if (stats == "pendente") {
    return "pending";
  }
  return "ok";
}

export function pendenciaTotal(imovel: Imovel | undefined) {
  if (!imovel) {
    return 0;
  }

  return imovel.pagamentos.filter(
      (pagamento) =>
        pagamento.status === "pendente"
      ).reduce(
        (total, pagamento) => total + pagamento.value, 0
      )
  };

export function efetuadoTotal(imovel: Imovel | undefined) {
  if (!imovel) {
    return 0;
  }

  return imovel.pagamentos.filter(
    (pagamento) => pagamento.status == "ok"
  ).reduce(
    (total, pagamento) => total + pagamento.value, 0
  )
}

export function atrasoTotal(imovel: Imovel | undefined) {
  if (!imovel) {
    return 0;
  }

  return imovel.pagamentos.filter(
    (pagamento) => pagamento.status == "atrasado"
  ).reduce(
    (total, pagamento) => total + pagamento.value, 0
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
  .filter((p) => p.status === "atrasado").length;

export const qtd_pendentes = imoveis
  .flatMap((imovel) => imovel.pagamentos)
  .filter((p) => p.status === "pendente").length;

export const qtd_efetuados = imoveis
  .flatMap((imovel) => imovel.pagamentos)
  .filter((p) => p.status === "ok").length;

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
  desde: Date;
  cpf: string;
  observacoes: string;
  imoveis: number[];
};

export const inquilinos: Inquilino[] = [
  {
    id: 0,
    nome: "Cheila Nogueira",
    email: "cheila.nog@email.com",
    telefone: "(85) 992981-2160",
    desde: corretorData("2024-07-30"),
    cpf: "000-000-000-00",
    observacoes: "------------------------------------",
    imoveis: [3]
  },
  {
    id: 1,
    nome: "Ana Beatriz Souza",
    email: "ana.souza@email.com",
    telefone: "(11) 98765-4321",
    desde: corretorData("2025-05-04"),
    cpf: "000-000-000-00",
    observacoes: "--------dadwdwa-----------",
    imoveis: [1]
  },
  {
    id: 2,
    nome: "Carlos Henrique Lima",
    email: "carlos.lima@email.com",
    telefone: "(21) 99812-3344",
    desde: corretorData("2022-08-21"),
    cpf: "000-000-000-00",
    observacoes: "---------------iiiwa-----------",
    imoveis: [1, 2]
  },
  {
    id: 3,
    nome: "Marina Oliveira Costa",
    email: "marina.costa@email.com",
    telefone: "(31) 99700-1122",
    desde: corretorData("2022-03-01"),
    cpf: "000-000-000-00",
    observacoes: "-----------eeee-------------------------",
    imoveis: [3]
  },
  {
    id: 6,
    nome: "Pedro Almeida Rocha",
    email: "pedro.rocha@email.com",
    telefone: "(48) 99123-7788",
    desde: corretorData("2022-01-29"),
    cpf: "000-000-000-00",
    observacoes: "x-",
    imoveis: [4]
  },
  {
    id: 5,
    nome: "Juliana Pereira Mendes",
    email: "juliana.mendes@email.com",
    telefone: "(11) 98800-5566",
    desde: corretorData("2021-12-11"),
    cpf: "000-000-000-00",
    observacoes: "-----awdas------------------",
    imoveis: [7]
  },
  {
    id: 7,
    nome: "Rafael Nogueira",
    email: "rafael.nog@email.com",
    telefone: "(85) 99411-2200",
    desde: corretorData("2024-10-19"),
    cpf: "000-000-000-00",
    observacoes: "------------------------------------",
    imoveis: [3]
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
    (pagamento) => pagamento.status === "ok"
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
    corStat: "pending",
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