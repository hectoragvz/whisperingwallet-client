/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export function ExpenseCard({ expense }) {
  const formattedDate = new Date(expense.created_at).toLocaleDateString(
    "en-US"
  );

  //const formattedMonth = new Date(expense.created_at).getMonth() + 1;

  const navigate = useNavigate();

  return (
    <div
      className="rounded-lg p-2 bg-white hover:cursor-pointer"
      onClick={() => {
        navigate(`/expense/${expense.id}`);
      }}
    >
      <h1 className="font-bold text-4xl bg-white ml-1">{expense.total}</h1>
      <p className="text-slate-500 bg-white ml-2">{formattedDate}</p>
    </div>
  );
}
