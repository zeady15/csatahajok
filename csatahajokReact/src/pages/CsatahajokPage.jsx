import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5014'

function CsatahajokPage() {
  const [hajok, setHajok] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadHajok = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_BASE_URL}/api/Hajo/All`)
        if (!response.ok) {
          throw new Error('A lekérés sikertelen.')
        }

        const data = await response.json()
        setHajok(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message || 'Hiba történt.')
      } finally {
        setLoading(false)
      }
    }

    loadHajok()
  }, [])

  return (
    <main className="container py-4 py-md-5">
      <h1 className="display-6 text-center mb-4">Csatahajók</h1>

      {loading && <p className="text-center">Betöltés</p>}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {hajok.map((hajo) => {
            const nev = hajo.nev || hajo.Nev || 'Ismeretlen hajó'
            return (
              <div className="col" key={nev}>
                <Link
                  to={`/hajo/${encodeURIComponent(nev)}`}
                  className="text-decoration-none text-reset ship-link"
                >
                  <article className="card h-100 shadow-sm border-0 ship-card">
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <h2 className="h5 card-title mb-0 text-center">{nev}</h2>
                    </div>
                  </article>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default CsatahajokPage
