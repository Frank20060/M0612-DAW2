import { useState } from "react";
import { usersApp } from "../../datos";

export function Login({ onClose, setIsLoggedIn }) {
  //Estados login
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    console.log("Usuario:", username, "Contraseña:", password);

    const user = usersApp.find(
      (u) => u.nombre === username && u.pas === password //comprobar credenciales
    );

    if (user) { //Si el usuario existe
      setIsLoggedIn(true);
      alert("Login exitoso");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-100 animate-[fadeIn_200ms_ease-out]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-indigo-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
            Login
          </h2>
          <p className="text-xs text-slate-300">
            Entra para gestionar tus alumnos.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
            >
              Usuario
            </label>
            <input
              className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              placeholder="Correo de usuario"
              id="username"
              onChange={(e) => setNombre(e.target.value)}
              name="username"
              type="text"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium uppercase tracking-[0.2em] text-slate-400"
            >
              Contraseña
            </label>
            <input
              className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              placeholder="••••••••"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-400">
              <input
                className="h-4 w-4 rounded border-slate-600 bg-slate-900/60 text-sky-400 focus:ring-sky-400"
                id="remember"
                name="remember"
                type="checkbox"
              />
              <span>Recordarme</span>
            </label>
            <button
              type="button"
              className="text-sky-400 hover:text-sky-300 hover:underline"
            >
              ¿Olvidaste la contraseña?
            </button>
          </div>

          <button
            className="mt-2 flex w-full items-center justify-center rounded-md bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md transition hover:brightness-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            id="login"
            name="login"
            type="submit"
          >
            Entrar
          </button>

          <p className="mt-2 flex justify-center gap-1 text-xs text-slate-300">
            <span>¿No tienes cuenta?</span>
            <button
              type="button"
              className="font-medium text-sky-400 hover:text-sky-300 hover:underline"
            >
              Regístrate
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
