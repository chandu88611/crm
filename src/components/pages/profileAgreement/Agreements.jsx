/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useLazyDownloadAgreementQuery, useSentAgreementMutation, useUserAgreementUpdateMutation } from "../../../services/api";
import Loader from "../Loader";
import { successAlert, successAlertReload } from "../swAlert";
import axios from "axios"
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useEffect } from "react";
import $ from "jquery";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import VerifyAgreement from "./VerifyAgreement";


export default function Agreements({ handleActiveForm , isSigned}) {
  const signaturePadRef = useRef(null);
  const emailToRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(isSigned ? 6 : 1);
  const [isAgreed, setIsAgreed] = useState(isSigned);
  const [currentprocessStep, setCurrentProcessStep] = useState(1);
  const [signatureErr, setSignatureErr] = useState("");
  const [signature, setSignature] = useState(null);
  const [emailsubCopy, setEmailsubcopy] = useState("Click to copy");
  const [emailBodycopy, setEmailBodycopy] = useState("Click to copy");
  const [emailToCopy, setEmailtocopy] = useState("Copy to clipboard");

  useEffect(() => {
    if (emailsubCopy == "Copied") {
      setTimeout(() => {
        setEmailsubcopy("Click to copy");
      }, 3500);
    }
  }, [emailsubCopy]);

  useEffect(() => {
    if (emailBodycopy == "Copied") {
      setTimeout(() => {
        setEmailBodycopy("Click to copy");
      }, 3500);
    }
  }, [emailBodycopy]);

  useEffect(() => {
    if (emailToCopy == "Copied") {
      setTimeout(() => {
        setEmailtocopy("Click to copy");
      }, 3500);
    }
  }, [emailToCopy]);

  const emailSubjectRef = useRef(null);
  const emailBodyRef = useRef(null);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSignatureEnd = () => {
    setSignature(signaturePadRef.current.toDataURL());
    setSignatureErr()
  };

  const clearSignature = () => {
    signaturePadRef.current.clear();
    setSignature(null);
  };

  const [agreeAgreement, { data: signResp, isLoading: signLoading }] =
    useUserAgreementUpdateMutation();

  const [sentAgreement, { data: sentResp, isLoading: sentLoading }] =
    useSentAgreementMutation();
    const modalContentRef = useRef(null);
  const handleSubmit = async () => {
    console.log(signaturePadRef?.current);
    const signatureData = signaturePadRef.current.toDataURL();
    const canvas = signaturePadRef.current.getCanvas();
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    console.log(canvas.width, canvas.height);
    if (imageData?.data.every((value) => value == 0)) {
      setSignatureErr("Signature is Required");
   

      
      const anchor = document.createElement('a');
      anchor.href = `#sec07`;

      // Append the anchor tag to the document body
      document.body.appendChild(anchor);

      // Trigger a click event on the anchor tag
      anchor.click();
setActive("signature")
      // Remove the anchor tag from the document body after a delay
      setTimeout(() => {
        document.body.removeChild(anchor);
      }, 100);
      return;
    }
    if (signatureData) {
      const response = await agreeAgreement({ signature: signatureData });
      if (response?.data?.status) {
        setIsAgreed(true);
      }
    }
  };

  const copyEmailSubject = () => {
    setEmailsubcopy("Copied");
    const textToCopy = emailSubjectRef.current.innerText;
    navigator.clipboard.writeText(textToCopy);
  };

  const copyEmailBody = () => {
    setEmailBodycopy("Copied");
    const textToCopy = emailBodyRef.current.innerText;
    navigator.clipboard.writeText(textToCopy);
  };

  const copyEmailTo = () => {
    setEmailtocopy("Copied");
    const textToCopy = emailToRef.current.innerText;
    navigator.clipboard.writeText(textToCopy);
  };

  const handleDownloadAgreement = async () => {
    try {
      const response = await axios.get(
        `https://skycontroller.connetz.shop/tl-api/download-agreement`,
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
        link.setAttribute("download", "agreement.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
        setCurrentProcessStep(2);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSentAgreement = async () => {
    const response = await sentAgreement({});
    if (response?.data?.status) {
      handleActiveForm(5);
    }
  };

  useEffect(() => {
    // navigation
    const navigation = $(".navigation");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === true) {
            const uid = entry.target.dataset.sectionName;

            const active = navigation.find("li.scrollActive");
            if (active !== null) {
              active.removeClass("scrollActive");
            }

            const button = navigation.find('a[href="#' + uid + '"]');
            if (button !== null) {
              button.parent().addClass("scrollActive");
            }
          }
        });
      },
      {
        root: document, 
        rootMargin: "-60% 0px",
        threshold: 0,
      }
    );

    const stickySection = $("[data-section-name]");
    stickySection.each((idx, elm) => {
      observer.observe(elm);
    });

    // smooth anchor move
    const buttons = navigation.find("a");
    buttons.each((idx, elm) => {
      $(elm).on("click", (e) => {
        e.preventDefault();
        const uid = $(elm).attr("href").replace("#", "");
        $(`[data-section-name="${uid}"]`)
          .get(0)
          .scrollIntoView({ behavior: "smooth" });
      });
    });
  }, []);
