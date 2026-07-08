import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductosPage from "./pages/ProductosPage";
import Nosotros from "./pages/Nosotros";
import CarritoPage from "./pages/CarritoPage";
import DetalleProductoPage from "./pages/DetalleProductoPage";
import ScrollToTop from "./components/ScrollToTop";
import FormularioContainer from "./components/form/FormularioContainer";
import ToastNotification from "./components/ToastNotification";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import LoginPage from "./pages/LoginPage";
import RutaProtegida from "./components/RutaProtegida";
import AdminPage from "./pages/AdminPage";

function App() {
	const [toast, setToast] = useState({
		visible: false,
		mensaje: "",
		tipo: "success",
	});

	const mostrarToast = (mensaje, tipo = "success") => {
		setToast({ visible: true, mensaje, tipo });
		setTimeout(() => {
			setToast({ visible: false, mensaje: "", tipo: "success" });
		}, 3000);
	};

	return (
		<AuthProvider>
			<CarritoProvider>
				<BrowserRouter>
					<ScrollToTop />
					<Layout>
						<Routes>
							<Route path="/" element={<Home mostrarToast={mostrarToast} />} />
							<Route
								path="/productos"
								element={<ProductosPage mostrarToast={mostrarToast} />}
							/>
							<Route path="/nosotros" element={<Nosotros />} />
							<Route path="/carrito" element={<CarritoPage />} />
							<Route
								path="/producto/:id"
								element={<DetalleProductoPage mostrarToast={mostrarToast} />}
							/>
							<Route
								path="/login"
								element={<LoginPage mostrarToast={mostrarToast} />}
							/>
							<Route
								path="/admin"
								element={
									<RutaProtegida>
										<AdminPage mostrarToast={mostrarToast} />
									</RutaProtegida>
								}
							/>
							<Route
								path="/admin/nuevo"
								element={
									<RutaProtegida>
										<FormularioContainer mostrarToast={mostrarToast} />
									</RutaProtegida>
								}
							/>
							<Route
								path="/admin/editar/:id"
								element={
									<RutaProtegida>
										<FormularioContainer mostrarToast={mostrarToast} />
									</RutaProtegida>
								}
							/>
						</Routes>
					</Layout>
					<ToastNotification
						visible={toast.visible}
						mensaje={toast.mensaje}
						tipo={toast.tipo}
					/>
				</BrowserRouter>
			</CarritoProvider>
		</AuthProvider>
	);
}

export default App;
