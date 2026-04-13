import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CsatahajokPage from './pages/CsatahajokPage'
import DenmarkStraitPage from './pages/DenmarkStraitPage'
import HajoReszletekPage from './pages/HajoReszletekPage'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<CsatahajokPage />} />
        <Route path="/hajo/:name" element={<HajoReszletekPage />} />
        <Route path="/denmark-strait" element={<DenmarkStraitPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
