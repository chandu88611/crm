
export default function Pagenotfound() {
  return (
    <>
      <main className="">
        <section className="  m-auto">
          <div className="m-auto p-2   bg-transparent">
            <div className=" justify-content-center text-center">
              <div className="col-xl-auto">
                <div className="nk-section-head">
                  <div className="flex justify-center items-center">
                    <img
                      className=""
                      src="/assets/images/ccp_logo.webp"
                      alt=""
                    />
                  </div>

                  <div className="error-number  my-5">
                    <span className="drop-shadow-xl">404</span>
                  </div>
                  <h2 className="ntext-muted text-2xl  mb-2 mb-md-4">
                    Oops, Page Not Found
                  </h2>
                  <p className="nk-block-text lead">
                    We are very sorry for inconvenience. It looks like you’re
                    try to access a page that either has been deleted or never
                    existed.
                  </p>
                  <ul className="nk-btn-group py-4 justify-content-center pt-md-5">
                    <li>
                      <a href="/" className="btn btn-primary">
                        Go Back Home
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className="row g-gs">
              <div className="col-md-6">
                <div className="card bg-primary-100 border-0 h-100 rounded-2">
                  <div className="card-body d-flex flex-column">
                    <div
                      className="media media-lg media-middle media-circle text-bg-primary mb-3 mb-md-5"
                    >
                      <em className="icon ni ni-help-fill"></em>
                    </div>
                    <h4 className="card-title mb-2 mb-md-1">Read the FAQs</h4>
                    <p className="fs-16 mb-0">
                      Lorem ipsum dolor sit amet, consectet adipiscing elit.
                      Consequat aliquet soll ac. Lorem ipsum dolor sit amet,
                      consectet adipiscing elit..
                    </p>
                    <div className="pt-3 pt-md-5 mt-auto">
                      <a href="/contact" className="btn-link text-primary"
                        ><span>Read FAQS</span
                        ><em className="icon ni ni-arrow-right"></em
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-green-100 border-0 h-100 rounded-2">
                  <div className="card-body d-flex flex-column">
                    <div
                      className="media media-lg media-middle media-circle text-bg-success mb-3 mb-md-5"
                    >
                      <em className="icon ni ni-account-setting"></em>
                    </div>
                    <h4 className="card-title mb-2 mb-md-1">Help &amp; Support</h4>
                    <p className="fs-16 mb-0">
                      Lorem ipsum dolor sit amet, consectet adipiscing elit.
                      Consequat aliquet soll ac. Lorem ipsum dolor sit amet,
                      consectet adipiscing elit.
                    </p>
                    <div className="pt-3 pt-md-5 mt-auto">
                      <a href="#" className="btn-link text-success"
                        ><span>help@nioland.com</span
                        ><em className="icon ni ni-arrow-right"></em
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </main>
    </>
  );
}
