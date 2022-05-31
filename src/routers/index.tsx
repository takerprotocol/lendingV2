import { Routes, Route } from 'react-router-dom'
import Dashboard from 'pages/Dashboard'
export default function CustomizeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}
