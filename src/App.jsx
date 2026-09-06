// Importa el hook para manejar estado local.
import { useState } from "react";

// Importa la tarjeta visual para cada contacto.
import ContactoCard from "./components/ContactoCard";

// Importa el formulario para crear contactos.
import FormularioContacto from "./components/FormularioContacto";

// Componente principal de la agenda.
export default function App() {
  // Estado: lista de contactos inicial con un ejemplo.
  const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
  ]);

  // Agrega un nuevo contacto al estado.
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [
      ...prev,
      { id: Date.now(), ...nuevo },
    ]);
  };

  // Elimina un contacto por su id.
  const eliminarContacto = (id) => {
    setContactos((prev) =>
      prev.filter((c) => c.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">

      {/* Título principal */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Agenda ADSO v2 📒
      </h1>

      {/* Formulario */}
      <FormularioContacto onAgregar={agregarContacto} />

      {/* Lista de contactos */}
      <section className="max-w-2xl mx-auto mt-8 space-y-4">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
          />
        ))}
      </section>

    </main>
  );
}