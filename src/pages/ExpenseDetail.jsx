import { useParams } from "react-router-dom";
import api from "../api";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";

function ExpenseDetail() {
  const { id } = useParams();
  const [singleTask, setSingleTask] = useState({});

  useEffect(() => {
    async function loadTask() {
      const res = await api.get(`/api/expenses/${id}`);
      setSingleTask(res.data);
    }
    loadTask();
  }, []);

  const navigate = useNavigate();

  const deleteExpense = async () => {
    const accepted = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (accepted) {
      await api.delete(`/api/expenses/${id}`);
      navigate("/expenses");
    }
  };

  const formattedDate = new Date(singleTask.created_at).toLocaleDateString(
    "en-US"
  );

  const dateAndTime = new Date(singleTask.created_at).toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit" }
  );

  const singleTaskLength = Object.keys(singleTask).length;

  return (
    <>
      <Navigation />
      <div className="h-screen items-center justify-center pt-20 text-center">
        {singleTaskLength === 0 ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1 className="text-8xl font-bold">{`$${
              singleTask && singleTask.total
            }`}</h1>
            <div className="flex flex-col pt-3">
              <p>
                Product:{" "}
                <span className="capitalize text-lg">
                  {singleTask && singleTask.product}
                </span>
              </p>
              <p>
                Category:{" "}
                <span className="capitalize text-lg">
                  {singleTask && singleTask.category}
                </span>
              </p>
              <p className="text-lg pt-2">
                {formattedDate}, {dateAndTime}
              </p>
            </div>
            <Button
              colorScheme="red"
              variant="outline"
              className="mt-10"
              size="sm"
              onClick={deleteExpense}
              rightIcon={<IoTrashOutline />}
            >
              Delete Expense
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default ExpenseDetail;
