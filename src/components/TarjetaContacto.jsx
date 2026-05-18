import React from "react";

const TarjetaContacto = ({ nombre, puesto, email, foto }) => {
	return (
		<div style={styles.card}>
			<img src={foto} alt={nombre} style={styles.image} />
			<h4 style={styles.name}>{nombre}</h4>
			<p style={styles.role}>{puesto}</p>
			<p style={styles.email}>{email}</p>
		</div>
	);
};

const styles = {
	card: {
		border: "1px solid #cbd5e1",
		borderRadius: "8px",
		padding: "15px",
		background: "#fff",
		color: "#334155",
		textAlign: "center",
		width: "200px",
	},
	image: {
		width: "80px",
		height: "80px",
		borderRadius: "50%",
		objectFit: "cover",
		marginBottom: "10px",
	},
	name: { margin: "5px 0", fontSize: "16px", color: "#0f172a" },
	role: {
		margin: "5px 0",
		fontSize: "13px",
		color: "#64748b",
		fontWeight: "bold",
	},
	email: { margin: "5px 0", fontSize: "11px", color: "#3b82f6" },
};

export default TarjetaContacto;
