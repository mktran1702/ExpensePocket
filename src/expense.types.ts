export type ExpenseCategory =
  | "food"
  | "transport"
  | "study"
  | "other";

export type ExpenseStatus =
  | "planned"
  | "paid"
  | "cancelled";

export type ExpenseFilter =
  | "all"
  | ExpenseCategory;

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  status: ExpenseStatus;

  // Optional property
  paymentMethod?: string;

  // Nullable property
  note: string | null;
}

export type OnOpenExpense = (
  expenseId: string
) => void;