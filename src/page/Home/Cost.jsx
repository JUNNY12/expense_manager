import { useGetExpensesQuery } from "../../services/expenses";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
const Cost = () => {
  const [user] = useAuthState(auth)

  let uid = user?.uid
  const { data, error, isLoading } = useGetExpensesQuery(uid)

  return (
    <>
      {
        data &&
        <section className="mb-3 summary">
          <div>
            <h2 className="fs-4">Total Expenses</h2>

            <div className="tot">
              <div className=" fs-6 status_">Completed:</div>
              <div className="fs-6 fw-bold">₦ 20,000</div>
            </div>

            <div className="tot">
              <div className=" fs-6 status_">New:</div>
              <div className="fs-6 fw-bold">₦ 20,000</div>
            </div>

            <div className="tot">
              <div className=" fs-6 status_">In Progress:</div>
              <div className="fs-6 fw-bold">₦ 20,000</div>
            </div>

            <div className="bottom-dash"></div>

            <div className="tot">
              <div className=" fs-6 status_">Total:</div>
              <div className="fs-6 fw-bold">₦ 60,000</div>
            </div>

          </div>
        </section>
      }
    </>
  );
};

export default Cost;
