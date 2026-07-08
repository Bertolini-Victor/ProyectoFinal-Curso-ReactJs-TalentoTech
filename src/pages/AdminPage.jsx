import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import ImagenSegura from "../components/ImagenSegura";
import { FiEdit, FiTrash2, FiAlertTriangle, FiPlus } from "react-icons/fi";

const AdminPage = ({ mostrarToast }) => {
	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [productoAEliminar, setProductoAEliminar] = useState(null);

	const navigate = useNavigate();

	const traerProductos = async () => {
		setLoading(true);
		try {
			const querySnapshot = await getDocs(collection(db, "productos"));
			const lista = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setProductos(lista);
		} catch (error) {
			console.error("Error al traer productos:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		traerProductos();
	}, []);

	const clickEliminar = (producto) => {
		setProductoAEliminar(producto);
		setModalVisible(true);
	};

	const confirmarEliminacion = async () => {
		if (!productoAEliminar) return;
		try {
			await deleteDoc(doc(db, "productos", productoAEliminar.id));
			mostrarToast(
				`El producto ${productoAEliminar.nombre} fue eliminado.`,
				"admin",
			);
			setModalVisible(false);
			setProductoAEliminar(null);
			traerProductos();
		} catch (error) {
			mostrarToast("Error al eliminar el producto.", "admin");
		}
	};

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<h2 style={styles.title}>Panel de Administración</h2>
				<Link to="/admin/nuevo" style={styles.addBtn}>
					<FiPlus style={{ marginRight: "6px", verticalAlign: "middle" }} />
					Agregar Producto
				</Link>
			</div>

			{loading ? (
				<p style={{ textAlign: "center" }}>Cargando base de datos...</p>
			) : (
				<div style={styles.tableContainer}>
					<table style={styles.table}>
						<thead>
							<tr>
								<th style={styles.th}>Imagen</th>
								<th style={styles.th}>Nombre</th>
								<th style={styles.th}>Precio</th>
								<th style={styles.th}>Stock</th>
								<th style={styles.th}>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{productos.map((prod) => (
								<tr key={prod.id}>
									<td style={styles.td}>
										<ImagenSegura
											src={prod.imagenes?.[0]}
											alt={prod.nombre}
											style={styles.imgThumbnail}
										/>
									</td>
									<td style={styles.td}>
										<strong>{prod.nombre}</strong>
										<br />
										<span style={{ fontSize: "12px", color: "#64748b" }}>
											{prod.categoria}
										</span>
									</td>
									<td style={styles.td}>USD {prod.precio}</td>
									<td style={styles.td}>{prod.stock} u.</td>
									<td style={styles.td}>
										<button
											onClick={() => navigate(`/admin/editar/${prod.id}`)}
											style={{ ...styles.actionBtn, color: "#3b82f6" }}
											title="Editar">
											<FiEdit size={20} />
										</button>

										<button
											onClick={() => clickEliminar(prod)}
											style={{ ...styles.actionBtn, color: "#ef4444" }}
											title="Eliminar">
											<FiTrash2 size={20} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{modalVisible && (
				<div style={styles.modalOverlay}>
					<div style={styles.modalBox}>
						<span style={{ fontSize: "40px", color: "#ef4444" }}>
							<FiAlertTriangle />
						</span>
						<h3 style={styles.modalTitle}>¿Estás completamente seguro?</h3>
						<p style={styles.modalText}>
							Estás a punto de eliminar{" "}
							<strong>{productoAEliminar?.nombre}</strong> de forma permanente
							de la base de datos. Esta acción no se puede deshacer.
						</p>
						<div style={styles.modalActions}>
							<button
								onClick={() => setModalVisible(false)}
								style={styles.btnCancel}>
								Cancelar
							</button>
							<button onClick={confirmarEliminacion} style={styles.btnConfirm}>
								Sí, Eliminar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const styles = {
	container: {
		maxWidth: "1000px",
		margin: "40px auto",
		padding: "0 20px",
		minHeight: "60vh",
	},
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "20px",
		flexWrap: "wrap",
		gap: "15px",
	},
	title: { fontSize: "28px", color: "#0f172a", fontWeight: "800", margin: 0 },
	addBtn: {
		background: "#0f172a",
		color: "#fff",
		padding: "12px 24px",
		borderRadius: "8px",
		textDecoration: "none",
		fontWeight: "bold",
		transition: "transform 0.2s",
	},
	tableContainer: {
		overflowX: "auto",
		background: "#fff",
		borderRadius: "12px",
		border: "1px solid #e2e8f0",
		boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
	},
	table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
	th: {
		background: "#f8fafc",
		padding: "16px",
		textAlign: "left",
		color: "#334155",
		fontWeight: "700",
		fontSize: "14px",
		borderBottom: "2px solid #e2e8f0",
	},
	td: {
		padding: "16px",
		borderBottom: "1px solid #e2e8f0",
		color: "#475569",
		verticalAlign: "middle",
	},
	imgThumbnail: {
		width: "50px",
		height: "50px",
		objectFit: "cover",
		borderRadius: "6px",
	},
	actionBtn: {
		border: "none",
		background: "none",
		cursor: "pointer",
		fontSize: "18px",
		margin: "0 8px",
		transition: "transform 0.2s",
	},

	modalOverlay: {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		background: "rgba(15, 23, 42, 0.8)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 9999,
	},
	modalBox: {
		background: "#fff",
		padding: "30px",
		borderRadius: "16px",
		maxWidth: "400px",
		textAlign: "center",
		boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
	},
	modalTitle: {
		margin: "10px 0",
		color: "#0f172a",
		fontSize: "22px",
		fontWeight: "800",
	},
	modalText: {
		color: "#475569",
		fontSize: "15px",
		lineHeight: "1.5",
		marginBottom: "24px",
	},
	modalActions: { display: "flex", justifyContent: "center", gap: "15px" },
	btnCancel: {
		background: "#f1f5f9",
		color: "#334155",
		border: "1px solid #cbd5e1",
		padding: "10px 20px",
		borderRadius: "8px",
		cursor: "pointer",
		fontWeight: "bold",
	},
	btnConfirm: {
		background: "#ef4444",
		color: "#fff",
		border: "none",
		padding: "10px 20px",
		borderRadius: "8px",
		cursor: "pointer",
		fontWeight: "bold",
	},
};

export default AdminPage;
