document.addEventListener("DOMContentLoaded", loadExpenses);

const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const addExpenseBtn = document.getElementById("add-expense");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

addExpenseBtn.addEventListener("click", () => {
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid name and amount.");
        return;
    }

    const expense = { id: Date.now(), name, amount };
    expenses.push(expense);
    saveToLocalStorage();
    renderExpenses();

    expenseName.value = "";
    expenseAmount.value = "";
});

function renderExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach(expense => {
        total += expense.amount;
        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button onclick="deleteExpense(${expense.id})">X</button>
        `;
        expenseList.appendChild(li);
    });

    totalAmount.textContent = `$${total}`;
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveToLocalStorage();
    renderExpenses();
}

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
    renderExpenses();
}
