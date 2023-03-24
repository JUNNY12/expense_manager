import { useState } from "react";

const Form = ({ closeForm, addData }) => {
  const [data, setData] = useState({
    date: "",
    merchant: "",
    total: "",
    status: "",
    comment: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addData(data);
    closeForm();
  };

  return (
    <div className="formWrapper">

      <div className="closeBtn" onClick={() => closeForm()}>
        X
      </div>

      <form onSubmit={handleSubmit}>
        <div className="formContainer"> 
         <div>
          <div className="inputWrapper">
            <label>Date</label> <br />
            <input
              className="input"
              name="date"
              type={`date`}
              value={data.date}
              onChange={handleChange}
            />
          </div>

            <div className="inputWrapper">
              <label>Merchant</label> <br />
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
              <label>Total</label> <br />
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
              <label>Status</label> <br />
              <select 
              name="status"
              className="input"
              type={`text`}
              value={data.status}
              placeholder="status"
              onChange={handleChange}
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
                value={data.comment}
                onChange={handleChange}
              />
            </div>
         </div>
        
          <div className="inputWrapper">
            <label>Upload Receipt</label> <br />
            <input
              className="input"
              type={`file`}
            />
          </div>
        </div>
        <button className="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
