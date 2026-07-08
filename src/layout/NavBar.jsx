import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	FiShoppingCart,
	FiLogOut,
	FiHome,
	FiBox,
	FiInfo,
	FiSettings,
	FiLogIn,
} from "react-icons/fi";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const NavList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const NavItem = styled(Link)`
	display: flex;
	align-items: center;
	gap: 12px;
	color: #94a3b8;
	text-decoration: none;
	font-weight: 600;
	font-size: 15px;
	padding: 12px 24px;
	transition: all 0.2s ease;
	border-left: 4px solid transparent;

	&:hover {
		color: #ffffff;
		background-color: rgba(255, 255, 255, 0.05);
		border-left: 4px solid #ef4444;
	}
`;

const CartItem = styled(NavItem)`
	background-color: rgba(239, 68, 68, 0.1);
	color: #ef4444;
	border-left: 4px solid #ef4444;
	margin: 0 16px;
	border-radius: 8px;

	&:hover {
		background-color: #ef4444;
		color: #ffffff;
		border-left: 4px solid #ef4444;
	}
`;

const Badge = styled.span`
	background: #ffffff;
	color: #ef4444;
	padding: 2px 8px;
	border-radius: 12px;
	font-size: 12px;
	font-weight: 800;
	margin-left: auto;
`;

const LogoutBtn = styled.button`
	background: transparent;
	color: #94a3b8;
	border: none;
	padding: 12px 24px;
	display: flex;
	align-items: center;
	gap: 12px;
	font-weight: 600;
	font-size: 15px;
	cursor: pointer;
	width: 100%;
	text-align: left;
	transition: all 0.2s ease;
	border-left: 4px solid transparent;

	&:hover {
		color: #ef4444;
		background-color: rgba(239, 68, 68, 0.05);
		border-left: 4px solid #ef4444;
	}
`;

const NavBar = () => {
	const { cantidadTotal } = useCarrito();
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch (error) {
			console.error("Error al cerrar sesión", error);
		}
	};

	return (
		<nav
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				paddingBottom: "20px",
			}}>
			<NavList>
				<li>
					<NavItem to="/">
						<FiHome size={18} /> Inicio
					</NavItem>
				</li>
				<li>
					<NavItem to="/productos">
						<FiBox size={18} /> Productos
					</NavItem>
				</li>
				<li>
					<NavItem to="/nosotros">
						<FiInfo size={18} /> Nosotros
					</NavItem>
				</li>

				{user ? (
					<>
						<li
							style={{
								margin: "20px 0 10px 24px",
								fontSize: "11px",
								color: "#64748b",
								fontWeight: "bold",
								textTransform: "uppercase",
							}}>
							Administración
						</li>
						<li>
							<NavItem to="/admin">
								<FiSettings size={18} /> Panel Admin
							</NavItem>
						</li>
						<li>
							<LogoutBtn onClick={handleLogout}>
								<FiLogOut size={18} /> Cerrar Sesión
							</LogoutBtn>
						</li>
					</>
				) : (
					<>
						<li
							style={{
								margin: "20px 0 10px 24px",
								fontSize: "11px",
								color: "#64748b",
								fontWeight: "bold",
								textTransform: "uppercase",
							}}>
							Acceso
						</li>
						<li>
							<NavItem to="/login">
								<FiLogIn size={18} /> Iniciar Sesión
							</NavItem>
						</li>
					</>
				)}
			</NavList>

			<div style={{ marginTop: "auto" }}>
				<CartItem to="/carrito">
					<FiShoppingCart size={18} /> Mi Carrito
					{cantidadTotal > 0 && <Badge>{cantidadTotal}</Badge>}
				</CartItem>
			</div>
		</nav>
	);
};

export default NavBar;
