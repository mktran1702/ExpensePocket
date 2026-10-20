# Expense Pocket

A console-based expense tracking application built with TypeScript for the Mobile Computing course.

## Features

- Define expenses using TypeScript interfaces and union types.
- Store and display sample expenses.
- Filter expenses by category or display all expenses.
- Calculate the total amount of expenses.
- Find an expense by ID and safely handle unknown IDs.
- Validate raw data using `unknown` and a custom type guard.
- Handle optional payment methods and nullable notes.

## Technologies

- TypeScript
- Node.js
- npm
- Git and GitHub Actions

## Project Structure

```text
ExpensePocket/
├── .github/
│   └── workflows/
│       └── typecheck.yml
├── src/
│   ├── expense.types.ts
│   ├── expense.data.ts
│   ├── expense.service.ts
│   └── index.ts
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

Install Node.js and npm.

### Install dependencies

```bash
npm install
```

### Check TypeScript types

```bash
npm run typecheck
```

### Build the project

```bash
npm run build
```

### Run the application

```bash
npm start
```

## Sample Output

The application displays all expenses, filters food expenses, calculates the total amount, demonstrates expense lookup, and validates raw data.

The current sample data contains five expenses with a total amount of **240,000 VND**.

## Automated Checks

GitHub Actions runs TypeScript type checking and builds the project when changes are pushed to `main` or a pull request targets `main`.