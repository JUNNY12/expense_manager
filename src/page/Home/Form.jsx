import { useState, useCallback } from "react";
import { useAddExpenseMutation , useUpdateExpenseMutation} from "../../services/expenses";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { isEmptyObject } from "../../constants/checkObject";




const Form = ({ setShow, show, update, setUpdate }) => {
  const [add, { isLoading, isSuccess }] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation()
  const [user] = useAuthState(auth)
  let uid = user?.uid

  const { id, date, merchant, total, status, comment } = update


  const [data, setData] = useState({
    id: "" || id,
    date: "" || date,
    merchant: "" || merchant,
    total: "" || total,
    status: "" || status,
    comment: "" || comment,
  });

  // function to close the form
  const handleClose = () => {
    setShow(false)
   
    //check if update is empty
    if(!isEmptyObject(update)){
      setUpdate({})
    }
  }

  // function to handle change in input
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // function to handle add expense
  const handleAddExpense = async (e) => {
    e.preventDefault()
    try {
      await add({
        uid,
        body: data,
      })
      toast.success('Expense added successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      console.log('success')
    } catch (error) {
      console.log(error)
    }
    setShow(false)
  }

  // function to handle update expense
  const handleUpdateExpense = async (e) => {  
    e.preventDefault()
    try {
      await updateExpense({
        id,
        uid,
        body: {
          date:data.date,
          merchant:data.merchant,
          total:data.total,
          status:data.status,
          comment:data.comment
        }
      })
      toast.success('Expense updated successfully', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      console.log('success')
    } catch (error) {
      console.log(error)
    }
    setShow(false)
    if(!isEmptyObject(update)){
      setUpdate({})
    }
  }

  return (
    <div className={`formWrapper ${show ? 'slidein' : ""}`}>

      <div
        className="closeBtn"
        title="close"
        onClick={handleClose}
      >
        X
      </div>

      <form onSubmit={handleAddExpense}>
        <div className="formContainer">
          <div>
            <div className="inputWrapper">
              <label className="mb-1">Date</label> <br />
              <input
                className="input"
                name="date"
                type={`date`}
                value={data.date}
                onChange={handleChange}
              />
            </div>

            <div className="inputWrapper">
              <label className="mb-1">Merchant</label> <br />
              <input
                name="merchant"
                type={`text`}
                className="input"
                value={data.merchant}
                onChange={handleChange}
                placeholder="merchant"
              />
            </div>

            <div className="inputWrapper">
              <label className="mb-1">Total</label> <br />
              <input
                name="total"
                className="input"
                type={`number`}
                value={data.total}
                placeholder="total"
                onChange={handleChange}
              />
            </div>

            <div className="inputWrapper">
              <label className="mb-1">Status</label> <br />
              <select
                name="status"
                className="input"
                type={`text`}
                value={data.status}
                placeholder="status"
                onChange={handleChange}
              >
                <option>choose</option>
                <option >New </option>
                <option>Inprogress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="inputWrapper">
              <label className="mb-1">Comment</label> <br />
              <textarea
                name="comment"
                className="input textarea"
                type={`text`}
                value={data.comment}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="inputWrapper">
            <label className="mb-1">Upload Receipt</label> <br />
            <input
              className="input file"
              type={`file`}
            />
          </div>
        </div>

        {
          isEmptyObject(update) ?
            <button className="submit">{
              isLoading ? <BeatLoader color="#c77253" size={20} /> : 'Submit'
            }</button>
            :
            <button
            type="submit"
            onClick={handleUpdateExpense}
             className="submit">Save Changes</button>
        }


      </form>
    </div>
  );
};

export default Form;
