/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import SimpleBar from "simplebar-react"
import {  useViewInvoiceQuery } from "../../../../services/api";
import {  useEffect, useState } from "react";
import axios from "axios"
import Loader from "../../Loader";
import {useSelector} from "react-redux"

export default function InvoiceModal({ show, hide, invId }) {
  const user=useSelector(state=>state?.user?.value)
 
  const [files, setFiles] = useState([]);
  const [encodedFile, setEncodedFile] = useState("")
  const [apiErr, setApiErr] = useState("");
  const [fileErr, setFileErr] = useState("")
  const [successMsg, setSuccessMsg] = useState("");
  const userData = useSelector(state => state?.user?.value)

  // const [invDownload] = useDownloadInvoiceMutation()

  const handleDownlaodInvoice = async () => {
    const response = await axios.get(
      `https://skycontroller.connetz.shop/tl-api/invoices/download?id=${invId}`,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
          Authorization: "Bearer " + localStorage.getItem("clt_token"),
        },
      }
    );
    if(response){
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url, new Blob([response.data]));
       const link = document.createElement("a");
       link.href = url;
       link.setAttribute("download", "inv.pdf"); //or any other extension
       document.body.appendChild(link);
       link.click();
      }
  }

  const { data, isLoading, error } = useViewInvoiceQuery(invId);
  console.log(data)
  if (error) {
    console.log(error)
  }


    useEffect(() => {
      if (apiErr) {
        setTimeout(() => {
          setApiErr("");
        }, 2000);
      }
      if (successMsg) {
        setTimeout(() => {
          setSuccessMsg("");
          // handleClose();
          // addEnq.current.click();
        }, 2000);
      }
    }, [apiErr, successMsg]);
  
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
          <Modal.Header>
            <div className="flex justify-between items-center w-full gap-3">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h5 className="modal-title" id="viewInvoiceLabel">
                    {data?.data?.invoice?.prefix}-
                    {data?.data?.id?.toString().padStart(5, "0") +
                      "/" +
                      (new Date(data?.data?.invoice?.date).getMonth() + 1)
                        ?.toString()
                        ?.padStart(2, "0") +
                      "/" +
                      new Date(data?.data?.invoice?.date).getFullYear()}
                  </h5>
                  {parseInt(data?.data?.invoice?.payments_limit) ==
                    parseInt(data?.data?.invoice?.payments_count) && (
                    <small className="badge badge-soft-danger pulse text-sm mt-2 flex items-center gap-2 w-fit">
                      <i className="ri-alert-line"></i>Payment limit reached
                    </small>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 font-semibold mb-0">
                    Payments limit :{" "}
                    <b>{data?.data?.invoice?.payments_limit}</b>
                  </p>
                  <p className="text-gray-600 font-semibold">
                    Payments count :{" "}
                    <b>{data?.data?.invoice?.payments_count}</b>
                  </p>
                </div>
              </div>

              <p className="cursor-pointer  text-2xl " onClick={hide}>
                X
              </p>
            </div>
          </Modal.Header>
          <SimpleBar className="max-h-[650px]">
            <Modal.Body className="">
              <div className="row justify-content-center">
                <div className="col-xxl-12">
                  <div className="card mb-0" id="demo">
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
                                  {userData?.skyvoice_settings?.city},{" "}
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
                                Invoice No
                              </p>
                              <h5 className="fs-14 mb-0">
                                #{data?.data?.invoice?.prefix}-
                                <span id="invoice-no">
                                  {data?.data?.id?.toString().padStart(5, "0") +
                                    "/" +
                                    (
                                      new Date(
                                        data?.data?.invoice?.date
                                      ).getMonth() + 1
                                    )
                                      ?.toString()
                                      ?.padStart(2, "0") +
                                    "/" +
                                    new Date(
                                      data?.data?.invoice?.date
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
                                  {data?.data?.invoice?.date}
                                </span>{" "}
                              </h5>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Payment Status
                              </p>
                              <span
                                className={`badge badge-soft-${
                                  data?.data?.invocie?.status == 1
                                    ? "primary"
                                    : data?.data?.invoice?.status == 2
                                    ? "success"
                                    : data?.data?.invoice?.status == 3
                                    ? "secondary"
                                    : data?.data?.invoice?.status == 4
                                    ? "warning"
                                    : "danger"
                                } fs-11`}
                                id="payment-status"
                              >
                                {data?.data?.invoice?.status == 1
                                  ? "Unpaid"
                                  : data?.data?.invoice?.status == 2
                                  ? "Paid"
                                  : data?.data?.invoice?.status == 3
                                  ? "Partially Paid"
                                  : data?.data?.invoice?.status == 4
                                  ? "Overdue"
                                  : "Cancelled"}
                              </span>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Total Amount
                              </p>
                              <h5 className="fs-14 mb-0">
                                ₹
                                <span id="total-amount">
                                  {data?.data?.invoice?.total}
                                </span>
                              </h5>
                            </div>
                            {/* <!--end col--> */}
                          </div>
                          {/* <!--end row--> */}
                        </div>
                        {/* <!--end card-body--> */}
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-12">
                        <div className="card-body p-4 border-top border-top-dashed">
                          <div className="row g-3">
                            <div className="col-lg-6">
                              <div>
                                <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                  Billing Address
                                </h6>
                                <p className="mb-0 test-dark fs-16  text-muted font-semibold capitalize">
                                  {data?.data?.invoice?.customer?.first_name}{" "}
                                  {data?.data?.invoice?.customer?.last_name}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.billing_street}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.billing_city}, 
                                  {" "}
                                  {data?.data?.invoice?.billing_state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.billing_country} -{" "}
                                  {data?.data?.invoice?.billing_zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST/PAN - {" "}
                                  {data?.data?.invoice?.tax_number
                                    ? data?.data?.invoice?.tax_number
                                    : "N/A"}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                Phone:{" "}  {data?.data?.invoice?.customer?.phone}
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
                                  {data?.data?.invoice?.customer?.first_name}{" "}
                                  {data?.data?.invoice?.customer?.last_name}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.shipping_street}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.shipping_city},{" "}
                                  {data?.data?.invoice?.shipping_state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.shipping_country} -{" "}
                                  {data?.data?.invoice?.shipping_zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST/PAN -{" "}
                                  {data?.data?.invoice?.tax_number
                                    ? data?.data?.invoice?.tax_number
                                    : "N/A"}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                Phone:{" "}   {data?.data?.invoice?.customer?.phone}
                                </p>
                              </div>
                            </div>
                            {/* <!--end col--> */}
                          </div>
                          {/* <!--end row--> */}
                        </div>
                        {/* <!--end card-body--> */}
                      </div>
                      {/* <!--end col--> */}
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
                                {data?.data?.invoice?.invoice_items?.map(
                                  (item, ind) => (
                                    <tr key={ind}>
                                      <th scope="row">{ind + 1}</th>
                                      <td className="text-start">
                                        <span className="fw-medium font-bold">
                                          {item?.description}
                                        </span>
                                        <p
                                          className="form-control bg-light border-0 whitespace-break-spaces line-clamp-5 motion-reduce:!transition-all hover:line-clamp-none py-1"
                                          id="productDetails-1"
                                          // rows="auto"
                                          placeholder="Product Description "
                                        >
                                          {item?.long_description}
                                          <div className="my-2">
  <p className="font-bold">Number Details</p>
  <ul className="flex  justify-around items-center  flex-grow-1">
    <li>
      Number:<br/> <span className="text-muted font-bold">{item?.number}</span>
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
                                      <td>{item?.months} months</td>
                                      <td>₹{(parseFloat(item?.planprice)*parseFloat(item?.months)).toFixed(2)}</td>
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
                            {/* <!--end table--> */}
                          </div>
                          <div className="border-top border-top-dashed mt-2">
                            <table className="table table-borderless table-nowrap align-middle mb-0 ms-auto w-[310px]">
                              <tbody>
                                <tr className="border-top border-top-dashed mt-2">
                                  <td colSpan="1"></td>
                                  <td colSpan="2" className="p-0">
                                    <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                      <tbody>
                                        <tr className="!mr-2">
                                          <th scope="row">Sub Total</th>
                                          <td className="w-[150px]">
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0 text-right "
                                              id="cart-subtotal"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${data?.data?.invoice?.subtotal}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">
                                            Estimated Tax (18%)
                                          </th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0 text-right"
                                              id="cart-tax"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${data?.data?.invoice?.total_tax}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">Discount ({data?.data?.invoice?.discount_percent})% </th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0 text-right"
                                              id="cart-discount"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`-₹${data?.data?.invoice?.discount_total} `}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">Shipping Charge</th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0 text-right"
                                              id="cart-shipping"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${
                                                data?.data?.invoice
                                                  ?.shipping_charge
                                                  ? data?.data?.invoice
                                                      ?.shipping_charge
                                                  : 0
                                              }`}
                                            />
                                          </td>
                                        </tr>
                                        <tr className="border-top border-top-dashed">
                                          <th scope="row">Total Amount</th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0 text-right"
                                              id="cart-total"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${data?.data?.invoice?.total}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr className="border-top border-top-dashed">
                                          <th scope="row">Pending Amount</th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0 text-right"
                                              id="cart-total"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${parseFloat(
                                                data?.data?.invoice
                                                  ?.pending_amount
                                              ).toFixed(2)}`}
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
                                <span className="fw-semibold">NOTES:</span>
                                <span id="note" className=" !whitespace-break-spaces ">
                                  {data?.data?.invoice?.terms}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <!--end card-body--> */}
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </SimpleBar>
          <Modal.Footer className="modal-footer">
            <div className="flex justify-between items-center w-full">
              <div className="hstack gap-2 justify-content-end d-print-none ">
                <p className="text-success text-start">{successMsg}</p>
              </div>
              <div className="hstack gap-2 justify-content-end d-print-none">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    window.location.href = data?.data?.invoice?.pdf_link;
                    // window.print(data?.data?.invoice?.pdf_link);
                  }}
                >
                  <i className="ri-printer-line align-bottom me-1"></i> Print
                </button>
                <button
                  className="btn btn-primary bg-primary "
                  onClick={() => handleDownlaodInvoice()}
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