const [active,setActive]=useState("terms")
  return (
    <>
      {sentLoading && <Loader />}
      {/* {downloading && <Loader />} */}
      {signLoading && <Loader />}
      <div className="row">
        {!isAgreed && (
          <div className="col-xxl-3">
            <div className="list-group">
              <nav className="navigation">
                <ul>
                  <li className={`list-group-item ${active=="terms"&&"scrollActive"}`}>
                    <a href="#sec01" className="hover:text-gray-300" onClick={()=>setActive('terms')}>Terms of Use</a>
                  </li>
                  <li className={`list-group-item ${active=="enquiry"&&"scrollActive"}`}>
                    <a href="#sec02" className="hover:text-gray-300" onClick={()=>setActive('enquiry')}>Enquiry Policy</a>
                  </li>
                  <li className={`list-group-item ${active=="privacy"&&"scrollActive"}`}>
                    <a href="#sec04" className="hover:text-gray-300" onClick={()=>setActive('privacy')}>Privacy Policy</a>
                  </li>
                  <li className={`list-group-item ${active=="refund"&&"scrollActive"}`}>
                    <a href="#sec05" className="hover:text-gray-300" onClick={()=>setActive('refund')}>Refund policy</a>
                  </li>
                  <li className={`list-group-item ${active=="payment"&&"scrollActive"}`}>
                    <a href="#sec06" className="hover:text-gray-300" onClick={()=>setActive('payment')}>Payment Policy</a>
                  </li>
                  <li className={`list-group-item ${active=="signature"&&"scrollActive"}`}>
                    <a href="#sec07" className="hover:text-gray-300" onClick={()=>setActive('signature')}>Signature</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
        {!isAgreed && (
          <div className={`col-xxl-9 `}>
            <SimpleBar className="max-h-[350px]">
              <section
                id="sec01"
                className="section01"
                data-section-name="sec01"
              >
                <h3 className="h3 text-muted">Terms of Use</h3>
                <ul>
                <h4 className="text-lg font-semibold">AGREEMENT FOR OUTSOURCING CALL CENTER SUPPORT</h4>
                <br />
                <li>This Agreement for Outsourcing Call Centre Support (the &quot;Agreement&quot;) is effective DATE,</li>
                <li>BETWEEN: <br />[Call Centre Projects Service India], a company organized and existing under
the laws of the Karnataka with its head office located at: Level 7, Phase-4,
Near IBM India,Manyata Tech Park,Hebbal Outer Ring Road, Bangalore
560 045 Karnataka (Seller)</li><br />
                <li>AND:<br/> Gleam Global Services India Pvt Ltd, No. 221 Thillai Nagar Gandhi Nagar Post,

Chennai, Tamil Nadu - 607308. (Provider)</li>
<br />

<li>
WHEREAS, Seller is engaged in several businesses including the business of [Tele com
process, whereas Toll free number, virtual number selling, both inbound and outbound]
through its Internet site [www.skyvoicetechnologies.com] and through its toll-free telephone
number [1800-274-5444] and <br />
WHEREAS, Seller desires to retain the services of Provider to provide customer support and
telemarketing services to customers and potential customers of Sellers [Tele com process]
business (each, a &quot;Customer&quot;), and Provider desires to provide such services, on the terms and
conditions set forth in this Agreement. <br />
NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties
hereby agree as follows:
</li>
<br />
                <h4 className="text-lg font-semibold">1. ENGAGEMENT OF PROVIDER; DESCRIPTION OF SERVICES</h4>
                <br />
                  <li>
                  a. Subject to the terms and conditions of this Agreement, Seller hereby retains Provider to
provide the Customer support and telemarketing services set forth below (collectively, the
&quot;Services&quot;), and Provider hereby accepts such engagement.
                  </li>
                  <li>
                  Provider will provide Seller inbound teleservice support for Seller Customers who have
purchased www.skyvoicetechnologies.com through the Site where CRM panel and Dialer will
be provided by the end of Connetz https://connetz.shop/contactus
                  </li>
                  <li>
                  Provider will provide such services in accordance with the specifications set forth on Agreement
vide clause 2 (SERVICE LEVELS)
                  </li>
                  <br />
                  <li>
                  b. In addition to the Inbound Teleservices, Provider will provide inbound telemarketing services
for Customers using the Site and/or the Toll-Free Number to complete [Purchase] request
transactions with Seller. Provider will provide such services in accordance with the
specifications set forth on clause 2 (SERVICE LEVELS) of Agreement attached hereto and
made a part hereof the &quot;Inbound Telemarketing Services&quot; and, together with the Inbound
Teleservices and any other services provided by Provider pursuant to paragraphs (c) and (d) of
this Section/Clause 1.1, being collectively referred to herein as the &quot;Services&quot;).
                  </li>
                  <br />
                  <li>
                  c. During the Term (as hereinafter defined) of this Agreement, Provider shall, at the option of
Seller, provide outbound up-sell telemarketing services to Customers on terms and conditions to
be agreed upon in good faith by the parties.
                  </li>
<br />
                  <li>
                  d. Provider will also provide such additional related services as set out in this Agreement (herein
&quot;Related Services&quot;) including, without limitation, the following:
                  </li>
                  <br />
                  <li>
                  1.1.1 Provider agrees to notify Seller on a daily basis of any information required by Sellers
Customers. The parties agree that Seller is responsible for fulfilling such requests and should
provide notice obligation significantly interfere with its primary Service activities, Provider will
notify Seller about the same. The parties agrees that upon such notice, they will work
cooperatively toward an amicable solution.
                  </li>
                  <br />
                  <li>
                  1.1.2 Provider agrees to provide Seller with such information and reports related to Services
created by the Provider telephone system. Additional reports, as agreed to by the parties, shall be
provided by Provider during the Term and shall be deemed included in AGREEMENT hereto
effective as of the date agreed to by Provider and Seller. Report topics may include performance,
users, applications and lost Contacts (as hereinafter defined), among others.
                  </li>
                  <br />
                  <li>
                  1.1.3 As set forth in AGREEMENT hereto, Provider agrees to allow SELLER, through
reasonable mechanisms to be made available by Provider to Seller, to monitor Providers service
handling of Contacts for Products (as hereinafter defined), provided that this activity doesn’t
significantly interfere with primary Service activity. Seller agrees to provide Provider with any
and all information, reports, or feedback related to Service quality which created by the
monitoring of Contacts.
                  </li>
                  <br />
                  <h4 className="text-md font-semibold">1.2 Products</h4>
                  <br />
                  <li>Provider will provide the Services for all related goods and services offered by Seller through the
Site and the Toll-Free Number (collectively, the &quot;Products&quot;), and any other products related
thereto as designated from time to time by Seller (the &quot;Related Products&quot;). All terms and
conditions herein apply to the Products and the Related Products. If Related Products (other than
any usual and customary updates, upgrades, new versions, extensions or evolutionary
developments to the Products as would typically be expected to occur in products and services
such as the Products) are introduced during the Term of this Agreement, Seller shall provide
reasonable advance notice of and information about such additional Related Products to Provider
to enable Provider to inform and Train its CSRs (as defined in clause 2 of 2.1 (SERVICE
LEVELS/ Definition ) of Agreement annexed hereto) as necessary and appropriate to provide
quality Services with respect to such additional Related Products.</li>
<br />
<h4 className="text-md font-semibold">1.3 Hours of operation</h4>
<br />
<li>a. Provider will provide the Inbound and outbound Tele service from Monday to Saturday. <br/>
b. Eight (8) Hours per day, Six(6) days per week, Twelve (12)Months per year commencing on
the Telemarketing Launch Date (as defined in Agreement).<br/>
c. The seller has no SCHEDULE for the provider separately for month target. Working month
will be considered minimum 10 orders per month.</li>
<br />
<h4 className="text-md font-semibold">1.4 Facility</h4>
<br />
<li>Provider will utilize its support facility at No. 221 Thillai Nagar Gandhi Nagar Post, Tamil Nadu
(the &quot;Facility&quot;) for delivery of Services for the Products. The Facility will be equipped with
telephone systems, computer systems, and various Provider support and call monitoring tools,
such as documentation and knowledge bases, to be used in the delivery of the Services. Provider
shall bear all expenses of operating the Facility, including all expenses for equipment and
systems necessary to connect to any telecommunications circuits or facilities utilized by Seller to
<br />
bring calls to the Facility.</li>
<br />
<h4 className="text-lg font-semibold">2. SERVICE LEVELS</h4>
<br />
<h4 className="text-md font-semibold">2.1 Definitions; Service levels</h4>
<br />
<li>2.1.1. Call definitions</li>
<li><b>Customer Service Representative (CSR): CSR</b> is a person who works in a call or contact
center and helps customers with their issues. They may do this using a variety of channels.</li>
<br />
<li><b>Actual Handling Time</b>: Shall mean</li>
 
<li>(i) In the case of an Inbound Call (as hereinafter defined) by a CSR or an outbound
Customer callback, the time that is measured from when the call is physically
answered by the CSR or the Seller Customer respectively until the call is physically
terminated; and any additional wrap up work performed related to such call prior to
becoming physically available to receive the next Inbound Call or to make the next
Customer callback, and</li> 
<li>(ii) In the case of an Automated Call (as hereinafter defined), the time that is measured
from when the caller enters the Provider Voice Response Unit (VRU) until such
caller leaves the VRU.</li>
<br />
<li><b>Automated Call:</b> Shall mean an Inbound Call that is delivered to an electronic voice message
rather than to a CSR as the means of providing Services as described in this Agreement.</li>
<li><b>Contact:</b> Shall mean a support incident, defined as a single in-coming support request via
telephonic voice (a &quot;Voice Contact&quot;), fax or written or electronic correspondence (an &quot;E-mail
Contact&quot;) regarding any Product.</li>
<li><b>Inbound Call:</b> Is defined as a call that has physically arrived to Providers Interactive Voice
Response Unit (an &quot;IVR&quot;) or similar system by way of Sellers IVR or other mechanism for the
purpose of providing Services as described in this Agreement.</li>
<li><b>Maximum Hold Time:</b> Shall be measured from the time an Inbound Call is placed in a call
group queue, prior to being physically delivered and answered by a CSR or an automated voice
response unit (a &quot;VRU&quot;).</li>
<br />
<h4 className="text-md font-semibold">2.2 Service levels</h4>
<br />
<li>Clause <b>2.1 of 2 (SERVICE LEVELS/ Definition ) of Agreement</b> annexed hereto and made a
part hereof sets forth the performance requirements of Provider applicable to its handling of
Inbound Calls, Contacts and the Actual Handling Time for Inbound Calls for all Services.</li>
<br />
<h4 className="text-md font-semibold">2.3 Escalation procedure</h4>
<br />
<li>Seller recognizes that there may be instances where Provider will not be able to resolve a
Customer Contact without Sellers assistance. Promptly following the execution of this
Agreement, both parties will mutually agree to an escalation procedure for resolving support
problems that require Sellers technical personnel and/or a Seller third party vendor. Seller agrees
to provide necessary and timely resources to Provider to enable Provider to resolve escalated
problems in a timely manner. Examples of such resources include documentation,
knowledgebase, escalation process, hardware, software and support technicians.</li>
<br />
<h4 className="text-md font-semibold">2.4 Customer callbacks</h4>
<br />
<li>Provider agrees that in the event a Provider CSR is unable to resolve a support incident during an
Inbound Call, the CSR will make all reasonable efforts to contact the Customer as soon as
possible with the solution. All telecommunications costs for these callbacks shall be borne by
Seller. In the event Seller selects to be billed on a per-call basis, these callbacks shall be
considered a billable call.</li>
<br />
<h4 className="text-md font-semibold">2.5 Call length</h4>
<br />
<li>Seller and Provider recognize that the amount of time a CSR spends on an individual voice
Contact can impact both Service levels and fees. Sellers expected average call length for
Products is set out to be Three hours (3Hrs) If Provider experiences any significant increase in
call length, Provider agrees to notify Seller and will work toward determining how to
accommodate the Increase by either modifying the Service level or increasing the staff as
mutually agreed.</li>
<br />
<h4 className="text-lg font-semibold uppercase">3. SELLER TOOLS, TELECOMMUNICATIONS AND TRAINING</h4>
<br />
<h4 className="text-md font-semibold">3.1 Seller Tools</h4>
<br />
<li>Seller agrees to provide Provider with sufficient copies of Products and related materials,
including, but not limited to, copies of software, documentation, licenses and Product
information as reasonably necessary to provide Services for the Products. Provider acknowledges
that its use of such tools may be subject to the terms of license agreements required by Seller or
its third party suppliers, and Provider agrees to abide by all the terms and conditions of such
licenses in connection with its use of such tools. Seller shall only be obligated to supply one copy
of any documentation or other such written materials relating to any such tools, and Provider
may make such number of copies of such materials as are necessary for it to provide Services
hereunder.</li>
<br />

<h4 className="text-md font-semibold">3.2 Telecommunications</h4>
<br />
<li>Seller assumes all expenses related to the sending of Contacts to Provider, including provision of
telecommunication lines and the bearing of network costs associated with routing Inbound Calls
to the Facility. Provider is responsible for properly equipping the Facility with the necessary
hardware to receive and handle Contacts as required by this Agreement.</li>
<br />

<h4 className="text-md font-semibold">3.3 Training</h4>
<br />
<li>Seller will provide one copy of necessary training materials to Provider on all versions and
aspects of Products that are unique or specific to Sellers services at no charge to Provider.
Provider trainers at Providers Facility will provide training for Provider CSRs, unless otherwise
agreed to in writing by the parties. Training will be delivered based on technical documentation
for all aspects of the Products which are unique or specific to Sellers services and all updates,
upgrades and revisions thereto required to provide the Services will be provided to Provider by
Seller at no charge to Provider.<br/>
Provider agrees to use said documentation for Service purposes only. Provider agrees to use all
training materials for training and support purposes for the Services only. Provider agrees to
provide Standard Provider support training to its employees at the Facility, which shall include
Seven days (7days) minimum time period to Thirty Days (30days) for maximum time period for
training on the standard types of underlying hardware, operating system and application (e.g.
Browser) software required or typically used in conjunction with the Products. Seller shall have
the right to review and approve the level of proficiency to which the CSRs are to be trained by
Provider to facilitate the performance of quality Services, which approval shall not be
unreasonably withheld. Except in an emergency and upon consultation with Seller, Provider shall
not assign CSRs to provide Services hereunder unless they have received adequate training as
approved by Seller and otherwise meet the requirements applicable to CSRs as set forth on
Clause <b>3.3 of 3 (Training) of Agreement</b></li>
<br />
<h4 className="text-md font-semibold">4 Payment Terms</h4>
<br />
<h4 className="text-md font-semibold">4.1 Revenue Generation</h4>
<br />
<li>Company Service level Step like - Website, Dot license, Company Registration, Data, Dialer,
Calling Charges, CRM panels, Payment gateway integration, &amp; Projects will provide by 1st
Party Regarding Revenue generation is fully depend on Center &amp; Performance of Agent of 2nd
Party.</li>
<br />
<h4 className="text-md font-semibold">4.2 Payment</h4>
<br />
<li>Every 5 th of month will be the payment date of providers. Commencing with the end of the
month of the Telemarketing Launch Date and each month thereafter during the Term (as
hereinafter defined), Provider will provide Seller with a monthly itemized statement for the
Services rendered during the preceding monthly period. In addition, Provider will bill and Seller
will pay for Related Services and such other charges as are provided for herein on an as incurred
basis (along with its regular monthly invoice). Seller will pay net payment of 50% from the
month profit. Days from receipt of each invoice mentioned in India. If Seller is delinquent in the
payment of any invoice, and fails to remedy the delinquency within 5 days after written notice of
delinquency is received by Seller, Seller shall be obligated to pay late charges in a total amount
which should not to exceed 50 percent per month on the unpaid balance of any undisputed
portion of the invoice which is unpaid. In the event of a dispute with regard to a portion of any
invoice, the disputed portion may be withheld until resolution of the dispute but any undisputed
portion shall be paid as provided herein.</li>
<br />

<h4 className="text-md font-semibold">4.4 Record keeping</h4>
<br />
<li>PROVIDER agrees to keep accurate books of account and records (in accordance with generally
accepted accounting principles consistently applied) at the address set forth on the first page of
this Agreement detailing all fees for its Services. Such books and records shall be maintained by
Provider for a period of Five years after termination or expiration of this Agreement. Upon
reasonable notice of not less than 3 days, Seller shall have the right, for each 12 month period
during the Term, to inspect and audit such books of account and records to verify the accuracy of
the information contained in any invoice or the amount of fees for Services paid to all Provider
hereunder. The parties agree that any dispute as to the fees paid to or charged by Provider for the
Services that cannot be resolved by the parties shall be settled by arbitration.</li>
<br />
<h4 className="text-md font-semibold">4.5 Taxes</h4>
<br />
<li>Provider shall be solely responsible for the preparation and submission to applicable authorities
of its CSRs or other employee’s income tax and other forms and the payment of all of such
person’s salaries, employer contributions and employee benefits. Seller shall be solely
responsible for all Indian applicable federal, state and local taxes and charges arising out of or
related to sales of the Products and any such taxes shall be assumed and paid for by Seller.

Provider and Seller shall be solely responsible for the preparation and submission to applicable
authorities of their respective federal, state and local income taxes attributable to income derived
by each such party in connection with the subject matter of this Agreement.</li>
<br />
<h4 className="text-lg font-semibold">5.1 Term</h4>
<br />
<li>The initial term of this Agreement shall commence on the date hereof and shall continue for a
period of Five years from the Telemarketing Launch Date (the &quot;Initial Term&quot;). This Agreement
shall automatically be extended for successive Five years terms (each a &quot;Renewal Term&quot;) unless
either party gives the other written notice of its intention not to extend this Agreement at least 30
days prior to the end of the then current term, or unless terminated as provided elsewhere herein
(the Initial Term, together with each Renewal Term, if any, being collectively referred to herein
as the &quot;Term&quot;). Any time after expiration of the Initial Term, Provider may change the prices and
terms on which providing at least 30 days prior written notice to Seller (The Fee Notice Period)
will provide Services. Seller shall have the right, in its sole discretion, to reject such changes and,
in such case, this Agreement shall automatically terminate without penalty to either party upon
expiration of the Fee Notice Period</li>
<br />
<h4 className="text-md font-semibold">5.2 Conditions for termination based on non-performance</h4>
<br />
<li>5.2.1 Seller may terminate this Agreement without penalty if Provider fails to meet any of its
performance obligations hereunder or otherwise commits a breach of any term or provision of
this Agreement and fails to cure the same within 5 business days after written notice from Seller.
This Agreement shall automatically terminate forthwith without notice in the event Providers
liabilities exceed its assets, or if Provider is unable to pay its debts as they become due,
<br />5.2.2 If Provider files or has filed against it a petition in bankruptcy, for reorganization or for the
adoption of an arrangement under any present or future bankruptcy, reorganization or similar law
(which petition if filed against Provider shall not be dismissed within 5 days from the filing
date), or if Provider makes a general assignment for the benefit of its creditors or is adjudicated a
bankrupt, or if a receiver or trustee of the Providers business or all or substantially all of the
Providers property is appointed, or if Provider discontinues its business.
<br />5.2.3 Any default claimed by Provider against Seller which cannot be resolved by negotiation
between the parties shall be referred to binding arbitration by Provider and Provider shall not be
entitled to terminate this Agreement or suspend, in whole or in part, the performance of its
obligations hereunder on account of any such breach pending outcome of the arbitration.
<br />5.2.4 Provider must generate a minimum revenue every month if fail to do so the seller is
authorized to terminate the contract.
<br />5.2.5 Data is purely generated by third party and assigned to the provider on a daily basis.

<br />5.2.6 Once agreement commenced, first week seller assigned 15 to 25 Leads for the provider and
later server automatically generates data depending on the call duration of the provider’s agent.
<br />5.2.7 Misuse of installed dialers on the providers system for any purpose will be the violation of
the agreement and provider have right of termination along with penalty from the Seller.
<br />5.2.8 Support is available around the clock to assist in case of server maintenance or server
issues the provider need to cooperate.
<br />5.2.9 Provider must get appointment letter from the seller prior visiting the office.
<br />5.2.10 Installation and Training will be on hold until Provider make payment of the entire service
charge.
<br />5.2.11 The Seller shall not be liable for any claims, damages arising out of any negligence,
misconduct or misrepresentation by the Provider or any of its representatives.
<br />5.2.12 The Seller shall under no circumstances be liable or responsible for any loss, injury or
damage to the Provider, or any other party whomsoever, arising on account of any transaction
under this Agreement or as a result of the Process being in any way failed in unfit condition,
infringing/ violating any laws / regulations / intellectual property rights of any third party.
<br />5.2.13 If users account is inactive for Three (3) continuous days then suspension notice will
generated by system and in the 4th suspension notice account will be terminated. If any Lead or
Enquiry is generated in user account and not responded above 48hrs user account will terminated
immediately. There will not be any claim or any kind of refund provided from the Seller.
</li>
<br />
<h4 className="text-md font-semibold">5.3 Termination for convenience</h4>
<br />
<li>Provider may terminate this Agreement at any time during the Initial Term and any Renewal
Term without cause upon at least Three (3) days written notice to Seller. In such event, Provider
shall pay an early termination fee to Seller to compensate Seller for all costs and expenses
actually and reasonably incurred by Seller for personnel and equipment engaged in providing
Services to Provider. At the time of termination until such resources are either discharged or re-
deployed by Seller to provide services for other parties (but in any event for a period not to
exceed 5 days after termination). <br />
Seller will promptly and in good faith attempt to re-deploy such resources as soon after
termination as possible so as to reduce the amount of such early termination fee payable by
Provider to the extent reasonably possible. In no event shall the total amount of such termination
fee exceed the amount billed to Seller for the Start of the process. <br />
Seller has their own rights to terminate the agreement, If found any illegal activities, miss-use of
data’s, unsatisfied service to the customer,</li>
<br />
<h4 className="text-lg font-semibold uppercase">6. INDEMNITY; LIABILITY AND DISCLAIMERS; INSURANCE</h4>
<br />
<h4 className="text-md font-semibold    ">6.1 Indemnification by Provider</h4>
<br />
<li>Subject to the limitations of liability set forth in Section 6.3.2 of this Agreement, Provider agrees
to indemnify and save harmless Seller and its affiliates, and their respective officers, directors,
shareholders, members, partners, employees, agents and other personnel, from any liabilities,
causes of action, lawsuits, penalties, damages, claims or demands (including the costs and
expenses and reasonable attorney’s fees on account thereof) that may be made:</li>
<br />
<li>(i) Providers breach of this Agreement or its failure to perform any obligation hereunder, or by
any person or entity for injuries or damages of any kind or nature (including but not limited to
personal injury, death, property damage and theft) resulting from or relating to the negligent or
willful acts or omissions of Provider, those of persons or entities furnished by Provider, or
Providers employees, CSRs, agents or subcontractors, the use of Providers Services furnished
hereunder,</li>
<br />
<li>(ii) Providers breach of this Agreement or its failure to perform any obligation hereunder, or
Seller agrees to notify Provider promptly of any written claims or demands against Seller for
which Provider is responsible hereunder against any such liability, cause of action, lawsuit,
penalty, claim, damage or demand. By any employee or former employee of Provider or any of
its CSRs, agents or subcontractors for which Providers liability to such person or entity would
otherwise be subject to payments under state workers compensation or similar as per Indian
Contract Laws mention to Provider, at its own expense, agrees to defend Seller, at Sellers request
against any such liability, cause of action, lawsuit, penalty, claim, damage or demand. The
foregoing indemnity shall be in addition to any other indemnity obligations of Provider set forth
in this Agreement. The foregoing indemnity shall be in addition to any other indemnity
obligations of Provider set forth in this Agreement.</li>
<br />
<h4 className="text-md font-semibold    ">6.1 Indemnification by Seller</h4>
<br />
<li>Subject to the limitations of the liability provisions of Section 6.3.2 of this Agreement, provided
that Provider cooperates with Seller, Seller agrees to indemnify and hold Provider and its
affiliates, and their respective officers, directors, shareholders, members, partners, employees,
agents and other personnel, harmless from any loss, liability, damages or costs based on the
operations of any Products or any infringement by the Products of any patent or proprietary right
of a third party. Provider agrees to notify Seller promptly of any written claims or demands
against Provider for which Seller is responsible hereunder. Seller shall have no liability for, and
Provider shall indemnify and hold Seller and its affiliates, and their respective officers,directors,
shareholders, members, partners, employees, agents and other personnel, harmless from and
against, any claim based upon Providers conduct, if such infringement, cause of action or other
damage would have been avoided but for that conduct.</li>
<br />
<h4 className="text-lg font-semibold    ">7. GENERAL PROVISIONS</h4>
<br />
<h4 className="text-md font-semibold    ">7.1 Non-Disclosure</h4>
<br />
<li>7.1.1 As used in this Section 6.1, &quot;Confidential Information&quot; means private, confidential, trade
secret or other proprietary information (whether or not embodied or contained in some tangible
form) relating to any actual or anticipated business of [Gleam Global Services India Pvt Ltd],
as applicable, and their respective affiliates, or any information which, if kept secret, will provide
the party disclosing such Confidential Information (in each case a &quot;Discloser&quot;) an actual or
potential economic advantage over others in the relevant trade or industry.
<br /><br />7.1.2 As defined herein, Confidential Information includes, without limitation, formulae,
compilations, computer programs and files, devices, methods, techniques, know-how, inventions,
research and development, business data (including cost data), strategies, methods, prospects,
plans and opportunities,customer lists, marketing plans, specifications, financial information,
invention disclosures, patent applications (whether abandoned or not), techniques, products and
services of the Discloser and identified orally or in writing by the Discloser as confidential,
confidence by a third party and made available to the party receiving Confidential Information
(in each case a &quot;Recipient&quot;).
<br /><br />7.1.3 Except as required in the performance of its obligations under this Agreement or with the
prior written authorization of the Discloser, the Recipient shall not directly or indirectly use,
disclose, disseminate or otherwise reveal any Confidential Information and shall maintain
Confidential Information in confidence for a period of Five [5] years from the date of
termination or expiration of this Agreement, for whatever reason. Recipient shall use the same
care and discretion to protect Confidential Information of the Discloser as Recipient uses protect
its own confidential information, but not less than a reasonable standard of care. Recipient shall
restrict use of the Disclosers Confidential Information to its employees, and to those consultants
who have been pre-approved in writing by Discloser, who have a need to know the Confidential
Information and who have a written agreement with Recipient sufficient to comply with this
Agreement.
<br /><br />7.1.4 Nothing contained in this Section 7.1 shall in any way restrict Recipients rights to use,
disclose, or otherwise dispose of any information which:
<br /><br />a) At the time of disclosure by Discloser was already in the possession of Recipient (provided
such information had not been previously furnished to Discloser by Recipient), as shown by a
written record;
<br /><br />b) Is independently made available to Recipient by an unrelated and independent third party
whose disclosure does not constitute a breach of any duty of confidentiality owed to Discloser;
<br /><br />c) Is generally available to the public in a readily-available document; or
<br /><br />d) Is compelled to be disclosed pursuant to a court order, provided that Discloser shall first have
the opportunity to request an appropriate protective order.

