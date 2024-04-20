import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { Avatar } from "@mui/material";
import {   useGetExtensionsQuery, useLazyExtensionViewQuery } from "../../../services/api";

function Extensions() {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [id, setid] = useState(null);
  const { data: extensios, refetch } = useGetExtensionsQuery({
    active: location.pathname.split("/")[2],
  });
  const [view, setView] = useState(null); 
  const[fetch, { data: viewData  }] = useLazyExtensionViewQuery();
  const [selectedCustomer, setSelectedCustomer] = useState();


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await fetch({ id });
          setView(res?.data);
          setSelectedCustomer(res?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  }, [id]);

  
  useEffect(() => {
    refetch()
    setView()
  }, [location.pathname]);

  
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(startPage + 4, extensios?.paginate?.links?.length - 1);

  return (
    <div className="page-content md:ml-5">
      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18"> {location?.pathname?.split('/')[2]} Extensions</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Extensions</a>
                  </li>
                  <li className="breadcrumb-item active capitalize">{location?.pathname?.split('/')[2]}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row gy-2 mb-2" id="">
          <div className={`${
                  view?.extension?.id != undefined
                      ? "col-lg-9 "
                      : "col-12"
                  }`}>
            <table
              id="example"
              className="table dt-responsive nowrap table-striped align-middle"
              style={{ width: "100%" }}
            >
              <thead>
                <tr className="bg-white">
                  <th scope="col">
                    <span className="pl-3" />
                  </th>
                  <th scope="col">Extension</th>
                 {(location?.pathname.includes("/extensions/active")||location?.pathname.includes("/extensions/unassigned"))&& <th scope="col">Validity</th>}
                 {(location?.pathname.includes("/extensions/active")||location?.pathname.includes("/extensions/unassigned"))&& <th scope="col">Created Date</th>}
                 {(location?.pathname.includes("/extensions/assigned"))&& <th scope="col">Assigned To</th>}
                 {(location?.pathname.includes("/extensions/assigned"))&& <th scope="col">	Assigned Date</th>}
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {extensios?.data?.extensions?.length > 0 && (
                  extensios?.data?.extensions?.map((data, i) => (
                    <>
                      <div className="h-1"></div>
                      <tr className="shadow bg-white  h-[60px]">
                        {(location?.pathname.includes("/extensions/active")||location?.pathname.includes("/extensions/unassigned"))&&<td className="text-center">
                          <strong>{i + 1}</strong>
                        </td>}
                       {(location?.pathname.includes("/extensions/assigned"))&& <td>
                        <span className="bg-soft-success custom-avatar rounded-circle ">T</span>

                        </td>}
                        <td className="fs-14 cursor-pointer text-primary"         onClick={() => setid(data?.id)}>{data?.ext_number}</td>
                        {(location?.pathname.includes("/extensions/active")||location?.pathname.includes("/extensions/unassigned"))&&<td>
                          <span className="badge bg-primary-subtle text-primary badge-border fs-12">
                            9 Months
                          </span>
                        </td>}
                        {(location?.pathname.includes("/extensions/active")||location?.pathname.includes("/extensions/unassigned"))&&<td>
                          <span className="badge bg-soft-info text-info fs-12">
                            {moment(data?.created_at).format("DD MMM YYYY")}
                          </span>
                        </td>}


                        {(location?.pathname.includes("/extensions/assigned"))&&<td>
                          <span className="badge bg-primary-subtle text-primary badge-border fs-12 capitalize">
                            {data?.staff_name}
                          </span>
                        </td>}
                        {(location?.pathname.includes("/extensions/assigned"))&&<td>
                          <span className="badge bg-soft-info text-info fs-12">
                            {moment(data?.updated_at).format("DD MMM YYYY")}
                          </span>
                        </td>}
                        <td>
                          {/* {data?.status == 1 ? (
                            <span className="badge badge-outline-success fs-12">
                              Active
                            </span>
                          ) : (
                            <span className="badge badge-outline-danger fs-12">
                              Inactive
                            </span>
                          )} */}
                          <span className={`badge badge-outline-${(location.pathname.split("/")[2]=="active"&&"success")||
                          (location.pathname.split("/")[2]=="assigned"&&"info")||
                          (location.pathname.split("/")[2]=="unassigned"&&"danger")
                          } fs-12 capitalize`}>
                              {/* Inactive */}
                          {location.pathname.split("/")[2]}
                            </span>
                        </td>
                        <td>
                          <div>
                            <Link
                      // to={`/extensions/view/${data?.ext_number}`}
                      onClick={() => setid(data?.id)}
                              className="btn btn-primary py-0"
                            >
                              <i className="mdi mdi-account-eye-outline" /> View
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <div className="h-1"></div>
                    </>
                  ))
                ) }
              </tbody>
            </table>
            {!extensios?.data?.extensions?.length>0&&<div className='w-full whitespace-nowrap p-2 text-primary  bg-[#f1f1f1] text-muted text-lg text-center shadow-sm '>No Data Found</div>}
            {/* <ul className="pagination pagination-separated pagination-sm mb-0">
              {extensios?.paginate?.data?.length>0&&extensios?.paginate?.links?.map((link, i) => (
                <li
                  className={`page-item ${
                    link?.url == null ? "disabled" : "cursor-pointer "
                  } ${link?.active && "active"}`}
                  key={i + "paginate"}
                  onClick={() => {
                    setPage(link.url.split("page=")[1]);
                  }}
                >
                  <a
                    className="page-link"
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                </li>
              ))}
            </ul> */}

            {extensios?.paginate?.data?.length>0&&<div className="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
  <div className="flex-shrink-0">
    <div className="text-muted">
      Showing <span className="fw-semibold">{extensios?.paginate?.data?.length}</span> of
      <span className="fw-semibold"> {extensios?.paginate?.total} </span> Results
    </div>
  </div>
  <ul className="pagination pagination-separated pagination-sm mb-0">
                    {extensios?.paginate?.links?.map((link, i) => (
                       <React.Fragment key={i + "paginate"}>
            
                       {i === 0 && (
                         <>
                         <li
                         className={`page-item ${
                           link?.url == null ? "disabled" : "cursor-pointer "
                         } ${link?.active && "active"}`}
                         key={i + "paginate"}
                         onClick={() => {
                           setPage(link.url.split("page=")[1]);
                         }}
                       >
                         <a
                           className="page-link"
                           dangerouslySetInnerHTML={{ __html: link.label }}
                         />
                       </li> 
                       
                       {page >= 4 && (
                         <li className="page-item disabled">
                           <span className="page-link">. . .</span>
                         </li>
                       )}
                         </>
 )}

 {i >= startPage && i < endPage && (   
                     <li
                       className={`page-item ${
                         link?.url == null ? "disabled" : "cursor-pointer "
                       } ${link?.active && "active"}`}
                       key={i + "paginate"}
                       onClick={() => {
                         setPage(link.url.split("page=")[1]);
                       }}
                     >
                       <a
                         className="page-link"
                         dangerouslySetInnerHTML={{ __html: link.label }}
                       />
                     </li>

                     )}

                     {i === extensios.paginate.links.length - 1 && (
                       <>
                        { extensios.paginate.links.length - 1 > endPage && (
     <li className="page-item disabled">
       <span className="page-link">...</span>
     </li>
   )}
                       <li
                       className={`page-item ${
                         link?.url == null ? "disabled" : "cursor-pointer "
                       } ${link?.active && "active"}`}
                       key={i + "paginate"}
                       onClick={() => {
                         setPage(link.url.split("page=")[1]);
                       }}
                     >
                       <a
                         className="page-link"
                         dangerouslySetInnerHTML={{ __html: link.label }}
                       />
                     </li>
                       </>
   )}
                     </React.Fragment>
                    ))}
                  </ul>
</div>}
          </div>
          {view?.extension?.id&&
          <div className="card col-lg-3 pulse">
          <div className="card-header border-bottom-dashed d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Extension Details</h5>
            <a
              href="extension-history.html"
              className="btn btn-soft-info waves-effect waves-light py-0"
            >
              View History
            </a>
          </div>
          <div className="card-body pt-2">
            <div className="table-responsive">
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <td>Extension Number</td>
                    <td className="text-end">
                      <b>{view?.extension?.ext_number}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>IP/Domain:Port</td>
                    <td className="text-end">
                      <b>{view?.extension?.ext?.ip_address?.ip_address+":"+view?.extension?.ext?.ip_address?.port}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td className="text-end">
                      <b>{view?.extension?.ext?.username}</b>
                    </td>
                  </tr>
                  <tr className="table-active">
                    <th>Status</th>
                    <td className="text-end">
                      <span className="badge badge-outline-success fs-12">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="btn btn-danger w-full " onClick={()=>{setView(null)
              setid()
              }} >Close</div>
            </div>

          </div>
        </div>

          }
        </div>
 
      </div>
    
    </div>
  );
}

export default Extensions;
