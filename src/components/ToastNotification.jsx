import React from "react";
import { FiCheckCircle, FiZap } from "react-icons/fi";

const ToastNotification = ({ visible, mensaje, tipo = "success" }) => {
	const config = {
		success: { bg: "#065f46", border: "#059669", icon: <FiCheckCircle /> },
		admin: { bg: "#1e1b4b", border: "#4f46e5", icon: <FiZap /> },
	};

	const estilo = config[tipo] || config.success;

	return (
		<div
			style={{
				position: "fixed",
				bottom: "24px",
				right: "24px",
				background: estilo.bg,
				color: "#ecfdf5",
				padding: "16px 24px",
				borderRadius: "12px",
				boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
				display: "flex",
				alignItems: "center",
				gap: "12px",
				zIndex: 9999,
				border: `1px solid ${estilo.border}`,
				fontWeight: "600",
				fontSize: "14px",
				transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
				transform: visible
					? "translateY(0) scale(1)"
					: "translateY(40px) scale(0.9)",
				opacity: visible ? 1 : 0,
				pointerEvents: visible ? "auto" : "none",
			}}>
			<span style={{ fontSize: "18px" }}>{estilo.icon}</span>
			<span>{mensaje}</span>
		</div>
	);
};

export default ToastNotification;
