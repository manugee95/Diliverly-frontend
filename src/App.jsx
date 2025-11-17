import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignupPage from "./components/SignupPage"
import VerifyEmail from "./components/pages/VerifyEmail"
import VendorSetup from "./components/Progress/VendorSetup"
import Dashboard from "./components/pages/Dashboard"
import Request from "./components/pages/Request"
import Order from "./components/pages/Order"
import AgentsPage from "./components/pages/AgentsPage"
import Wallet from "./components/pages/Wallet"
import SettingPage from "./components/pages/SettingPage"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/vendor-setup" element={<VendorSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<Request />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </Router>
  )
}

export default App