import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FiMail } from "react-icons/fi";
import { companerosData } from "../data/teamData";

const TarjetaEmpleado = ({ persona }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			style={{
				...styles.card,
				transform: hovered ? "translateY(-6px)" : "translateY(0)",
				boxShadow: hovered
					? "0 12px 24px rgba(0, 0, 0, 0.15)"
					: "0 4px 6px rgba(0, 0, 0, 0.05)",
				borderColor: hovered ? "#ef4444" : "#e2e8f0",
			}}>
			<div style={styles.avatarContainer}>
				<img src={persona.foto} alt={persona.nombre} style={styles.image} />
				<span style={styles.badge}>Talento Lab</span>
			</div>
			<h3 style={styles.name}>{persona.nombre}</h3>
			<span style={styles.role}>{persona.puesto}</span>
			<p style={styles.desc}>{persona.descripcion}</p>

			<a href={`mailto:${persona.email}`} style={styles.emailLink}>
				<FiMail style={{ marginRight: "6px", verticalAlign: "middle" }} />
				{persona.email}
			</a>
		</div>
	);
};

const Nosotros = () => {
	return (
		<Container style={styles.container}>
			<Helmet>
				<title>TechStore | Nuestro Equipo</title>
				<meta
					name="description"
					content="Conocé al equipo de Talento Lab detrás de TechStore."
				/>
			</Helmet>

			<div style={styles.introBox}>
				<span style={styles.subtitle}>CONOCÉ AL EQUIPO</span>
				<h2 style={styles.title}>Nuestra Misión Tech</h2>
				<p style={styles.text}>
					Somos un grupo multidisciplinario del programa Talento Lab. Nos unimos
					para diseñar y codificar una plataforma e-commerce de alto rendimiento
					utilizando React JS y las mejores prácticas de arquitectura moderna.
				</p>
			</div>

			<Row className="g-4">
				{companerosData.map((persona) => (
					<Col key={persona.id} xs={12} md={6} lg={4} xl={3}>
						<TarjetaEmpleado persona={persona} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

const styles = {
	container: {
		paddingTop: "40px",
		paddingBottom: "40px",
	},
	introBox: {
		textAlign: "center",
		marginBottom: "50px",
		maxWidth: "700px",
		margin: "0 auto 50px auto",
	},
	subtitle: {
		fontSize: "12px",
		fontWeight: "800",
		color: "#ef4444",
		letterSpacing: "2px",
	},
	title: {
		fontSize: "32px",
		fontWeight: "800",
		color: "#0f172a",
		margin: "10px 0 15px 0",
	},
	text: {
		fontSize: "15px",
		color: "#64748b",
		lineHeight: "1.6",
		margin: 0,
	},
	card: {
		background: "#ffffff",
		border: "1px solid #e2e8f0",
		borderRadius: "16px",
		padding: "24px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		height: "100%",
	},
	avatarContainer: {
		position: "relative",
		marginBottom: "16px",
	},
	image: {
		width: "90px",
		height: "90px",
		borderRadius: "50%",
		objectFit: "cover",
		border: "3px solid #f1f5f9",
	},
	badge: {
		position: "absolute",
		bottom: "-5px",
		left: "50%",
		transform: "translateX(-50%)",
		background: "#0f172a",
		color: "#ffffff",
		fontSize: "9px",
		fontWeight: "700",
		padding: "3px 8px",
		borderRadius: "20px",
		textTransform: "uppercase",
		whiteSpace: "nowrap",
	},
	name: {
		fontSize: "18px",
		fontWeight: "700",
		color: "#0f172a",
		margin: "10px 0 4px 0",
	},
	role: {
		fontSize: "13px",
		color: "#ef4444",
		fontWeight: "600",
		marginBottom: "12px",
	},
	desc: {
		fontSize: "13px",
		color: "#475569",
		lineHeight: "1.5",
		margin: "0 0 16px 0",
		flexGrow: 1,
	},
	emailLink: {
		fontSize: "12px",
		color: "#64748b",
		textDecoration: "none",
		fontWeight: "500",
		background: "#f8fafc",
		padding: "6px 12px",
		borderRadius: "6px",
		border: "1px solid #e2e8f0",
		width: "100%",
		boxSizing: "border-box",
		display: "inline-block",
	},
};

export default Nosotros;
