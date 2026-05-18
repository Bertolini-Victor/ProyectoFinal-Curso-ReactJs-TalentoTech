import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ cantidadCarrito }) => {
	return (
		<nav>
			<ul style={styles.ul}>
				<li>
					<Link to="/" style={styles.link}>
						Inicio
					</Link>
				</li>
				<li>
					<Link to="/productos" style={styles.link}>
						Productos
					</Link>
				</li>
				<li>
					<Link to="/nosotros" style={styles.link}>
						Nosotros
					</Link>
				</li>
				<li>
					<Link to="/agregar-producto" style={styles.link}>
						Agregar Producto
					</Link>
				</li>
				<li>
					<Link to="/carrito" style={styles.cartBtn}>
						<span style={styles.cartIcon}>🛒</span>
						<span style={styles.cartText}>Mi Carrito</span>
						{cantidadCarrito > 0 && (
							<span style={styles.badge}>{cantidadCarrito}</span>
						)}
					</Link>
				</li>
			</ul>
		</nav>
	);
};

const styles = {
	ul: {
		display: "flex",
		listStyle: "none",
		gap: "8px",
		margin: 0,
		padding: 0,
		alignItems: "center",
	},
	link: {
		color: "#94a3b8",
		textDecoration: "none",
		fontWeight: "600",
		fontSize: "14px",
		padding: "8px 16px",
		borderRadius: "6px",
		transition: "all 0.2s ease",
	},
	cartBtn: {
		background: "#1e293b",
		color: "#ffffff",
		textDecoration: "none",
		fontWeight: "700",
		fontSize: "14px",
		padding: "8px 16px",
		borderRadius: "8px",
		display: "flex",
		alignItems: "center",
		gap: "8px",
		border: "1px solid #334155",
		position: "relative",
		marginLeft: "10px",
	},
	cartIcon: {
		fontSize: "16px",
	},
	cartText: {
		marginRight: "2px",
	},
	badge: {
		background: "#ef4444",
		color: "#ffffff",
		padding: "2px 7px",
		borderRadius: "10px",
		fontSize: "11px",
		fontWeight: "800",
		boxShadow: "0 2px 5px rgba(239, 68, 68, 0.4)",
	},
};

export default NavBar;