<br /><br />7.1.5 Nothing in this Agreement shall be construed as granting any rights or licenses in any
Confidential Information to any person or entity.
<br /><br />7.1.6 Upon termination or expiration of this Agreement for any reason whatsoever, Seller and
Provider shall leave with or return to the other all documents, records, notebooks, computer files,
and similar repositories or materials containing Confidential Information of the other party and
such other party’s affiliates, including any and all copies thereof.
<br /><br />7.1.7 Provider and Seller agree that the terms of this Section 7.1 are reasonable and necessary to
protect their respective business interests and that the other party would suffer irreparable harm
from a breach of this Section 7.1. Thus, in addition to any other rights or remedies, all of which
shall be deemed cumulative, Provider and Seller and/or their respective affiliates, as applicable,
shall be entitled to obtain injunctive relief to enforce the terms of this Section.</li>
<br />
<h4 className="text-md font-semibold    ">7.2 Intellectual property</h4>
<br />
<li>7.2.1 Provider agrees to disclose and furnish promptly to Seller any and all technical
information, computer or other apparatus programs, inventions, specifications, drawings,
records, documentation, works of authorship or other creative works, ideas, knowledge or data,
written, oral or otherwise expressed, first made or created for and paid for by Seller under this
Agreement (hereinafter &quot;Work Product&quot;). The Work Product specifically includes, without
limitation, any scripts, lists of frequently asked questions and responses thereto, etc., prepared
and utilized by Provider in connection with providing Services regarding the Products.
<br /><br />7.2.2 Subject to the provisions of this Section 7.2.2, Provider agrees to assign and does hereby
assign to Seller all right, title and interest in and to any Work Product. To the extent such Work
Product qualifies as a &quot;work made for hire&quot;, it shall be deemed to be such. Notwithstanding the
foregoing, (i) Provider retains for itself a perpetual, nonexclusive, royalty-free, unrestricted right
and license to any structure, architectures, ideas and concepts subsisting in such Work Product,
and (ii) Provider shall be free to independently develop software and other works similar to any
works developed by the performance of the Services under this Agreement, whether by other
employees of PROVIDER, in collaboration with third parties, or for other customers.
<br /><br />7.2.3 Provider agrees to take all reasonable steps, at Sellers expense, to assist Seller in the
perfection of the rights assigned hereunder.
<br /><br />7.2.4 Provider shall not acquire any right to any tradename, trademark, and service mark,
copyright, patent or other form of intellectual property of Seller. Provider shall not use such
intellectual property of Seller in any manner except in the performance of its obligations
hereunder as permitted or contemplated in connection therewith.</li>

