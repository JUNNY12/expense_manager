import { useState } from "react";

const Form = ({ setShow, show , update}) => {
  const [data, setData] = useState({
    date: "",
    merchant: "",
    total: "",
    status: "",
    comment: "",
  });

  const handleSetShow = () => {
    setShow(false)
  }

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

  };

  return (
    <div className={`formWrapper ${show ? 'slidein' : ""}`}>

      <div
        className="closeBtn"
        title="close"
        onClick={handleSetShow}
      >
        X
      </div>

      <form onSubmit={handleSubmit}>
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
          update? (
            <button className="submit">Save Changes</button>
          )
          :
          (
            <button className="submit">Submit</button>
          )
        }
      </form>
    </div>
  );
};

export default Form;
