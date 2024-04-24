import { useState, useEffect } from "react";
import api from "../api";
import { ExpenseCard } from "../components/ExpenseCard";
import Navigation from "../components/Navigation";
import TotalCard from "../components/TotalCard";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import Chart from "../components/Chart";

function TasksHome() {
  const thisMonth = new Date().getMonth() + 1;

  const [expenses, setExpenses] = useState([]);
  const [filteredMonth, setFilteredMonth] = useState(thisMonth);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      selectedmonth: "Select month",
    },
  });

  // check if can filter without clicking a filter button
  const onSubmit = handleSubmit((data) => {
    // should be a number from 1-12
    setFilteredMonth(months[data.selectedmonth]);
  });

  useEffect(() => {
    getExpenses();
  }, []);

  const months = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const months2 = [
    "Select month",
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getExpenses = () => {
    api
      .get("/api/expenses/")
      .then((res) => res.data)
      .then((data) => {
        setExpenses(data);
      })
      .catch((err) => alert(err));
  };

  let selectedExpenses = [];

  if (filteredMonth === 0) {
    selectedExpenses = expenses;
  } else {
    selectedExpenses = expenses.filter(
      (expense) => new Date(expense.created_at).getMonth() + 1 === filteredMonth
    );
  }

  const totalExpense = selectedExpenses.reduce(
    (acc, expense) => acc + parseFloat(expense.total),
    0
  );

  // to format an array for graph
  const categoryTotals = {};

  // Calculate totals for each category
  selectedExpenses.forEach((expense) => {
    const category = expense.category;
    const total = parseFloat(expense.total);

    if (category in categoryTotals) {
      categoryTotals[category] += total;
    } else {
      categoryTotals[category] = total;
    }
  });

  // Convert category totals to the desired format
  const result = Object.entries(categoryTotals).map(([category, total]) => ({
    x: category,
    y: total,
  }));

  return (
    <>
      <Navigation />
      <div className="m-2 pt-10 max-w-5xl mx-auto px-3 pb-10">
        <div className="flex flex-col sm:flex-row justify-center gap-3 ">
          <TotalCard total={totalExpense} description={"Total Expenses"} />
          {selectedExpenses.length !== 0 && (
            <div className="bg-white p-0 rounded-lg grow pl-5 flex items-center justify-center order-2">
              <Chart data={result} />
            </div>
          )}
        </div>

        <h2 className="pt-5 font-semibold text-2xl">
          Latest Expenses{" "}
          <span className="text-neutral-400 italic text-lg">
            - {months2[filteredMonth]}
          </span>
        </h2>

        <div className="flex pt-2 pb-5 items-center align-center">
          <form
            onSubmit={onSubmit}
            className=" flex pt-2 font-semibold items-center justify-center align-middle"
          >
            <select
              className="p-1 rounded-md border border-neutral-500 pr-3"
              name="selectedmonth"
              id="selectedmonth"
              {...register("selectedmonth")}
            >
              {months2.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <Button
              size="sm"
              colorScheme="messenger"
              type="submit"
              className="ml-4"
              onClick={onSubmit}
            >
              Filter
            </Button>
          </form>
        </div>

        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {selectedExpenses.length === 0 && (
            <p className="text-slate-600">
              Start tracking your monthly expenses to visualize them here
            </p>
          )}

          {selectedExpenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TasksHome;
