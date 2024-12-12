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

    const [notification, setNotification] = useState<{ message: string; visible: boolean}>({
        message: "",
        visible: false,
    
})
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
            setNotification({ message: "As senhas não coincidem!", visible: true})
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
                setNotification({ message: `Erro no ${action}: ${data.message}`, visible: true})
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            setNotification({ message: "Servidor indisponível", visible: true})
        }
    };

    return (
        <>
        {notification.visible && (
            <div className="notificacao">
            <div className="error">
                <div className="error__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" height={24} fill="none"><path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" /></svg>
                </div>
                <div className="error__title">{notification.message}</div>
                <div className="error__close"><svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 20 20" height={20} onClick={() => setNotification({ message: "", visible: false})}><path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" 
                /></svg></div>
            </div>
        </div>
        )}
        
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
                    <>
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
                        <div className="radio-inputs">
                            <label className="radio">
                                <input type="radio" name="radio" defaultChecked />
                                <span className="name">Aluno</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radio" />
                                <span className="name">Professor</span>
                            </label>
                        </div>
                    </>
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
        </>
    );
};


