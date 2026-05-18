import React from "react";
import Item from "./Item";

const ItemList = ({ productos, onAddToCart }) => {
	return (
		<div style={styles.grid}>
			{productos.map((prod) => (
				<Item
					key={prod.id}
					id={prod.id}
					nombre={prod.nombre}
					precio={prod.precio}
					categoria={prod.categoria}
					descripcion_corta={prod.descripcion_corta}
					imagenes={prod.imagenes}
					stock={prod.stock}
					onAddToCart={onAddToCart}
				/>
			))}
		</div>
	);
};

const styles = {
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
		gap: "25px",
		padding: "10px 0",
	},
};

export default ItemList;
