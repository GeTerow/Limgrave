import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

export const LoginSignup = () => {
    const [action, setAction] = useState<"Cadastro" | "Login">("Cadastro");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    // Função para atualizar os campos do formulário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Função para enviar os dados do formulário
    const handleSubmit = async () => {
        if (action === "Cadastro" && formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const endpoint = action === "Cadastro" ? "/register" : "/login"; // Define endpoint com base na ação
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`${action} realizado com sucesso!`);
                console.log("Resposta do servidor:", data);
            } else {
                alert(`Erro no ${action}: ${data.message}`);
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Ocorreu um erro. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Cadastro" && (
                    <>
                        <div className="input">
                            <img src={user_icon} alt="" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                    </>
                )}

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                {action === "Cadastro" && (
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar Senha"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />

                    </div>

                )}
            </div>

            {action === "Login" && (
                <div className="forgot-password">
                    Esqueceu a senha? <span>Clique Aqui!</span>
                </div>
            )}

            <div className="submit-container">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={() => {
                        if (action === "Cadastro") {
                            handleSubmit(); // Envia os dados se estiver no formulário de cadastro
                        } else {
                            setAction("Cadastro"); // Alterna para o formulário de cadastro
                        }
                    }}
                >
                    Cadastre-se
                </div>
                <div
                    className={action === "Cadastro" ? "submit gray" : "submit"}
                    onClick={() => {
                        if (action === "Login") {
                            handleSubmit(); // Envia os dados se estiver no formulário de login
                        } else {
                            setAction("Login"); // Alterna para o formulário de login
                        }
                    }}
                >
                    Login
                </div>
            </div>
        </div>
    );
};


