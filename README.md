# Seniors Shop 🧶

Una plataforma de e-commerce diseñada para ayudar a artesanos de la tercera edad a vender sus productos hechos a mano.

## 🚀 Tecnologías

- **Frontend**: Next.js 16, React 19, TailwindCSS, Shadcn UI
- **Backend**: Next.js Server Actions, NextAuth
- **Base de datos**: PostgreSQL con Prisma ORM
- **Gestión de estado**: Zustand
- **Validación**: Zod + React Hook Form

## 📋 Requisitos previos

- Node.js 18+ 
- PostgreSQL instalado y ejecutándose
- npm o yarn

## ⚙️ Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Actualiza el archivo `.env` con tus credenciales de PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/seniors_shop?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secreto-aqui-cambiar-en-produccion"
WHATSAPP_NUMBER="987654321"
```

### 3. Configurar la base de datos

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear las tablas en la base de datos
npx prisma db push

# Poblar la base de datos con datos iniciales
npx tsx prisma/seed.ts
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 👤 Credenciales de administrador

Después de ejecutar el seed, puedes acceder al panel de administración:

- **URL**: `http://localhost:3000/auth/login`
- **Email**: `admin@seniorsshop.com`
- **Contraseña**: `admin123`

⚠️ **Importante**: Cambia estas credenciales en producción.

## 📁 Estructura del proyecto

```
seniors-shop/
├── app/                    # Páginas y rutas de Next.js
│   ├── admin/             # Panel de administración
│   ├── auth/              # Autenticación
│   ├── catalog/           # Catálogo de productos
│   ├── cart/              # Carrito de compras
│   └── checkout/          # Proceso de compra
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes de Shadcn UI
├── lib/                   # Utilidades y configuración
│   ├── prisma.ts         # Cliente de Prisma
│   ├── auth.ts           # Configuración de NextAuth
│   ├── validations.ts    # Esquemas de Zod
│   ├── cart-store.ts     # Store del carrito
│   └── whatsapp.ts       # Integración de WhatsApp
└── prisma/               # Esquema y migraciones
    ├── schema.prisma     # Modelos de la base de datos
    └── seed.ts           # Datos iniciales
```

## 🎨 Características

### Para clientes:
- Landing page con información de la tienda
- Catálogo de productos con filtros por categoría
- Carrito de compras
- Checkout con integración a WhatsApp

### Para administradores:
- Dashboard con estadísticas
- CRUD de productos
- CRUD de categorías
- CRUD de colaboradores

## 🛠️ Scripts disponibles

```bash
npm run dev          # Ejecutar en desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en producción
npm run lint         # Ejecutar linter

# Scripts de base de datos
npx prisma generate  # Generar cliente de Prisma
npx prisma db push   # Sincronizar esquema con la BD
npx prisma studio    # Abrir Prisma Studio
npx tsx prisma/seed.ts  # Ejecutar seed
```

## 🎨 Diseño

La aplicación utiliza un esquema de colores pasteles:
- **Primario**: Lavanda suave (#E6D5F5)
- **Secundario**: Durazno suave (#FFE5D9)
- **Acento**: Verde menta (#D5F5E3)
- **Fondo**: Crema cálido (#FFF9F0)

## 📱 Responsive

La aplicación es completamente responsive y se adapta a dispositivos móviles, tablets y desktop.

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Para contribuir, por favor crea un fork y envía un pull request.

## 📄 Licencia

MIT
