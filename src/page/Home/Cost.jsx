
const Cost = () => {


  return (
    <section className="mt-3 mb-3 summary">
      <div>
        <h2 className="text-center fs-3">Summary</h2>

        <div className="tot">
          <div className=" fs-6">Completed:</div>
          <div className="fs-6 fw-bold">₦ 20,000</div>
        </div>

        <div className="tot">
          <div className=" fs-6">New:</div>
          <div className="fs-6 fw-bold">₦ 20,000</div>
        </div>

        <div className="tot">
          <div className=" fs-6">In Progress:</div>
          <div className="fs-6 fw-bold">₦ 20,000</div>
        </div>

        <div className="tot">
          <div className=" fs-6">Total:</div>
          <div className="fs-6 fw-bold">₦ 60,000</div>
        </div>

      </div>
    </section>
  );
};

export default Cost;
