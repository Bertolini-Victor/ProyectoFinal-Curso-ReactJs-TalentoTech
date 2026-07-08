# ⚡ TechStore - Plataforma E-Commerce Premium

¡Bienvenido a TechStore! Un e-commerce de vanguardia enfocado en hardware premium, componentes de alta gama y dispositivos tecnológicos de última generación. Este proyecto fue diseñado de forma modular utilizando React JS y Vite, y representa la entrega final del programa Talento Lab.

## 🔐 Acceso para Evaluación (Profesor)

Para poder evaluar los requerimientos de Rutas Protegidas, Autenticación y el CRUD de Productos, por favor utiliza las siguientes credenciales de administrador en la sección "Iniciar Sesión":

- **Email:** admin@techstore.com
- **Contraseña:** admin1234

> **Nota:** Estas credenciales dan acceso al Panel de Administración protegido para crear, editar y eliminar productos directamente en la base de datos de Firebase.

## 🚀 Características Clave del Proyecto

La aplicación ha sido desarrollada escalando desde un entorno local hacia una arquitectura robusta basada en la nube:

### 📦 1. Gestión Global con Context API y Autenticación

- **CarritoContext:** Manejo del estado global del carrito. Permite sumar, restar, eliminar ítems y vaciar el carrito completo, calculando subtotales y cantidades en tiempo real.
- **AuthContext:** Gestión global de la sesión del usuario conectada a Firebase Authentication.
- **Rutas Privadas:** Implementación de un componente guardián (`RutaProtegida`) que expulsa a usuarios no autorizados que intenten acceder a las URL de administración.

### ☁️ 2. Base de Datos en la Nube y CRUD (Firebase Firestore)

- **Gestión 100% Cloud:** El catálogo migró de un archivo JSON estático a una base de datos NoSQL en tiempo real (Firestore).
- **Panel de Administración:** Una tabla de control exclusiva para el administrador con opciones para Editar y Eliminar (con modal de confirmación de seguridad).
- **Formulario Inteligente:** Un mismo componente recicla su lógica para Crear nuevos productos o Actualizar existentes, integrando la API de Imgbb para el alojamiento físico de las imágenes.

### 🎨 3. Arquitectura de Estilos Híbrida y SEO

- **Styled-Components:** Diseño de un Sidebar (barra lateral) moderno en modo oscuro para el layout principal, aislando los estilos a nivel de componente.
- **React Bootstrap:** Implementación del sistema de grillas (`Row`, `Col`, `Card`) para garantizar la responsividad en la sección "Nosotros".
- **React Icons:** Iconografía unificada, profesional y escalable basada en la librería Feather y FontAwesome.
- **React Helmet:** Inyección dinámica de etiquetas `<title>` y `<meta>` en el `<head>` del documento para optimizar el posicionamiento (SEO) según la página navegada.

### ⚙️ 4. UX Avanzada: Búsqueda, Paginación y Descuentos

- **Buscador en Tiempo Real:** Filtrado dinámico por nombre o categoría que actualiza el catálogo instantáneamente.
- **Paginación Matemática:** División automática del array de productos traídos de Firebase para no sobrecargar la vista, adaptándose a los resultados de búsqueda.
- **Motor de Cupones:** Sistema de descuentos en el checkout. (Podés probar los códigos `REACT20` o `TALENTOLAB` en el carrito).

## 🛠️ Tecnologías Utilizadas

- React JS (v18+)
- Vite (Build tool ultra rápido)
- Firebase (Authentication & Firestore Database)
- React Router Dom (Enrutamiento dinámico SPA)
- Context API (Gestión de estados globales)
- Styled-Components (CSS-in-JS)
- React Bootstrap (UI Framework)
- React Icons (Iconografía SVG)
- React Helmet (Inyección de metadatos SEO)
- Imgbb API (Alojamiento y procesamiento de imágenes)

## 📂 Estructura del Repositorio

```text
src/
├── assets/       # Imágenes estáticas y formatos de alta eficiencia
├── components/   # Componentes de UI modulares (Item, ItemList, Modales)
│   └── form/     # Lógica y renderizado del Formulario de Productos
├── config/       # Archivo de inicialización y conexión con Firebase
├── context/      # Estados globales (AuthContext.jsx, CarritoContext.jsx)
├── data/         # Archivos de datos estáticos locales (teamData.js)
├── layout/       # Layout principal, NavBar lateral
├── pages/        # Vistas asociadas al ruteo (Home, Admin, Carrito, etc.)
└── App.jsx       # Raíz de la aplicación y enrutador principal
```

## ⚙️ Instalación y Ejecución Local

Para levantar el entorno de desarrollo en tu computadora local, seguí estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Bertolini-Victor/ProyectoFinalCurso-ReactJs-TalentoTech.git
   ```

2. **Ingresar a la carpeta del proyecto:**
   ```bash
   cd ProyectoFinal-Curso-ReactJs-TalentoTech
   ```

3. **Instalar dependencias:**
   ```bash
   npm install
   ```

4. **Variables de Entorno (Opcional):**
   Asegurate de configurar tu propio archivo `firebase.js` en `src/config` con las credenciales de tu consola de Google Firebase si deseás usar tu propia base de datos.

5. **Iniciar el servidor local en modo de desarrollo:**
   ```bash
   npm run dev
   ```

<<<<<<< Updated upstream
    ```bash
    npm install
    ```

* Iniciar el servidor local en modo de desarrollo:

    ```bash
    npm run dev
    ```

* Abrir el navegador:
    Es habitualmente provista por Vite y aunque puede variar de puerto suele ser:

    ```txt
    http://localhost:5173.
    ```
=======
6. **Abrir el navegador:**
   Ingresá a la URL local provista por Vite (habitualmente `http://localhost:5173`).
>>>>>>> Stashed changes
