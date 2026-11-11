import { expenses } from "./expense.data";

import type {
  OnOpenExpense
} from "./expense.types";

import type { Expense } from "./expense.types";

import {
  printExpense,
  filterExpenses,
  calculateTotalAmount,
  findExpenseById,
  isExpense,
  calculateTotalByStatus,
  calculateBudgetBalance,
  getCategorySpendingSummary,
  findHighValueExpenses,
  getExpenseDetails
} from "./expense.service";

// Callback: simulate opening an expense
const openExpense: OnOpenExpense = (
  expenseId
) => {
  const expense = findExpenseById(
    expenses,
    expenseId
  );

  if (expense === null) {
    console.log(
      "Cannot open expense:",
      expenseId
    );
    return;
  }

  console.log(
    "Opening expense:",
    expense.title
  );
};

// 1. Print all expenses
console.log("\n=== ALL EXPENSES ===");

expenses.forEach(printExpense);

// 2. Filter expenses by category
const foodExpenses = filterExpenses(
  expenses,
  "food"
);

console.log("\n=== EXPENSES: FOOD ===");

foodExpenses.forEach(printExpense);

// Demonstrate the "all" filter
const allFilteredExpenses = filterExpenses(
  expenses,
  "all"
);

console.log(
  "\nExpenses returned by 'all':",
  allFilteredExpenses.length
);

// 3. Calculate total amount
console.log(
  "\n=== TOTAL AMOUNT ===",
  `${calculateTotalAmount(expenses).toLocaleString("vi-VN")} VND`
);

console.log("\n=== EXPENSE INSIGHTS ===");

const paidTotal = calculateTotalByStatus(expenses, "paid");
const plannedTotal = calculateTotalByStatus(expenses, "planned");

const demoBudget = 300_000;
const budgetBalance = calculateBudgetBalance(expenses, demoBudget);

console.log(
  `Paid total: ${paidTotal.toLocaleString("vi-VN")} VND`
);

console.log(
  `Planned total: ${plannedTotal.toLocaleString("vi-VN")} VND`
);

console.log(
  `Demo budget: ${demoBudget.toLocaleString("vi-VN")} VND`
);

console.log(
  `Budget balance: ${budgetBalance.toLocaleString("vi-VN")} VND`
);

// 4. Open a valid and an invalid expense
console.log("\n=== OPEN EXPENSE ===");

openExpense("EXP001");
openExpense("UNKNOWN");

// 5. Validate raw data of type unknown
const rawValidExpense: unknown = {
  id: "EXP006",
  title: "Course material",
  amount: 80000,
  category: "study",
  status: "paid",
  paymentMethod: "Cash",
  note: null
};

const rawInvalidExpense: unknown = {
  id: 123,
  title: "Invalid expense",
  amount: "80000",
  category: "shopping",
  status: "paid",
  note: null
};

console.log("\n=== RAW DATA VALIDATION ===");

if (isExpense(rawValidExpense)) {
  console.log(
    "Valid expense:",
    rawValidExpense.title
  );
} else {
  console.log("Invalid expense data");
}

if (isExpense(rawInvalidExpense)) {
  console.log(
    "Valid expense:",
    rawInvalidExpense.title
  );
} else {
  console.log("Invalid expense data");
}

console.log("\n=== CATEGORY SPENDING BREAKDOWN ===");

const categorySummary = getCategorySpendingSummary(expenses);

categorySummary.forEach((item) => {
  console.log(
    `${item.category} | ` +
    `${item.total.toLocaleString("vi-VN")} VND | ` +
    `${item.percentage}%`
  );
});

console.log("\n=== HIGH-VALUE EXPENSE ALERT ===");

const alertThreshold = 100_000;
const highValueExpenses = findHighValueExpenses(
  expenses,
  alertThreshold
);

console.log(
  `Alert threshold: ${alertThreshold.toLocaleString("vi-VN")} VND`
);

if (highValueExpenses.length === 0) {
  console.log("No high-value expenses found.");
} else {
  highValueExpenses.forEach(printExpense);
}

console.log("\n=== OPTIONAL & NULLABLE TEST ===");

const optionalNullableExpense: Expense = {
  id: "TEST001",
  title: "Sample expense",
  amount: 30000,
  category: "study",
  status: "planned",
  note: null
};

console.log(
  getExpenseDetails(optionalNullableExpense)
);

console.log("\n=== UNKNOWN TYPE GUARD TEST ===");

// Valid raw data
const validRawData: unknown = {
  id: "EXP007",
  title: "Stationery",
  amount: 45_000,
  category: "study",
  status: "paid",
  paymentMethod: "Cash",
  note: "Study supplies"
};

if (isExpense(validRawData)) {
  console.log("Valid expense:", validRawData.title);
  console.log(
    "Amount:",
    validRawData.amount.toLocaleString("vi-VN"),
    "VND"
  );
  console.log("Status:", validRawData.status);
} else {
  console.log("Invalid expense data");
}

// Invalid raw data
const invalidRawData: unknown = {
  id: 101,
  title: "Invalid expense",
  amount: "45,000",
  category: "study",
  status: "paid",
  note: null
};

if (isExpense(invalidRawData)) {
  console.log("Valid expense:", invalidRawData.title);
} else {
  console.log("Invalid expense data");
}