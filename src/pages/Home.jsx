import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemListContainer from "../components/ItemListContainer";
import { FiArrowRight } from "react-icons/fi";
import { Helmet } from "react-helmet";

const Home = ({ onAddToCart }) => {
	const navigate = useNavigate();
	const [hoverBtnPrincipal, setHoverBtnPrincipal] = useState(false);
	const [hoverBtnSecundario, setHoverBtnSecundario] = useState(false);
	const [hoverVerMas, setHoverVerMas] = useState(false);

	return (
		<div style={styles.page}>
			<Helmet>
				<title>TechStore | Inicio</title>
				<meta
					name="description"
					content="La mejor tienda de componentes y hardware premium."
				/>
			</Helmet>
			<div style={styles.heroBanner}>
				<div style={styles.heroContent}>
					<span style={styles.heroTag}>TECNOLOGÍA DE VANGUARDIA</span>
					<h2 style={styles.heroTitle}>Potenciá tu Setup al Máximo Nivel</h2>
					<p style={styles.heroSubtitle}>
						Descubrí los componentes, notebooks y periféricos más potentes
						seleccionados especialmente por nuestro equipo de Talento Lab.
					</p>

					<div style={styles.heroActions}>
						<button
							onClick={() => navigate("/productos")}
							onMouseEnter={() => setHoverBtnPrincipal(true)}
							onMouseLeave={() => setHoverBtnPrincipal(false)}
							style={{
								...styles.primaryBtn,
								background: hoverBtnPrincipal ? "#dc2626" : "#ef4444",
								transform: hoverBtnPrincipal
									? "translateY(-2px)"
									: "translateY(0)",
								boxShadow: hoverBtnPrincipal
									? "0 6px 20px rgba(239, 68, 68, 0.4)"
									: "0 4px 15px rgba(239, 68, 68, 0.3)",
							}}>
							Explorar Catálogo Completo{" "}
							<FiArrowRight
								style={{ marginLeft: "6px", verticalAlign: "middle" }}
							/>
						</button>

						<button
							onClick={() => navigate("/nosotros")}
							onMouseEnter={() => setHoverBtnSecundario(true)}
							onMouseLeave={() => setHoverBtnSecundario(false)}
							style={{
								...styles.secondaryBtn,
								borderColor: hoverBtnSecundario ? "#ef4444" : "#334155",
								color: hoverBtnSecundario ? "#ef4444" : "#ffffff",
								background: hoverBtnSecundario
									? "rgba(239, 68, 68, 0.05)"
									: "rgba(255,255,255,0.03)",
								transform: hoverBtnSecundario
									? "translateY(-2px)"
									: "translateY(0)",
							}}>
							Conocer al Equipo
						</button>
					</div>
				</div>
			</div>

			<div style={styles.catalogSection}>
				<ItemListContainer
					saludo="Productos Destacados de la Semana"
					onAddToCart={onAddToCart}
					limite={5}
				/>

				<div style={styles.btnContainer}>
					<button
						onClick={() => navigate("/productos")}
						onMouseEnter={() => setHoverVerMas(true)}
						onMouseLeave={() => setHoverVerMas(false)}
						style={{
							...styles.loadMoreBtn,
							background: hoverVerMas ? "#ef4444" : "transparent",
							color: hoverVerMas ? "#ffffff" : "#ef4444",
							borderColor: "#ef4444",
							transform: hoverVerMas ? "translateY(-2px)" : "translateY(0)",
							boxShadow: hoverVerMas
								? "0 4px 12px rgba(239, 68, 68, 0.3)"
								: "none",
						}}>
						Ver Más Productos Tecnológicos{" "}
						<FiArrowRight
							style={{ marginLeft: "6px", verticalAlign: "middle" }}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

const styles = {
	page: {
		maxWidth: "1200px",
		margin: "0 auto",
		padding: "10px 10px 40px 10px",
	},
	heroBanner: {
		background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
		borderRadius: "16px",
		padding: "60px 40px",
		color: "#ffffff",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		marginBottom: "40px",
		boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.3)",
	},
	heroContent: {
		maxWidth: "700px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "14px",
	},
	heroTag: {
		color: "#ef4444",
		fontSize: "12px",
		fontWeight: "800",
		letterSpacing: "2px",
	},
	heroTitle: {
		fontSize: "38px",
		fontWeight: "800",
		margin: 0,
		lineHeight: "1.2",
	},
	heroSubtitle: {
		color: "#94a3b8",
		fontSize: "15px",
		margin: "5px 0 15px 0",
		lineHeight: "1.6",
	},
	heroActions: {
		display: "flex",
		gap: "15px",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	primaryBtn: {
		border: "none",
		padding: "12px 28px",
		borderRadius: "8px",
		fontSize: "14px",
		fontWeight: "700",
		cursor: "pointer",
		transition: "all 0.2s ease",
	},
	secondaryBtn: {
		color: "#ffffff",
		border: "1px solid #334155",
		padding: "12px 28px",
		borderRadius: "8px",
		fontSize: "14px",
		fontWeight: "600",
		cursor: "pointer",
		transition: "all 0.2s ease",
	},
	catalogSection: { marginTop: "20px" },
	btnContainer: {
		display: "flex",
		justifyContent: "center",
		marginTop: "40px",
	},
	loadMoreBtn: {
		border: "2px solid #ef4444",
		padding: "12px 34px",
		borderRadius: "30px",
		fontSize: "15px",
		fontWeight: "700",
		cursor: "pointer",
		transition: "all 0.3s ease",
	},
};

export default Home;
