import React from "react";
import { Link } from "react-router-dom";
import FooterCard from "./FooterCard";
import { companerosData } from "../data/teamData";

const Footer = () => {
	const destacadosFooter = companerosData.slice(0, 3);

	return (
		<footer style={styles.footer}>
			<div style={styles.container}>
				<div style={styles.columnCompany}>
					<div style={styles.logoBox}>
						<span style={{ fontSize: "18px" }}>⚡</span>
						<h3 style={styles.logoText}>
							Tech<span style={{ color: "#ef4444" }}>Store</span>
						</h3>
					</div>
					<p style={styles.companyDesc}>
						Tu tienda de confianza para hardware premium, componentes de alta
						gama y dispositivos tecnológicos de última generación.
					</p>
					<p style={styles.copyright}>
						© {new Date().getFullYear()} TechStore S.A. Todos los derechos
						reservados.
					</p>
				</div>

				<div style={styles.columnTeam}>
					<h4 style={styles.sectionTitle}>Core Staff (Talento Lab)</h4>
					<div style={styles.cardsContainer}>
						{destacadosFooter.map((persona) => (
							<FooterCard
								key={persona.id}
								nombre={persona.nombre}
								puesto={persona.puesto}
								foto={persona.foto}
							/>
						))}
					</div>
				</div>
			</div>

			<div style={styles.bottomBar}>
				<p style={styles.bottomText}>
					Proyecto Integrador Final — Diseñado en Buenos Aires con React JS &
					Vite
				</p>
			</div>
		</footer>
	);
};

const styles = {
	footer: {
		background: "#0f172a",
		color: "#f8fafc",
		padding: "50px 20px 0 20px",
		marginTop: "auto",
		borderTop: "4px solid #ef4444",
	},
	container: {
		maxWidth: "1200px",
		margin: "0 auto",
		display: "flex",
		justifyContent: "space-between",
		gap: "40px",
		flexWrap: "wrap",
		paddingBottom: "40px",
	},
	columnCompany: {
		flex: "1.5 1 300px",
		display: "flex",
		flexDirection: "column",
		gap: "12px",
	},
	logoBox: {
		display: "flex",
		alignItems: "center",
		gap: "6px",
	},
	logoText: {
		margin: 0,
		fontSize: "18px",
		fontWeight: "800",
		letterSpacing: "0.5px",
	},
	companyDesc: {
		color: "#94a3b8",
		fontSize: "13px",
		lineHeight: "1.6",
		margin: 0,
		maxWidth: "340px",
	},
	copyright: {
		color: "#64748b",
		fontSize: "11px",
		margin: "10px 0 0 0",
	},
	columnLinks: {
		flex: "0.8 1 150px",
		display: "flex",
		flexDirection: "column",
		gap: "15px",
	},
	sectionTitle: {
		margin: 0,
		fontSize: "14px",
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: "1px",
		color: "#e2e8f0",
	},
	linkList: {
		listStyle: "none",
		padding: 0,
		margin: 0,
		display: "flex",
		flexDirection: "column",
		gap: "10px",
	},
	footerLink: {
		color: "#94a3b8",
		textDecoration: "none",
		fontSize: "13px",
		fontWeight: "500",
		transition: "color 0.2s",
		":hover": {
			color: "#ffffff",
		},
	},
	columnTeam: {
		flex: "2 1 350px",
		display: "flex",
		flexDirection: "column",
		gap: "15px",
	},
	cardsContainer: {
		display: "flex",
		gap: "10px",
		flexWrap: "wrap",
	},
	bottomBar: {
		borderTop: "1px solid #1e293b",
		padding: "15px 0",
		textAlign: "center",
		maxWidth: "1200px",
		margin: "0 auto",
	},
	bottomText: {
		margin: 0,
		fontSize: "11px",
		color: "#475569",
		fontWeight: "500",
	},
};

export default Footer;
