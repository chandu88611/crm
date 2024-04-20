import { useState, useEffect } from "react";

export default function Logs() {
  const [enquiries, setEnquiries] = useState([]);
  const eventSource = new EventSource(
    "http://localhost:5174/enquiry-transfer/webhook"
  );

  useEffect(() => {
    eventSource.onmessage = (event) => {
      const newEnquiry = JSON.parse(event.data); // Assuming JSON data
      setEnquiries([...enquiries, newEnquiry]);
    };

    return () => eventSource.close(); // Clean up on unmount
  }, []);

  return (
    // Render your component with the enquiries data

    <div >
      <ul>
        {enquiries.map((enquiry,ind) => (
          <li key={ind}>{enquiry}</li>
        ))}
      </ul>
    </div>
  );
}