<br />
<h4 className="text-md font-semibold    ">7.3. Severability; Waiver</h4>
<br />
<li>If any of the provisions of this Agreement shall be held invalid or unenforceable by reason of the
scope or duration thereof or for any other reason, such invalidity or unenforceability shall attach
to the particular aspect of such provision found invalid or unenforceable and shall not affect any
other provision of this Agreement to the fullest extent permitted by Indian Law, this Agreement
shall be construed as if the scope or duration of such provision had been more narrowly drafted
so as not to be invalid or unenforceable.</li>
<br />
<h4 className="text-md font-semibold    ">7.4 No other Agreements</h4>
<br />
<li>The parties acknowledge having read this Agreement and agree to be bound by its Terms. This
Agreement supersedes and replaces any existing agreement written or otherwise, entered into
between or among Seller and Provider relating to the subject matter hereof except that the
provisions of that certain Nondisclosure Agreement, dated 24/02/2024, between Seller and
Provider, shall remain in full force and effect as it relates to the exchange of information between
the parties from the date of such Nondisclosure Agreement through the date of this Agreement.</li>
<br />
<h4 className="text-md font-semibold    ">7.5 Assignability</h4>
<br />
<li>This Agreement shall not be assigned by either party without the prior written consent of the
other party, which shall not be unreasonably withheld or delayed, except that Seller may assign
this Agreement or any of its rights and responsibilities hereunder, in whole or in part, to any
affiliate or any entity which acquires all or substantially all of the assets or operations of its
Internet-related services business dealing with the Products, with notice to but without the
consent of Provider. Any such attempted assignment lacking consent where required shall be null
and void.</li>
<br />
<h4 className="text-md font-semibold    ">7.6 Governing Law</h4>
<br />
<li>This Agreement shall be governed by and construed in accordance with the laws of the State of
Karnataka with jurisdiction area of Bengaluru, with regard to its choice of law provisions and not
following policy of NDA can lead to any of the party to seek justice in count of Karnataka</li>
<br />
<h4 className="text-md font-semibold    ">7.7 Force majeure; Disaster recovery</h4>
<br />
<li>Each party shall be released from and shall have no liability for any failure beyond its reasonable
control, including, but not limited to, acts of God, labor troubles, strikes, lockouts, severe
weather, Pandemic, Delay or default of utilities or communications companies or accidents.</li>
<br />
<h4 className="text-md font-semibold    ">7.8 Independent contractor</h4>
<br />
<li>With respect to all matters relating to this Agreement, Provider shall be deemed to be an
independent contractor. Provider shall not represent itself or its organization as having any
relationship to Seller Other than that of an independent agent for the limited purposes described
in this Agreement.</li>
<br />
<h4 className="text-md font-semibold    ">7.9 Authorized representatives</h4>
<br />
<li>Provider shall designate and maintain at all times hereunder a project manager to serve as a
single point of contact for Seller to assist in the resolution of all technical, operational and
implementation- Related matters. Provider shall endeavor not to change such project manager
without Sellers approval, and in any event shall notify Seller of any such changes. In addition,
each party shall, at all times, Designate one representative who shall be authorized to take any
and all action and/or grant any approvals required in the course of performance of this
Agreement. Such representations shall be fully authorized to act for and bind such party
including the approval of amendments to this Agreement. Until written notice to the contrary (as
delivered in accordance with Section 7.9), the authorized representatives of the parties are as
follows:</li>
<br />
<li>[Call Centre
Projects Service]
<br />
(The Seller&quot;), a company organized and existing under the laws of the
Karnataka, with its head office located at: Level 7, Phase-4, Near IBM
India,Manyata Tech Park,Hebbal Outer Ring Road, Bangalore 560 045
Karnataka
<br />
[Gleam Global
Services India Pvt
Ltd]
<br />
No. 221 Thillai Nagar Gandhi Nagar Post, Chennai, Tamilnadu, 607308
</li>
<br />
<h4 className="text-md font-semibold    ">7.10 Notices</h4>
<br />
<li>Any notice required or permitted hereunder shall be deemed sufficient if given in writing and
delivered personally, by facsimile transmission, by reputable overnight courier service or mail,
postage prepaid, to the addresses shown below or to such other addresses as are specified by
similar notice, and shall be deemed received upon personal delivery, upon confirmed facsimile
receipt, 30 Thirty days following deposit with such courier service, or 15 Fifteen days from
deposit in the mails, in each case as herein provided:
<br />
A party may change its address and the name of its designated recipient of copies of notices for
purposes of this Agreement by giving the other parties written notice of the new name and the
address, phone and facsimile number of its designated recipient in accordance with this Section
6.9 which should be provided to each party within Thirty days (30) of amendment.</li>

