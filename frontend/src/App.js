// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TourList from './pages/ToursPage';
import TourDetail from './pages/TourDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ManageTours from './pages/admin/ManageTours';
import ManageAdmins from './pages/admin/ManageAdmins';
import AdminLayout from './layouts/AdminLayout';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/tours" element={<TourList />} />
                    <Route path="/tour/:id" element={<TourDetail />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="tours" element={<ManageTours />} />
                        <Route path="admins" element={<ManageAdmins />} />
                        {/* Tambahkan rute lain di sini */}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
