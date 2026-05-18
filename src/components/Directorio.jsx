import React from "react";
import TarjetaContacto from "./TarjetaContacto";
import { companerosData } from "../data/teamData";

const Directorio = () => {
	return (
		<div style={styles.grid}>
			{companerosData.map((persona) => (
				<TarjetaContacto
					key={persona.id}
					nombre={persona.nombre}
					puesto={persona.puesto}
					email={persona.email}
					foto={persona.foto}
				/>
			))}
		</div>
	);
};

const styles = {
	grid: {
		display: "flex",
		gap: "20px",
		justifyContent: "center",
		flexWrap: "wrap",
		marginTop: "15px",
	},
};

export default Directorio;
