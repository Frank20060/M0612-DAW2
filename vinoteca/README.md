# 🍷 IA3 - Projecte API (Vinacoteca)

Projecte d'aplicació web per a la gestió d'una vinacoteca amb arquitectura desacoblada.

---

## 🚀 Guia de Passos per al Desenvolupament

### 1. Configuració del Backend (Express + MongoDB)

- [x] **Inicialització:** `npm init -y` i instal·lar dependències:
  `npm install express mongoose dotenv cors jsonwebtoken bcrypt multer nodemailer`
- [x] **Fitxer `.env`:** Configurar variables per a MongoDB, JWT i correu.
- [x] **Models (Mongoose):**
  - `User`: Nom, email, password, foto (URL), rol (`usuari`, `editor`, `admin`).
  - `Producte`: Nom, descripció, tipus (`vi`/`cervesa`), graduació, preu, estoc.
  - `Pedido`: Referència usuari, llista de productes (IDs i quantitat), preu total, data.

### 2. Autenticació i Fitxers

- [x] **JWT:** Implementar `login` (genera token) i `register` (guarda hash de password).
- [x] **Middlewares:**
  - `protegir` (verifyToken): Extraure i validar el JWT del header.
  - `autoritzar` (checkRole): Validar permisos segons el rol de l'usuari.
- [ ] **Multer:** Configurar el storage per a la pujada de la foto de perfil en el registre.

### 3. Funcionalitats de Negoci

- [x] **Rutes de Vins:**
  - `GET /api/vins`: Públic.
  - `POST/PUT/DELETE /api/vins`: Protegit (Editor/Admin).
- [x] **Rutes de Cerveses:**
  - `GET /api/cerveses`: Públic.
  - `POST/PUT/DELETE /api/cerveses`: Protegit (Editor/Admin).
- [] **Rutes de Pedidos:**
  - `POST /api/pedidos`: Usuari loguejat. Crea registre i dispara email. (protegir solo)
  - `GET /api/pedidos/me`: Llista de pedidos de l'usuari actual.
  - `GET /api/pedidos`: Llista global (Admin).

- [ ] **Email (Nodemailer):** Crear funció per enviar correu al propietari quan es confirma un `POST /api/pedidos`.
- [ ] **CORS:** Configurar per permetre l'origen de la URL del frontend.

### 4. Frontend (React)

- [ ] **Rutes Públiques:** Llistat de vins/cerveses i detall (accessible sense login).
- [ ] **Auth:** Formulari de registre (amb `FormData` per a la foto) i login.
- [ ] **Zona Usuari:** Carret de compra i botó de "Confirmar pedido".
- [ ] **Dashboards:**
  - **Editor:** Taula amb botons per a Crear, Editar i Eliminar productes.
  - **Admin:** Gestió d'usuaris (dropdown per canviar rols a `editor` o `admin`).

---

## 🛠️ API Endpoints (Detallat)

| Mètode | Ruta | Rol Mínim | Descripció |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Públic | Registre amb pujada de foto (Multer) |
| **POST** | `/api/auth/login` | Públic | Login i retorn de JWT |
| **GET** | `/api/vins` | Públic | Llistat de tots els vins |
| **GET** | `/api/cerveses` | Públic | Llistat de totes les cerveses |
| **GET** | `/api/vins/:id` | Públic | Detall d'un vi específic |
| **POST** | `/api/pedidos` | Usuari | Crear pedido + Enviament email automàtic |
| **GET** | `/api/pedidos/me` | Usuari | Historial de pedidos de l'usuari |
| **POST** | `/api/vins` | Editor | Crear nou vi (Dashboard) |
| **PUT** | `/api/vins/:id` | Editor | Editar dades d'un vi |
| **DELETE** | `/api/vins/:id` | Editor | Eliminar un vi de la base de dades |
| **GET** | `/api/users` | Admin | Llistat de tots els usuaris (Dashboard Admin) |
| **PATCH** | `/api/users/:id/role` | Admin | Canviar rol d'un usuari |

---

## 🌐 Desplegament

- **URL Frontend:** `[Posa aquí la teva URL de Vercel/Netlify]`
- **URL Backend:** `[Posa aquí la teva URL de Render/Railway]`

---

## 📦 Instruccions d'Execució (Local)

1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev