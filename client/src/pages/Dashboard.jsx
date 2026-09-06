import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/health`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('backend not reachable'))
  }, [])

  return (
    <section id="center">
      <h1>Cheerio</h1>
      <p>Backend status: {status}</p>
      <button onClick={() => navigate('/')}>Sign out</button>
    </section>
  )
}
