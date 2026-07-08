import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = ({ mostrarToast }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await login(email, password);
			if (mostrarToast)
				mostrarToast("¡Bienvenido al panel de administración!", "admin");
			navigate("/admin/nuevo");
		} catch (error) {
			console.error("Error de Firebase:", error);
			if (mostrarToast) mostrarToast("Credenciales incorrectas", "admin");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={styles.container}>
			<form style={styles.form} onSubmit={handleSubmit}>
				<div style={styles.header}>
					<h2 style={styles.title}>Acceso Restringido</h2>
				</div>
				<p style={styles.subtitle}>
					Ingresá tus credenciales de administrador para gestionar el catálogo.
				</p>

				<div style={styles.inputGroup}>
					<label style={styles.label}>Email Admin:</label>
					<input
						style={styles.input}
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="admin@techstore.com"
						required
					/>
				</div>

				<div style={styles.inputGroup}>
					<label style={styles.label}>Contraseña:</label>
					<input
						style={styles.input}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••"
						required
					/>
				</div>

				<button
					type="submit"
					style={loading ? styles.btnDisabled : styles.btn}
					disabled={loading}>
					{loading ? "Verificando en Firebase..." : "Iniciar Sesión"}
				</button>
			</form>
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "60vh",
		padding: "20px",
	},
	form: {
		background: "#ffffff",
		padding: "40px",
		borderRadius: "16px",
		border: "1px solid #e2e8f0",
		boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
		width: "100%",
		maxWidth: "400px",
		display: "flex",
		flexDirection: "column",
		gap: "20px",
	},
	header: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
		borderBottom: "2px solid #f1f5f9",
		paddingBottom: "15px",
	},
	icon: { fontSize: "24px" },
	title: { margin: 0, fontSize: "22px", color: "#0f172a", fontWeight: "800" },
	subtitle: {
		color: "#64748b",
		fontSize: "14px",
		margin: "-10px 0 10px 0",
		lineHeight: "1.5",
	},
	inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
	label: { color: "#334155", fontSize: "13px", fontWeight: "700" },
	input: {
		background: "#f8fafc",
		border: "1px solid #cbd5e1",
		padding: "12px",
		borderRadius: "8px",
		fontSize: "14px",
		outline: "none",
		color: "#0f172a",
	},
	btn: {
		background: "#0f172a",
		color: "#ffffff",
		border: "none",
		padding: "14px",
		borderRadius: "8px",
		fontWeight: "700",
		cursor: "pointer",
		marginTop: "10px",
		transition: "background 0.2s",
	},
	btnDisabled: {
		background: "#64748b",
		color: "#ffffff",
		border: "none",
		padding: "14px",
		borderRadius: "8px",
		fontWeight: "700",
		cursor: "not-allowed",
		marginTop: "10px",
	},
};

export default LoginPage;
