//src/components/Budget.jsx
// src/components/Budget.jsx (Updated)
import React, { useState, useEffect } from "react";
import { useEntries } from "../hooks/useEntries";

export default function Budget() {
  const [budget, setBudget] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        // Fetch total budget
        const budgetResponse = await fetch("http://localhost:3000/budget");
        const budgetData = await budgetResponse.json();
        console.log('budgetData', budgetData);
        setBudget(budgetData || 0);

        // Fetch total income
        const incomeResponse = await fetch("http://localhost:3000/budget/income");
        const incomeData = await incomeResponse.json();
        console.log('incomeData', incomeData);
        setIncome(incomeData || 0);

        // Fetch total expense
        const expenseResponse = await fetch("http://localhost:3000/budget/expense");
        const expenseData = await expenseResponse.json();
        console.log('expenseData', expenseData);
        setExpense(expenseData || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBudgetData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="mx-auto max-w-sm px-5 py-8 text-center text-white">
      <div>
        <h2>Available Budget</h2>
        <p className="mt-1 text-4xl font-medium">+ BDT {budget.toFixed(2)}</p>
      </div>

      <div className="mt-4 flex items-center justify-between bg-green-500 px-4 py-3 text-sm">
        <p>
          <span className="mr-2">Income</span>
        </p>
        <p>+ BDT <span id="total-income">{income.toFixed(2)}</span></p>
      </div>

      <div className="mt-2 flex items-center justify-between bg-red-500 px-4 py-3 text-sm">
        <p>
          <span className="mr-2">Expenses</span>
        </p>
        <p>- BDT {expense.toFixed(2)}</p>
      </div>
    </div>
  );
}

