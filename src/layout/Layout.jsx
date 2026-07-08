import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const ContenedorGlobal = styled.div`
	display: flex;
	min-height: 100vh;
	background-color: #f1f5f9; /* Fondo claro para que el contenido sea legible */
`;

const SidebarLateral = styled.aside`
	width: 260px;
	background-color: #0f172a; /* Fondo oscuro minimalista y elegante */
	color: #ffffff;
	display: flex;
	flex-direction: column;
	padding: 24px 0;
	box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05);
	position: fixed;
	height: 100vh;
	z-index: 1000;
`;

const Brand = styled.div`
	font-size: 24px;
	font-weight: 800;
	padding: 0 24px;
	margin-bottom: 40px;
	display: flex;
	align-items: center;
	gap: 10px;
`;

const ContenidoPrincipal = styled.main`
	flex: 1;
	margin-left: 260px; /* Dejamos el espacio exacto del sidebar */
	padding: 40px;
	width: calc(100% - 260px);
`;

const Layout = ({ children }) => {
	return (
		<ContenedorGlobal>
			<SidebarLateral>
				<Brand>
					<span style={{ color: "#ef4444" }}>⚡</span> TechStore
				</Brand>
				<NavBar />
			</SidebarLateral>

			<ContenidoPrincipal>{children}</ContenidoPrincipal>
		</ContenedorGlobal>
	);
};

export default Layout;
