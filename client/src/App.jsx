import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import { StoreProvider } from './store.jsx'
import Login from './pages/Login.jsx'
import DashboardHome from './pages/DashboardHome.jsx'
import Inbox from './pages/Inbox.jsx'
import Contacts from './pages/Contacts.jsx'
import Campaigns from './pages/Campaigns.jsx'
import Workflows from './pages/Workflows.jsx'
import AutoFlow from './pages/AutoFlow.jsx'
import Connectors from './pages/Connectors.jsx'

function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/auto-flow" element={<AutoFlow />} />
          <Route path="/connectors" element={<Connectors />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </StoreProvider>
  )
}

export default App
