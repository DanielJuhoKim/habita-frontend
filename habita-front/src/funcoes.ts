import {
  Crosshair,
  AlertOctagon,
  AlertTriangle,
} from "lucide-react";

import type {
  Property,
  Bill,
} from "./types";

export type CorStat =
  | "ok"
  | "pendente"
  | "late"
  | "muted";

export type Status =
  | "pendente"
  | "atrasado"
  | "ok";

export const dataAtual = new Date();


export function formatarId(id: number) {
  return id.toString().padStart(4, "0");
}

export function pagamentoStatus(
  bill: Bill
): Status {
  if (bill.payment_date) {
    return "ok";
  }

  const vencimento = new Date(
    bill.due_date
  );

  if (dataAtual > vencimento) {
    return "atrasado";
  }

  return "pendente";
}

export function getStatusImovel(
  imovel?: Property
): Status | undefined {
  if (!imovel?.bills) {
    return undefined;
  }

  if (
    imovel.bills.some(
      (bill) =>
        pagamentoStatus(bill) === "atrasado"
    )
  ) {
    return "atrasado";
  }

  if (
    imovel.bills.some(
      (bill) =>
        pagamentoStatus(bill) === "pendente"
    )
  ) {
    return "pendente";
  }

  return "ok";
}

export function getStatusColor(
  status?: Status
): CorStat {
  if (status === "atrasado") {
    return "late";
  }

  if (status === "pendente") {
    return "pendente";
  }

  return "ok";
}

export function pendenciaTotal(
  imovel?: Property
) {
  if (!imovel?.bills) {
    return 0;
  }

  return imovel.bills
    .filter(
      (bill) =>
        pagamentoStatus(bill) === "pendente"
    )
    .reduce(
      (total, bill) =>
        total + bill.total,
      0
    );
}

export function atrasoTotal(
  imovel?: Property
) {
  if (!imovel?.bills) {
    return 0;
  }

  return imovel.bills
    .filter(
      (bill) =>
        pagamentoStatus(bill) === "atrasado"
    )
    .reduce(
      (total, bill) =>
        total + bill.total,
      0
    );
}

export function efetuadoTotal(
  imovel?: Property
) {
  if (!imovel?.bills) {
    return 0;
  }

  return imovel.bills
    .filter(
      (bill) =>
        pagamentoStatus(bill) === "ok"
    )
    .reduce(
      (total, bill) =>
        total + bill.total,
      0
    );
}

export function gastoMensal(
  imovel?: Property
) {
  return (
    pendenciaTotal(imovel) +
    atrasoTotal(imovel) +
    efetuadoTotal(imovel)
  );
}

export function getPagamentoPrioridade(
  imovel?: Property
) {
  if (!imovel?.bills?.length) {
    return undefined;
  }

  const bills = imovel.bills;

  const atrasados = bills
    .filter(
      (b) =>
        pagamentoStatus(b) === "atrasado"
    )
    .sort(
      (a, b) =>
        new Date(
          b.due_date
        ).getTime() -
        new Date(
          a.due_date
        ).getTime()
    );

  if (atrasados.length > 0) {
    return atrasados[0];
  }

  const pendentes = bills
    .filter(
      (b) =>
        pagamentoStatus(b) === "pendente"
    )
    .sort(
      (a, b) =>
        new Date(
          a.due_date
        ).getTime() -
        new Date(
          b.due_date
        ).getTime()
    );

  if (pendentes.length > 0) {
    return pendentes[0];
  }

  return bills[0];
}

export function getInitials(
  name?: string
) {
  if (!name) {
    return "";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(
      (p) =>
        p[0]?.toUpperCase() ?? ""
    )
    .join("");
}

