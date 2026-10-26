# LUMIÈRE —  (Servicio Exclusivo a Domicilio)

Plataforma web e interactiva de reservas a domicilio y gestión interna (CMS) desarrollada con **React 18, TypeScript, Vite y Tailwind CSS** bajo una arquitectura modular y escalable.

## Características Principales

1. **Estética Morado Gama Azul (Índigo / Violeta) + Modo Oscuro y Claro**:
   - Fondo dominante en Negro Carbono (`#08080C`) en modo oscuro y Blanco Perla (`#FAFAFC`) en modo claro.
   - Acentos en gama violeta-azul (`#4C1D95`, `#6D28D9`, `#7C3AED`, `#8B5CF6`) sin tonos magentas ni rosados.
2. **Menú y Motor de Reservas Exclusivo de 3 Categorías a Domicilio**:
   - **Peinados para Eventos**, **Cortes de Pelo** e **Hidratación**.
   - Atendido exclusivamente por **1 Estilista Principal** (*Valentina Laurent*).
   - Cálculo en vivo de duración, precios, aplicación de cupones de descuento, pago de seña (30%) o total anticipado (5% OFF VIP), y captura de dirección exacta a domicilio.
3. **Comparador Interactivo Antes / Después de Hidratación**:
   - Deslizador visual de fibra capilar opaca/deshidratada vs. cabello con hidratación profunda y brillo espejo.
4. **Sistema Gestor Oculto para la Estilista (CMS en Vivo)**:
   - Acceso discreto haciendo **doble clic en el logo superior** o pulsando el botón `🔒 π` en el pie de página.
   - Permite editar en caliente el nombre, descripción, duración y precio de cualquier servicio, crear nuevos servicios y personalizar la **palabra clave de descuento** y su porcentaje (ej. `HIDRATA20` con `20%` OFF).

## 📁 Arquitectura del Proyecto

```text
atelier-violette-app/
├── index.html                  # Punto de entrada HTML y fuentes editoriales
├── package.json                # Dependencias y scripts de Vite + React + TS
├── tailwind.config.js          # Tokens de diseño (Carbon, Bone, IndigoViolet)
├── tsconfig.json               # Configuración estricta de TypeScript
├── vite.config.ts              # Configuración del bundler Vite
└── src/
    ├── main.tsx                # Bootstrap de React
    ├── index.css               # Directivas de Tailwind y estilos base
    ├── App.tsx                 # Orquestador principal de vistas y modales
    ├── types/
    │   └── salon.types.ts      # Interfaces TypeScript (Service, PromoConfig, Booking...)
    ├── data/
    │   └── initialData.ts      # Datos iniciales (Servicios, Estilista, Galería, Horarios)
    ├── hooks/
    │   └── useLocalStorage.ts  # Hook genérico tipado para persistencia en navegador
    ├── utils/
    │   └── formatters.ts       # Utilidades de moneda, fechas y enlaces de WhatsApp
    ├── context/
    │   └── SalonContext.tsx    # Estado global (Tema, Servicios CMS, Cupones, Reservas)
    └── components/
        ├── layout/
        │   ├── Navbar.tsx          # Barra superior con selector de tema y acceso a reservas
        │   ├── Footer.tsx          # Pie de página con botón discreto 🔒 π para el CMS
        │   └── MobileBottomBar.tsx # Barra flotante mobile-first para reservar
        ├── sections/
        │   ├── HeroSection.tsx     # Portada principal con propuesta de valor a domicilio
        │   ├── ServicesMenu.tsx    # Carta interactiva de servicios filtrable y seleccionable
        │   ├── HydrationGallery.tsx# Comparador Antes/Después de hidratación y portafolio
        │   └── StylistSection.tsx  # Perfil de Valentina Laurent y protocolo a domicilio
        ├── booking/
        │   └── BookingEngine.tsx   # Motor de turnos en 3 pasos + validación de cupones
        ├── admin/
        │   └── AdminCMSModal.tsx   # Panel protegido por PIN para editar precios, textos y promos
        └── modals/
            └── BookingsModal.tsx   # Panel de turnos agendados y disparo directo a WhatsApp
```