<br />
<h4 className="text-md font-semibold    ">7.11 Representations</h4>
<br />
<li>Except as noted herein, no employee, agent or representative of either party will have the
authority to bind the other party to any representation, oral or written, or any warranty
concerning the Services or the performance of the Services.</li>
<br />
<h4 className="text-md font-semibold    ">7.12 Arbitration</h4>
<br />
<li>Any claim, dispute or difference relating to or arising out of this agreement shall be referred to
the Bangalore International Mediation, Arbitration and Conciliation Centre (BIMACC) of
the 31, Nandidurg Road, Jayamahal, Bangalore - 560046, Karnataka which will appoint the Sole
Arbitrator and will conduct the Arbitration in accordance with its rules for conduct of Arbitration
proceedings then in force and applicable to the proceedings.<br/>
If the parties desire to appoint three arbitrators, then while each of the parties shall appoint one
Arbitrator, the Centre will appoint the third arbitrator who shall act as the Presiding Arbitrator.
Such arbitration shall be the sole and exclusive remedy between the parties with respect to all
such disputes. The arbitration shall take place in Chennai, Tamil Nadu and the proceedings shall
be in English. The Arbitration Award shall be final and binding on the parties.</li>
<br />
<h4 className="text-md font-semibold    ">7.13 Electronic Signatures</h4>
<br />
<li>Each party agrees that the electronic signatures, whether digital or encrypted, of the parties
included in this Agreement, if any, are intended to authenticate this writing and to have the same
force and effect as manual signatures. The term “electronic signature” means any electronic
sound, symbol, or process attached to or logically associated with a record and executed and
adopted by a party with the intent to sign such record, including facsimile or email electronic
signatures. Without limiting the generality of the foregoing, delivery of an executed
counterpart’s signature page of this Agreement, by facsimile, electronic mail in portable
document format (.pdf) or by any other electronic means intended to preserve the original
graphic and pictorial appearance of a document, has the same effect as delivery of an executed
original of this Agreement.</li>
<li><b>IN WITNESS WHEREOF</b>, the parties have executed this Agreement as of the date first above
written.</li>
<br />
                </ul>
              </section>
              <section
                id="sec02"
                className="section02 "
                data-section-name="sec02"
              >
                <h3 className="h3 text-muted">Inquiry Policy</h3>
                <ul>
                  <li>At Call Center Projects Service India, we value the input and inquiries of our customers, partners, and
