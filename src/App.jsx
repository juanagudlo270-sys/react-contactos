import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  // Carga inicial desde localStorage
  const contactosGuardados =
    JSON.parse(localStorage.getItem("contactos")) || [];

  const [contactos, setContactos] = useState(contactosGuardados);

  // Guardar cada vez que cambie el estado
  useEffect(() => {
    localStorage.setItem(
      "contactos",
      JSON.stringify(contactos)
    );
  }, [contactos]);

  // Agregar nuevo contacto
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  // Eliminar contacto por correo
  const eliminarContacto = (correo) => {
    setContactos((prev) =>
      prev.filter((c) => c.correo !== correo)
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">

      {/* Título */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Agenda ADSO v3 📒
      </h1>

      {/* Formulario */}
      <FormularioContacto onAgregar={agregarContacto} />

      {/* Lista de contactos */}
      <section className="max-w-2xl mx-auto mt-8 space-y-4">
        {contactos.map((c) => (
          <ContactoCard
            key={c.correo}
            {...c}
            onEliminar={eliminarContacto}
          />
        ))}
      </section>

    </main>
  );
}