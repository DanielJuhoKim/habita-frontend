import { useState } from 'react'
import { createFileRoute } from "@tanstack/react-router";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import {
  LayoutDashboard,
  FileText,
  LineChart,
  Building2,
  Users,
  Settings,
  Bell,
  Filter,
  Crosshair,
  AlertOctagon,
  AlertTriangle,
} from "lucide-react";

const navTop = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Pagamentos" },
  { icon: LineChart, label: "Relatórios" },
];
const navBottom = [
  { icon: Building2, label: "Imóveis" },
  { icon: Users, label: "Inquilinos" },
  { icon: Settings, label: "Configurações" },
];

const stats = [
  { label: "Pagamento efetivado", value: "R$ 7.839,37", note: "14 Boletos pagos", tone: "ok" },
  { label: "Pagamento pendente", value: "R$ 3.473,81", note: "7 Boletos pendentes", tone: "pending" },
  { label: "Pagamento atrasado", value: "R$ 621,34", note: "3 Boletos atrasados", tone: "late" },
  { label: "Imóveis ativos", value: "7", note: "de 9 imóveis cadastrados", tone: "muted" },
];

const imoveis = [
  { addr: "Rua das Palmeiras, 210 — Casa", tenant: "João Silva", status: "Em dia", tone: "ok", value: "R$ 1.087,91", date: "Efetuado em 01/06/26" },
  { addr: "Av. Central, 890 — Apt 45", tenant: "Ana Costa", status: "Pendente", tone: "pending", value: "R$ 982,71", date: "Vence em 21/07/26" },
  { addr: "Rua João Pedro, 700 - Apt 203", tenant: "Fernanda Ribeira", status: "Atrasado", tone: "late", value: "R$ 207,67", date: "Vencido em 03/06/26" },
  { addr: "Av.Ribeiro, 861", tenant: "Carlos Mendes", status: "Em dia", tone: "ok", value: "R$ 1.420,00", date: "Efetuado em 28/05/26" },
  { addr: "Rua Verde, 312 — Apt 12", tenant: "Marina Souza", status: "Pendente", tone: "pending", value: "R$ 890,00", date: "Vence em 15/07/26" },
  { addr: "Av. Brasil, 1500 — Sala 8", tenant: "Pedro Lima", status: "Em dia", tone: "ok", value: "R$ 2.100,00", date: "Efetuado em 03/06/26" },
];

const alertas = [
  { icon: Crosshair, title: "I.A: Boleto não emitido - Av.Santos, 351", desc: "Já faz 3 dias que o boleto da conta de luz do apt 27 da não foi…", time: "Hoje, 10:00", tone: "muted" },
  { icon: AlertOctagon, title: "Conta de luz atrasada - R.Faria Lima, 681", desc: "Apt 096 está com 13 dias de atraso", tone: "late" },
  { icon: AlertTriangle, title: "Vencimento em 9 dias - R. Bela Vista, 06", desc: "Conta de gás do apt 97 pendente, vencimento previsto para…", tone: "pending" },
  { icon: AlertOctagon, title: "Aluguel atrasado - Rua João Pedro, 700", desc: "Inquilino Fernanda Ribeira — 5 dias de atraso", tone: "late" },
  { icon: AlertTriangle, title: "Manutenção agendada - Av. Central, 890", desc: "Visita técnica marcada para 22/07/26", tone: "pending" },
];

const movimentacoes = [
  { dot: "ok", title: "Pix recebido - Ana Costa", value: "+R$ 301,56", date: "07/06/26" },
  { dot: "late", title: "Pagamento ComGás(Atrasado) - R.Henrique da Costa, 971/Apt 98", value: "-R$ 94,62", date: "07/06/26" },
  { dot: "ok", title: "Pix recebido - Renato Oliveira", value: "+R$ 213,12", date: "06/06/26" },
  { dot: "ok", title: "Imóvel Apt 97, Av.Barros - Cadastrado", value: "-", date: "06/06/26" },
  { dot: "pending", title: "Pagamento Enel - Av.Ribeiro, 861/Apt 97", value: "-R$ 68,38", date: "06/06/26" },
  { dot: "ok", title: "Aluguel pago - Rua das Palmeiras", value: "+R$ 119,95", date: "05/06/26" },
  { dot: "ok", title: "Pix recebido - Marina Souza", value: "+R$ 890,00", date: "05/06/26" },
  { dot: "late", title: "Multa atraso - Rua João Pedro, 700", value: "-R$ 22,40", date: "04/06/26" },
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    </>
  )
}

export default App
