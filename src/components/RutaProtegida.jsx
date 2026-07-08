import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RutaProtegida = ({ children }) => {
	const { user, loadingAuth } = useAuth();

	if (loadingAuth) {
		return (
			<div style={{ textAlign: "center", padding: "80px", color: "#64748b" }}>
				Verificando sesión segura...
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default RutaProtegida;
