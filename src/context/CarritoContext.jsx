import React, { createContext, useState, useEffect, useContext } from 'react';

export const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem("carritoTechStore");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    useEffect(() => {
        localStorage.setItem("carritoTechStore", JSON.stringify(carrito));
    }, [carrito]);

    const handleAddToCart = (producto, cantidadElegida = 1) => {
        setCarrito((prevCarrito) => {
            const itemExiste = prevCarrito.find((item) => item.id === producto.id);
            const imagenDefault = producto.imagenes && producto.imagenes.length > 0
                ? producto.imagenes[0]
                : producto.imagen || "https://images.unsplash.com/photo-1531403009284-440f080d1e12";

            if (itemExiste) {
                return prevCarrito.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidadElegida } : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad: cantidadElegida, fotoCarrito: imagenDefault }];
        });
    };

    const handleDecreaseQuantity = (id) => {
        setCarrito((prevCarrito) => {
            const item = prevCarrito.find((item) => item.id === id);
            if (item.cantidad > 1) {
                return prevCarrito.map((item) =>
                    item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
                );
            }
            return prevCarrito.filter((item) => item.id !== id);
        });
    };

    const handleRemoveFromCart = (id) => setCarrito((prev) => prev.filter((item) => item.id !== id));
    
    const handleClearCart = () => setCarrito([]);

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const precioTotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <CarritoContext.Provider value={{
            carrito,
            handleAddToCart,
            handleDecreaseQuantity,
            handleRemoveFromCart,
            handleClearCart,
            cantidadTotal,
            precioTotal
        }}>
            {children}
        </CarritoContext.Provider>
    );
};