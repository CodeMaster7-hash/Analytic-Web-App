import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeTable from '../../../../common/Table/Table';
import HeaderWithSort from "../../../../common/Table/TableComponents/TableHeaderWithSort";
import { apiEndpoints } from "../../../../../config/apiEndpoints";

export default function LoyaltyPredictions() {
  const [predictionData, setPredictionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(apiEndpoints.predictionReport);
        const data = response.data.map((item, idx) => ({
          ...item,
          sn: idx + 1
        }));
        setPredictionData(data);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      } finally {
        setTimeout(()=>{setLoading(false);},2000)      
      }
    };

    fetchPredictions();
  }, []);

  const columns = [
    {
      accessorKey: "sn",
      header: "Serial No.",
      cell: ({ row }) => row.original.sn,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <HeaderWithSort column={column} title="ID" />,
    },
    {
      accessorKey: "useCase",
      header: ({ column }) => <HeaderWithSort column={column} title="Use Case" />,
    },
    {
      accessorKey: "customerId",
      header: ({ column }) => <HeaderWithSort column={column} title="Customer ID" />,
    },
    {
      accessorKey: "prediction",
      header: ({ column }) => <HeaderWithSort column={column} title="Prediction" />,
    },
    {
      accessorKey: "reward",
      header: ({ column }) => <HeaderWithSort column={column} title="Reward" />,
    },
    {
      accessorKey: "frequencyScore",
      header: ({ column }) => <HeaderWithSort column={column} title="Frequency Score" />,
      cell: ({ getValue }) => `${getValue()}/100`
    },
    {
      accessorKey: "recencyScore",
      header: ({ column }) => <HeaderWithSort column={column} title="Recency Score" />,
      cell: ({ getValue }) => `${getValue()}/100`
    },
  ];

  const useCaseOptions = [...new Set(predictionData.map(p => p.useCase))];
  const predictionOptions = [...new Set(predictionData.map(p => p.prediction))];
  const rewardOptions = [...new Set(predictionData.map(p => p.reward))];

  const filterFields = [
    { type: "text", name: "customerId", label: "Customer ID", placeholder: "Filter by Customer ID..." },
    { type: "select", name: "useCase", label: "Use Case", options: ["All", ...useCaseOptions] },
    { type: "select", name: "prediction", label: "Prediction", options: ["All", ...predictionOptions] },
    { type: "select", name: "reward", label: "Reward", options: ["All", ...rewardOptions] },
    { type: "range", name: "frequencyScore", label: "Frequency Score", min: 0, max: 100 },
    { type: "range", name: "recencyScore", label: "Recency Score", min: 0, max: 100 },
  ];


  return (
    <HomeTable
      title="Loyalty Predictions Report"
      data={predictionData}
      columns={columns}
      searchField="customerId"
      filterFields={filterFields}
      loading={loading}
    />
  );
}
