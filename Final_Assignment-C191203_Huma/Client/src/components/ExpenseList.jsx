import { useState } from "react";
import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

export default function ExpenseList() {
  const { entries, setEntries, totalIncome, totalExpense } = useEntries();
  const expenseEntries = entries.filter((entry) => entry.type === "expense");

  const [editingEntry, setEditingEntry] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/entries/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedEntries = entries.filter((entry) => entry.id !== id);
        setEntries(updatedEntries);
        window.location.reload();
      } else {
        console.error("Failed to delete entry. Server responded with:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while deleting the entry:", error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/entries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: parseFloat(editedValue) }),
      });

      if (response.ok) {
        const updatedEntries = entries.map((entry) =>
          entry.id === id ? { ...entry, value: parseFloat(editedValue) } : entry
        );
        setEntries(updatedEntries);
        setEditingEntry(null);
        setEditedValue("");
        window.location.reload();
      } else {
        console.error("Failed to edit entry. Server responded with:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while editing the entry:", error.message);
    }
  };

  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-red-600">
        Expense<span className="ml-9 text-sm text-red">Category</span>
      </h2>

      {expenseEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="expense-list" className="divide-y">
        {expenseEntries.map((item) => {
          return (
            <li key={item.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <div>
                  <span>{item.title}</span>
                  <span className="ml-20 text-black">{item.category}</span>
                </div>
                <div>
                  <span className="text-red-600">
                    -{formatMoney(item.value)}
                  </span>
                  <span
                    className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </span>
                  <span
                    className="ml-2 hidden cursor-pointer font-medium text-blue-500 group-hover:inline-block"
                    onClick={() => setEditingEntry(item.id)}
                  >
                    Edit
                  </span>
                </div>
              </div>
              {editingEntry === item.id && (
                <div className="mt-2">
                  <input
                    type="number"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    placeholder="New Value"
                    className="rounded-md border py-1.5 px-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Save
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
