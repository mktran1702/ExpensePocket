import type { Expense } from "./expense.types";

export const expenses: Expense[] = [
  {
    id: "EXP001",
    title: "Lunch",
    amount: 50000,
    category: "food",
    status: "paid",
    paymentMethod: "Cash",
    note: "Lunch at university"
  },
  {
    id: "EXP002",
    title: "Bus ticket",
    amount: 15000,
    category: "transport",
    status: "paid",
    paymentMethod: "Cash",
    note: null
  },
  {
    id: "EXP003",
    title: "Programming book",
    amount: 120000,
    category: "study",
    status: "paid",
    paymentMethod: "Bank transfer",
    note: "TypeScript reference"
  },
  {
    id: "EXP004",
    title: "Coffee",
    amount: 35000,
    category: "food",
    status: "planned",
    note: "Payment method not decided"
  },
  {
    id: "EXP005",
    title: "Notebook",
    amount: 20000,
    category: "study",
    status: "planned",
    paymentMethod: "Cash",
    note: null
  },
  {
    id: "EXP006",
    title: "Movie ticket",
    amount: 80000,
    category: "other",
    status: "cancelled",
    paymentMethod: "Cash",
    note: "Plan cancelled"
  }
];

const optionalNullableExpense: Expense = {
  id: "EXP007",
  title: "New notebook",
  amount: 30000,
  category: "study",
  status: "planned",
  note: null
};