stakeholders. Our Inquiry Policy outlines our commitment to addressing inquiries in a timely and
thorough manner. <br />
Here are the terms related to the availability of inquiries shared with other branches or contract
holders:</li>
<br />
<h4 className="text-md font-semibold    ">1. Inquiries Availability:</h4>
<br />
<li>The availability of inquiries shared with other branches or contract holders is subject to the operational
status and working hours of those branches or contract holders. Inquiries will be shared when the
receiving branch or contract holders is open and able to address the inquiry promptly.</li>
<br />
<h4 className="text-md font-semibold    ">2. Inquiries Responsibility:</h4>
<br />
<li>CALL CENTER PROJECTS SERVICE INDIA does not provide any guarantee or take responsibility for the
availability of inquiries. If inquiries are not accessible through our Communication Channels, branches or
contract holders have the option to generate inquiries through their own channels. Please note that the
availability of inquiries is subject to various factors and may not always be guaranteed.</li>
<br />
<h4 className="text-md font-semibold    ">3. Inquiry Channels:</h4>
<br />
<li>We provide multiple channels for individuals to submit their inquiries, including email, phone, and an
online inquiry form on our website. We strive to make these channels easily accessible and user-
friendly.</li>
<br />
<h4 className="text-md font-semibold    ">4. Communication Channels:</h4>
<br />
<li>Inquiries will be shared with other branches or contract holders through designated communication
channels, such as secure internal messaging systems, email, or other approved methods. These channels
ensure the secure transfer of information between branches.</li>
<br />
<h4 className="text-md font-semibold  ">5. Response Time:</h4>
<br />
<li>We understand the importance of prompt responses and aim to acknowledge all inquiries within 1
hours of receipt. Our team will make every effort to provide a comprehensive response within 1
business days, depending on the complexity of the inquiry.</li>
<br />
<h4 className="text-md font-semibold  ">6. Inquiry Categorization:</h4>
<br />
<li>To ensure efficient handling of inquiries, we categorize them based on their nature and urgency. This
allows us to prioritize and allocate appropriate resources to address each inquiry effectively.</li>
<br />
<h4 className="text-md font-semibold   ">7. Information Required:</h4>
<br />
<li>To facilitate a thorough and accurate response, we kindly request individuals to provide relevant details
related to their inquiry. This may include their name, contact information, specific questions or
concerns, and any supporting documentation or context that can help us better understand their
inquiry.</li>
<br />
<h4 className="text-md font-semibold    ">8. Escalation Process:</h4>
<br />
<li>In the event that an inquiry requires further attention or resolution, we have an escalation process in
place. Our team will escalate the inquiry to the appropriate department or management level to ensure
a satisfactory response.</li>
<br />
<h4 className="text-md font-semibold    ">9. Confidentiality and Privacy:</h4>
<br />
<li>We understand the importance of customer privacy and treat all enquiries with the utmost
confidentiality. Any personal information shared during the enquiry process will be handled in
accordance with our Privacy Policy.</li>
<br />
<h4 className="text-md font-semibold    ">10. Continuous Improvement:</h4>
<br />
<li>We are committed to continuously improving our inquiry handling process. Feedback from individual’s
branches and contract holders regarding our response time, clarity of communication, and overall
satisfaction is highly valued and helps us enhance our services.</li>
<br />
<h4 className="text-md font-semibold    ">11. Stakeholder Engagement:</h4>
<br />
<li>We recognize the importance of engaging with our stakeholders and addressing their inquiries. We
strive to provide transparent and informative responses that address their concerns and contribute to a
positive relationship.</li>
<br />
<h4 className="text-md font-semibold    ">12. Accountability and Auditability:</h4>
<br />
<li>We maintain records of inquiries shared with other branches, including details of the individuals
involved, the purpose of sharing, and the date of sharing. This allows us to maintain accountability and
enables auditing of our inquiry handling processes.</li>
<br />
<h4 className="text-md font-semibold    ">13. Customer Satisfaction:</h4>
<br />
<li>Our ultimate goal is to ensure customer satisfaction. We encourage customers to provide feedback on
their experience with our enquiry handling process, as it allows us to identify areas for improvement and

deliver a better customer experience on the positive customers feedback based inquires allotted.
Negative feedback will impact the inquiry allotment to branches and contract holders</li>
<br />
<h4 className="text-md font-semibold    ">14. Retention and Disposal:</h4>
<br />
<li>Inquiries shared with other branches or contract holders will be retained only for as long as necessary to
address the inquiry and fulfill any legal or regulatory requirements. Once the inquiry is resolved, any
shared information will be disposed of securely and in compliance with our data retention policies.</li>
<br />
<h4 className="text-md font-semibold    ">15. Compliance and Legal Considerations:</h4>
<br />
<li>Our inquiry handling process complies with all applicable laws, regulations, and industry standards. We
ensure that our responses are accurate, truthful, and in compliance with any legal requirements.
By accepting these Inquiry Policy, you confirm that you have carefully read, comprehended, and agreed
to comply with all the provisions stated above.</li>

                 
                </ul>
              </section>
              <section
                id="sec04"
                className="section04 "
                data-section-name="sec04"
              >
                <h3 className="h3 text-muted mt-4">Privacy Policy</h3>
                <ul>
                <li>At Sky Voice Technologies, we are committed to protecting the privacy and confidentiality of our agents&#39;
personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard the
personal information provided to us by our agents. By becoming an agent for Sky Voice Technologies,
you consent to the practices described in this policy.
</li>
<br />
                <h4 className="text-md font-semibold    ">1. Information Collection:</h4>
<br />
<li>o We may collect personal information such as name, contact details, identification
documents, and payment information when you apply to become an agent. <br />
o We may also collect non-personal information such as IP addresses, browser type, and
device information for analytical purposes.</li>
<br />
                <h4 className="text-md font-semibold    ">2. Use of Information:</h4>
<br />
<li>o We use the collected information to evaluate your eligibility as an agent, communicate
with you, and manage our agent relationship. <br />
o Personal information may be used for onboarding, training, commission calculations,
and providing necessary support. <br />
o Non-personal information may be used for statistical analysis, troubleshooting, and
enhancing our agent program.</li>
<br />
                <h4 className="text-md font-semibold    ">3. Information Sharing:</h4>
<br />
<li>o We may share personal information with trusted third-party service providers who
assist us in managing our agent program and providing necessary services. <br />
o We do not sell, trade, or rent personal information to third parties for marketing
purposes without your explicit consent. <br />
o We may disclose personal information if required by law or to protect our rights,
property, or safety.</li>
<br />
                <h4 className="text-md font-semibold    ">4. Data Security:</h4>
<br />
<li>o We may share personal information with trusted third-party service providers who
assist us in managing our agent program and providing necessary services. <br />
o We do not sell, trade, or rent personal information to third parties for marketing
purposes without your explicit consent. <br />
o We may disclose personal information if required by law or to protect our rights,
property, or safety.</li>
<br />
                <h4 className="text-md font-semibold    ">5. Retention of Information:</h4>
<br />
<li>o We retain personal information for as long as necessary to fulfill the purposes outlined
in this Privacy Policy, unless a longer retention period is required or permitted by law.</li>
<br />
                <h4 className="text-md font-semibold    ">6. Cookies and Tracking Technologies:</h4>
<br />
<li>o We may use cookies and similar tracking technologies to enhance your experience and
gather information about your usage patterns. <br />
o You can modify your browser settings to manage cookies or opt-out of certain tracking
technologies, although this may affect functionality.</li>
<br />
                <h4 className="text-md font-semibold    ">7. Third-Party Links:</h4>
<br />
<li>o Our services may contain links to third-party websites or services. We are not
responsible for the privacy practices or content of these third parties.</li>
<br />
                <h4 className="text-md font-semibold    ">8. Changes to the Privacy Policy:</h4>
<br />
<li>o We reserve the right to update or modify this Privacy Policy at any time. Any changes
will be effective upon posting the revised policy on our website.</li>
<br />
<li>If you have any questions or concerns about our Privacy Policy or the handling of your personal
information as an agent, please contact us through the provided channels. We are committed to
addressing any inquiries and resolving any issues promptly and fairly.</li>
<br />
<h4 className="text-md font-bold    "> Customer Privacy Policy </h4>
<br />
<li>As an agent for Sky Voice Technologies, you are entrusted with access to customer information and
must adhere to strict privacy guidelines to protect the confidentiality and privacy of our customers.
These customer privacy terms outline your responsibilities as an agent in handling customer
information.</li>
<br />
<h4 className="text-md font-semibold    "> 1. Confidentiality:</h4>
<br />
<li>o You must treat all customer information as confidential and not disclose it to any
unauthorized individuals or third parties. <br />
o Customer information includes personal details, contact information, transaction
history, and any other information obtained during the course of your agent duties.</li>

<br />
<h4 className="text-md font-semibold    "> 2. Use of Customer Information: </h4>
<br />
<li>o You may only use customer information for the purpose of providing services and
support related to Sky Voice Technologies products and services. <br />
o Any use of customer information beyond the scope of your agent duties is strictly
prohibited.</li>

<br />
<h4 className="text-md font-semibold    "> 3. Data Security: </h4>
<br />
<li>o You must implement appropriate security measures to protect customer information
from unauthorized access, loss, or disclosure. <br />
o This includes safeguarding physical documents, using secure computer systems, and
employing strong passwords and encryption where applicable.</li>

<br />
<h4 className="text-md font-semibold    "> 4. Consent and Authorization: </h4>
<br />
<li>o You may only access and use customer information with the explicit consent and
authorization of the customer or as required by law. <br />
o You must obtain consent from customers before collecting, using, or disclosing their
personal information.</li>

<br />
<h4 className="text-md font-semibold    "> 5. Data Retention:</h4>
<br />
<li>o You must only retain customer information for as long as necessary to fulfill the purpose
for which it was collected or as required by law. <br />
o Once customer information is no longer needed, it must be securely disposed of or
anonymized to prevent unauthorized access.</li>

<br />
<h4 className="text-md font-semibold    "> 6. Third-Party Disclosure:</h4>
<br />
<li>o You must not disclose customer information to any third parties unless explicitly
authorized by the customer or required by law. <br />
o If a customer requests their information to be shared with a third party, you must
obtain their explicit consent before proceeding.</li>
<br />
<h4 className="text-md font-semibold    "> 7. Reporting Breaches: </h4>
<br />
<li>o In the event of a data breach or unauthorized access to customer information, you must
immediately report the incident to Sky Voice Technologies&#39; designated authority. <br />
o Prompt reporting allows us to take appropriate measures to mitigate any potential harm
to our customers.</li>
<br />
<h4 className="text-md font-semibold    "> 8. Compliance with Laws: </h4>
<br />
<li>o You must comply with all applicable privacy laws and regulations, including but not
limited to data protection and privacy laws in your jurisdiction.</li>
<br />
<li>Failure to comply with these customer privacy terms may result in termination of your agent agreement
and may also lead to legal consequences. It is essential to prioritize the privacy and security of our
customers&#39; information at all times. <br /> <br />
If you have any questions or require further clarification regarding customer privacy terms, please
contact our customer support team.</li>
<h4 className="text-md font-bold    ">Terms and Conditions for Agents</h4>
<br />
<li>Please read these Terms and Conditions (&quot;Terms&quot;) carefully before becoming an agent for Sky Voice
Technologies. These Terms govern your engagement as an agent and your responsibilities while
providing services on behalf of Sky Voice Technologies. By becoming an agent, you agree to be bound by
these Terms.</li>
<br />
<h4 className="text-md font-semibold    ">1. Agent Engagement:</h4>

