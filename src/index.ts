import { expenses } from "./expense.data";

import type {
  OnOpenExpense
} from "./expense.types";

import {
  printExpense,
  filterExpenses,
  calculateTotalAmount,
  findExpenseById,
  isExpense
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