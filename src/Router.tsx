import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProcessPage from './pages/ProcessPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { useSiteContent } from './context/SiteContentContext';

const SiteLayout: React.FC = () => (
    <Layout>
        <Outlet />
    </Layout>
);

const Router: React.FC = () => {
    const { content } = useSiteContent();

    return (
        <HashRouter>
            <Routes>
                <Route element={<SiteLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/sobre-nos" element={<AboutPage content={content.about} />} />
                    <Route path="/nosso-processo" element={<ProcessPage content={content.process} />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                {/* FIX: Replaced `SiteLayout` with `Layout` because `SiteLayout` is designed to be used with react-router's <Outlet /> for nested routes and does not accept direct children. `Layout` correctly wraps the child component. */}
                <Route path="*" element={<Layout><Home /></Layout>} />
            </Routes>
        </HashRouter>
    );
};

export default Router;