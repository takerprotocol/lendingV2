import { Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from 'pages/Dashboard'
import Liquidation from 'pages/Liquidation'
import Deposit from 'pages/Deposit'
import Liquidate from 'pages/Liquidate'
import { useLayoutEffect } from 'react'

export default function CustomizeRoutes() {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/deposit/:id" element={<Deposit />} />
      <Route path="/liquidate" element={<Liquidate />} />
      <Route path="/liquidation" element={<Liquidation />} />
      <Route path="/liquidation/:page" element={<Liquidation />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}
