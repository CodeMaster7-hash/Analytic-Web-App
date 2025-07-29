import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeTable from "../../../../common/Table/Table";
import HeaderWithSort from "../../../../common/Table/TableComponents/TableHeaderWithSort";
import { apiEndpoints } from "../../../../../config/apiEndpoints";

export default function LoyalityFraud() {
  const [fraudEvents, setFraudEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFraudData = async () => {
      try {
        const response = await axios.get(apiEndpoints.fraudReport);
        const formatted = response.data.map((event, idx) => ({
          sn: idx + 1,
          tid: event.transactionId,
          customerId: event.customerId,
          type: event.type, 
          points: event.points ?? 0,
          amount: event.amount ?? 0,
          dte: event.date ? new Date(event.date).toISOString() : new Date().toISOString(),
          details: event.details || "No details available",
        }));
        setFraudEvents(formatted);
      } catch (error) {
        console.error("Error fetching fraud data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchFraudData();
  }, []);

  const typeOptions = [...new Set(fraudEvents.map(t => t.type))];

  const columns = [
    { accessorKey: "sn", header: "Serial No.", cell: ({ row }) => row.original.sn },
    { accessorKey: "tid", header: ({ column }) => <HeaderWithSort column={column} title="Transaction ID" /> },
    { accessorKey: "customerId", header: ({ column }) => <HeaderWithSort column={column} title="Customer ID" /> },
    { accessorKey: "type", header: ({ column }) => <HeaderWithSort column={column} title="Type" /> },
    { accessorKey: "points", header: ({ column }) => <HeaderWithSort column={column} title="Points" />, cell: ({ getValue }) => getValue().toLocaleString() },
    { accessorKey: "amount", header: ({ column }) => <HeaderWithSort column={column} title="Transaction Amount" />, cell: ({ getValue }) => `$${parseFloat(getValue() || 0).toFixed(2)}` },
    { accessorKey: "dte", header: ({ column }) => <HeaderWithSort column={column} title="Date" />, cell: ({ getValue }) => {
      const date = new Date(getValue());
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }},
    { accessorKey: "details", header: ({ column }) => <HeaderWithSort column={column} title="Details" /> },
  ];

  const filterFields = [
    { type: "text", name: "tid", label: "Transaction ID", placeholder: "Filter by Transaction ID..." },
    { type: "text", name: "customerId", label: "Customer ID", placeholder: "Filter by Customer ID..." },
    { type: "select", name: "type", label: "Fraud Type", options: ["All", ...typeOptions.sort()] },
    { type: "range", name: "points", label: "Points Range", min: -5000, max: 20000, step: 500 },
    { type: "range", name: "amount", label: "Transaction Amount", min: 0, max: 5000, step: 50 },
    { type: "date", name: "dte", label: "Date" },
    { type: "text", name: "details", label: "Details", placeholder: "Filter by details..." },
  ];

  return (
    <HomeTable
      title="Fraud Detect Report"
      data={fraudEvents}
      columns={columns}
      searchField="customerId"
      filterFields={filterFields}
      actionPath="/addfraudcase"
      loading={loading}
    />
  );
}