# ⚡ TechStore - Plataforma E-Commerce Premium

¡Bienvenido a TechStore! Un e-commerce de vanguardia enfocado en hardware premium, componentes de alta gama y dispositivos tecnológicos de última generación. Este proyecto fue diseñado y codificado de forma modular utilizando React JS y Vite, siguiendo las mejores prácticas de arquitectura moderna de componentes bajo el programa Talento Lab.

## 🚀 Características Clave del Proyecto

La aplicación ha sido desarrollada evolutivamente, implementando soluciones robustas y de alto rendimiento técnico sin depender de librerías externas pesadas:

### 📦 1. Sincronización Global y Gestión de Estado (Elevación de Estado)

Carrito Inteligente: El estado global centralizado en App.jsx controla el flujo de la orden, calcula subtotales monetarios reales y totales de unidades en tiempo real.

Control de Duplicados: Evita la duplicación de ítems en el array; si un producto ya existe, incrementa dinámicamente su cantidad.

Persistencia Local (localStorage): El carrito cuenta con memoria persistente. Si el usuario recarga la página (F5) o cierra la pestaña, los productos se mantienen intactos.

Controles Avanzados: Permite aumentar, disminuir unidades individuales (estilo píldora) o remover líneas completas directamente desde la vista de /carrito.

### 🧭 2. Enrutamiento Dinámico y UX Fluida

SPA Avanzada: Navegación instantánea mediante react-router-dom con rutas públicas y de administración (/, /productos, /nosotros, /carrito, /producto/:id, /admin/nuevo).

ScrollToTop Automático: Incorpora un componente centinela que escucha los cambios de ubicación (useLocation) y fuerza al navegador a posicionarse arriba de todo al cambiar de pantalla, eliminando el arrastre de scroll de las SPAs.

Logo Interactivo: El branding superior actúa como un enlace dinámico directo a la Home.

### ⚡ 3. Panel de Administración y Formulario Autónomo

Patrón Contenedor/Presentacional: Separación estricta de responsabilidades entre la lógica de datos (FormularioContainer) y el renderizado estético (FormularioProducto).

Integración con API Externa (Imgbb): Permite subir imágenes binarias locales físicas en tiempo real desde el dispositivo, transformándolas en enlaces URL públicos en la nube.

Catálogo Unificado en Caliente: Los productos nuevos creados por formulario se insertan mediante un embudo inteligente al principio de la grilla principal, persistiendo en la sesión mediante almacenamiento local y permitiendo ver sus detalles individuales inmediatamente.

### 🎨 4. Interfaz Visual e Identidad Estética Premium

Diseño Minimalista Coherente: Paleta industrial unificada que juega con contrastes claros, grises de soporte, negro azulado profundo (#0f172a) y acentos en rojo vibrante (#ef4444).

Micro-interacciones Nativas: Efectos de hover dinámicos y animaciones de elevación en tarjetas y botones controlados mediante estados de React (onMouseEnter / onMouseLeave).

Toast Notification Reutilizable: Reemplazo total de los alert() del navegador por un componente de notificación emergente tipo Toast flotante con lógica de colores asincrónica según la acción (verde para carrito, azul oscuro para administración).

Robustez Visual (ImagenSegura): Manejo de errores de carga de imágenes de servidores externos mediante fallbacks automatizados para evitar enlaces rotos.

## 🛠️ Tecnologías Utilizadas

* React JS (v18+)

* Vite (Herramienta de compilación ultra rápida)

* React Router Dom (Gestión de ruteo declarativo)

* JavaScript Moderno (ES6+)

* HTML5 & CSS3 (Estilos modulares mediante objetos JS in-line)

* Imgbb API (Alojamiento y procesamiento de imágenes)

## 📂 Estructura del Repositorio

```txt
src/
├── assets/          # Imágenes estáticas y formatos de alta eficiencia (.avif, .png)
├── components/      # Componentes de UI modulares y reutilizables
│   ├── form/        # Módulos del Formulario (Container + Producto)
│   ├── Item.jsx     # Tarjeta individual con contador integrado
│   ├── ItemList.jsx # Grilla adaptativa de productos
│   ├── ScrollToTop.jsx # Centinela de posición de pantalla
│   └── ToastNotification.jsx # Componente global de alertas UX
├── data/            # Archivos de datos estáticos locales (teamData.js)
├── layout/          # Componentes estructurales (Header, NavBar, Footer, Layout)
├── pages/           # Vistas de páginas completas asociadas al ruteo
└── App.jsx          # Raíz de la aplicación, enrutador y lógica de estado global
public/
└── data/
    └── products.json # Base de datos local simulada del catálogo técnico
```

## ⚙️ Instalación y Ejecución Local

Para levantar el entorno de desarrollo en tu computadora local, seguí estos pasos sencillos:

* Clonar el repositorio:

    ```bash
    git clone https://github.com/Bertolini-Victor/ProyectoFinal-Curso-ReactJs-TalentoTech.git
    ```

* Ingresar a la carpeta del proyecto:

    ```bash
    cd ProyectoFinal-Curso-ReactJs-TalentoTech
    ```

* Instalar dependencias:

    ```bash
    npm install
    ```

* Iniciar el servidor local en modo de desarrollo:

    ```bash
    npm run dev
    ```

* Abrir el navegador:

    ```txt
    Ingresá a la URL local provista por Vite (habitualmente [http://localhost:5173](http://localhost:5173)).
    ```
