/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "../../Header";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "../../../assets/invoices.css";
import Select from "react-select";

export default function CommonInvoice({ type }) {
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18 capitalize">
                      {type} Invoices
                    </h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Invoices</a>
                        </li>
                        <li className="breadcrumb-item active capitalize">
                          {type}
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row h-100">
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-success rounded-circle fs-3">
                            <i className="mdi mdi-cash-check align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            {" "}
                            Paid Invoices
                          </p>
                          <h4 className="mb-2">
                            ₹{" "}
                            <span className="counter-value" data-target="25390">
                              0
                            </span>
                          </h4>
                          <h6 className="text-success mb-0">
                            <span className="counter-value" data-target="2390">
                              0
                            </span>{" "}
                            Invoices
                          </h6>
                        </div>
                        <div className="flex-shrink-0 align-self-end">
                          <span className="badge bg-success-subtle text-success">
                            <i className="ri-arrow-up-s-fill align-middle me-1"></i>
                            3.67 %<span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                            <i className="mdi mdi-file-document-multiple-outline align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Due Invoices
                          </p>
                          <h4 className="mb-2">
                            ₹{" "}
                            <span className="counter-value" data-target="25390">
                              0
                            </span>
                          </h4>
                          <h6 className="text-warning mb-0">
                            <span className="counter-value" data-target="2390">
                              0
                            </span>{" "}
                            Invoices
                          </h6>
                        </div>
                        <div className="flex-shrink-0 align-self-end">
                          <span className="badge bg-success-subtle text-success">
                            <i className="ri-arrow-up-s-fill align-middle me-1"></i>
                            6.24 %<span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-danger rounded-circle fs-3">
                            <i className="mdi mdi-cash-remove align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Unpaid Invoices
                          </p>
                          <h4 className="mb-2">
                            ₹{" "}
                            <span className="counter-value" data-target="25390">
                              0
                            </span>
                          </h4>
                          <h6 className="text-danger mb-0">
                            <span className="counter-value" data-target="2390">
                              0
                            </span>{" "}
                            Invoices
                          </h6>
                        </div>
                        <div className="flex-shrink-0 align-self-end">
                          <span className="badge bg-danger-subtle text-danger">
                            <i className="ri-arrow-down-s-fill align-middle me-1"></i>
                            4.80 %<span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-light text-warning rounded-circle fs-3">
                            <i className="mdi mdi-cash-refund align-middle"></i>
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                            Partially Paid
                          </p>
                          <h4 className="mb-2">
                            ₹{" "}
                            <span className="counter-value" data-target="25390">
                              0
                            </span>
                          </h4>
                          <h6 className="text-warning mb-0">
                            <span className="counter-value" data-target="2390">
                              0
                            </span>{" "}
                            Invoices
                          </h6>
                        </div>
                        <div className="flex-shrink-0 align-self-end">
                          <span className="badge bg-danger-subtle text-danger">
                            <i className="ri-arrow-down-s-fill align-middle me-1"></i>
                            4.80 %<span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
              </div>
              {/* <!--end row--> */}
              <div className="row">
                <div className="col-lg-12">
                  {!showCreateInvoice && (
                    <div className="card" id="tasksList">
                      <div className="card-header border-0">
                        <div className="d-flex align-items-center">
                          <h5 className="card-title mb-0 flex-grow-1 capitalize">
                            {type} Invoices{" "}
                            <span className="text-primary">(2,390)</span>{" "}
                          </h5>
                        </div>
                      </div>
                      <div className="card-body border border-dashed border-end-0 border-start-0">
                        <form>
                          <div className="row g-3">
                            <div className="col-xxl-10 col-lg-8 col-sm-12">
                              <div className="search-box">
                                <input
                                  type="text"
                                  className="form-control search bg-light border-light"
                                  placeholder="Search"
                                />
                                {/* <i className="ri-search-line search-icon"></i> */}
                              </div>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-xxl-2 col-sm-4">
                              <button
                                type="button"
                                className="btn btn-primary bg-primary w-100"
                              >
                                {" "}
                                <i className="ri-equalizer-fill me-1 align-bottom"></i>
                                Search
                              </button>
                            </div>
                            {/* <!--end col--> */}
                          </div>
                          {/* <!--end row--> */}
                        </form>
                      </div>
                      {/* <!--end card-body--> */}
                      <div className="card-body">
                        <div className="table-responsive table-card mb-4">
                          <table
                            className="table dt-responsive w-100"
                            id="example"
                          >
                            <thead className="table-light text-muted">
                              <tr>
                                <th>Invoice No.</th>
                                <th>Amount</th>
                                <th>Total Tax</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Due Date</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody className="list form-check-all">
                              <tr>
                                <td>
                                  <a href="" className="fw-medium link-primary">
                                    CCPIN-240820230001
                                  </a>
                                </td>
                                <td>₹ 25,000</td>
                                <td>
                                  <span>₹ 250</span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-info p-2 fs-13">
                                    24 August, 2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary p-2 fs-13">
                                    Mohamed Momin
                                  </span>
                                </td>
                                <td>
                                  <span className="badge bg-secondary p-1 fs-12">
                                    24 August, 2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge border border-success text-success text-uppercase">
                                    Paid
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <a href="" className="fw-medium link-primary">
                                    CCPIN-240820230001
                                  </a>
                                </td>
                                <td>₹ 25,000</td>
                                <td>
                                  <span>₹ 250</span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-info p-2 fs-13">
                                    24 August, 2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary p-2 fs-13">
                                    Mohamed Momin
                                  </span>
                                </td>
                                <td>
                                  <span className="badge bg-secondary p-1 fs-12">
                                    24 August, 2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge border border-danger text-danger text-uppercase">
                                    Unpaid
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <a href="" className="fw-medium link-primary">
                                    CCPIN-240820230001
                                  </a>
                                </td>
                                <td>₹ 25,000</td>
                                <td>
                                  <span>₹ 250</span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-info p-2 fs-13">
                                    24 August, 2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary p-2 fs-13">
                                    Mohamed Momin
                                  </span>
                                </td>
                                <td>
                                  <span className="badge bg-secondary p-1 fs-12">
                                    24 August, 2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge border border-warning text-warning text-uppercase">
                                    Due
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/* <!--end table--> */}
                          <div className="noresult hidden">
                            <div className="text-center">
                              <lord-icon
                                src="https://cdn.lordicon.com/msoeawqm.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "75px", height: "75px" }}
                              ></lord-icon>
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We&apos;ve searched more than 200k+ tasks We did
                                not find any tasks for you search.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!--end card-body--> */}
                    </div>
                  )}
                  {/* <!--end card--> */}
                  {showCreateInvoice && (
                    <div className="card" id="create_nvoice">
                      {type == "all" && (
                        <div className="card-header">
                          <div className="d-flex align-items-center">
                            <h5 className="card-title mb-0 flex-grow-1">
                              Create Invoice
                            </h5>
                            <button
                              className="btn btn-danger bg-danger btn-sm"
                              onClick={() => setShowCreateInvoice(false)}
                            >
                              <i className="ri-close-line align-bottom"></i>{" "}
                              Close{" "}
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="card-body">
                        <div className="col-lg-3 mb-3 mx-auto">
                          {/* <!-- <label for="" class="mt-3">Select Customer/Client</label> --> */}
                          <Select
                            className="js-example-basic-single inv-select-box"
                            options={[
                              {
                                value: "Customer/Client 1",
                                label: "Customer/Client 1",
                              },
                              {
                                value: "Customer/Client 2",
                                label: "Customer/Client 2",
                              },
                              {
                                value: "Customer/Client 3",
                                label: "Customer/Client 3",
                              },
                              {
                                value: "Customer/Client 4",
                                label: "Customer/Client 4",
                              },
                              {
                                value: "Customer/Client 5",
                                label: "Customer/Client 5",
                              },
                            ]}
                          />
                        </div>
                        <hr />
                        <div className="col-lg-12">
                          <form className="needs-validation" noValidate id="">
                            <div className="card-body border-bottom border-bottom-dashed px-4 pb-4 pt-0">
                              <div className="row">
                                <div className="col-lg-12">
                                  <img
                                    src="/assets/images/ccp_logo.webp"
                                    className="card-logo card-logo-dark user-profile-image img-fluid m-auto"
                                    alt="logo dark"
                                  />
                                </div>
                                <div className="col-lg-4">
                                  <div>
                                    <p className="mb-0 test-dark fw-bold fs-16">
                                      Client/Company Name
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Second Floor, No-5M-323, 5th Main Road,
                                      <br /> 3rd F Cross, East of NGEF Layout,
                                      Kasthuri,
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Bengaluru, Karnataka
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      India - 560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      GST - GSTIN5415560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      +91 90361 56001
                                    </p>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 ms-auto">
                                  <div className="text-end">
                                    <p className="mb-0 test-dark fw-bold fs-16">
                                      Client/Company Name
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Second Floor, No-5M-323, 5th Main Road,
                                      <br /> 3rd F Cross, East of NGEF Layout,
                                      Kasthuri,
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Bengaluru, Karnataka
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      India - 560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      GST - GSTIN5415560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      +91 90361 56001
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4">
                              <div className="row g-3">
                                <div className="col-lg-3 col-sm-6">
                                  <label htmlFor="invoicenoInput">
                                    Invoice No
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="invoicenoInput"
                                    placeholder="Invoice No"
                                    value="#INV-25000355"
                                    readOnly="readonly"
                                  />
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-3 col-sm-6">
                                  <div>
                                    <label htmlFor="date-field">Date</label>
                                    <Flatpickr
                                      placeholder=" Select date Time"
                                      className="form-control bg-light border-0"
                                      options={{
                                        dateFormat: "Y-m-d",
                                      }}
                                    />
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-3 col-sm-6">
                                  <div>
                                    <label htmlFor="totalamountInput">
                                      Total Amount (auto calculated)
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="totalamountInput"
                                      placeholder="₹0.00"
                                      readOnly
                                    />
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4 border-top border-top-dashed">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                    <label
                                      htmlFor="billingName"
                                      className="text-muted text-uppercase fw-semibold"
                                    >
                                      Billing Address
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-2">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="billingName"
                                      placeholder="Full Name"
                                      value="Mohamed Momin"
                                      readOnly
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a full name
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-2">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      data-plugin="cleave-phone"
                                      id="billingPhoneno"
                                      placeholder="(123)456-7890"
                                      value="+91 90361 83631"
                                      readOnly
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a phone number
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="billingTaxno"
                                      placeholder="Tax Number"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a tax number
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-12 col-sm-12">
                                  <div className="mb-2">
                                    <textarea
                                      className="form-control bg-light border-0"
                                      id="billingAddress"
                                      rows=""
                                      placeholder="Address"
                                      required
                                      readOnly
                                    >
                                      Second Floor, No-5M-323, 5th Main Road,
                                      3rd F Cross, East of NGEF Layout,
                                      Kasthuri, Bengaluru, Karnataka, India -
                                      560016
                                    </textarea>
                                    <div className="invalid-feedback">
                                      Please enter a address
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4">
                              <div className="table-responsive">
                                <table className="invoice-table table table-borderless table-nowrap mb-0">
                                  <thead className="align-middle">
                                    <tr className="table-active">
                                      <th scope="col" className="w-[50px]">
                                        #
                                      </th>
                                      <th scope="col">Product Details</th>
                                      <th scope="col" className="w-[120px]">
                                        <div className="d-flex currency-select input-light align-items-center">
                                          Rate
                                          <select
                                            className="form-selectborder-0 bg-light"
                                            data-choices
                                            data-choices-search-false
                                            id="choices-payment-currency"
                                            // onChange="otherPayment()"
                                          >
                                            <option value="$">($)</option>
                                            <option value="£">(£)</option>
                                            <option value="₹" selected>
                                              (₹)
                                            </option>
                                            <option value="€">(€)</option>
                                          </select>
                                          {/* <Select
                                            className="!bg-transparent "
                                            options={[
                                              { value: "$", label: "$" },
                                              { value: "£", label: "£" },
                                              { value: "₹", label: "₹" },
                                              { value: "€", label: "€" },
                                            ]}
                                          /> */}
                                        </div>
                                      </th>
                                      <th scope="col" className="w-[120px]">
                                        Quantity
                                      </th>
                                      <th scope="col" className="w-[150px]">
                                        Amount
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-end w-[105px]"
                                      ></th>
                                    </tr>
                                  </thead>
                                  <tbody id="newlink">
                                    <tr id="1" className="product">
                                      <th scope="row" className="product-id">
                                        1
                                      </th>
                                      <td className="text-start">
                                        <div className="mb-2">
                                          <Select
                                            className="js-example-basic-single inv-select-box"
                                            options={[
                                              {
                                                value: "Product 1",
                                                label: "Product 1",
                                              },
                                              {
                                                value: "Product 2",
                                                label: "Product 2",
                                              },
                                              {
                                                value: "Product 3",
                                                label: "Product 3",
                                              },
                                              {
                                                value: "Product 4",
                                                label: "Product 4",
                                              },
                                              {
                                                value: "Product 5",
                                                label: "Product 5",
                                              },
                                            ]}
                                            placeholder="product"
                                            name="country"
                                          />
                                        </div>
                                        <textarea
                                          className="form-control bg-light border-0"
                                          id="productDetails-1"
                                          rows="2"
                                          placeholder="Product Description"
                                        ></textarea>
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control product-price bg-light border-0"
                                          id="productRate-1"
                                          step="0.01"
                                          placeholder="0.00"
                                          required
                                        />
                                        <div className="invalid-feedback">
                                          Please enter a rate
                                        </div>
                                      </td>
                                      <td>
                                        <div className="input-step">
                                          <button
                                            type="button"
                                            className="minus"
                                          >
                                            –
                                          </button>
                                          <input
                                            type="number"
                                            className="product-quantity"
                                            id="product-qty-1"
                                            value="0"
                                            readOnly
                                          />
                                          <button
                                            type="button"
                                            className="plus"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </td>
                                      <td className="text-end">
                                        <div>
                                          <input
                                            type="text"
                                            className="form-control bg-light border-0 product-line-price"
                                            id="productPrice-1"
                                            placeholder="$0.00"
                                            readOnly
                                          />
                                        </div>
                                      </td>
                                      <td className="product-removal">
                                        <a
                                          href="javascript:void(0)"
                                          className="btn btn-success"
                                        >
                                          Delete
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr id="newForm hidden">
                                      <td className="d-none" colSpan="5">
                                        <p>Add New Form</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan="5">
                                        <a
                                          href="javascript:new_link()"
                                          id="add-item"
                                          className="btn btn-soft-secondary fw-medium"
                                        >
                                          <i className="ri-add-fill me-1 align-bottom"></i>{" "}
                                          Add Item
                                        </a>
                                      </td>
                                    </tr>
                                    <tr className="border-top border-top-dashed mt-2">
                                      <td colSpan="3"></td>
                                      <td colSpan="2" className="p-0">
                                        <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                          <tbody>
                                            <tr>
                                              <th scope="row">Sub Total</th>
                                              <td className="w-[150px]">
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-subtotal"
                                                  placeholder="₹0.00"
                                                  readOnly
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">
                                                Discount %
                                                <small className="text-muted">
                                                  (Before Tax)
                                                </small>
                                              </th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-discount"
                                                  placeholder="0%"
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Tax (18%)</th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-tax"
                                                  placeholder="₹0.00"
                                                  readOnly
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">
                                                Shipping Charge
                                              </th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-shipping"
                                                  placeholder="₹0.00"
                                                />
                                              </td>
                                            </tr>
                                            <tr className="border-top border-top-dashed">
                                              <th scope="row">Total Amount</th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-total"
                                                  placeholder="₹0.00"
                                                  readOnly
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
                                <label
                                  htmlFor="exampleFormControlTextarea1"
                                  className="form-label text-muted text-uppercase fw-semibold"
                                >
                                  NOTES
                                </label>
                                <textarea
                                  className="form-control alert alert-info"
                                  id="exampleFormControlTextarea1"
                                  placeholder="Notes"
                                  rows="2"
                                  required
                                >
                                  All accounts are to be paid within 7 days from
                                  receipt of invoice. To be paid by cheque or
                                  credit card or direct payment online. If
                                  account is not paid within 7 days the credits
                                  details supplied as confirmation of work
                                  undertaken will be charged the agreed quoted
                                  fee noted above.
                                </textarea>
                              </div>

                              <div className="hstack gap-2 justify-content-end">
                                {/* <!-- <button type="button" class="btn btn-light" id="close-modal" data-bs-dismiss="modal">Close</button> --> */}
                                <button
                                  type="submit"
                                  className="btn btn-success bg-success"
                                >
                                  <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                  Save
                                </button>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-primary bg-primary"
                                >
                                  <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                                  Download Invoice
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-secondary bg-secondary"
                                >
                                  <i className="ri-send-plane-fill align-bottom me-1"></i>{" "}
                                  Send Invoice
                                </a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <!-- end row --> */}
              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                // id="createTask"
                tabIndex="-1"
                aria-labelledby="createTaskLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content border-0">
                    <div className="modal-header p-3 bg-soft-success">
                      <h5 className="modal-title" id="createTaskLabel">
                        Create Comment
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        id="createTaskBtn-close"
                        aria-label="Close"
                      >X</button>
                    </div>
                    <div className="modal-body">
                      <div
                        id="task-error-msg"
                        className="alert alert-danger py-2"
                      ></div>
                      <form autoComplete="off" action="" id="creattask-form">
                        <input
                          type="hidden"
                          id="taskid-input"
                          className="form-control"
                        />
                        <div className="mb-3">
                          <label
                            htmlFor="task-title-input"
                            className="form-label"
                          >
                            Comment Title
                          </label>
                          <input
                            type="text"
                            id="task-title-input"
                            className="form-control"
                            placeholder="Enter task title"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="task-title-input"
                            className="form-label"
                          >
                            Comment
                          </label>
                          <textarea
                            name="name"
                            className="form-control"
                            rows=""
                            cols=""
                          ></textarea>
                          {/* <!-- <input type="text" id="task-title-input" class="form-control" placeholder="Enter task title"> --> */}
                        </div>
                        <div className="mb-3 position-relative">
                          <label
                            htmlFor="task-assign-input"
                            className="form-label"
                          >
                            Assigned To :{" "}
                            <span className="text-muted">Staff Name</span>{" "}
                          </label>
                          <div
                            className="avatar-group justify-content-center"
                            id="assignee-member"
                          >
                            <a
                              href="javascript: void(0);"
                              className="avatar-group-item mb-2"
                              data-img="assets/images/users/default_proile_image.png"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="John Robles"
                            >
                              <img
                                src="/assets/images/users/default_proile_image.png"
                                alt=""
                                className="rounded-circle avatar-xs"
                              />
                            </a>
                          </div>
                        </div>
                        <div className="row g-4 mb-3">
                          <div className="col-lg-6">
                            <label htmlFor="task-status" className="form-label">
                              Status
                            </label>
                            <Select
                              className="form-control"
                              options={[
                                { value: "Ringing", label: "Ringing" },
                                { value: "Postponed", label: "Postponed" },
                                {
                                  value: "Not Interested",
                                  label: "Not Interested",
                                },
                                { value: "Completed", label: "Completed" },
                              ]}
                            />
                          </div>
                          {/* <!--end col--> */}
                          <div className="col-lg-6">
                            <label
                              htmlFor="priority-field"
                              className="form-label"
                            >
                              Post Time
                            </label>
                            <input
                              type="text"
                              className="form-control flatpickr-input active"
                              data-provider="timepickr"
                              data-time-hrs="true"
                              id="timepicker-24hrs"
                              readOnly
                            />
                          </div>
                          {/* <!--end col--> */}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="task-duedate-input"
                            className="form-label"
                          >
                            Post Date
                          </label>
                          <input
                            type="text"
                            className="form-control flatpickr-input active"
                            data-provider="flatpickr"
                            data-date-format="d M, Y"
                            placeholder="DD MM, YYYY"
                            readOnly
                          />
                        </div>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-ghost-success"
                            data-bs-dismiss="modal"
                          >
                            <i className="ri-close-fill align-bottom"></i> Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary bg-primary"
                            id="addNewTodo"
                          >
                            Add Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--end create taks--> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <footer className="footer w-100">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  {new Date().getFullYear()} © All Rights Reserved.
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-end d-none d-sm-block">
                    Designed and Developed by Call Center Projects
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
