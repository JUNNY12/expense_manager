import { useState, useRef } from "react";
import { useAddExpenseMutation, useUpdateExpenseMutation } from "../../services/expenses";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { isEmptyObject } from "../../helpers/checkObject";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ProgressBar } from "react-bootstrap";

const Form = ({ setShow, show, update, setUpdate }) => {
  const [add, { isLoading }] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation()
  const [user] = useAuthState(auth)
  let uid = user?.uid

  const { id, date, merchant, total, status, comment, receipt } = update

  // console.log(update)

  const [data, setData] = useState({
    id: "" || id,
    date: "" || date,
    merchant: "" || merchant,
    total: "" || total,
    status: "" || status,
    comment: "" || comment,
    receipt: undefined || receipt
  });


  // state for file upload
  const [receiptImage, setReceiptImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [updateUrl, setUpdateUrl] = useState(undefined)

  const fileInput = useRef(null)
  // function to select file
  const selectFile = async (event) => {
    event.preventDefault();

    const file = fileInput.current.files[0];
    // console.log(file)
    if (!file) return

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on("state_changed", (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progress);

      // console.log("Upload is " + progress + "% done");
    },
      // function to handle error
      (error) => {
        alert(error.message)
      },
      // function to get download url
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          //getting the download url and setting it to the state
          setReceiptImage(downloadURL)
          //setting the download url to the  update state
          setUpdateUrl(downloadURL)

          //setting the download url to the data state to be posted
          setData((prevData) => {
            return {
              ...prevData,
              receipt: downloadURL,
            };
          });
        });
      });

  };

  // function to close the form
  const handleClose = () => {
    setShow(false)

    //check if update is empty
    if (!isEmptyObject(update)) {
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
      // console.log('success')
    } catch (error) {
      // console.log(error)
    }
    setShow(false)
  }

  // function to handle update expense
  const handleUpdateExpense = async (e) => {
    e.preventDefault()

    try {

      const body = {
        date: data.date,
        merchant: data.merchant,
        total: data.total,
        status: data.status,
        comment: data.comment,
      }
      if (receiptImage !== undefined) {
        body.receipt = receiptImage
      }
      await updateExpense({
        id,
        uid,
        body
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
      // console.log('success')
    } catch (error) {
      // console.log(error)
    }
    setShow(false)
    if (!isEmptyObject(update)) {
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
                required
                aria-required="true"
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
                required
                aria-required="true"
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
                required
                aria-required="true"
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
                required
                aria-required="true"
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
                required
                aria-required="true"
              />
            </div>
          </div>

          <div className="inputWrapper">
            <label className="mb-1">Upload Receipt</label> <br />
            <input
              className="input file"
              type={`file`}
              name="file"
              ref={fileInput}
              multiple
              accept="image/*"
              onChange={selectFile}
            />


            {
              // show receipt if it exists
              (updateUrl || receipt || receiptImage) &&
              (
                <div className="receiptContainer">
                  <img src={updateUrl || receipt || receiptImage} alt="" />
                </div>
              )
            }

            <div className="progressPosition">
              {progress > 0 && (<ProgressBar striped animated now={progress} variant="success" label={`${progress}%`} />)}
            </div>
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
