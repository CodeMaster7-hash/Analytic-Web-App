import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics/Analytics';
import MainLayout from '../components/layout/MainLayout';

// Analytics Reports
import PredictionsReport from '../components/layout/Sidebar/Analytics/PredictionsReport';
import FraudDetectReport from '../components/layout/Sidebar/Analytics/FraudDetectReport';
import AnalysisReport from '../components/layout/Sidebar/Analytics/AnalysisReport';

export default function SidebarRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<MainLayout />} />

        <Route path="analytics" element={<Analytics />}>
          <Route path="predictions-report" element={<PredictionsReport />} />
          <Route path="fraud-detect-report" element={<FraudDetectReport />} />
          <Route path="analysis-report" element={<AnalysisReport />} />
        </Route>
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
