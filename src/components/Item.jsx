import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagenSegura from "./ImagenSegura";
import { useCarrito } from "../context/CarritoContext";
import { FiShoppingCart } from "react-icons/fi";

const Item = ({
	id,
	nombre,
	precio,
	categoria,
	descripcion_corta,
	imagenes,
	stock,
	mostrarToast,
}) => {
	const navigate = useNavigate();
	const [isHovered, setIsHovered] = useState(false);
	const [cantidad, setCantidad] = useState(1);
	const [hoverMenos, setHoverMenos] = useState(false);
	const [hoverMas, setHoverMas] = useState(false);
	const { handleAddToCart } = useCarrito();

	const incrementar = (e) => {
		e.stopPropagation();
		if (cantidad < stock) setCantidad(cantidad + 1);
	};

	const decrementar = (e) => {
		e.stopPropagation();
		if (cantidad > 1) setCantidad(cantidad - 1);
	};

	const handleAgregarClick = (e) => {
		e.stopPropagation();
		handleAddToCart({ id, nombre, precio, imagenes }, cantidad);
		if (mostrarToast)
			mostrarToast(
				`¡"${nombre}" (${cantidad} u.) añadido al carrito!`,
				"success",
			);
		setCantidad(1);
	};

	const handleVerDetalleClick = () => {
		navigate(`/producto/${id}`);
	};

	const cardStyle = {
		...styles.card,
		transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
		boxShadow: isHovered
			? "0 10px 15px -3px rgb(0 0 0 / 0.1)"
			: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
	};

	return (
		<div
			style={cardStyle}
			onClick={handleVerDetalleClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<span style={styles.badge}>{categoria}</span>

			<div style={styles.imageContainer}>
				<ImagenSegura
					src={imagenes && imagenes[0]}
					alt={nombre}
					style={styles.image}
				/>
				<div style={{ ...styles.overlay, opacity: isHovered ? 1 : 0 }}>
					<span style={styles.overlayText}>Ver Detalle Completo</span>
				</div>
			</div>

			<div style={styles.info}>
				<h3 style={styles.title}>{nombre}</h3>
				<p style={styles.description}>{descripcion_corta}</p>

				<div style={styles.footerRow}>
					<span style={styles.price}>USD {precio}</span>
					<span style={styles.stock}>Stock: {stock} u.</span>
				</div>
				{stock > 0 ? (
					<div style={styles.purchaseRow}>
						<div style={styles.counterGroup}>
							<button
								onClick={decrementar}
								onMouseEnter={() => setHoverMenos(true)}
								onMouseLeave={() => setHoverMenos(false)}
								style={{
									...styles.countBtn,
									background: hoverMenos ? "#ef4444" : "#0f172a",
								}}>
								-
							</button>
							<span style={styles.countValue}>{cantidad}</span>
							<button
								onClick={incrementar}
								onMouseEnter={() => setHoverMas(true)}
								onMouseLeave={() => setHoverMas(false)}
								style={{
									...styles.countBtn,
									background: hoverMas ? "#ef4444" : "#0f172a",
								}}>
								+
							</button>
						</div>

						<button style={styles.button} onClick={handleAgregarClick}>
							<FiShoppingCart
								style={{ marginRight: "6px", verticalAlign: "middle" }}
							/>
							Añadir ({cantidad})
						</button>
					</div>
				) : (
					<button style={styles.disabledBtn} disabled>
						Sin Stock
					</button>
				)}
			</div>
		</div>
	);
};

const styles = {
	card: {
		border: "1px solid #e2e8f0",
		borderRadius: "12px",
		background: "#fff",
		overflow: "hidden",
		display: "flex",
		flexDirection: "column",
		position: "relative",
		cursor: "pointer",
		transition: "all 0.3s ease",
	},
	badge: {
		position: "absolute",
		top: "10px",
		left: "10px",
		background: "#fee2e2",
		color: "#991b1b",
		padding: "4px 10px",
		borderRadius: "20px",
		fontSize: "11px",
		fontWeight: "bold",
		zIndex: 2,
	},
	imageContainer: {
		position: "relative",
		width: "100%",
		height: "180px",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "180px",
		objectFit: "cover",
		background: "#f1f5f9",
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		background: "rgba(15, 23, 42, 0.6)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transition: "opacity 0.3s ease",
	},
	overlayText: {
		color: "#fff",
		fontSize: "13px",
		fontWeight: "bold",
		background: "rgba(0,0,0,0.4)",
		padding: "6px 12px",
		borderRadius: "4px",
	},
	info: { padding: "15px", display: "flex", flexDirection: "column", flex: 1 },
	title: {
		margin: "0 0 8px 0",
		fontSize: "15px",
		color: "#0f172a",
		fontWeight: "bold",
	},
	description: {
		margin: "0 0 15px 0",
		fontSize: "13px",
		color: "#64748b",
		flex: 1,
		lineHeight: "1.4",
	},
	footerRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "15px",
	},
	price: { fontSize: "16px", fontWeight: "bold", color: "#0f172a" },
	stock: { fontSize: "12px", color: "#94a3b8" },
	purchaseRow: {
		display: "flex",
		gap: "10px",
		alignItems: "center",
		marginTop: "auto",
	},
	counterGroup: {
		display: "flex",
		alignItems: "center",
		background: "#ffffff",
		border: "2px solid #0f172a",
		borderRadius: "6px",
		overflow: "hidden",
	},
	countBtn: {
		color: "#ffffff",
		border: "none",
		width: "32px",
		height: "32px",
		fontSize: "16px",
		cursor: "pointer",
		fontWeight: "700",
		transition: "background 0.2s ease",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	countValue: {
		padding: "0 10px",
		fontWeight: "800",
		fontSize: "13px",
		color: "#0f172a",
		minWidth: "16px",
		textAlign: "center",
	},
	button: {
		flex: 1,
		background: "#ef4444",
		color: "#fff",
		border: "none",
		padding: "10px",
		borderRadius: "6px",
		fontWeight: "bold",
		fontSize: "13px",
		cursor: "pointer",
		whiteSpace: "nowrap",
		transition: "background 0.2s",
	},
	disabledBtn: {
		background: "#cbd5e1",
		color: "#94a3b8",
		border: "none",
		padding: "10px",
		borderRadius: "6px",
		width: "100%",
		fontWeight: "bold",
	},
};

export default Item;
