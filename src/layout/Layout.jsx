import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, cantidadCarrito }) => {
	return (
		<div style={styles.wrapper}>
			<Header cantidadCarrito={cantidadCarrito} />
			<main style={styles.mainContent}>{children}</main>
			<Footer />
		</div>
	);
};

const styles = {
	wrapper: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
		background: "#f8fafc",
	},
	mainContent: { padding: "20px", flex: 1 },
};

export default Layout;
