import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormularioProducto from "./FormularioProducto";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const estadoInicial = {
	nombre: "",
	categoria: "",
	precio: "",
	stock: "",
	descripcion_corta: "",
};

function FormularioContainer({ mostrarToast }) {
	const { id } = useParams();
	const navigate = useNavigate();

	const [datosForm, setDatosForm] = useState(estadoInicial);
	const [imagenFile, setImagenFile] = useState(null);
	const [imagenPrevia, setImagenPrevia] = useState("");
	const [subiendo, setSubiendo] = useState(false);

	useEffect(() => {
		if (id) {
			const traerProducto = async () => {
				const docRef = doc(db, "productos", id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					setDatosForm(data);
					if (data.imagenes) setImagenPrevia(data.imagenes[0]);
				}
			};
			traerProducto();
		}
	}, [id]);

	const manejarCambio = (e) =>
		setDatosForm({ ...datosForm, [e.target.name]: e.target.value });
	const manejarCambioImagen = (e) => {
		if (e.target.files[0]) setImagenFile(e.target.files[0]);
	};

	const manejarEnvio = async (e) => {
		e.preventDefault();

		if (!id && !imagenFile) {
			if (mostrarToast) mostrarToast("Falta seleccionar una imagen", "admin");
			return;
		}

		setSubiendo(true);
		try {
			let urlImagenFinal = imagenPrevia;
			if (imagenFile) {
				const apiKey = "0cfac6af9dca7ba6502a9b890867f83c";
				const formData = new FormData();
				formData.append("image", imagenFile);
				formData.append("expiration", 86400);

				const resImgbb = await fetch(
					`https://api.imgbb.com/1/upload?key=${apiKey}`,
					{ method: "POST", body: formData },
				);
				const datosImgbb = await resImgbb.json();

				if (datosImgbb.success) {
					urlImagenFinal = datosImgbb.data.url;
				} else throw new Error("Falló la subida");
			}

			const productoFinal = {
				nombre: datosForm.nombre,
				categoria: datosForm.categoria,
				precio: parseFloat(datosForm.precio),
				stock: parseInt(datosForm.stock),
				descripcion_corta: datosForm.descripcion_corta,
				imagenes: [urlImagenFinal],
			};

			if (id) {
				const docRef = doc(db, "productos", id);
				await updateDoc(docRef, productoFinal);
				if (mostrarToast)
					mostrarToast(`¡"${productoFinal.nombre}" actualizado!`, "admin");
				navigate("/admin");
			} else {
				const productosRef = collection(db, "productos");
				await addDoc(productosRef, productoFinal);
				if (mostrarToast)
					mostrarToast(`¡"${productoFinal.nombre}" creado con éxito!`, "admin");
				setDatosForm(estadoInicial);
				setImagenFile(null);
				e.target.reset();
			}
		} catch (error) {
			console.error(error);
			if (mostrarToast)
				mostrarToast("Error al guardar en la base de datos.", "admin");
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
			esEdicion={!!id}
		/>
	);
}

export default FormularioContainer;
