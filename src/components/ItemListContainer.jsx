import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";

const ItemListContainer = ({ saludo, onAddToCart, limite = 10 }) => {
	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/data/products.json")
			.then((res) => {
				if (!res.ok) throw new Error("No se pudo leer el archivo de productos");
				return res.json();
			})
			.then((data) => {
				const creadosLocalmente =
					JSON.parse(localStorage.getItem("nuevosProductosTechStore")) || [];

				const listaCompleta = [...creadosLocalmente, ...(data.productos || [])];

				const productosFiltrados = listaCompleta.slice(0, limite);

				setProductos(productosFiltrados);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, [limite]);

	return (
		<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "10px" }}>
			<h2 style={{ fontSize: "22px", color: "#0f172a", marginBottom: "20px" }}>
				{saludo}
			</h2>
			{loading ? (
				<p style={{ textAlign: "center", color: "#64748b" }}>
					Cargando catálogo...
				</p>
			) : (
				<ItemList productos={productos} onAddToCart={onAddToCart} />
			)}
		</div>
	);
};

export default ItemListContainer;