<li>o By accepting to work as an agent for Sky Voice Technologies, you enter into an
agreement to provide services on behalf of the company. <br />
o The specific terms and conditions of your engagement as a Sky Voice Technologies agent
will be outlined in a separate contract or agreement between Call Center Projects
Service India and yourself.</li>
<br />
<h4 className="text-md font-semibold    ">2. Service Requirements:</h4>
<br />
<li></li>

<br />
<h4 className="text-md font-semibold    ">1. Agent Engagement:</h4>
<br />
<li>o As an agent, you are responsible for providing Sky Voice Technologies as per the
requirements and guidelines provided by Call Center Projects Service India. <br />
o You must adhere to the project-specific instructions, scripts, and performance metrics
provided by Call Center Projects Service India.</li>

<br />
<h4 className="text-md font-semibold    ">3. Confidentiality:</h4>
<br />
<li>o You agree to maintain the confidentiality of any proprietary or sensitive information
shared with you during the course of your engagement as an agent. <br />
o You must not disclose or use any confidential information for personal gain or to the
detriment of Sky Voice Technologies or its clients.</li>

<br />
<h4 className="text-md font-semibold    ">4. Compliance with Laws:</h4>
<br />
<li>o You must comply with all applicable laws, regulations, and industry standards while
providing services as an agent for Sky Voice Technologies. <br />
o This includes but is not limited to compliance with data protection, privacy, and
telemarketing laws.</li>

<br />
<h4 className="text-md font-semibold    ">5. Performance and Quality:</h4>
<br />
<li>o You are expected to perform your duties diligently and to the best of your abilities. <br />
o Call Center Projects Service India may monitor and evaluate your performance to ensure
quality standards are met.</li>

<br />
<h4 className="text-md font-semibold    ">6. Payment Terms:</h4>
<br />
<li>o The payment terms, including rates, payment cycles, and payment methods, will be
specified in the contract or agreement between Call Center Projects Service India and
yourself. <br />

o You agree to abide by the agreed-upon payment terms and provide accurate
information for payment processing.</li>

<br />
<h4 className="text-md font-semibold    ">7. Termination:</h4>
<br />
<li>o Either party may terminate the agent engagement by providing written notice to the
other party. <br />
o Termination may be subject to specific terms and conditions outlined in the contract or
agreement.</li>

<br />
<h4 className="text-md font-semibold    ">8. Intellectual Property:</h4>
<br />
<li>o Any intellectual property rights associated with the Sky Voice Technologies or Call
Center Projects Service India, including scripts, training materials, and software, shall
remain the property of Call Center Projects Service India or its licensors. <br />
o You shall not use, reproduce, modify, or distribute any of the intellectual property
without the prior written consent of Call Center Projects Service India.</li>

<br />
<h4 className="text-md font-semibold    ">9. Limitation of Liability:</h4>
<br />
<li>o Call Center Projects Service India and Sky Voice Technologies, including their respective
officers, directors, employees, and agents, shall not be held liable for any direct,
indirect, incidental, consequential, or punitive damages arising from or in connection
with your engagement as an agent or any matters related to the call center projects and
sky voice technologies.</li>

<br />
<h4 className="text-md font-semibold    ">10. Governing Law:</h4>
<br />
<li>o These Terms and the agent engagement shall be governed by and construed in
accordance with the laws of India.</li>

<br />
<li>
Please note that these Terms and Conditions are a general overview and may not cover all aspects of the
agent engagement. The specific terms and conditions of your engagement will be outlined in the
contract or agreement between Call Center Projects Service India and yourself. <br /> <br />
If you have any questions or concerns about these Terms and Conditions, please contact Call Center
Projects Service India <a href="https://callcentreproject.com/contact">https://callcentreproject.com/contact</a>  for further clarification.
</li>

                </ul>
              </section>
              <section
                id="sec05"
                className="section05 "
                data-section-name="sec05"
              >
                <br />
                <h3 className="h3 text-muted">Refund policy</h3>
                <ul>
                  <li>At Call Center Projects Service India, we strive to provide excellent service and ensure client satisfaction.
However, it is important to note that we are not responsible for any investments, infrastructure setup or
salary commitments made by our clients or contract holders. Please review our refund policy below:</li>
<br />
                <h4 className="text-md font-semibold    ">1. Service Fees:</h4>
<br />
<li>Our service fees are non-refundable (except in some scenario). Once the payment is made for our Call
Center Projects Service India, it is considered as a commitment to engage our services. </li>
<br />
                <h4 className="text-md font-semibold    ">2. Investment Responsibility:</h4>
<br />

<li>We do not take responsibility and not liable for any investments, made by our clients or contract
holders, including infrastructure setup, equipment purchase, or any other financial commitments
related to the Call Center Projects Service India. </li>
<br />
                <h4 className="text-md font-semibold    ">3. Salary Commitments:</h4>
<br />
<li>We are not responsible for any salary commitments made by our clients or contract holders to their
employees or agents. It is the client&#39;s or contract holder’s responsibility to manage and fulfill any salary
obligations. </li>
<br />
                <h4 className="text-md font-semibold    ">4. Project Performance:</h4>
<br />
<li> We strive to deliver high-quality call center projects and meet the agreed-upon performance metrics.
However, due to various factors beyond our control, such as market conditions or client-specific
requirements, we cannot guarantee specific outcomes or results.</li>
<br />
                <h4 className="text-md font-semibold    ">5. Refund Considerations:</h4>
<br />
<li>If any payment directly paid to Call Center Projects Service India is considered in exceptional cases
where we are unable to deliver the agreed-upon services due to unforeseen circumstances or factors
within our control, we may consider a refund on a case-by-case basis. Such requests will be thoroughly
evaluated, and any refund decision will be at our sole discretion. </li>
<br />
                <h4 className="text-md font-semibold    ">6. Refund Request Process:</h4>
<br />
<li> If you believe you have a valid reason for a refund payment directly paid to Call Center Projects Service
India, please contact our customer support team with detailed information and supporting
documentation. We will review your request and respond within a reasonable timeframe.</li>
<br />
                <h4 className="text-md font-semibold    ">7. Partial Refunds:</h4>
<br />
<li> In some cases, if a refund is approved, it may be provided as a partial refund based on the services
already rendered or costs incurred by Call Center Projects Service India.</li>
<br />
                <h4 className="text-md font-semibold    ">8. Non-Refundable Expenses:</h4>
<br />
<li>Please note that any expenses incurred by the client or contract holders, such as third-party services,
software licenses, or other related costs, are non-refundable and will not be considered for
reimbursement. <br />
It is essential for clients to carefully evaluate their requirements and commitments before engaging our
Call Center Projects Service India. We recommend conducting thorough due diligence and seeking legal
or financial advice if necessary. <br />
If you have any further questions or require clarification regarding our refund policy, please feel free to
contact our customer support team. We are here to assist you and provide any necessary information. </li>
                </ul>
              </section>
              <section
                id="sec06"
                className="section05 "
                data-section-name="sec06"
              >
                <h3 className="h3 text-muted mt-4">Payment policy</h3>
                <ul>
               <li>Once the Contract is agreed and approved by Call Center Projects Service India, the Contract Holders
