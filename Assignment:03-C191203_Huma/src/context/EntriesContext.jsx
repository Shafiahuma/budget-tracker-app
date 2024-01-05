// context/EntriesContext.jsx

import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const EntriesContext = createContext();

export function EntriesProvider({ children }) {
  const [entries, setEntries] = useState(() => {
    const value = localStorage.getItem("entries");
    if (!value) return [];
    return JSON.parse(value);
  });

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchTotalIncomeAndExpense = async () => {
      try {
        const incomeResponse = await axios.get('http://localhost:3000/income');
        const expenseResponse = await axios.get('http://localhost:3000/expense');

        setTotalIncome(incomeResponse.data);
        setTotalExpense(expenseResponse.data);
      } catch (error) {
        console.error('Error fetching income and expense data:', error);
      }
    };

    fetchTotalIncomeAndExpense();
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  };

  return (
    <EntriesContext.Provider
      value={{ entries, setEntries, totalIncome, totalExpense, deleteEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
}
