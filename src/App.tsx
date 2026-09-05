import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, lazy } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AppLayout } from '@/layouts/app-layout'
import { ProtectedRoute } from '@/layouts/protected-route'
import { Login } from '@/pages/Login/Login'

const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard').then((m) => ({ default: m.Dashboard })))
const Inbox = lazy(() => import('@/pages/Inbox/Inbox').then((m) => ({ default: m.Inbox })))
const Contacts = lazy(() => import('@/pages/Contacts/Contacts').then((m) => ({ default: m.Contacts })))
const Campaigns = lazy(() => import('@/pages/Campaigns/Campaigns').then((m) => ({ default: m.Campaigns })))
const Workflows = lazy(() => import('@/pages/Workflows/Workflows').then((m) => ({ default: m.Workflows })))
const Connectors = lazy(() => import('@/pages/Connectors/Connectors').then((m) => ({ default: m.Connectors })))

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/connectors" element={<Connectors />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  )
}

function RouteFallback() {
  return <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">Loading…</div>
}

export default App
