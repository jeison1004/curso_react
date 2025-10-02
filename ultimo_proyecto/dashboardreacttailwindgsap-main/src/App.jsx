// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import PageLoader from './components/ui/PageLoader';
import { useLoading } from './context/LoadingContext';
import AnimationsPage from './pages/AnimationsPage';
import TestPage from './pages/TestPage';

export default function App() {
  const { isLoading } = useLoading(); // 👈 Solo usamos isLoading

  return (
    <Router>
      <PageLoader isLoading={isLoading} /> {/* 👈 Mostramos loader global */}
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/animation" element={<AnimationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/testpage" element={<TestPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}