import React, { useState } from "react";
import { FiZap, FiEdit, FiSave, FiLoader, FiArrowRight } from "react-icons/fi";

const FormularioProducto = ({
	datosForm,
	manejarCambio,
	manejarCambioImagen,
	manejarEnvio,
	subiendo,
	esEdicion,
}) => {
	const [isButtonHovered, setIsButtonHovered] = useState(false);

	return (
		<div style={styles.pageWrapper}>
			<form style={styles.form} onSubmit={manejarEnvio}>
				<div style={styles.header}>
					<span style={styles.icon}>{esEdicion ? <FiEdit /> : <FiZap />}</span>
					<h3 style={styles.title}>
						{esEdicion ? "Editar Componente" : "Nuevo Componente Tecnológico"}
					</h3>
				</div>

				<p style={styles.subtitle}>
					{esEdicion
						? "Modificá los valores actuales del producto."
						: "Completá las especificaciones para sumar stock al catálogo real."}
				</p>

				<div style={styles.inputGroup}>
					<label style={styles.label}>Nombre del Dispositivo:</label>
					<input
						style={styles.input}
						type="text"
						placeholder="Ej: ASUS ROG Strix GeForce RTX 4070"
						name="nombre"
						value={datosForm.nombre}
						onChange={manejarCambio}
						required
					/>
				</div>

				<div style={styles.row}>
					<div style={styles.inputGroup}>
						<label style={styles.label}>Categoría:</label>
						<select
							style={styles.input}
							name="categoria"
							value={datosForm.categoria}
							onChange={manejarCambio}
							required>
							<option value="">Seleccionar...</option>
							<option value="Notebooks">Notebooks</option>
							<option value="Componentes PC">Componentes PC</option>
							<option value="Periféricos">Periféricos</option>
						</select>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Precio (USD):</label>
						<input
							style={styles.input}
							type="number"
							placeholder="Ej: 899.99"
							name="precio"
							value={datosForm.precio}
							onChange={manejarCambio}
							required
						/>
					</div>

					<div style={styles.inputGroup}>
						<label style={styles.label}>Stock inicial:</label>
						<input
							style={styles.input}
							type="number"
							placeholder="Ej: 25"
							name="stock"
							value={datosForm.stock}
							onChange={manejarCambio}
							required
						/>
					</div>
				</div>

				<div style={styles.inputGroup}>
					<label style={styles.label}>Descripción Corta:</label>
					<textarea
						style={{ ...styles.input, minHeight: "80px" }}
						placeholder="Breve detalle (ej: GPU 12GB GDDR6X, Triple Fan)..."
						name="descripcion_corta"
						value={datosForm.descripcion_corta}
						onChange={manejarCambio}
						required
					/>
				</div>

				<div style={styles.inputGroup}>
					<label style={styles.label}>Foto del Producto (JPG/PNG):</label>
					<input
						style={styles.fileInput}
						type="file"
						accept="image/*"
						onChange={manejarCambioImagen}
						required={!esEdicion && !subiendo} // No exigimos subir imagen si estamos editando
					/>
					{esEdicion && (
						<small style={{ color: "#64748b", marginTop: "4px" }}>
							Dejá vacío para mantener la imagen actual.
						</small>
					)}
				</div>

				<button
					type="submit"
					onMouseEnter={() => setIsButtonHovered(true)}
					onMouseLeave={() => setIsButtonHovered(false)}
					style={{
						...(subiendo ? styles.buttonDisabled : styles.button),
						background: subiendo
							? "#cbd5e1"
							: isButtonHovered
								? "#dc2626"
								: "#ef4444",
						transform:
							isButtonHovered && !subiendo
								? "translateY(-2px)"
								: "translateY(0)",
						boxShadow:
							isButtonHovered && !subiendo
								? "0 6px 15px rgba(239, 68, 68, 0.3)"
								: "0 4px 10px rgba(239, 68, 68, 0.2)",
					}}
					disabled={subiendo}>
					{subiendo ? (
						<>
							<FiLoader
								style={{ marginRight: "6px", verticalAlign: "middle" }}
							/>{" "}
							Guardando...
						</>
					) : esEdicion ? (
						<>
							<FiSave style={{ marginRight: "6px", verticalAlign: "middle" }} />{" "}
							Actualizar Producto{" "}
							<FiArrowRight
								style={{ marginLeft: "6px", verticalAlign: "middle" }}
							/>
						</>
					) : (
						<>
							<FiSave style={{ marginRight: "6px", verticalAlign: "middle" }} />{" "}
							Guardar en Catálogo{" "}
							<FiArrowRight
								style={{ marginLeft: "6px", verticalAlign: "middle" }}
							/>
						</>
					)}
				</button>
			</form>
		</div>
	);
};

const styles = {
	pageWrapper: {
		maxWidth: "1200px",
		margin: "0 auto",
		padding: "40px 20px",
		minHeight: "80vh",
		background: "#f8fafc",
	},

	form: {
		display: "flex",
		flexDirection: "column",
		maxWidth: "750px",
		margin: "0 auto",
		padding: "40px",
		background: "#ffffff",
		borderRadius: "16px",
		border: "1px solid #e2e8f0",
		boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
		gap: "22px",
	},

	header: {
		display: "flex",
		alignItems: "center",
		gap: "12px",
		borderBottom: "2px solid #f1f5f9",
		paddingBottom: "15px",
	},
	icon: { fontSize: "24px" },
	title: {
		color: "#0f172a",
		margin: 0,
		fontSize: "26px",
		fontWeight: "800",
		letterSpacing: "-0.5px",
	},

	subtitle: {
		color: "#64748b",
		fontSize: "14px",
		margin: "-10px 0 10px 0",
		lineHeight: "1.5",
	},

	row: { display: "flex", gap: "20px", flexWrap: "wrap" },
	inputGroup: { display: "flex", flexDirection: "column", gap: "8px", flex: 1 },

	label: {
		color: "#334155",
		fontSize: "13px",
		fontWeight: "700",
		letterSpacing: "0.5px",
	},

	input: {
		background: "#f8fafc",
		border: "1px solid #cbd5e1",
		color: "#0f172a",
		padding: "14px",
		borderRadius: "10px",
		fontSize: "14px",
		outline: "none",
		transition: "border-color 0.2s",
		font: "inherit",
	},

	fileInput: {
		background: "#f8fafc",
		color: "#475569",
		padding: "12px",
		borderRadius: "10px",
		border: "2px dashed #94a3b8",
		cursor: "pointer",
		fontSize: "13px",
	},

	button: {
		color: "#ffffff",
		border: "none",
		padding: "16px",
		borderRadius: "10px",
		fontWeight: "700",
		fontSize: "15px",
		cursor: "pointer",
		marginTop: "10px",
		transition: "all 0.3s ease",
	},
	buttonDisabled: {
		color: "#64748b",
		border: "none",
		padding: "16px",
		borderRadius: "10px",
		fontWeight: "700",
		fontSize: "15px",
		cursor: "not-allowed",
		marginTop: "10px",
	},
};

export default FormularioProducto;
