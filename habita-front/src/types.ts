export type Plan =
  | "SOLO"
  | "STARTER"
  | "PREMIUM"
  | "CUSTOM";

export type Bill = {
  id?: number;

  emitter: string;

  number: number | null;

  total: number;

  issue_date: string;

  due_date: string;

  payment_date: string | null;

  property_id: number;

  bill_type: string;

  bar_code_number: string | null;

  boleto_number: string | null;
};

export type Owner = {
  id?: number;

  name: string;

  cpf: string;

  phone: string;

  email: string;

  signup_date: string;

  observations: string;

  properties?: Property[];
};

export type User = {
  id?: number;

  name: string;

  password: string;

  email: string;

  phone: string;

  description: string;

  signup_date: string;

  plan: Plan;

  properties?: Property[];
};

export type Property = {
  id?: number;

  cep: string;

  street: string;

  number: number;

  complement: string;

  city: string;

  state: string;

  phone: string | null;

  description: string;

  owner_id: number | null;

  user_id: number | null;

  bills?: Bill[];

  owner?: Owner | null;

  user?: User | null;
};