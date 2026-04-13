import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container">
        <span className="navbar-brand mb-0 h1">Csatahajók</span>
        <div className="navbar-nav ms-auto flex-row gap-2 gap-md-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            Csatahajók
          </NavLink>
          <NavLink
            to="/denmark-strait"
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
          >
            A Denmark Strait csata
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
