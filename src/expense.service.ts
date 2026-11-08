
import type {
  Expense,
  ExpenseFilter
} from "./expense.types";

// 1. Print one expense with safe fallback
export function printExpense(
  expense: Expense
): void {
  const paymentMethod =
    expense.paymentMethod ?? "Not specified";

  const note =
    expense.note ?? "No note";

  console.log(
    `${expense.id} | ${expense.title} | ` +
    `${expense.amount.toLocaleString("vi-VN")} VND | ` +
    `${expense.category} | ${expense.status} | ` +
    `${paymentMethod} | ${note}`
  );
}

// 2. Filter expenses by category or return all
export function filterExpenses(
  items: Expense[],
  filter: ExpenseFilter
): Expense[] {
  if (filter === "all") {
    return items;
  }

  return items.filter(
    (expense) => expense.category === filter
  );
}

// 3. Calculate total amount
export function calculateTotalAmount(
  items: Expense[]
): number {
  return items.reduce(
    (total, expense) => total + expense.amount,
    0
  );
}

export function calculateTotalByStatus(
  items: Expense[],
  status: Expense["status"]
): number {
  return items
    .filter((expense) => expense.status === status)
    .reduce((total, expense) => total + expense.amount, 0);
}

export function calculateBudgetBalance(
  items: Expense[],
  budget: number
): number {
  if (!Number.isFinite(budget) || budget < 0) {
    throw new RangeError("Budget must be a finite, non-negative number.");
  }

  return budget - calculateTotalAmount(items);
}

// 4. Find an expense by ID
// Return null when no matching expense exists
export function findExpenseById(
  items: Expense[],
  expenseId: string
): Expense | null {
  return (
    items.find(
      (expense) => expense.id === expenseId
    ) ?? null
  );
}

// 5. Validate unknown data using a custom type guard
export function isExpense(
  value: unknown
): value is Expense {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const item = value as Record<string, unknown>;

  const validCategory =
    item.category === "food" ||
    item.category === "transport" ||
    item.category === "study" ||
    item.category === "other";

  const validStatus =
    item.status === "planned" ||
    item.status === "paid";

  const validPaymentMethod =
    item.paymentMethod === undefined ||
    typeof item.paymentMethod === "string";

  const validNote =
    typeof item.note === "string" ||
    item.note === null;

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.amount === "number" &&
    Number.isFinite(item.amount) &&
    item.amount >= 0 &&
    validCategory &&
    validStatus &&
    validPaymentMethod &&
    validNote
  );
}


// 6. Returns spending totals and percentages for each category
export function getCategorySpendingSummary(
  items: Expense[]
): {
  category: Expense["category"];
  total: number;
  percentage: number;
}[] {
  const categories: Expense["category"][] = [
    "food",
    "transport",
    "study",
    "other"
  ];

  const grandTotal = calculateTotalAmount(items);

  return categories.map((category) => {
    const categoryTotal = items
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);

    const percentage =
      grandTotal === 0
        ? 0
        : Number(((categoryTotal / grandTotal) * 100).toFixed(2));

    return {
      category,
      total: categoryTotal,
      percentage
    };
  });
}

// 7. Finds expenses that meet or exceed a specified alert threshold
export function findHighValueExpenses(
  items: Expense[],
  threshold: number
): Expense[] {
  if (!Number.isFinite(threshold) || threshold < 0) {
    throw new RangeError(
      "Threshold must be a non-negative finite number."
    );
  }

  return items.filter(
    (expense) => expense.amount >= threshold
  );
}
