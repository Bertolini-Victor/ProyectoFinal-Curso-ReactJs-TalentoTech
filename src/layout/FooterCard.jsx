import React from "react";

const FooterCard = ({ nombre, puesto, foto }) => {
	return (
		<div style={styles.card}>
			<img src={foto} alt={nombre} style={styles.avatar} />
			<div style={styles.info}>
				<h5 style={styles.name}>{nombre}</h5>
				<p style={styles.role}>{puesto}</p>
			</div>
		</div>
	);
};

const styles = {
	card: {
		display: "flex",
		alignItems: "center",
		gap: "12px",
		background: "#1e293b", 
		padding: "10px 14px",
		borderRadius: "8px",
		border: "1px solid #334155",
		minWidth: "220px",
		flex: "1 1 220px",
	},
	avatar: {
		width: "40px",
		height: "40px",
		borderRadius: "50%",
		objectFit: "cover",
		border: "2px solid #ef4444", 
	},
	info: {
		display: "flex",
		flexDirection: "column",
		gap: "2px",
	},
	name: {
		margin: 0,
		color: "#ffffff",
		fontSize: "13px",
		fontWeight: "600",
	},
	role: {
		margin: 0,
		color: "#94a3b8",
		fontSize: "11px",
		fontWeight: "500",
	},
};

export default FooterCard;
