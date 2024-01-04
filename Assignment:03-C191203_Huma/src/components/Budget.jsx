//./node_modules/.bin/vite

import { useEntries } from "../hooks/useEntries";
import { useState, useEffect } from "react";
import axios from 'axios';
export default function Budget() {
  const { budget, setBudget } = useState('');

  useEffect(() => {
    const fetchbudgetData = async () => {
      try{
        const budgetResponse = await axios.get('http://localhost:3000/budget');

        setBudget(budgetResponse.data);
      } catch(error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchbudgetData();
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
