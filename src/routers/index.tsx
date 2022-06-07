import { Routes, Route } from 'react-router-dom'
import Dashboard from 'pages/Dashboard'
import Liquidation from 'pages/Liquidation'
import Deposit from 'pages/Deposit'

export default function CustomizeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/2" element={<Deposit />} />
      <Route path="/liquidation" element={<Liquidation />} />
      <Route path="/3" element={<Liquidation />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}
