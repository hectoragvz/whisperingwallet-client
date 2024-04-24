import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import RecordExpense from "./pages/RecordExpense";
import ExpenseDetail from "./pages/ExpenseDetail";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function RegisterandLogout() {
  localStorage.clear();
  return <Register />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto m-5">
        <Routes>
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-expense"
            element={
              <ProtectedRoute>
                <RecordExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense/:id"
            element={
              <ProtectedRoute>
                <ExpenseDetail />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterandLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
