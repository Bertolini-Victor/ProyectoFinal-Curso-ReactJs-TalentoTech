import React, { useState, useEffect } from "react";
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

function App() {
	const [carrito, setCarrito] = useState(() => {
		const carritoGuardado = localStorage.getItem("carritoTechStore");
		return carritoGuardado ? JSON.parse(carritoGuardado) : [];
	});

	useEffect(() => {
		localStorage.setItem("carritoTechStore", JSON.stringify(carrito));
	}, [carrito]);

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

	const handleAddToCart = (producto, cantidadElegida = 1) => {
		setCarrito((prevCarrito) => {
			const itemExiste = prevCarrito.find((item) => item.id === producto.id);
			const imagenDefault =
				producto.imagenes && producto.imagenes.length > 0
					? producto.imagenes[0]
					: producto.imagen ||
						"https://images.unsplash.com/photo-1531403009284-440f080d1e12";

			if (itemExiste) {
				return prevCarrito.map((item) =>
					item.id === producto.id
						? { ...item, cantidad: item.cantidad + cantidadElegida }
						: item,
				);
			}
			return [
				...prevCarrito,
				{ ...producto, cantidad: cantidadElegida, fotoCarrito: imagenDefault },
			];
		});

		mostrarToast(
			`¡"${producto.nombre}" (${cantidadElegida} u.) añadido al carrito!`,
			"success",
		);
	};

	const handleDecreaseQuantity = (id) => {
		setCarrito((prevCarrito) => {
			const item = prevCarrito.find((item) => item.id === id);
			if (item.cantidad > 1) {
				return prevCarrito.map((item) =>
					item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
				);
			}
			return prevCarrito.filter((item) => item.id !== id);
		});
	};

	const handleRemoveFromCart = (id) =>
		setCarrito((prev) => prev.filter((item) => item.id !== id));
	const handleClearCart = () => setCarrito([]);

	return (
		<BrowserRouter>
			<ScrollToTop />
			<Layout
				cantidadCarrito={carrito.reduce((acc, item) => acc + item.cantidad, 0)}>
				<Routes>
					<Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
					<Route
						path="/productos"
						element={<ProductosPage onAddToCart={handleAddToCart} />}
					/>
					<Route path="/nosotros" element={<Nosotros />} />

					<Route
						path="/carrito"
						element={
							<CarritoPage
								carrito={carrito}
								onRemove={handleRemoveFromCart}
								onDecrease={handleDecreaseQuantity}
								onClear={handleClearCart}
								onAdd={handleAddToCart}
							/>
						}
					/>
					<Route
						path="/producto/:id"
						element={<DetalleProductoPage onAddToCart={handleAddToCart} />}
					/>
					<Route
						path="/agregar-producto"
						element={<FormularioContainer mostrarToast={mostrarToast} />}
					/>
				</Routes>
			</Layout>

			<ToastNotification
				visible={toast.visible}
				mensaje={toast.mensaje}
				tipo={toast.tipo}
			/>
		</BrowserRouter>
	);
}