have the opportunity to act as <b> Sky Voice Technologies Agents.</b> <br />
At Call Center Projects Service India, we value partnerships and collaborations that benefit both parties
involved. Once the contract between Call Center Projects Service India and the Contract Holders is
agreed upon and approved, the Contract Holders have the option to become agents for Sky Voice
Technologies. <br />
As Sky Voice Technologies agents, the Contract Holders will have the opportunity to promote and sell
Sky Voice Technologies products and services. This includes but is not limited to Toll-Free Numbers,
Virtual Numbers, and other offerings provided by Sky Voice Technologies. <br />
By acting as agents, the Contract Holders can earn commissions based on the sales they generate. The
commission structure will be outlined in Payment Policy of contract between Call Center Projects Service
India and the Contract Holders. <br />
It is important for the Contract Holders to adhere to the sales policies, guidelines, and terms and
conditions set forth by Sky Voice Technologies. Any violation of these policies may result in the
termination of the agent agreement. <br />
If you have any further questions or require clarification regarding the agent agreement or the
responsibilities of being a Sky Voice Technologies agent, please feel free to contact our customer
support team. We are here to assist you and provide any necessary information.
<br />
At Sky Voice Technologies, we value the contributions of our agents in promoting and selling our
products. Please review our payment policy for the commission structure on the sale of Toll-Free
Numbers, Virtual Numbers, and other products:</li>
<br />
<h4 className="text-md font-semibold    "> 1. Commission Structure:</h4>
<br />
<li>Once a sale is successfully made by an agent, a commission of 50% will be provided. The commission
structure may vary depends on product, verify the product commission in CRM Product page. This
commission is calculated based on the product price, exclusive of any government taxes or additional
charges.</li>
<br />
<h4 className="text-md font-semibold    "> 2. Eligibility for Commission: </h4>
<br />
<li>To be eligible for the commission, the sale must meet the following criteria:
<br />
o The sale must be a valid purchase of a Toll-Free Number, Virtual Number, or any other
product offered by Sky Voice Technologies. <br />
o The payment for the purchase must be successfully received and processed to Sky Voice
Technologies.</li>
<br />
<h4 className="text-md font-semibold    "> 3. Payment Processing Time:</h4>
<br />
<li>The commission payment will be processed within a reasonable timeframe after the successful
completion of the sale. The exact processing time may vary depending on factors such as payment
method and financial institution involved.</li>
<br />
<h4 className="text-md font-semibold    ">4. Payment Method:</h4>
<br />
<li>The commission payment will be made using the preferred payment method specified by the agent. We
offer various payment options, including bank transfers, or other mutually agreed-upon methods.</li>
<br />
<h4 className="text-md font-semibold    "> 5. Government Taxes and Charges: </h4>
<br />
<li>Please note that the commission is calculated based on the product price exclusive of any government
taxes or additional charges. Any applicable taxes or charges imposed by the government will be
deducted from the product price before calculating the commission.</li>
<br />
<h4 className="text-md font-semibold    "> 6. Commission Disputes: </h4>
<br />
<li>In the event of any disputes or discrepancies regarding the commission payment, we encourage agents
to contact our finance department or designated point of contact. We will investigate the matter and
resolve it in a fair and timely manner.</li>
<br />
<h4 className="text-md font-semibold    "> 7. Non-Commissionable Sales:</h4>
<br />
<li>Certain sales may be deemed non-commissionable, such as sales made to ineligible customers or sales
that violate our terms and conditions. In such cases, no commission will be provided. <br />

It is important for agents to adhere to our sales policies and guidelines while promoting and selling Sky
Voice Technologies products. Any violation of these policies may result in the forfeiture of commission
or termination of the agent&#39;s agreement with Sky Voice Technologies. <br />
If you have any further questions or require clarification regarding our payment policy, please feel free
to contact our finance department or designated point of contact. We are here to assist you and provide
any necessary information.</li>
                </ul>
              </section>
              <section
                id="sec07"
                className="section05 "
                data-section-name="sec07"
              >
              <div className="">
                <hr className="my-2" />
                {!isAgreed && (
                  <>
                    <p className="text-muted fs-12">
                      By clicking on &quot;Sign&quot;, I consent to be legally
                      bound by this electronic representation of my signature.
                    </p>

                    <div className="col-lg-12 shadow-sm ">
                      <div className="sig_container bg-white border shadow">
                        <SignatureCanvas
                          ref={signaturePadRef}
                          canvasProps={{
                            className: "sign",
                          }}
                          placeholder="Sign"
                          onEnd={handleSignatureEnd}
                          penColor="black"
                        />
                      </div>
                      {signatureErr && (
                        <span className=" text-red-500 text-xs py-2">{signatureErr}</span>
                      )}
                      <div className="bg-white ">
                        <button
                          className="btn btn-secondary bg-secondary btn-sm my-2"
                          onClick={clearSignature}
                          type="button"
                        >
                          Clear
                        </button>
                      </div>
                   
                    </div>
                    
                  </>
                )}
              </div>
              </section>
            </SimpleBar>
          </div>
        )}
        {isAgreed && (
          <div className="col-xxl-12">
            {isAgreed && (
              <div className="text-center pb-2">
                <div className="mb-4">
                  <lord-icon
                    src="https://cdn.lordicon.com/lupuorrc.json"
                    trigger="loop"
                    colors="primary:#0ab39c,secondary:#405189"
                    style={{
                      width: "120px",
                      height: "120px",
                    }}
                  ></lord-icon>
                </div>
                <h5 className="h5 ">
                  Signed Successfully!
                   {/* Download Agreement and Send Email
                  Confirmation */}
                </h5>
                {/* {currentprocessStep == 1 && (
                  <div className="text-start mx-5 mt-3">
                    <h4 className="h4 text-muted">
                      Step 1 : Download the Agreement{" "}
                    </h4>
                    <p className="container text-left text-muted">
                      Congratulations! Your agreement has been successfully
                      signed. To access a copy for your records, simply click
                      the "Download Agreement" button below.
                    </p>
                 
                  </div>
                )} */}
                {/* step 2 */}
                {/* {currentprocessStep == 2 && (
                  <div className="text-start mx-5 mt-3">
                    <h4 className="h4 text-muted">Step 2 : Compose Email </h4>
                    <p className="container text-left text-muted">
                      <b>Email to : </b>
                      <span ref={emailToRef}>
                        demomail@ccp.com
                        <OverlayTrigger
                          delay={{ hide: 450, show: 300 }}
                          overlay={(props) => (
                            <Tooltip {...props}>{emailToCopy}</Tooltip>
                          )}
                          placement="bottom"
                        >
                          <i
                            className="ri-file-copy-line cursor-pointer ml-2 text-primary fill-indigo-500"
                            onClick={() => copyEmailTo()}
                          ></i>
                        </OverlayTrigger>
                      </span>
                    </p>
                    <p className="container text-left text-muted">
                      <b>Email subject : </b>
                      <span ref={emailSubjectRef}>
                        Confirmation of Agreement Acceptance
                        <OverlayTrigger
                          delay={{ hide: 450, show: 300 }}
                          overlay={(props) => (
                            <Tooltip {...props}>{emailsubCopy}</Tooltip>
                          )}
                          placement="bottom"
                        >
                          <i
                            className="ri-file-copy-line cursor-pointer ml-2 text-primary fill-indigo-500"
                            onClick={() => copyEmailSubject()}
                          ></i>
                        </OverlayTrigger>
                      </span>
                    </p>
                    <p className="container text-left text-muted">
                      <b>Email Body : </b>
                      <span ref={emailBodyRef}>
                        I have downloaded, reviewed, and signed the agreement.
                        By sending this email, I confirm my acceptance of the
                        terms and conditions outlined in the agreement. Attached
                        to this email, you will find a copy of the signed
                        agreement for your records.
                        <OverlayTrigger
                          delay={{ hide: 450, show: 300 }}
                          overlay={(props) => (
                            <Tooltip {...props}>{emailBodycopy}</Tooltip>
                          )}
                          placement="bottom"
                        >
                          <i
                            className="ri-file-copy-line cursor-pointer ml-2 text-primary fill-indigo-500"
                            onClick={() => copyEmailBody()}
                          ></i>
                        </OverlayTrigger>
                      </span>
                    </p>
                    <div>
                      <button
                        className="btn btn-success bg-success float-right"
                        onClick={() => {
                          setCurrentProcessStep(3);
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )} */}
                {/* step 3 */}
                {/* {currentprocessStep == 3 && (
                  <div className="text-start mx-5 mt-3">
                    <h4 className="h4 text-muted">
                      Step 3 : Sent the Agreement{" "}
                    </h4>
                    <p className="container text-left text-muted">
                      Once the email is sent to us, you can click on the
                      "Agreement Sent" button to continue to your dashboard and
                      we will verify it within 48 hours if not verified account
                      will be temporarily suspended.
                    </p>
                  
                  </div>
                )} */}

<VerifyAgreement
                                    // handleActiveForm={activeFormHandle}
                                    isSigned={true}
                                  />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 text-end mr-6">
        {!isAgreed && (
          <button
            type="button"
            className="btn btn-success bg-success text-center ms-auto nexttab "
            onClick={() => {
              handleSubmit();
            }}
          >
            Sign
          </button>
        )}
        {isAgreed && (
          <>
            <div className="flex justify-around items-center">
              {/* {currentprocessStep == 1 && (
                <div>
                  <button
                    type="button"
                    className="btn btn-warning bg-warning"
                    onClick={(e) => handleDownloadAgreement(e)}
                  >
                    Donwload Agreement
                  </button>
                </div>
              )} */}
              {currentprocessStep == 3 && (
                <>
                  <div>
                    <button
                      className="btn btn-warning bg-warning"
                      onClick={() => setCurrentProcessStep(2)}
                    >
                      Back
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success bg-success"
                      onClick={(e) => handleSentAgreement(e)}
                    >
                      Agreement Sent
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}