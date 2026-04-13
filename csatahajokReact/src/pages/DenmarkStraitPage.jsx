import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5014'
const CSATA_NEV = 'Denmark Strait'

function DenmarkStraitPage() {
  const navigate = useNavigate()
  const [csataNev, setCsataNev] = useState(CSATA_NEV)
  const [resztvevok, setResztvevok] = useState([])
  const [loading, setLoading] = useState(true)
  const [torles, setTorles] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadResztvevok = async () => {
      try {
        setLoading(true)
        setError('')

        const lehetNev = [CSATA_NEV, 'Denmark Strait csata']
        let sikeresV = false

        for (const nev of lehetNev) {
          const url = `${API_BASE_URL}/api/Csata/Resztvevok/${encodeURIComponent(nev)}`
          const response = await fetch(url)

          if (response.status === 204) {
            setCsataNev(nev)
            setResztvevok([])
            sikeresV = true
            break
          }

          if (response.ok) {
            const data = await response.json()
            setCsataNev(nev)
            setResztvevok(Array.isArray(data) ? data : [])
            sikeresV = true
            break
          }
        }

        if (!sikeresV) {
          throw new Error('Adatok lekérése sikertelen.')
        }
      } catch (err) {
        setError(err.message || 'Hiba történt.')
      } finally {
        setLoading(false)
      }
    }

    loadResztvevok()
  }, [])

  const handleTorles = async (hajoNev) => {
    const megerosites = window.confirm('Biztosan szeretnéd törölni?')
    if (!megerosites) {
      return
    }

    try {
      setTorles(hajoNev)
      setError('')

      const response = await fetch(
        `${API_BASE_URL}/api/Kimenet/KimenetTorles/${encodeURIComponent(csataNev)}/${encodeURIComponent(hajoNev)}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        const szerverUzenet = await response.text()
        console.error(szerverUzenet || 'A szerver nem adott hibaüzenetet.')
        throw new Error(szerverUzenet || 'A törlés sikertelen.')
      }

      window.alert('Sikeres törlés!')
      navigate('/')
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error(err)
      }
      setError(err.message || 'Hiba történt.')
    } finally {
      setTorles('')
    }
  }

  return (
    <main className="container py-4 py-md-5">
      <h1 className="display-6 text-center mb-3">A Denmark Strait csata</h1>
      <p className="text-center text-secondary mb-4">Résztvevő hajók listája</p>

      {loading && <p className="text-center">Betöltés...</p>}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && resztvevok.length === 0 && (
        <div className="alert alert-info" role="alert">
          Ehhez a csatához jelenleg nincs megjeleníthető adat.
        </div>
      )}

      {!loading && !error && resztvevok.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {resztvevok.map((nev) => (
            <div className="col" key={nev}>
              <article className="card h-100 border-0 shadow-sm battle-card">
                <div className="card-body d-flex align-items-center justify-content-between gap-3">
                  <h2 className="h5 mb-0 text-start flex-grow-1">{nev}</h2>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleTorles(nev)}
                    disabled={torles === nev}
                    aria-label={`${nev} törlése`}
                    title="Hajó törlése"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default DenmarkStraitPage
