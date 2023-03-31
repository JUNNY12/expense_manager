import React from "react";
import { useGetExpensesQuery } from "../../services/expenses";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { formatPrice } from "../../helpers/formatCurrency";
import PieChart from "../../component/PieChart";

const Cost = () => {
  const [user] = useAuthState(auth)
  let uid = user?.uid
  const { data } = useGetExpensesQuery(uid)

  const { expenses } = useSelector((state) => state.expense);

  //function to calculate total expenses for completed, new and inprogress
  const completedTotal = React.useMemo(() => {
    return expenses?.filter((expense) => expense?.status === "Completed").reduce((acc, expense) => Number(acc) + Number(expense.total), 0)
  }, [expenses]);

  const newTotal = React.useMemo(() => {
    return expenses?.filter((expense) => expense?.status === "New").reduce((acc, expense) => Number(acc) + Number(expense.total), 0)
  }, [expenses]);

  const inProgressTotal = React.useMemo(() => {
    return expenses?.filter((expense) => expense?.status === "Inprogress").reduce((acc, expense) => Number(acc) + Number(expense.total), 0)
  }, [expenses]);

  const totalSummary = React.useMemo(() => {
    return expenses?.reduce((acc, expense) => Number(acc) + Number(expense.total), 0)
  }, [expenses]);

  return (
    <>
      {
        data &&
        <section className="mb-3 summary">
          <div className="cost">
            <h2 className="fs-4">Total Expenses</h2>

            <div className="tot">
              <div className=" fs-6 status_">Completed:</div>
              <div className="fs-6 fw-bold">{formatPrice(completedTotal)}</div>
            </div>

            <div className="tot">
              <div className=" fs-6 status_">New:</div>
              <div className="fs-6 fw-bold">{formatPrice(newTotal)}</div>
            </div>

            <div className="tot">
              <div className=" fs-6 status_">In Progress:</div>
              <div className="fs-6 fw-bold">{formatPrice(inProgressTotal)}</div>
            </div>

            <div className="bottom-dash"></div>

            <div className="tot">
              <div className=" fs-6 status_">Total:</div>
              <div className="fs-6 fw-bold">{formatPrice(totalSummary)}</div>
            </div>

          </div>

          <div>
            <PieChart
            completedTotal={completedTotal}
            newTotal={newTotal}
            inProgressTotal={inProgressTotal}
            totalSummary={totalSummary}
            />
          </div>
        </section>
      }
    </>
  );
};

export default Cost;
