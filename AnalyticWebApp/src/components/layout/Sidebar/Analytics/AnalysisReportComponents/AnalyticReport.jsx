import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeTable from '../../../../common/Table/Table';
import HeaderWithSort from "../../../../common/Table/TableComponents/TableHeaderWithSort";
import { apiEndpoints } from "../../../../../config/apiEndpoints";

export default function AnalyticReport() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useLiveFilter, setUseLiveFilter] = useState(false);
  const [filters, setFilters] = useState({
    lastTransactionDate: "",
    totalAmount: 200
  });

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      let url = apiEndpoints.analyticReport;

      if (useLiveFilter && filters.lastTransactionDate) {
        url += `?date=${filters.lastTransactionDate}&threshold=${filters.totalAmount}`;
      }

      const response = await axios.get(url);
      const formatted = response.data.map((item, idx) => ({
        sn: idx + 1,
        customerId: item.customerId,
        transactionCount: item.transactionCount,
        totalAmount: item.totalAmount,
        lastTransactionDate: item.lastTransactionDate,
        status: item.status,
        frequencyScore: item.frequencyScore,
        recencyScore: item.recencyScore,
      }));
      setAnalyticsData(formatted);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
       setLoading(false)
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [useLiveFilter]);

  const onCheckboxToggle = async (e) => {
    const checked = e.target.checked;
    setUseLiveFilter(checked);
  };

  const statusOptions = [...new Set(analyticsData.map(d => d.status))];

  const columns = [
    { accessorKey: "sn", header: "Serial No.", cell: ({ row }) => row.original.sn },
    { accessorKey: "customerId", header: ({ column }) => <HeaderWithSort column={column} title="Customer ID" /> },
    { accessorKey: "transactionCount", header: ({ column }) => <HeaderWithSort column={column} title="Transaction Count" /> },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => <HeaderWithSort column={column} title="Total Amount" />,
      cell: ({ getValue }) => `$${parseFloat(getValue() || 0).toFixed(2)}`
    },
    {
      accessorKey: "lastTransactionDate",
      header: ({ column }) => <HeaderWithSort column={column} title="Last Transaction Date" />,
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    },
    { accessorKey: "status", header: ({ column }) => <HeaderWithSort column={column} title="Status" /> },
    { accessorKey: "frequencyScore", header: ({ column }) => <HeaderWithSort column={column} title="Frequency Score" /> },
    { accessorKey: "recencyScore", header: ({ column }) => <HeaderWithSort column={column} title="Recency Score" /> }
  ];

  const filterFields = [
    { type: "text", name: "customerId", label: "Customer ID" },
    { type: "date", name: "lastTransactionDate", label: "Transaction Date" },
    { type: "range", name: "totalAmount", label: "Total Amount", min: 0, max: 10000, step: 100 },
    { type: "select", name: "status", label: "Status", options: ["All", ...statusOptions] }
  ];


  return (
    <HomeTable
      title="Analysis Report"
      data={analyticsData}
      columns={columns}
      searchField="customerId"
      filterFields={filterFields}
      onCheckboxToggle={onCheckboxToggle}
      useLiveFilter={useLiveFilter}
      loading={loading}
    />
  );
}
