import { Routes, Route } from 'react-router-dom'
import Dashboard from 'pages/Dashboard'
import Liquidation from 'pages/Liquidation'
import Deposit from 'pages/Deposit'
import Liquidate from 'pages/Liquidate'

export default function CustomizeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/liquidate" element={<Liquidate />} />
      <Route path="/liquidation" element={<Liquidation />} />
      <Route path="/liquidation/:page" element={<Liquidation />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}
