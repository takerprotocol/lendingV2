import { Routes, Route } from 'react-router-dom'
import { Dashboard } from 'pages/Dashboard'
import { Box, styled } from '@mui/material'
const LayoutBox = styled(Box)`
  padding-top: 70px;
`
export default function CustomizeRoutes() {
  return (
    <LayoutBox>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </LayoutBox>
  )
}
