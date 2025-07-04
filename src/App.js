import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";
import CropRecommendation from "./pages/CropRecommendation";
import CropDisease from "./pages/CropDisease";
import WeatherAlerts from "./pages/WeatherAlerts";
import DecisionSupport from "./pages/DecisionSupport";
import PesticideOptimization from "./pages/PesticideOptimization";
import EducationalVideos from "./pages/EducationalVideos";
import WeatherForecast from "./pages/WeatherForecast";
import MarketPrices from './pages/MarketPrices';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Navbar />
          <ThemeToggle />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/crop-disease" element={
                <ProtectedRoute>
                  <CropDisease />
                </ProtectedRoute>
              } />
              <Route path="/weather-alerts" element={
                <ProtectedRoute>
                  <WeatherAlerts />
                </ProtectedRoute>
              } />
              <Route path="/decision-support" element={
                <ProtectedRoute>
                  <DecisionSupport />
                </ProtectedRoute>
              } />
              <Route path="/pesticide-optimization" element={
                <ProtectedRoute>
                  <PesticideOptimization />
                </ProtectedRoute>
              } />
              <Route path="/educational-videos" element={
                <ProtectedRoute>
                  <EducationalVideos />
                </ProtectedRoute>
              } />
              <Route path="/weather-forecast" element={
                <ProtectedRoute>
                  <WeatherForecast />
                </ProtectedRoute>
              } />
              <Route path="/market-prices" element={
                <ProtectedRoute>
                  <MarketPrices />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/crop-recommendation" element={
                <ProtectedRoute>
                  <CropRecommendation />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;