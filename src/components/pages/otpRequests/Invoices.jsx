import { useEffect, useState } from "react";
import OPTRequestes from "./OPTRequestes";
import { useLazyGetInvoicesAccessKeysQuery } from "../../../services/api";
import Loader from "../Loader";

export default function InvoiceOtpRequests() {
  const [invData, setInvData] = useState()
  const [accessCodesData, setAccessCodesData] = useState()
    const [activeTab, setActiveTab] = useState("active");


  const [getAccessKeys, {data, isLoading}] = useLazyGetInvoicesAccessKeysQuery()

  const handleActiveTab = (tab) => {
    setActiveTab(tab)
  }

  const fetchAccessKeys = async () => {
    const response = await getAccessKeys({ type: activeTab })
    if (response?.data?.status) {
      setInvData(response?.data);
    }
  }

  useEffect(() => {
    fetchAccessKeys()
  },[activeTab])

  return (
    <>
      {isLoading &&  <Loader />}
      <OPTRequestes source={"Invoice"} data={invData} activeTab={activeTab} handleActiveTab={handleActiveTab} />
    </>
  )
}