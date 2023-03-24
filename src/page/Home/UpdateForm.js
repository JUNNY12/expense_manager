import { useEffect, useState } from "react";

const UpdateForm = () => {

  const [data, setData] = useState({
    id: "",
    date: "",
    merchant: "",
    total: "",
    status: "",
    comment: "",
    receipt:""
  });



  return (
    <div className="formWrapper table-responsive">
      {
        <div className="closeBtn">
          X
        </div>
      }
      <form>
         <div className="formContainer">
         <div>
            <div className="inputWrapper">
            <label>Date</label> <br />
            <input
              className="input"
              name="date"
              type={`date`}
            />
            </div>

            <div className="inputWrapper">
              <label>Merchant</label> <br />
              <input
                name="merchant"
                type={`text`}
                className="input"
                placeholder="merchant"
              />
            </div>

            <div className="inputWrapper">
              <label>Total</label> <br />
              <input
                name="total"
                className="input"
                type={`number`}
                placeholder="total"
                
              />
            </div>

            <div className="inputWrapper">
              <label>Status</label> <br />
              <select 
              name="status"
              className="input"
              type={`text`}
              placeholder="status"
              
              >
                  <option >New </option>
                  <option>Inprogress</option>
                  <option>Completed</option>
              </select>
            </div>

            <div className="inputWrapper">
              <label>Comment</label> <br />
              <textarea
                name="comment"
                className="input"
                type={`text`}
              />
            </div>
         </div>
         <div>
          <div className="inputWrapper">
            <label>Upload Receipt</label> <br />
            <input
              name="merchant"
              type={`file`}
              value=""
              className="input"
            />
          </div>

          <div className="receiptContainer">
            <img />
          </div>
        </div>

         </div>

         <button className="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
