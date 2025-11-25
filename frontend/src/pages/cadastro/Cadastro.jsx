import { useState } from "react";
import axios from "axios";
import "./cadastro.css";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);

    async function cadastrar(e) {
        e.preventDefault();
        setCarregando(true);

        try {
            await axios.post("http://localhost:3000/clientes", {
                nome,
                email,
                telefone,
                cpf,
            });

            setMostrarSucesso(true);
            
            setNome("");
            setEmail("");
            setTelefone("");
            setCpf("");

            setTimeout(() => {
                setMostrarSucesso(false);
            }, 3000);

        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            alert("Erro ao cadastrar cliente. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="cadastro-container">
            <h1>Cadastrar Cliente</h1>

            <form 
                onSubmit={cadastrar} 
                className={`cadastro-form ${carregando ? 'cadastro-loading' : ''}`}
            >
                <div className="input-group">
                    <input
                        type="text"
                        placeholder=" "
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        disabled={carregando}
                    />
                    <label>Nome</label>
                </div>

                <div className="input-group">
                    <input
                        type="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={carregando}
                    />
                    <label>Email</label>
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder=" "
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                        disabled={carregando}
                    />
                    <label>Telefone</label>
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder=" "
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                        disabled={carregando}
                    />
                    <label>CPF</label>
                </div>

                <button type="submit" disabled={carregando}>
                    {carregando ? 'Cadastrando...' : 'Cadastrar Cliente'}
                </button>
            </form>

            {mostrarSucesso && (
                <div className="cadastro-success">
                    ✅ Cliente cadastrado com sucesso!
                </div>
            )}
        </div>
    );
}