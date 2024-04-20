/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import axios from "axios";
import { useViewProposalQuery } from "../../../../services/api";
import Loader from "../../Loader";
import { useSelector } from "react-redux";



// eslint-disable-next-line no-unused-vars
export default function ProposalModal({ show, hide, proposalId }) {

  const userData = useSelector((state) => state?.user?.value);


  const handleDownlaodProposal = async () => {
    const response = await axios.get(
      `https://skycontroller.connetz.shop/tl-api/proposals/download?id=${proposalId}`,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
          Authorization: "Bearer " + localStorage.getItem("clt_token"),
        },
      }
    );
    if (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url, new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "proposal.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
    }
  };

  const { data, isLoading, error } = useViewProposalQuery(proposalId);
  if (error) {
    console.log(error);
  }

  function convertToISODate(dateString) {
    const dateRegex = /^\d{2}-[a-zA-Z]{3}-\d{4}$/;

    if (!dateRegex.test(dateString)) {
      console.log(
        "Invalid date format. Please provide date in DD-MON-YYYY format."
      );
      return null; // or throw an error, depending on your use case
    }

    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const [day, month, year] = dateString.split("-");
    const monthInISOFormat = months[month];
    const isoDate = `${year}-${monthInISOFormat}-${day}`;

    return isoDate;
  }


  return (
    <>
      {isLoading && <Loader />}
      <Modal
        className=""
        show={show}
        onHide={hide}
        centered
        scrollable={true}
        size="lg"
      >
        <div className="modal-content">
          <Modal.Header c>
            <h5 className="modal-title" id="viewInvoiceLabel">
              {data?.data?.proposal?.prefix}-
              {data?.data?.id?.toString().padStart(5, "0") +
                "/" +
                (new Date(data?.data?.proposal?.date).getMonth() + 1)
                  ?.toString()
                  ?.padStart(2, "0") +
                "/" +
                new Date(data?.data?.proposal?.date).getFullYear()}
            </h5>

            <button
              type="button"
              className="btn-close text-black text-2xl"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              X
            </button>
          </Modal.Header>
          <SimpleBar className="max-h-[700px]">
            <Modal.Body className="">
              <div className="row justify-content-center">
                <div className="col-xxl-12">
                  <div className="card shadow-none mb-0" id="demo">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card-header border-bottom-dashed p-4">
                          <div className="row flex items-center ">
                            <div className="col-lg-6 ">
                              <img
                                src={userData?.skyvoice_settings?.logo_white}
                                className="card-logo mx-0 card-logo-dark user-profile-image img-fluid m-auto"
                                alt="logo dark"
                              />
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-6">
                              <div className="text-end">
                                <p className="mb-0 test-dark fw-bold fs-16">
                                  {userData?.skyvoice_settings?.brand_name}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {userData?.skyvoice_settings?.address}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {userData?.skyvoice_settings?.city},&nbsp;
                                  {userData?.skyvoice_settings?.state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {userData?.skyvoice_settings?.country} -{" "}
                                  {userData?.skyvoice_settings?.zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST - {userData?.skyvoice_settings?.gst_number}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  Phone:{" "}
                                  {userData?.skyvoice_settings?.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!--end card-header--> */}
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-12">
                        <div className="card-body p-4">
                          <div className="row g-3">
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Proposal No
                              </p>
                              <h5 className="fs-14 mb-0">
                                #{data?.data?.proposal?.prefix}-
                                <span id="invoice-no">
                                  {data?.data?.id?.toString().padStart(5, "0") +
                                    "/" +
                                    (
                                      new Date(
                                        data?.data?.proposal?.date
                                      ).getMonth() + 1
                                    )
                                      ?.toString()
                                      ?.padStart(2, "0") +
                                    "/" +
                                    new Date(
                                      data?.data?.proposal?.date
                                    ).getFullYear()}
                                </span>
                              </h5>
                            </div>

                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Date
                              </p>
                              <h5 className="fs-14 mb-0">
                                <span id="invoice-date">
                                  {data?.data?.proposal?.date}
                                </span>{" "}
                              </h5>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Status
                              </p>
                              <span
                                className={`badge badge-soft-${
                                  data?.data?.proposal?.status == 0
                                  ? "primary"
                                  : data?.data?.proposal?.status == 1
                                  ? "info"
                                  : data?.data?.proposal?.status == 2
                                  ? "secondary"
                                  : data?.data?.proposal?.status == 3
                                  ? "success"
                                  : data?.data?.proposal?.status == 4
                                  ? "warning"
                                  : "danger"
                                } fs-11`}
                                id="payment-status"
                              >
                                {data?.data?.proposal?.status == 0
                                  ? "Pending"
                                  : data?.data?.proposal?.status == 1
                                  ? "Sent"
                                  : data?.data?.proposal?.status == 2
                                  ? "Opened"
                                  : data?.data?.proposal?.status == 3
                                  ? "Accepted"
                                  : data?.data?.proposal?.status == 4
                                  ? "Rejected"
                                  : "Expired"}
                              </span>

                              <span
                                className={`badge badge-soft--${
                                  data?.data?.proposal?.status == 0
                                    ? "primary"
                                    : data?.data?.proposal?.status == 1
                                    ? "info"
                                    : data?.data?.proposal?.status == 2
                                    ? "secondary"
                                    : data?.data?.proposal?.status == 3
                                    ? "success"
                                    : data?.data?.proposal?.status == 4
                                    ? "warning"
                                    : "danger"
                                } fs-11`}
                                id="payment-status"
                              >
                             
                                {data?.data?.proposal?.status == 0
                                            ? "Pending"
                                            : data?.data?.proposal?.status == 1
                                            ? "Sent"
                                            : data?.data?.proposal?.status == 2
                                            ? "Opened"
                                            : data?.data?.proposal?.status == 3
                                            ? "Accepted"
                                            : data?.data?.proposal?.status == 4
                                            ? "Rejected"
                                            : "Expired"}
                              </span>
                            </div>
                             <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Total Amount
                              </p>
                              <h5 className="fs-14 mb-0">
                                {"₹"}
                                <span id="total-amount">
                                  {data?.data?.proposal?.total}
                                </span>
                              </h5>
                            </div>
                           </div>

                          {data?.data?.proposal?.status == 2 && (
                            <>
                              <hr className="border-dashed my-3" />

                              <div className="row g-3">
                                <div className="col-lg-3 col-6">
                                  <p className="text-muted mb-2 text-uppercase fw-semibold">
                                    Acceptance Date
                                  </p>
                                  <span id="invoice-no">
                                    {new Date(
                                      data?.data?.proposal?.acceptance_date
                                    ).toLocaleString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>

                                 <div className="col-lg-3 col-6">
                                  <p className="text-muted mb-2 text-uppercase fw-semibold">
                                    Acceptance Name
                                  </p>
                                  <h5 className="fs-14 mb-0">
                                    <span
                                      id="invoice-date"
                                      className=" capitalize"
                                    >
                                      {`${data?.data?.proposal?.acceptance_firstname} `}{" "}
                                      {
                                        data?.data?.proposal
                                          ?.acceptance_lastname
                                      }
                                    </span>{" "}
                                  </h5>
                                </div>
                                 <div className="col-lg-3 col-6">
                                  <p className="text-muted mb-2 text-uppercase fw-semibold">
                                    Acceptance IP
                                  </p>
                                  <span id="payment-status">
                                    {data?.data?.proposal?.acceptance_ip}
                                  </span>
                                </div>
                                 <div className="col-lg-3 col-6">
                                  <p className="text-muted mb-2 text-uppercase fw-semibold">
                                    Signature
                                  </p>
                                  <img
                                    alt="signature"
                                    src={
                                      data?.data?.proposal?.acceptance_signature
                                    }
                                    width={100}
                                    height={"auto"}
                                  />
                                </div>
                               </div>
                            </>
                          )}
                         </div>
                       </div>
                       <div className="col-lg-12">
                        <div className="card-body p-4 border-top border-top-dashed">
                          <div className="row g-3">
                            <div className="col-lg-6">
                              <div>
                                <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                  Billing Address
                                </h6>
                                <p className="mb-0 test-dark fs-16  text-muted font-semibold capitalize">
                                  {data?.data?.proposal?.customer?.first_name}{" "}
                                  {data?.data?.proposal?.customer?.last_name}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.billing_street}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.billing_city},&nbsp;
                                  {data?.data?.proposal?.billing_state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.billing_country} -{" "}
                                  {data?.data?.proposal?.billing_zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                GST/PAN -&nbsp;
                                  {data?.data?.proposal?.tax_number
                                    ? data?.data?.proposal?.tax_number
                                    : "N/A"}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                Phone:{" "}   {data?.data?.proposal?.customer?.phone
                                    ? data?.data?.proposal?.customer?.phone
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-6">
                              <div className="text-end">
                                <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                  Shipping Address
                                </h6>
                                <p className="mb-0 test-dark fs-16  text-muted font-semibold capitalize">
                                  {data?.data?.proposal?.customer?.first_name}{" "}
                                  {data?.data?.proposal?.customer?.last_name}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.shipping_street}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.shipping_city},&nbsp;
                                  {data?.data?.proposal?.shipping_state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.shipping_country} -{" "}
                                  {data?.data?.proposal?.shipping_zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST/PAN -&nbsp;
                                  {data?.data?.proposal?.tax_number
                                    ? data?.data?.proposal?.tax_number
                                    : "N/A"}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                Phone:{" "}  {data?.data?.proposal?.customer?.phone
                                    ? data?.data?.proposal?.customer?.phone
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                            {/* <!--end col--> */}
                          </div>
                          {/* <!--end row--> */}
                        </div>
                        {/* <!--end card-body--> */}
                      </div>
                       <div className="col-lg-12">
                        <div className="card-body p-0">
                          <div className="table-responsive">
                            <table className="table table-borderless text-center table-nowrap align-top mb-0">
                              <thead>
                                <tr className="table-active">
                                  <th scope="col" className="w-[50px]">
                                    #
                                  </th>
                                  <th scope="col">Product Details</th>
                                  <th scope="col">Duration</th>
                                  <th scope="col">Rate</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col" className="text-end">
                                    Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody id="products-list">
                                {data?.data?.proposal?.proposal_items?.map(
                                  (item, ind) => (
                                    <tr key={ind}>
                                      <th scope="row">{ind + 1}</th>
                                      <td className="text-start">
                                        <span className="fw-medium font-bold">
                                          {item?.description}
                                        </span>
                                        <p className="form-control bg-light border-0 line-clamp-5 motion-reduce:!transition-all hover:line-clamp-none py-1">
                                          {item?.long_description}
                                          <div className="my-2">
  <p className="font-bold">Number Details</p>
  <ul className="flex  justify-around items-center  flex-grow-1">
    <li>
      Number: <br/><span className="text-muted font-bold">{item?.number}</span>
    </li>
    <li>
      Vanity: <br/><span className="text-muted font-bold">{item?.vanity_type}</span>
    </li>
    <li>
      Price: <br/><span className="text-muted font-bold">₹{item?.number_price}</span>
    </li>
  </ul>
</div>
                                        </p>
                                      </td>
                                      <td>
                                        {item?.months} months
                                      </td>
                                      <td>₹{(parseFloat(item?.planprice)* parseFloat(item?.months)).toFixed(2) }</td>
<td>{parseFloat(item?.qty)}</td>
<td className="text-end">
  ₹{(
    (parseFloat(item?.planprice) * parseFloat(item?.months) + parseFloat(item?.number_price)) *
    parseInt(item?.qty)
  ).toFixed(2)}
</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                  
                          </div>
                          <div className="border-top border-top-dashed mt-2">
                            <table className="table table-borderless table-nowrap align-middle mb-0 ms-auto w-[280px]">
                              <tbody>
                                <tr className="border-top border-top-dashed mt-2">
                                  <td colSpan="1"></td>
                                  <td colSpan="3" className="p-0">
                                    <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                      <tbody>
                                        <tr className="!mr-2">
                                          <th scope="row">Sub Total</th>
                                          <td className="w-[150px]">
                                            <input
                                              type="text"
                                              className="form-control inv-form-control text-right bg-light border-0 "
                                              id="cart-subtotal"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${data?.data?.proposal?.subtotal}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">
                                            Estimated Tax (18%)
                                          </th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control inv-form-control text-right bg-light border-0"
                                              id="cart-tax"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${data?.data?.proposal?.total_tax}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">Discount({data?.data?.proposal?.discount_percent} %) </th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control inv-form-control text-right bg-light border-0"
                                              id="cart-discount"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`- ₹${data?.data?.proposal?.discount_total} `}
                                            />
                                             {/* //discount_total */}
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">Shipping Charge</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control inv-form-control text-right bg-light border-0"
                                              id="cart-shipping"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${
                                                data?.data?.proposal
                                                  ?.shipping_charge
                                                  ? data?.data?.proposal
                                                      ?.shipping_charge
                                                  : 0
                                              }`}
                                            />
                                          </td>
                                        </tr>
                                        <tr className="border-top border-top-dashed">
                                          <th scope="row">Total Amount</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control inv-form-control text-right bg-light border-0"
                                              id="cart-total"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${data?.data?.proposal?.total}`}
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    {/* <!--end table--> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            {/* <!--end table--> */}
                          </div>
                          <div className="mt-4">
                            <div className="alert alert-info mb-0">
                              <p className="mb-0">
                                <span className="fw-semibold">
                                  NOTES:&nbsp;
                                </span>
                                <span id="note" className=" whitespace-break-spaces ">
                                  {data?.data?.proposal?.terms}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </SimpleBar>
          <Modal.Footer className="modal-footer">
            <div className="flex justify-end items-center w-full">
              <div className="hstack gap-2 justify-content-end d-print-none">
                <a
                  className="btn btn-secondary"
                  href={data?.data?.proposal?.pdf_link}
                  target="blank"
                >
                  <i className="ri-printer-line align-bottom me-1"></i> Print
                </a>
                <button
                  className="btn btn-primary bg-primary "
                  onClick={() => handleDownlaodProposal()}
                >
                  <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                  Download
                </button>
              </div>
            </div>
          </Modal.Footer>
        </div>
        {/* <!-- /.modal-content --> */}
      </Modal>
    </>
  );
}
