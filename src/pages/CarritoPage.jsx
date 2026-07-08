import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { FiShoppingCart, FiArrowRight, FiLock } from "react-icons/fi";

const CarritoPage = () => {
	const navigate = useNavigate();

	const {
		carrito,
		handleRemoveFromCart,
		handleDecreaseQuantity,
		handleClearCart,
		handleAddToCart,
		precioTotal,
		cantidadTotal,
	} = useCarrito();

	const [hoverClear, setHoverClear] = useState(false);
	const [hoverShop, setHoverShop] = useState(false);
	const [hoverCheckout, setHoverCheckout] = useState(false);

	if (carrito.length === 0) {
		return (
			<div style={styles.emptyContainer}>
				<div style={styles.emptyIcon}>
					<FiShoppingCart />
				</div>
				<h2 style={styles.emptyTitle}>Tu carrito está vacío</h2>
				<p style={styles.emptyText}>
					Parece que todavía no agregaste componentes a tu configuración.
				</p>
				<button
					onClick={() => navigate("/productos")}
					onMouseEnter={() => setHoverShop(true)}
					onMouseLeave={() => setHoverShop(false)}
					style={{
						...styles.shopBtn,
						background: hoverShop ? "#ef4444" : "#0f172a",
						transform: hoverShop ? "translateY(-2px)" : "translateY(0)",
					}}>
					Ir a la Tienda ➔
				</button>
			</div>
		);
	}

	return (
		<div style={styles.container}>
			<h2 style={styles.pageTitle}>Tu Carrito de Compras</h2>

			<div style={styles.mainLayout}>
				<div style={styles.productsColumn}>
					{carrito.map((item) => (
						<div key={item.id} style={styles.itemCard}>
							<img
								src={item.fotoCarrito}
								alt={item.nombre}
								style={styles.itemImage}
								onError={(e) => {
									e.target.src =
										"https://images.unsplash.com/photo-1531403009284-440f080d1e12";
								}}
							/>

							<div style={styles.itemDetails}>
								<span style={styles.itemCategory}>{item.categoria}</span>
								<h4 style={styles.itemName}>{item.nombre}</h4>
								<p style={styles.itemPriceUnit}>
									USD {item.precio.toLocaleString()}
								</p>
							</div>

							<div style={styles.quantityControls}>
								<button
									style={styles.qtyBtn}
									onClick={() => handleDecreaseQuantity(item.id)}>
									-
								</button>
								<span style={styles.qtyValue}>{item.cantidad}</span>
								<button
									style={styles.qtyBtn}
									onClick={() => handleAddToCart(item, 1)}>
									+
								</button>
							</div>

							<div style={styles.subtotalBlock}>
								<p style={styles.itemSubtotal}>
									USD {(item.precio * item.cantidad).toLocaleString()}
								</p>
								<button
									style={styles.deleteBtn}
									onClick={() => handleRemoveFromCart(item.id)}
									title="Eliminar del carrito">
									X
								</button>
							</div>
						</div>
					))}

					<button
						onClick={handleClearCart}
						onMouseEnter={() => setHoverClear(true)}
						onMouseLeave={() => setHoverClear(false)}
						style={{
							...styles.clearBtn,
							background: hoverClear ? "rgba(239, 68, 68, 0.1)" : "transparent",
							color: hoverClear ? "#dc2626" : "#64748b",
						}}>
						Vaciar Carrito por Completo
					</button>
				</div>

				<div style={styles.summaryCard}>
					<h3 style={styles.summaryTitle}>Resumen de Pedido</h3>
					<div style={styles.summaryRow}>
						<span>Productos ({cantidadTotal}):</span>{" "}
						<span>USD {precioTotal.toLocaleString()}</span>{" "}
					</div>
					<div style={styles.summaryRow}>
						<span>Envío:</span>
						<span style={styles.freeText}>¡Gratis!</span>
					</div>
					<hr style={styles.divider} />
					<div style={styles.totalRow}>
						<span>Total:</span>
						<span>USD {precioTotal.toLocaleString()}</span>
					</div>
					<button
						onClick={() => alert("¡Redireccionando!")}
						style={{ ...styles.checkoutBtn, background: "#ef4444" }}>
						Proceder al Pago Final
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
	container: {
		maxWidth: "1200px",
		margin: "40px auto",
		padding: "0 20px",
		minHeight: "60vh",
	},
	pageTitle: {
		fontSize: "28px",
		fontWeight: "800",
		color: "#0f172a",
		marginBottom: "30px",
	},
	mainLayout: {
		display: "flex",
		gap: "30px",
		alignItems: "flex-start",
		flexWrap: "wrap",
	},
	productsColumn: {
		flex: "1",
		minWidth: "320px",
		display: "flex",
		flexDirection: "column",
		gap: "16px",
	},
	itemCard: {
		background: "#ffffff",
		border: "1px solid #e2e8f0",
		borderRadius: "12px",
		padding: "16px",
		display: "flex",
		alignItems: "center",
		gap: "20px",
		flexWrap: "wrap",
	},
	itemImage: {
		width: "80px",
		height: "80px",
		objectFit: "cover",
		borderRadius: "8px",
		background: "#f8fafc",
	},
	itemDetails: { flex: "1", minWidth: "180px" },
	itemCategory: {
		fontSize: "11px",
		fontWeight: "700",
		color: "#ef4444",
		textTransform: "uppercase",
	},
	itemName: {
		fontSize: "16px",
		fontWeight: "700",
		color: "#0f172a",
		margin: "4px 0",
	},
	itemPriceUnit: { fontSize: "13px", color: "#64748b", margin: 0 },
	quantityControls: {
		display: "flex",
		alignItems: "center",
		background: "#f1f5f9",
		borderRadius: "20px",
		padding: "4px",
	},
	qtyBtn: {
		background: "#0f172a",
		color: "#ffffff",
		border: "none",
		width: "28px",
		height: "28px",
		borderRadius: "50%",
		cursor: "pointer",
		fontSize: "16px",
		fontWeight: "700",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		transition: "background 0.2s",
	},
	qtyValue: {
		padding: "0 14px",
		fontWeight: "700",
		fontSize: "14px",
		color: "#0f172a",
		minWidth: "20px",
		textAlign: "center",
	},

	subtotalBlock: {
		display: "flex",
		alignItems: "center",
		gap: "20px",
		marginLeft: "auto",
	},
	itemSubtotal: {
		fontSize: "16px",
		fontWeight: "800",
		color: "#0f172a",
		margin: 0,
	},
	deleteBtn: {
		background: "transparent",
		border: "none",
		fontSize: "18px",
		color: "red",
		cursor: "pointer",
		padding: "4px",
		transition: "transform 0.2s",
	},

	clearBtn: {
		alignSelf: "flex-start",
		border: "1px solid transparent",
		padding: "10px 16px",
		borderRadius: "8px",
		fontSize: "13px",
		fontWeight: "600",
		cursor: "pointer",
		transition: "all 0.2s",
	},
	summaryCard: {
		width: "350px",
		background: "#ffffff",
		border: "1px solid #e2e8f0",
		borderRadius: "16px",
		padding: "24px",
		display: "flex",
		flexDirection: "column",
		gap: "16px",
		boxShadow: "0 4px 6px rgba(0, 0, 0, 0.02)",
	},
	summaryTitle: {
		fontSize: "18px",
		fontWeight: "700",
		color: "#0f172a",
		margin: "0 0 8px 0",
	},
	summaryRow: {
		display: "flex",
		justifyContent: "space-between",
		fontSize: "14px",
		color: "#475569",
	},
	freeText: { color: "#22c55e", fontWeight: "700" },
	divider: { border: "none", borderTop: "1px solid #e2e8f0", margin: "8px 0" },
	totalRow: {
		display: "flex",
		justifyContent: "space-between",
		fontSize: "18px",
		fontWeight: "800",
		color: "#0f172a",
	},
	checkoutBtn: {
		border: "none",
		padding: "14px",
		borderRadius: "8px",
		color: "#ffffff",
		fontSize: "15px",
		fontWeight: "700",
		cursor: "pointer",
		transition: "all 0.2s ease",
		textAlign: "center",
	},
	securityNote: {
		fontSize: "11px",
		color: "#94a3b8",
		textAlign: "center",
		marginTop: "4px",
	},
	emptyContainer: { textAlign: "center", padding: "80px 20px" },
	emptyIcon: { fontSize: "64px", marginBottom: "20px" },
	emptyTitle: {
		fontSize: "24px",
		fontWeight: "800",
		color: "#0f172a",
		margin: "0 0 10px 0",
	},
	emptyText: {
		fontSize: "15px",
		color: "#64748b",
		marginBottom: "30px",
		maxWidth: "400px",
		margin: "0 auto 30px auto",
	},
	shopBtn: {
		color: "#ffffff",
		border: "none",
		padding: "12px 36px",
		borderRadius: "30px",
		fontSize: "15px",
		fontWeight: "700",
		cursor: "pointer",
		transition: "all 0.2s",
	},
};

export default CarritoPage;
