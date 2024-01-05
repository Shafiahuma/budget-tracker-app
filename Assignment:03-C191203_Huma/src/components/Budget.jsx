//./node_modules/.bin/vite
// src/components/Budget.jsx
// src/components/Budget.jsx

import { useEntries } from "../hooks/useEntries";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Budget() {
  const { totalIncome, totalExpense } = useEntries(); // Correctly use totalIncome and totalExpense

  const [budget, setBudget] = useState('');

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const budgetResponse = await axios.get('http://localhost:3000/budget');
        setBudget(budgetResponse.data);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchBudgetData();
  }, []);

  return (
    <div className="mx-auto max-w-sm px-5 py-8 text-center text-white">
      <div>
        <h2>Available Budget</h2>
        <p className="mt-1 text-4xl font-medium">+ BDT {budget}</p>
      </div>

      <div className="mt-4 flex items-center justify-between bg-green-500 px-4 py-3 text-sm">
        <p>Income</p>
        <p>
          + BDT <span id="total-income">{totalIncome}</span>
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between bg-red-500 px-4 py-3 text-sm">
        <span>Expenses</span>
        <span>- BDT {totalExpense}</span>
      </div>
    </div>
  );
}
