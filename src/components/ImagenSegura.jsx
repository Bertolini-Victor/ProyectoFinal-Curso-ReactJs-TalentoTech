import React from "react";

const IMAGEN_DEFAULT = "/image/placeholder_seguro.jpg"; 

const ImagenSegura = ({ src, alt, style }) => {
	const handleImgError = (e) => {
		e.target.src = IMAGEN_DEFAULT;
		e.target.onerror = null;
	};

	return (
		<img
			src={src}
			alt={alt}
			style={style}
			onError={handleImgError}
		/>
	);
};

export default ImagenSegura;