import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api.js";

export default function App() {
  // Los 3 estados: datos, carga y error
  const [contactos, setContactos] = useState([]); // lista que viene de la API
  const [cargando, setCargando] = useState(true); // true mientras esperamos la respuesta
  const [error, setError] = useState(""); // mensaje de error si la API falla

  // GET — se ejecuta UNA vez al montar el componente
  useEffect(() => {
    async function cargarContactos() {
      try {
        const data = await listarContactos(); // GET a la API
        setContactos(data); // guardamos en estado
      } catch {
        setError("No se pudo cargar la lista de contactos");
      } finally {
        setCargando(false); // ocultamos el mensaje de carga
      }
    }
    cargarContactos();
  }, []);

  // POST — agregar contacto (llamado desde FormularioContacto)
  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo); // POST
      // No recargamos toda la lista: añadimos solo el nuevo
      setContactos((prev) => [...prev, creado]);
    } catch {
      setError("No se pudo agregar el contacto");
    }
  };

  // DELETE — eliminar contacto por id (llamado desde ContactoCard)
  const eliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id); // DELETE en la API
      // Filtramos el estado local sin recargar
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setError("No se pudo eliminar el contacto");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      {/* Título */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Agenda ADSO v5 📒
      </h1>

      {/* Formulario */}
      <FormularioContacto onAgregar={agregarContacto} />

      {/* Mensaje de error */}
      {error && (
        <p
          role="alert"
          className="max-w-2xl mx-auto mt-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg"
        >
          {error}
        </p>
      )}

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
