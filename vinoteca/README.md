# 🍷 IA3 - Projecte API (Vinacoteca)

Projecte d'aplicació web per a la gestió d'una vinacoteca amb arquitectura desacoblada.

---

## 🚀 Guia de Passos per al Desenvolupament

### 1. Configuració del Backend (Express + MongoDB)

- [OK] **Inicialització:** `npm init -y` i instal·lar dependències:
  `npm install express mongoose dotenv cors jsonwebtoken bcrypt multer nodemailer`
- [OK] **Fitxer `.env`:** Configurar variables per a MongoDB, JWT i correu.
- [OK] **Models (Mongoose):**
  - `User`: Nom, email, password, foto (URL), rol (`usuari`, `editor`, `admin`).
  - `Producte`: Nom, descripció, tipus (`vi`/`cervesa`), graduació, preu.
  - `Pedido`: Referència usuari, llista de productes, data.

### 2. Autenticació i Fitxers


- [ ] **JWT:** Implementar `login` (genera token) i `register` (guarda hash de password).
- [ ] **Middlewares:**
  - `verifyToken`: Extraure i validar el JWT del header.
  - `checkRole(['admin', 'editor'])`: Validar permisos segons el rol de l'usuari.

### 3. Funcionalitats de Negoci

- [ ] **Email (Nodemailer):** Crear funció per enviar correu al propietari quan es confirma un `POST /pedidos`.
- [ ] **CORS:** Configurar per permetre l'origen de la URL del frontend.

### 4. Frontend (React)

- [ ] **Rutes Públiques:** Llistat de vins/cerveses i detall (accessible sense login).
- [ ] **Auth:** Formulari de registre (amb `FormData` per a la foto) i login.
- [ ] **Dashboards:**
  - **Editor:** Taula amb botons per a Crear, Editar i Eliminar productes.
  - **Admin:** Gestió d'usuaris (dropdown per canviar rols a `editor` o `admin`).

---

## 🛠️ API Endpoints (Resum)

| Mètode    | Ruta                  | Rol Mínim | Descripció                       |
| :-------- | :-------------------- | :-------- | :------------------------------- |
| **GET**   | `/api/products`       | Públic    | Llista de vins i cerveses        |
| **POST**  | `/api/auth/register`  | Públic    | Registre amb pujada de foto      |
| **POST**  | `/api/pedidos`        | Usuari    | Crear pedido + enviament d'Email |
| **CRUD**  | `/api/products`       | Editor    | Gestió total de productes        |
| **PATCH** | `/api/users/:id/role` | Admin     | Canviar rol d'un usuari          |

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
   ```
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
