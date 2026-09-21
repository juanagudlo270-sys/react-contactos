import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api.js";

export default function App() {
  // Los estados: datos, carga, error y éxito
  const [contactos, setContactos] = useState([]); // lista que viene de la API
  const [cargando, setCargando] = useState(true); // true mientras esperamos la respuesta
  const [error, setError] = useState(""); // mensaje de error (amigable) si la API falla
  const [exito, setExito] = useState(""); // mensaje de éxito (mini reto clase 8)

  // GET — se ejecuta UNA vez al montar el componente
  useEffect(() => {
    async function cargarContactos() {
      try {
        setCargando(true);
        setError(""); // limpiamos cualquier error anterior
        const data = await listarContactos(); // GET a la API
        setContactos(data); // guardamos en estado
      } catch (err) {
        // El detalle técnico va a la consola (para depurar)...
        console.error("Error al cargar contactos:", err);
        // ...y el usuario recibe una frase clara, sin jerga
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false); // ocultamos el mensaje de carga
      }
    }
    cargarContactos();
  }, []);

  // El mensaje de éxito desaparece solo a los 4 segundos
  useEffect(() => {
    if (!exito) return;
    const temporizador = setTimeout(() => setExito(""), 4000);
    return () => clearTimeout(temporizador);
  }, [exito]);

  // POST — agregar contacto (llamado desde FormularioContacto)
  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      setExito("");
      const creado = await crearContacto(nuevo); // POST
      // No recargamos toda la lista: añadimos solo el nuevo
      setContactos((prev) => [...prev, creado]);
      setExito("¡Contacto guardado correctamente!");
    } catch (err) {
      console.error("Error al crear contacto:", err);
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );
      // Volvemos a lanzar el error para que el formulario sepa que falló
      // y NO borre lo que el usuario escribió.
      throw err;
    }
  };

  // DELETE — eliminar contacto por id (llamado desde ContactoCard)
  const eliminarContacto = async (id) => {
    try {
      setError("");
      setExito("");
      await eliminarContactoPorId(id); // DELETE en la API
      // Filtramos el estado local sin recargar
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error al eliminar contacto:", err);
      setError(
        "No se pudo eliminar el contacto. Verifica que el servidor esté encendido e intenta de nuevo."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      {/* Título */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
        Agenda ADSO v6 📒
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Gestión de contactos con validaciones y mejor experiencia de usuario.
      </p>

      {/* Banner de error global (errores de la API) */}
      {error && (
        <div
          role="alert"
          className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
        >
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {/* Banner de éxito (mini reto) */}
      {exito && (
        <div
          role="status"
          className="max-w-2xl mx-auto mb-6 bg-green-50 border border-green-200 rounded-xl px-4 py-3"
        >
          <p className="text-sm font-medium text-green-700">{exito}</p>
        </div>
      )}

      {/* Formulario */}
      <FormularioContacto onAgregar={agregarContacto} />

      {/* Lista de contactos */}
      <section className="max-w-2xl mx-auto mt-8 space-y-4">
        {cargando && (
          <p className="text-center text-gray-500">Cargando contactos...</p>
        )}

        {!cargando && !error && contactos.length === 0 && (
          <p className="text-center text-gray-500">
            Aún no hay contactos. ¡Agrega el primero!
          </p>
        )}

        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            {...c}
            onEliminar={() => eliminarContacto(c.id)}
          />
        ))}
      </section>
    </main>
  );
}
