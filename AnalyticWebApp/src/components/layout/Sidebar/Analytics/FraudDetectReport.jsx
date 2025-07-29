import React from 'react'
import FraudTransactions from './FraudDetectReoprtComponents/FraudTransactions' 
import LoyaltyFraud from './FraudDetectReoprtComponents/LoyaltyFraud'

export default function FraudDetectReport() {
  return (
    <div className='flex flex-col'>
      <h1 className="text-xl font-bold mb-4">Fraud Detect Reports</h1>
      <FraudTransactions />
      <LoyaltyFraud />
    </div>
  )
}