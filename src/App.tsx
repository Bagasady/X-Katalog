import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerApp from "./pages/CustomerApp";
import AdminApp from "./pages/AdminApp";
import AdminLogin from "./pages/AdminLogin";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<CustomerApp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
