import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeTable from '../../../../common/Table/Table';
import HeaderWithSort from "../../../../common/Table/TableComponents/TableHeaderWithSort";
import { apiEndpoints } from "../../../../../config/apiEndpoints";

export default function Customers() {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(apiEndpoints.customerReport);

         const formatted = response.data.map((customer, idx) => ({
          sn: idx + 1,
          id: customer.id, // MongoDB _id
          customerId: `c${customer.customerId}`,
          age: customer.age,
          gender: customer.gender === "F" ? "Female" : "Male",
          frequency: customer.frequency,
          lastPurchase: customer.lastPurchaseDays,
          totalSpend: customer.totalSpend,
          loyaltyTier: customer.loyaltyTier,
          preferredCategory: customer.preferredCategory,
          rewardRedeemed: customer.rewardRedeemed,
        }));

        setCustomerData(formatted);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const columns = [
    {
      accessorKey: "sn",
      header: "Serial No.",
      cell: ({ row }) => row.original.sn,
    },
    {
      accessorKey: "customerId",
      header: ({ column }) => <HeaderWithSort column={column} title="Customer ID" />,
    },
    {
      accessorKey: "age",
      header: ({ column }) => <HeaderWithSort column={column} title="Age" />,
    },
    {
      accessorKey: "gender",
      header: ({ column }) => <HeaderWithSort column={column} title="Gender" />,
    },
    {
      accessorKey: "frequency",
      header: ({ column }) => <HeaderWithSort column={column} title="Frequency" />,
    },
    {
      accessorKey: "lastPurchase",
      header: ({ column }) => <HeaderWithSort column={column} title="Last Purchase Days" />,
      cell: ({ getValue }) => `${getValue()} days ago`,
    },
    {
      accessorKey: "totalSpend",
      header: ({ column }) => <HeaderWithSort column={column} title="Total Spend" />,
      // cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
    },
    {
      accessorKey: "loyaltyTier",
      header: ({ column }) => <HeaderWithSort column={column} title="Loyalty Tier" />,
    },
    {
      accessorKey: "preferredCategory",
      header: ({ column }) => <HeaderWithSort column={column} title="Preferred Category" />,
    },
    {
      accessorKey: "rewardRedeemed",
      header: ({ column }) => <HeaderWithSort column={column} title="Reward Redeemed" />,
    },
  ];

  const genderOptions = [...new Set(customerData.map(c => c.gender))];
  const frequencyOptions = [...new Set(customerData.map(c => c.frequency))];
  const loyaltyTierOptions = [...new Set(customerData.map(c => c.loyaltyTier))];
  const categoryOptions = [...new Set(customerData.map(c => c.preferredCategory))];

  const filterFields = [
    { type: "text", name: "customerId", label: "Customer ID", placeholder: "Filter by Customer ID..." },
    { type: "select", name: "gender", label: "Gender", options: ["All", ...genderOptions] },
    { type: "select", name: "frequency", label: "Purchase Frequency", options: ["All", ...frequencyOptions] },
    { type: "range", name: "lastPurchase", label: "Last Purchase (days)", min: 0, max: 60 },
    { type: "range", name: "totalSpend", label: "Total Spend", min: 0, max: 10000, step: 100 },
    { type: "select", name: "loyaltyTier", label: "Loyalty Tier", options: ["All", ...loyaltyTierOptions] },
    { type: "select", name: "preferredCategory", label: "Preferred Category", options: ["All", ...categoryOptions] },
    { type: "range", name: "rewardRedeemed", label: "Rewards Redeemed", min: 0, max: 10 },
  ];

  return (
    <HomeTable
      title="Customers"
      data={customerData}
      columns={columns}
      searchField="customerId"
      filterFields={filterFields}
      loading={loading}
    />
  );
}
