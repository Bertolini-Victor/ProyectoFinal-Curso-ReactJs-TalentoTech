import React, { useState } from "react";
import FormularioProducto from "./FormularioProducto";

const estadoInicial = {
	nombre: "",
	categoria: "",
	precio: "",
	stock: "",
	descripcion_corta: "",
};

function FormularioContainer({ mostrarToast }) {
	const [datosForm, setDatosForm] = useState(estadoInicial);
	const [imagenFile, setImagenFile] = useState(null);
	const [subiendo, setSubiendo] = useState(false);

	const manejarCambio = (evento) =>
		setDatosForm({ ...datosForm, [evento.target.name]: evento.target.value });
	const manejarCambioImagen = (evento) => {
		if (evento.target.files[0]) setImagenFile(evento.target.files[0]);
	};

	const manejarEnvio = async (evento) => {
		evento.preventDefault();
		if (!imagenFile) {
			mostrarToast("Falta seleccionar una imagen", "admin");
			return;
		}

		setSubiendo(true);
		const apiKey = "0cfac6af9dca7ba6502a9b890867f83c";
		const formData = new FormData();
		formData.append("image", imagenFile);
		formData.append("expiration", 86400);

		try {
			const respuestaImgbb = await fetch(
				`https://api.imgbb.com/1/upload?key=${apiKey}`,
				{
					method: "POST",
					body: formData,
				},
			);
			const datosImgbb = await respuestaImgbb.json();

			if (datosImgbb.success) {
				const productoNuevo = {
					id: "PROD-NEW-" + Math.floor(Math.random() * 10000),
					nombre: datosForm.nombre,
					categoria: datosForm.categoria,
					precio: parseFloat(datosForm.precio),
					stock: parseInt(datosForm.stock),
					descripcion_corta: datosForm.descripcion_corta,
					imagenes: [datosImgbb.data.url],
				};

				const productosGuardados =
					JSON.parse(localStorage.getItem("nuevosProductosTechStore")) || [];
				productosGuardados.unshift(productoNuevo);
				localStorage.setItem(
					"nuevosProductosTechStore",
					JSON.stringify(productosGuardados),
				);

				mostrarToast(
					`¡Producto "${productoNuevo.nombre}" publicado con éxito!`,
					"admin",
				);

				setDatosForm(estadoInicial);
				setImagenFile(null);
				evento.target.reset();
			} else {
				throw new Error("Falló la subida");
			}
		} catch (error) {
			mostrarToast("Error al procesar el formulario.", "admin");
		} finally {
			setSubiendo(false);
		}
	};

	return (
		<FormularioProducto
			datosForm={datosForm}
			manejarCambio={manejarCambio}
			manejarEnvio={manejarEnvio}
			manejarCambioImagen={manejarCambioImagen}
			subiendo={subiendo}
		/>
	);
}

export default FormularioContainer;
