import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const ItemListContainer = ({
	saludo,
	mostrarToast,
	limite = 10,
	esPaginado = false,
	mostrarBuscador = false,
}) => {
	const [todosLosProductos, setTodosLosProductos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [paginaActual, setPaginaActual] = useState(1);
	const [busqueda, setBusqueda] = useState("");

	useEffect(() => {
		const traerProductos = async () => {
			try {
				const snapshot = await getDocs(collection(db, "productos"));
				const listaCompleta = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setTodosLosProductos(listaCompleta);
			} catch (error) {
				console.error("Error al traer productos:", error);
			} finally {
				setLoading(false);
			}
		};
		traerProductos();
	}, []);

	useEffect(() => {
		setPaginaActual(1);
	}, [busqueda]);

	const productosFiltradosBusqueda = todosLosProductos.filter(
		(prod) =>
			prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
			prod.categoria.toLowerCase().includes(busqueda.toLowerCase()),
	);

	const indexUltimoProducto = paginaActual * limite;
	const indexPrimerProducto = indexUltimoProducto - limite;

	const productosAMostrar = esPaginado
		? productosFiltradosBusqueda.slice(indexPrimerProducto, indexUltimoProducto)
		: productosFiltradosBusqueda.slice(0, limite);

	const totalPaginas = Math.ceil(productosFiltradosBusqueda.length / limite);

	const irPaginaSiguiente = () =>
		paginaActual < totalPaginas && setPaginaActual(paginaActual + 1);
	const irPaginaAnterior = () =>
		paginaActual > 1 && setPaginaActual(paginaActual - 1);

	return (
		<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
			<div style={styles.headerRow}>
				<h2 style={{ fontSize: "22px", color: "#0f172a", margin: 0 }}>
					{saludo}
				</h2>

				{mostrarBuscador && (
					<input
						type="text"
						placeholder="Buscar por nombre o categoría..."
						value={busqueda}
						onChange={(e) => setBusqueda(e.target.value)}
						style={styles.searchInput}
					/>
				)}
			</div>

			{loading ? (
				<p style={{ textAlign: "center", color: "#64748b" }}>
					Cargando catálogo desde la nube...
				</p>
			) : productosAMostrar.length === 0 ? (
				<p
					style={{
						textAlign: "center",
						color: "#ef4444",
						fontWeight: "bold",
						padding: "40px",
					}}>
					No se encontraron productos para "{busqueda}".
				</p>
			) : (
				<>
					<ItemList productos={productosAMostrar} mostrarToast={mostrarToast} />

					{esPaginado && totalPaginas > 1 && (
						<div style={styles.pagination}>
							<button
								onClick={irPaginaAnterior}
								disabled={paginaActual === 1}
								style={
									paginaActual === 1 ? styles.btnDisabled : styles.btnActive
								}>
								⇠ Anterior
							</button>
							<span style={styles.pageInfo}>
								Página {paginaActual} de {totalPaginas}
							</span>
							<button
								onClick={irPaginaSiguiente}
								disabled={paginaActual === totalPaginas}
								style={
									paginaActual === totalPaginas
										? styles.btnDisabled
										: styles.btnActive
								}>
								Siguiente ⇢
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

const styles = {
	headerRow: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "20px",
		flexWrap: "wrap",
		gap: "15px",
	},
	searchInput: {
		padding: "12px 16px",
		borderRadius: "8px",
		border: "1px solid #cbd5e1",
		width: "100%",
		maxWidth: "350px",
		fontSize: "14px",
		outline: "none",
		transition: "border-color 0.2s",
	},
	pagination: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "20px",
		marginTop: "40px",
		padding: "20px 0",
	},
	btnActive: {
		background: "#0f172a",
		color: "#fff",
		border: "none",
		padding: "10px 20px",
		borderRadius: "8px",
		cursor: "pointer",
		fontWeight: "bold",
	},
	btnDisabled: {
		background: "#cbd5e1",
		color: "#94a3b8",
		border: "none",
		padding: "10px 20px",
		borderRadius: "8px",
		cursor: "not-allowed",
		fontWeight: "bold",
	},
	pageInfo: { fontWeight: "bold", color: "#334155", fontSize: "14px" },
};

export default ItemListContainer;
