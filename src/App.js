import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Car from "./pages/Car";
import Login from "./pages/Login";
import AdminRoutes from "./components/Admin/AdminRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import LongueDuree from "./pages/LongueDuree";
import Transfert from "./pages/Transfert";
import Confirmation from "./pages/Confiramtion";
import { CurrencyProvider } from "./contexts/Currencycontext";
import AboutUs from "./pages/AboutUs";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";

function App() {
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/search/:category' element={<Search />} />
          <Route path='/car/:id' element={<Car />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reservation/:carid' element={<LongueDuree />} />
          <Route path='/transfert' element={<Transfert />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/payment-fail' element={<PaymentFail />} />

          {/* Admin Routes */}
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </CurrencyProvider>
  );
}
