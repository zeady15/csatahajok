import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5014'

function HajoReszletekPage() {
  const { name } = useParams()
  const hajoNev = name ? decodeURIComponent(name) : ''

  const [hajo, setHajo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadHajo = async () => {
      if (!hajoNev) {
        setError('A hajó neve hiányzik.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${API_BASE_URL}/api/Hajo/ByName/${encodeURIComponent(hajoNev)}`,
        )

        if (response.status === 404) {
          throw new Error('A keresett hajó nem található.')
        }

        if (!response.ok) {
          throw new Error('A hajó adatainak lekérése sikertelen.')
        }

        const data = await response.json()
        setHajo(data)
      } catch (err) {
        setError(err.message || 'Hiba történt.')
      } finally {
        setLoading(false)
      }
    }

    loadHajo()
  }, [hajoNev])

  const nev = hajo?.nev || hajo?.Nev || hajoNev
  const osztaly = hajo?.osztaly || hajo?.Osztaly || '-'
  const felavatva = hajo?.felavatva || hajo?.Felavatva || '-'
  const agyukSzama = hajo?.agyukSzama || hajo?.AgyukSzama || '-'
  const kaliber = hajo?.kaliber || hajo?.Kaliber || '-'
  const vizkiszoritas = hajo?.vizkiszoritas || hajo?.Vizkiszoritas || '-'

  return (
    <main className="container py-4 py-md-5">
      <h1 className="display-6 text-center mb-4">{nev}</h1>

      {loading && <p className="text-center">Betöltés...</p>}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && hajo && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <article className="card border-0 shadow-sm detail-card">
              <div className="card-body p-4">
                <p className="mb-2">
                  <strong>Osztály:</strong> {osztaly}
                </p>
                <p className="mb-2">
                  <strong>Felavatva:</strong> {felavatva}
                </p>
                <p className="mb-2">
                  <strong>Ágyúk száma:</strong> {agyukSzama}
                </p>
                <p className="mb-2">
                  <strong>Kaliber:</strong> {kaliber}
                </p>
                <p className="mb-0">
                  <strong>Vízkiszorítás:</strong> {vizkiszoritas}
                </p>
              </div>
            </article>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">
          Vissza a csatahajókhoz
        </Link>
      </div>
    </main>
  )
}

export default HajoReszletekPage
