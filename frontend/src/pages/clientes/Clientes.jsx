// Clientes.jsx (com pequenas melhorias para o tema dark)
import axios from "axios";
import { useEffect, useState } from "react";
import "./clientes.css";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [menuAberto, setMenuAberto] = useState(null);
    const [carregando, setCarregando] = useState(true);

    async function carregarClientes() {
        try {
            setCarregando(true);
            const res = await axios.get("http://localhost:3000/clientes");
            setClientes(res.data);
        } catch (err) {
            console.error("Erro ao carregar clientes:", err);
        } finally {
            setCarregando(false);
        }
    }

    async function deletarCliente(id) {
        if (!window.confirm("Tem certeza que deseja excluir este cliente?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/clientes/${id}`);
            carregarClientes();
            setMenuAberto(null);
        } catch (err) {
            console.error("Erro ao deletar:", err);
            alert("Erro ao excluir cliente. Tente novamente.");
        }
    }

    function toggleMenu(id) {
        setMenuAberto(menuAberto === id ? null : id);
    }

    useEffect(() => {
        function handleClickFora(event) {
            if (menuAberto && !event.target.closest('.menu-container')) {
                setMenuAberto(null);
            }
        }

        document.addEventListener('click', handleClickFora);
        return () => document.removeEventListener('click', handleClickFora);
    }, [menuAberto]);

    useEffect(() => {
        carregarClientes();
    }, []);

    if (carregando) {
        return (
            <div className="lista-clientes">
                <h2>Clientes Cadastrados</h2>
                <div className="loading">Carregando clientes...</div>
            </div>
        );
    }

    return (
        <div className="lista-clientes">
            <h2>Clientes Cadastrados</h2>

            {clientes.length === 0 ? (
                <div className="loading">Nenhum cliente cadastrado</div>
            ) : (
                <div className="clientes-grid">
                    {clientes.map((c) => (
                        <div key={c.id} className="card-cliente">
                            <div className="card-cliente-conteudo">
                                <strong>👤 {c.nome}</strong>
                                <p>Email: {c.email}</p>
                                <p>Telefone: {c.telefone}</p>
                                <p>CPF: {c.cpf}</p>
                            </div>

                            <div className="menu-container">
                                <button
                                    className="menu-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleMenu(c.id);
                                    }}
                                    aria-label="Abrir menu"
                                >
                                    ⋮
                                </button>

                                {menuAberto === c.id && (
                                    <div className="menu-opcoes">
                                        <button onClick={() => deletarCliente(c.id)}>
                                            🗑️ Excluir Cliente
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}