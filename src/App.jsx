import { useState } from "react";
import ContactoCard from "./components/ContactoCard";

function App() {
  const [contactos, setContactos] = useState([
    {
      nombre: "Gustavo Bolaños",
      telefono: "300 123 4567",
      correo: "gustavo@sena.edu.co",
      etiqueta: "Instructor",
    },
    {
      nombre: "Cristian Acevedo",
      telefono: "300 765 4321",
      correo: "cristian@sena.edu.co",
      etiqueta: "Instructor",
    },
  ]);

  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const agregarContacto = (e) => {
    e.preventDefault();

    if (
      !formulario.nombre ||
      !formulario.telefono ||
      !formulario.correo ||
      !formulario.etiqueta
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    setContactos([...contactos, formulario]);

    setFormulario({
      nombre: "",
      telefono: "",
      correo: "",
      etiqueta: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
        Agenda ADSO 📒
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Contactos guardados
      </p>

      {/* FORMULARIO */}
      <form
        onSubmit={agregarContacto}
        className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mb-8"
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-800">
          Agregar contacto
        </h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          className="w-full border p-3 rounded-lg mb-3"
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formulario.telefono}
          onChange={manejarCambio}
          className="w-full border p-3 rounded-lg mb-3"
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={manejarCambio}
          className="w-full border p-3 rounded-lg mb-3"
        />

        <input
          type="text"
          name="etiqueta"
          placeholder="Etiqueta (Ej: Instructor)"
          value={formulario.etiqueta}
          onChange={manejarCambio}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          ➕ Agregar contacto
        </button>
      </form>

      {/* CONTACTOS */}
      <div className="max-w-2xl mx-auto space-y-4">
        {contactos.map((c, i) => (
          <ContactoCard
            key={i}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
          />
        ))}
      </div>

    </div>
  );
}

export default App;