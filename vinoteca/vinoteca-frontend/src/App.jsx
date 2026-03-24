import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";

// Pages
import Home from "./pages/Home";
import Cataleg from "./pages/Cataleg";
import ProducteDetall from "./pages/ProducteDetall";
import Login from "./pages/Login";
import Registre from "./pages/Registre";
import Perfil from "./pages/Perfil";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AuthProvider>
        <CartProvider>
          <div className="relative z-10">
            <Navbar />
            <CartDrawer />

            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cataleg" element={<Cataleg />} />
              <Route path="/producte/:tipo/:id" element={<ProducteDetall />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registre" element={<Registre />} />

              {/* Protected: authenticated users */}
              <Route
                path="/perfil"
                element={
                  <ProtectedRoute>
                    <Perfil />
                  </ProtectedRoute>
                }
              />

              {/* Protected: editor or admin */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireEditor={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1e1118",
                color: "#e7e5e4",
                border: "1px solid #3d2133",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "14px",
                borderRadius: "6px",
              },
              success: {
                iconTheme: { primary: "#c9a84c", secondary: "#0a0608" },
              },
              error: {
                iconTheme: { primary: "#8b1a3e", secondary: "#e7e5e4" },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
