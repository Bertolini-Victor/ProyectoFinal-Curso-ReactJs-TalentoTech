import React from "react";
import ItemListContainer from "../components/ItemListContainer";

const ProductosPage = ({ mostrarToast }) => {
	return (
		<div style={styles.container}>
			<div style={styles.headerBox}>
				<div style={styles.textData}>
					<span style={styles.tag}>HARDWARE & TECH</span>
					<h2 style={styles.mainTitle}>Catálogo Completo de Componentes</h2>
					<p style={styles.subtitle}>
						Explorá nuestra variedad de stock real con precios actualizados en
						tiempo real.
					</p>
				</div>
				<div style={styles.badgeCount}>
					<span style={styles.badgeNum}>100%</span>
					<span style={styles.badgeLabel}>Original</span>
				</div>
			</div>

			<hr style={styles.divider} />

			<div style={styles.listWrapper}>
				<ItemListContainer
					saludo="Todos los Productos en Stock"
					mostrarToast={mostrarToast}
					limite={8}
					esPaginado={true}
					mostrarBuscador={true} 
				/>
			</div>
		</div>
	);
};

const styles = {
	container: { maxWidth: "1200px", margin: "30px auto", padding: "0 20px" },
	headerBox: {
		background: "#f8fafc",
		borderLeft: "4px solid #ef4444",
		padding: "24px",
		borderRadius: "0 12px 12px 0",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
		gap: "20px",
	},
	textData: { display: "flex", flexDirection: "column", gap: "6px" },
	tag: {
		fontSize: "11px",
		fontWeight: "800",
		color: "#ef4444",
		letterSpacing: "1.5px",
	},
	mainTitle: {
		fontSize: "28px",
		fontWeight: "800",
		color: "#0f172a",
		margin: 0,
	},
	subtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
	badgeCount: {
		background: "#0f172a",
		color: "#ffffff",
		padding: "12px 20px",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		minWidth: "80px",
	},
	badgeNum: { fontSize: "18px", fontWeight: "800", color: "#ef4444" },
	badgeLabel: {
		fontSize: "10px",
		textTransform: "uppercase",
		color: "#94a3b8",
		fontWeight: "600",
		letterSpacing: "0.5px",
	},
	divider: { border: 0, borderTop: "1px solid #e2e8f0", margin: "30px 0" },
	listWrapper: { marginTop: "10px" },
};

export default ProductosPage;
