// ExpenseList.jsx

import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

export default function ExpenseList() {
  const { entries, deleteEntry, setEntries, totalIncome, totalExpense } = useEntries();
  const expenseEntries = entries.filter((entry) => entry.type === "expense");

  const handleEdit = (expense) => {
    const newValue = prompt("Enter a new value for this entry:", formatMoney(expense.value));
    
    if (newValue !== null && !isNaN(parseFloat(newValue))) {
      const updatedEntries = entries.map((entry) =>
        entry.id === expense.id ? { ...entry, value: parseFloat(newValue) } : entry
      );
      setEntries(updatedEntries);
    }
  };

  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-red-600">Expense</h2>
      {expenseEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expense entries.</p>
      )}

      <ul id="expense-list" className="divide-y">
        {expenseEntries.map((expense) => (
          <li key={expense.id} className="py-2.5">
            <div className="group flex justify-between gap-2 text-sm">
              <span>{expense.title}</span>
              <div>
                <span className="text-red-600">-{formatMoney(expense.value)}</span>
                <span
                  className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
                  onClick={() => deleteEntry(expense.id)}
                >
                  Delete
                </span>
                <span
                  className="ml-2 hidden cursor-pointer font-medium text-blue-500 group-hover:inline-block"
                  onClick={() => handleEdit(expense)}
                >
                  Edit
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
