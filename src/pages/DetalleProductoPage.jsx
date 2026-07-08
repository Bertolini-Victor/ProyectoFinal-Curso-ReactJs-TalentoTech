import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImagenSegura from "../components/ImagenSegura";
import { useCarrito } from "../context/CarritoContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

const DetalleProductoPage = ({ mostrarToast }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { handleAddToCart } = useCarrito();

	const [producto, setProducto] = useState(null);
	const [loading, setLoading] = useState(true);
	const [cantidad, setCantidad] = useState(1);

	const [hoverMenos, setHoverMenos] = useState(false);
	const [hoverMas, setHoverMas] = useState(false);

	useEffect(() => {
		const traerProducto = async () => {
			try {
				const docRef = doc(db, "productos", id);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setProducto({ id: docSnap.id, ...docSnap.data() });
				} else {
					console.log("El producto no existe en Firebase");
				}
			} catch (error) {
				console.error("Error al obtener el producto:", error);
			} finally {
				setLoading(false);
			}
		};

		traerProducto();
	}, [id]);

	if (loading || !producto) {
		return (
			<div style={{ textAlign: "center", padding: "80px 20px" }}>
				<h2 style={{ color: "#0f172a" }}>
					{loading ? "Cargando..." : "Producto no encontrado"}
				</h2>
				<p style={{ color: "#64748b", marginBottom: "20px" }}>
					{loading
						? "Conectando con la base de datos..."
						: "El componente que buscás no existe o fue eliminado."}
				</p>
				{!loading && (
					<button
						onClick={() => navigate("/productos")}
						style={{
							background: "#ef4444",
							color: "#fff",
							border: "none",
							padding: "10px 20px",
							borderRadius: "8px",
							cursor: "pointer",
							fontWeight: "bold",
						}}>
						Volver al Catálogo
					</button>
				)}
			</div>
		);
	}

	const incrementar = () =>
		cantidad < producto.stock && setCantidad(cantidad + 1);
	const decrementar = () => cantidad > 1 && setCantidad(cantidad - 1);

	const handleComprar = () => {
		handleAddToCart(producto, cantidad);
		if (mostrarToast)
			mostrarToast(
				`¡"${producto.nombre}" (${cantidad} u.) añadido al carrito!`,
				"success",
			);
	};

	return (
		<div style={styles.container}>
			<button style={styles.backBtn} onClick={() => navigate(-1)}>
				<FiArrowLeft style={{ marginRight: "6px", verticalAlign: "middle" }} />
				Volver atrás
			</button>

			<div style={styles.grid}>
				<div style={styles.imgCol}>
					<ImagenSegura
						src={producto.imagenes && producto.imagenes[0]}
						alt={producto.nombre}
						style={styles.image}
					/>
				</div>

				<div style={styles.infoCol}>
					<span style={styles.category}>{producto.categoria}</span>
					<h2 style={styles.title}>{producto.nombre}</h2>
					<p style={styles.price}>USD {producto.precio}</p>
					<p style={styles.description}>
						{producto.descripcion_corta || producto.descripcion_larga}
					</p>

					<div style={styles.actionsBox}>
						<p style={styles.stock}>Disponibles: {producto.stock} unidades</p>

						<div style={styles.counterRow}>
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

							<button onClick={handleComprar} style={styles.buyBtn}>
								<FiShoppingCart
									style={{ marginRight: "6px", verticalAlign: "middle" }}
								/>
								Añadir {cantidad} al Carrito
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const styles = {
	container: { maxWidth: "1000px", margin: "20px auto", padding: "0 20px" },
	backBtn: {
		background: "none",
		border: "none",
		color: "#0f172a",
		cursor: "pointer",
		fontWeight: "bold",
		fontSize: "14px",
		padding: "0 0 20px 0",
	},
	grid: { display: "flex", gap: "40px", flexWrap: "wrap" },
	imgCol: { flex: "1 1 400px" },
	image: { width: "100%", borderRadius: "12px", objectFit: "cover" },
	infoCol: { flex: "1 1 400px", display: "flex", flexDirection: "column" },
	category: {
		color: "#ef4444",
		fontWeight: "bold",
		fontSize: "12px",
		textTransform: "uppercase",
	},
	title: {
		fontSize: "28px",
		margin: "5px 0",
		color: "#0f172a",
		fontWeight: "800",
	},
	price: {
		fontSize: "32px",
		fontWeight: "bold",
		margin: "10px 0",
		color: "#0f172a",
	},
	description: { color: "#475569", lineHeight: "1.6" },
	actionsBox: {
		background: "#f8fafc",
		padding: "20px",
		borderRadius: "12px",
		border: "1px solid #e2e8f0",
		marginTop: "auto",
	},
	stock: {
		margin: "0 0 15px 0",
		fontSize: "13px",
		color: "#64748b",
		fontWeight: "600",
	},
	counterRow: {
		display: "flex",
		gap: "20px",
		alignItems: "center",
		flexWrap: "wrap",
	},
	counterGroup: {
		display: "flex",
		alignItems: "center",
		background: "#ffffff",
		border: "2px solid #0f172a",
		borderRadius: "8px",
		overflow: "hidden",
	},
	countBtn: {
		color: "#ffffff",
		border: "none",
		width: "40px",
		height: "40px",
		fontSize: "20px",
		cursor: "pointer",
		fontWeight: "700",
		transition: "background 0.2s ease",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	countValue: {
		padding: "0 20px",
		fontWeight: "800",
		fontSize: "16px",
		color: "#0f172a",
		minWidth: "24px",
		textAlign: "center",
	},
	buyBtn: {
		background: "#ef4444",
		color: "#fff",
		border: "none",
		padding: "12px 24px",
		borderRadius: "8px",
		fontWeight: "bold",
		cursor: "pointer",
		flex: 1,
		transition: "transform 0.2s",
	},
};

export default DetalleProductoPage;
