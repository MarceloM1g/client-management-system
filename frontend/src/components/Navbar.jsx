// App.jsx (versão atualizada)
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Clientes from "../pages/clientes/Clientes.jsx";
import Cadastro from "../pages/cadastro/Cadastro.jsx";
import "./navbar.css";

export default function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <nav className="steam-navbar">
                    <div className="nav-container">
                        <NavLink to="/" className="nav-logo">
                            Sistema de Cadastro
                        </NavLink>

                        <div className="nav-links">
                            <NavLink
                                to="/cadastro"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Cadastro
                            </NavLink>

                            <NavLink
                                to="/clientes"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Clientes
                            </NavLink>
                        </div>
                    </div>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/" element={<Cadastro />} /> {/* Rota padrão */}
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}