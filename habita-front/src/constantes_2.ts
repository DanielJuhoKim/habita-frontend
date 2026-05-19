// constantes.ts

import {
  Crosshair,
  AlertOctagon,
  AlertTriangle,
} from "lucide-react";

// import {  } from "./constantes"

/* ======================================================
   TYPES
====================================================== */

export type corStat = "ok" | "pending" | "late" | "muted";

export type Prioridade = {
  corStat: "late" | "pending";
  text: string;
};

export type Imovel = {
  id: number;

  nome: string;
  inquilino: string;

  dashboard: {
    status: string;
    corStat: "ok" | "pending" | "late";
    value: string;
    date: string;
  };

  relatorio: {
    gasto: string;
    gastoStatus: "atraso" | "ok";
    pendente: string;
    adimplencia: string;
    status: string[];
    prioridades: Prioridade[];
  };
};

/* ======================================================
   DASHBOARD
====================================================== */

export const statsDashboard = [
  {
    label: "Pagamento efetuado",
    value: "R$ 7.839,37",
    note: "14 Boletos pagos",
    corStat: "ok",
  },

  {
    label: "Pagamento pendente",
    value: "R$ 3.473,81",
    note: "7 Boletos pendentes",
    corStat: "pending",
  },

  {
    label: "Pagamento atrasado",
    value: "R$ 621,34",
    note: "3 Boletos atrasados",
    corStat: "late",
  },

  {
    label: "Imóveis ativos",
    value: "7",
    note: "de 9 imóveis cadastrados",
    corStat: "muted",
  },
];

/* ======================================================
   IMÓVEIS (FONTE GLOBAL)
====================================================== */

export const imoveis: Imovel[] = [
  {
    id: 1,

    nome: "Rua das Palmeiras, 210 — Casa",
    inquilino: "João Silva",

    dashboard: {
      status: "Em dia",
      corStat: "ok",
      value: "R$ 1.087,91",
      date: "Efetuado em 01/06/26",
    },

    relatorio: {
      gasto: "R$ 312,40",
      gastoStatus: "ok",
      pendente: "R$ 0,00",
      adimplencia: "98%",
      status: ["------"],

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

    nome: "Av. Central, 890 — Apt 45",
    inquilino: "Ana Costa",

    dashboard: {
      status: "Pendente",
      corStat: "pending",
      value: "R$ 982,71",
      date: "Vence em 21/07/26",
    },

    relatorio: {
      gasto: "R$ 482,12",
      gastoStatus: "atraso",
      pendente: "R$ 982,71",
      adimplencia: "82%",
      status: ["2 atrasos", "4 pendências"],

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

    nome: "Rua João Pedro, 700 — Apt 203",
    inquilino: "Fernanda Ribeira",

    dashboard: {
      status: "Atrasado",
      corStat: "late",
      value: "R$ 207,67",
      date: "Vencido em 03/06/26",
    },

    relatorio: {
      gasto: "R$ 627,80",
      gastoStatus: "atraso",
      pendente: "R$ 1.207,67",
      adimplencia: "61%",
      status: ["4 atrasos", "6 pendências"],

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

    nome: "Av. Ribeiro, 861",
    inquilino: "Carlos Mendes",

    dashboard: {
      status: "Em dia",
      corStat: "ok",
      value: "R$ 1.420,00",
      date: "Efetuado em 28/05/26",
    },

    relatorio: {
      gasto: "R$ 198,55",
      gastoStatus: "ok",
      pendente: "R$ 0,00",
      adimplencia: "100%",
      status: ["------"],

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

    nome: "Rua Verde, 312 — Apt 12",
    inquilino: "Marina Souza",

    dashboard: {
      status: "Pendente",
      corStat: "pending",
      value: "R$ 890,00",
      date: "Vence em 15/07/26",
    },

    relatorio: {
      gasto: "R$ 354,00",
      gastoStatus: "ok",
      pendente: "R$ 890,00",
      adimplencia: "91%",
      status: ["2 atrasos", "2 pendências"],

      prioridades: [
        {
          corStat: "pending",
          text: "Aluguel vence em 15/07/26",
        },
      ],
    },
  },
];

/* ======================================================
   ALERTAS
====================================================== */

export const alertas = [
  {
    icon: Crosshair,
    title: "I.A: Boleto não emitido - Av.Santos, 351",
    desc: "Já faz 3 dias que o boleto da conta de luz do apt 27 não foi emitido",
    time: "Hoje, 10:00",
    corStat: "muted",
  },

  {
    icon: AlertOctagon,
    title: "Conta de luz atrasada - R.Faria Lima, 681",
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

/* ======================================================
   MOVIMENTAÇÕES
====================================================== */

export const movimentacoes = [
  {
    dot: "ok",
    desc: "Pix recebido - Ana Costa",
    value: "+R$ 301,56",
    date: "07/06/26",
  },

  {
    dot: "late",
    desc: "Pagamento ComGás (Com atraso)",
    value: "-R$ 94,62",
    date: "07/06/26",
  },

  {
    dot: "ok",
    desc: "Pix recebido - Renato Oliveira",
    value: "+R$ 213,12",
    date: "06/06/26",
  },

  {
    dot: "ok",
    desc: "Imóvel Apt 97, Av.Barros - Cadastrado",
    value: "-",
    date: "06/06/26",
  },

  {
    dot: "pending",
    desc: "Pagamento Enel - Av.Ribeiro, 861/Apt 97",
    value: "-R$ 68,38",
    date: "06/06/26",
  },

  {
    dot: "ok",
    desc: "Aluguel pago - Rua das Palmeiras",
    value: "+R$ 119,95",
    date: "05/06/26",
  },

  {
    dot: "ok",
    desc: "Pix recebido - Marina Souza",
    value: "+R$ 890,00",
    date: "05/06/26",
  },

  {
    dot: "late",
    desc: "Multa atraso - Rua João Pedro, 700",
    value: "-R$ 22,40",
    date: "04/06/26",
  },
];