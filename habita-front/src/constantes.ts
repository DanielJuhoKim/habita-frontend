// constantes.ts

import {
  Crosshair,
  AlertOctagon,
  AlertTriangle,
} from "lucide-react";

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
  inquilino: string;
  pendenciaTotal: number;

  pagamentos: PagamentoInfo[];

  dashboard: {
    status: string;
    corStat: "ok" | "pending" | "late";
    date: Date;
  };

  relatorio: {
    gasto: number;
    gastoStatus: "atraso" | "ok";
    adimplencia: string;
    prioridades: Prioridade[];
  };
};

export const statsDashboard = [
  {
    label: "Pagamento efetuado",
    value: 7839.37,
    note: "14 boletos pagos",
    corStat: "ok",
  },

  {
    label: "Pagamento pendente",
    value: 3473.81,
    note: "7 boletos pendentes",
    corStat: "pending",
  },

  {
    label: "Pagamento atrasado",
    value: 621.34,
    note: "3 boletos atrasados",
    corStat: "late",
  },

  {
    label: "Imóveis ativos",
    value: 7,
    note: "de 9 imóveis cadastrados",
    corStat: "muted",
  },
];

export const imoveis: Imovel[] = [
  {
    id: 1,

    logradouro: "Rua das Palmeiras, 210",
    complemento: "Casa",
    inquilino: "João Silva",
    pendenciaTotal: 0,

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
      adimplencia: "98%",

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
    inquilino: "Ana Costa",
    pendenciaTotal: 982.71,

    pagamentos: [
      {
        desc: "Conta Enel",
        status: "ok",
        value: 187.32,
        date: corretorData("2026-05-28"),
      },

      {
        desc: "Conta Enel",
        status: "pendente",
        value: 214.09,
        date: corretorData("2026-07-18"),
      },

      {
        desc: "Conta Comgás",
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
      adimplencia: "82%",

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
    inquilino: "Fernanda Ribeira",
    pendenciaTotal: 1207.67,

    pagamentos: [
      {
        desc: "Conta Sabesp",
        status: "ok",
        value: 92.14,
        date: corretorData("2026-06-02"),
      },

      {
        desc: "Conta Sabesp",
        status: "pendente",
        value: 144.88,
        date: corretorData("2026-07-24"),
      },

      {
        desc: "Conta Sabesp",
        status: "atrasado",
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
      adimplencia: "61%",

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
    inquilino: "Carlos Mendes",
    pendenciaTotal: 0,

    pagamentos: [
      {
        desc: "Conta Comgás",
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
        desc: "Conta Comgás",
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
      adimplencia: "100%",

      prioridades: [
        {
          corStat: "pending",
          text: "Manutenção agendada para 22/07",
        },
      ],
    },
  },

  {
    id: 5,

    logradouro: "Rua Verde, 312",
    complemento: "Apt 12",
    inquilino: "Marina Souza",
    pendenciaTotal: 890,

    pagamentos: [
      {
        desc: "Aluguel",
        status: "ok",
        value: 420,
        date: corretorData("2026-06-03"),
      },

      {
        desc: "Condomínio",
        status: "pendente",
        value: 380,
        date: corretorData("2026-07-29"),
      },

      {
        desc: "Condomínio",
        status: "pendente",
        value: 510,
        date: corretorData("2026-06-30"),
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
      adimplencia: "91%",

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