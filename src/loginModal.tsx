// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const users = [
    { email: "kaji.priscila@gmail.com", password: "admin123" },
    { email: "admin", password: "user123" },
  ];

  const handleLogin = () => {
    // Verifica se o usuário existe na lista e se a senha corresponde
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Se encontrado, autentica o usuário
      localStorage.setItem("isAuthenticated", "true");
      onClose(); // Fecha o modal
      navigate("/admin"); // Redireciona para a página /admin
    } else {
      setError("E-mail ou senha inválidos.");
    }
  };

  if (!isOpen) return null; // Não exibe o modal se não estiver aberto

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Login Admin</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <button onClick={handleLogin}  style={styles.button}>
              Login
            </button>

            <button onClick={onClose} style={styles.closeButton}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Adiciona espaço entre os itens
    alignItems: "center",
    height: "auto", // Ajuste automático de altura
  },

  input: {
    width: "auto",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: "8px 16px",
    marginTop: "10px",
    borderRadius: "4px",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  closeButton: {
    padding: "8px 16px",
    marginTop: "10px",
    borderRadius: "4px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default LoginModal;
