import React from 'react'
import AnalysisTransactions from './AnalysisReportComponents/AnalysisTransactions'
import AnalyticReport from './AnalysisReportComponents/AnalyticReport'

export default function AnalysisReport() {
  return (
    <div className='flex flex-col'>
      <h1 className="text-xl font-bold mb-4">Analysis Reports</h1>
      <AnalysisTransactions />
      <AnalyticReport /> 
    </div>
  )
}
