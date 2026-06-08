import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Contributions from "./pages/Contributions";
import Loans from "./pages/Loans";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/members" element={<Members />} />
      <Route path="/contributions" element={<Contributions />} />
      <Route path="/loans" element={<Loans />} />
      <Route path="/reports/summary" element={<Reports />} />
    </Routes>
  );
}

export default App;