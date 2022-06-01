import { Routes, Route } from 'react-router-dom'
import Dashboard from 'pages/Dashboard'
import Liquidation from 'pages/Liquidation'

export default function CustomizeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/liquidation" element={<Liquidation />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}
