/**
 * CLI Expense Tracker - Module 1 Assignment
 * Author: [Your Name]
 * TA: Oitijya Islam Auvro
 * Description: Console-based expense tracker using core JavaScript fundamentals.
 */

// ========== Configuration & Constants ==========
const CATEGORIES = ["food", "transport", "entertainment", "utilities"]
const config = {
  currencySymbol: "$",
}

// ========== Global Variables ==========
let expenses = []
let expenseIdCounter = 1
var programRunning = true // Demonstrates use of var

// ========== Utility Functions ==========
const formatAmount = (amount) =>
  `${config.currencySymbol}${parseFloat(amount).toFixed(2)}`
const getCurrentDate = () => new Date().toISOString().split("T")[0]

// ========== Core Functions ==========

function showMenu() {
  console.log("\n=== EXPENSE TRACKER ===")
  console.log("\n\n\n\n")
  console.log("1. Add Expense")
  console.log("2. View All Expenses")
  console.log("3. View by Category")
  console.log("4. Calculate Total")
  console.log("5. Remove Expense")
  console.log("6. Generate Report")
  console.log("7. Exit")
  console.log("Choose option (1-7):")
}

const addExpense = (amount, category, description = "") => {
  amount = parseFloat(amount) // Type coercion
  category = category.trim().toLowerCase()

  if (isNaN(amount) || amount <= 0) {
    console.error("Error: Amount must be a positive number")
    return
  }
  if (!CATEGORIES.includes(category)) {
    console.error(
      `Error: Invalid category. Valid categories are: ${CATEGORIES.join(", ")}`
    )
    return
  }

  let expense = {
    id: expenseIdCounter++,
    amount,
    category,
    description: description.trim(),
    date: getCurrentDate(),
  }
  expenses.push(expense)
  console.log(`Expense added successfully! ID: ${expense.id}`)
}

function removeExpense(id) {
  const index = expenses.findIndex((e) => e.id === id)
  if (index !== -1) {
    expenses.splice(index, 1)
    console.warn(`Expense with ID ${id} removed.`)
  } else {
    console.error("Error: Expense ID not found")
  }
}

function viewAllExpenses() {
  if (expenses.length === 0) {
    console.log("No expenses recorded.")
    return
  }
  console.log("\nAll Expenses:")
  expenses.forEach((e) => {
    console.log(
      `ID: ${e.id} | ${formatAmount(
        e.amount
      )} | ${e.category.toUpperCase()} | ${e.description} | ${e.date}`
    )
  })
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  console.log(`Total: ${formatAmount(total)}`)
}

const viewByCategory = (category) => {
  category = category.trim().toLowerCase()
  const filtered = expenses.filter((e) => e.category === category)

  if (filtered.length === 0) {
    console.warn("No expenses found for category: " + category)
    return
  }

  console.log(`\n${category.toUpperCase()} Expenses:`)
  filtered.forEach((e) => {
    console.log(
      `ID: ${e.id} | ${formatAmount(e.amount)} | ${e.description} | ${e.date}`
    )
  })
  const total = filtered.reduce((sum, e) => sum + e.amount, 0)
  console.log(`Category Total: ${formatAmount(total)}`)
}

function calculateTotal(category = null) {
  if (category) {
    viewByCategory(category)
  } else {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    console.log(`Total Expenses: ${formatAmount(total)}`)
  }
}

function generateReport() {
  console.log("\nEXPENSE REPORT\n==============================")
  CATEGORIES.forEach((cat) => {
    const filtered = expenses.filter((e) => e.category === cat)
    const total = filtered.reduce((sum, e) => sum + e.amount, 0)
    if (filtered.length > 0) {
      console.log(
        `${cat.toUpperCase()}: ${formatAmount(total)} (${
          filtered.length
        } expenses)`
      )
    }
  })
  const grandTotal = expenses.reduce((sum, e) => sum + e.amount, 0)
  const average = grandTotal / (expenses.length || 1)
  console.log("==============================")
  console.log(
    `TOTAL: ${formatAmount(grandTotal)} (${expenses.length} expenses)`
  )
  console.log(`AVERAGE: ${formatAmount(average)} per expense`)
}

// ========== Menu Interaction Loop (Browser only) ==========
function startExpenseTracker() {
  let input
  while (programRunning) {
    showMenu()
    input = prompt("Enter choice (1-7):")
    if (!input) break
    input = input.trim()

    switch (input) {
      case "1":
        let amt = prompt("Enter amount:")
        let cat = prompt(`Enter category (${CATEGORIES.join(", ")}):`)
        let desc = prompt("Enter description:")
        addExpense(amt, cat, desc)
        break
      case "2":
        viewAllExpenses()
        break
      case "3":
        let vcat = prompt("Enter category:")
        viewByCategory(vcat)
        break
      case "4":
        let ccat = prompt("Enter category (or leave empty for all):")
        calculateTotal(ccat)
        break
      case "5":
        let rid = prompt("Enter Expense ID to remove:")
        removeExpense(parseInt(rid))
        break
      case "6":
        generateReport()
        break
      case "7":
        console.log("Exiting Expense Tracker. Goodbye!")
        programRunning = false
        break
      default:
        console.error("Invalid option. Please choose between 1 and 7.")
    }
  }
}

// ========== Initialization ==========
// For testing in browser console, run:
// startExpenseTracker();
