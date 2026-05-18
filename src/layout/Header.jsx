import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Header = ({ cantidadCarrito }) => {
	return (
		<header style={styles.header}>
			<div style={styles.container}>
				<Link to="/" style={styles.logoLink}>
					<div style={styles.logoBox}>
						<span style={styles.logoIcon}>⚡</span>
						<h1 style={styles.logoText}>
							Tech<span style={styles.logoAccent}>Store</span>
						</h1>
					</div>
				</Link>

				<NavBar cantidadCarrito={cantidadCarrito} />
			</div>
		</header>
	);
};

const styles = {
	header: {
		background: "#0f172a",
		position: "sticky",
		top: 0,
		zIndex: 1000,
		boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
		borderBottom: "2px solid #ef4444",
	},
	container: {
		maxWidth: "1200px",
		margin: "0 auto",
		padding: "15px 20px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
		gap: "15px",
	},
	logoLink: {
		textDecoration: "none",
		color: "inherit",
	},
	logoBox: {
		display: "flex",
		alignItems: "center",
		gap: "8px",
		cursor: "pointer",
	},
	logoIcon: {
		fontSize: "22px",
	},
	logoText: {
		margin: 0,
		fontSize: "22px",
		fontWeight: "800",
		letterSpacing: "0.5px",
		color: "#ffffff",
	},
	logoAccent: {
		color: "#ef4444",
	},
};

export default Header;
