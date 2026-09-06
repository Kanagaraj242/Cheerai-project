import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('backend not reachable'))
  }, [])

  return (
    <section id="center">
      <h1>Cheerai</h1>
      <p>Backend status: {status}</p>
    </section>
  )
}

export default App
