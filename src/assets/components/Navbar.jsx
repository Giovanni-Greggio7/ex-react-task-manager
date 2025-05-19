import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <div className="container-fluid d-flex flex-column align-items-center">
                
                <div className="navbar-brand mb-3" to="/">
                    Task Manager
                </div>

                <div className="d-flex gap-4">
                    <Link className="nav-link text-white" to="aggiungi-task">
                        Aggiungi nuove task
                    </Link>
                    <Link className="nav-link text-white" to="/">
                        Lista delle task
                    </Link>
                </div>

            </div>
        </nav>
    )
}