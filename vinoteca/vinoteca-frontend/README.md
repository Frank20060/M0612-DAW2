# Vinacoteca — Frontend React

Aplicació frontend fullstack per a la Vinacoteca (IA3). Construïda amb **React + Vite + Tailwind CSS**.

## Stack

| Tecnologia | Versió | Ús |
|---|---|---|
| React | 18 | UI Library |
| Vite | 5 | Build tool |
| Tailwind CSS | 3 | Estilos |
| React Router DOM | 6 | Navegació SPA |
| Axios | 1.7 | HTTP client + interceptors |
| react-hot-toast | 2 | Notificacions |

---

## Estructura de Carpetes

```
src/
├── api/
│   └── axios.js          # Instància Axios + interceptors JWT + helpers per endpoint
├── context/
│   ├── AuthContext.jsx   # Login, logout, registro, persistència token
│   └── CartContext.jsx   # Carret: afegir, eliminar, checkout → POST /pedidos
├── components/
│   ├── Navbar.jsx        # Navegació responsiva amb comptador de carret
│   ├── CartDrawer.jsx    # Panell lateral del carret
│   ├── ProductCard.jsx   # Targeta de producte (vi o cervesa)
│   └── ProtectedRoute.jsx# HOC per rutes protegides per rol
└── pages/
    ├── Home.jsx          # Landing page
    ├── Cataleg.jsx       # Catàleg amb filtres i cerca
    ├── ProducteDetall.jsx# Detall del producte (/producte/:tipo/:id)
    ├── Login.jsx         # Formulari de login
    ├── Registre.jsx      # Formulari de registre amb foto
    ├── Perfil.jsx        # Dades d'usuari + historial de comandes
    └── Dashboard.jsx     # Panel editor/admin: CRUD productes + gestió rols
```

---

## Instal·lació

```bash
# 1. Clonar i entrar al directori
cd vinoteca-frontend

# 2. Instal·lar dependències
npm install

# 3. Crear fitxer d'entorn
cp .env.example .env
# Editar .env amb la URL del backend

# 4. Arrancar en desenvolupament
npm run dev
```

El frontend estarà disponible a `http://localhost:5173`.

---

## Variables d'Entorn

```env
# .env
VITE_API_URL=http://localhost:8000/api
```

> En producció, canvia la URL pel domini del backend desplegat.

---

## Credencials de prova

Crea els usuaris manualment via `POST /api/auth/registro` o directament a la BD:

| Rol | Email | Password |
|---|---|---|
| Admin | admin@vinacoteca.cat | admin1234 |
| Editor | editor@vinacoteca.cat | editor1234 |
| Usuari | user@vinacoteca.cat | user1234 |

---

## Rutes del Frontend

| Ruta | Pàgina | Protecció |
|---|---|---|
| `/` | Home (landing) | Pública |
| `/cataleg` | Catàleg de vins i cerveses | Pública |
| `/producte/:tipo/:id` | Detall del producte | Pública |
| `/login` | Iniciar sessió | Pública |
| `/registre` | Crear compte amb foto | Pública |
| `/perfil` | Dades + historial comandes | Autenticat |
| `/dashboard` | CRUD productes + gestió rols | Editor / Admin |

---

## Funcionalitats implementades

### Autenticació (AuthContext)
- Login amb email + password → desa `token` i `user` a `localStorage`
- Logout → neteja sessió i redirigeix
- Registre amb foto → `multipart/form-data`
- Interceptor Axios → afegeix `Authorization: Bearer <token>` automàticament
- Interceptor resposta → si 401, redirigeix a `/login`

### Carret (CartContext)
- Afegir/eliminar productes, actualitzar quantitats
- Detecta el tipus (`Vino` o `Cerveza`) per al camp `producto_modelo`
- Finalitzar compra → `POST /pedidos` amb estructura exacta del backend
- Persistència en memòria (es buida en recarregar; es pot extendre a localStorage)

### Dashboard (Editor/Admin)
- CRUD complet de vins i cerveses amb modal
- Pujada d'imatges de producte via `PATCH /:id/imatge`
- Gestió d'usuaris i canvi de rols (només admin)

### Checklist IA3 cobert
- ✅ Bloc A — Accés públic al catàleg
- ✅ Bloc B — Registre amb foto, login, perfil
- ✅ Bloc C — Pujada fitxers (imatge perfil + imatge producte)
- ✅ Bloc D — Rols i autorització (usuari / editor / admin)
- ✅ Bloc E — Comandes (usuari autenticat)
- ✅ Bloc H — Integració frontend completa
- ✅ Bloc I — README, .env, secrets fora del repo

---

## Build per a producció

```bash
npm run build
# Output a /dist — servir com a estàtics
```

---

## URLs desplegades

| Servei | URL |
|---|---|
| Frontend | https://vinacoteca.example.com |
| Backend API | https://api.vinacoteca.example.com |
