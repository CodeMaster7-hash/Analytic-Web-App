import React from 'react'
import Customers from './PredictionsReportComponents/Customers'
import LoyaltiyPredictions from './PredictionsReportComponents/LoyaltyPredictions'

export default function PredictionsReport() {
  
  return (
    <div className='flex flex-col'>
      <h1 className="text-xl font-bold mb-4">Predictions Report</h1>
      <Customers />
      <LoyaltiyPredictions />
    </div>
  )
}
