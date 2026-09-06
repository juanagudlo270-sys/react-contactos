// Importa hook para manejar estado del formulario.
import { useState } from "react";

// Componente de formulario para crear un contacto.
export default function FormularioContacto({ onAgregar }) {

  // Estado local con los campos del formulario.
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    etiqueta: "",
  });

  // Actualiza un campo del formulario cuando el usuario escribe.
  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  // Controla el envío del formulario.
  const onSubmit = (e) => {

    // Evita que el navegador recargue la página.
    e.preventDefault();

    // Valida nombre y teléfono.
    if (!form.nombre.trim() || !form.telefono.trim()) {
      alert("Completa al menos Nombre y Teléfono");
      return;
    }

    // Envía los datos al componente padre.
    onAgregar(form);

    // Limpia el formulario.
    setForm({
      nombre: "",
      correo: "",
      telefono: "",
      etiqueta: "",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
    >

      {/* Título del formulario */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Agregar contacto
      </h2>

      {/* Nombre */}
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Teléfono */}
      <input
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Correo */}
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 mb-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Etiqueta */}
      <input
        name="etiqueta"
        placeholder="Etiqueta (opcional)"
        value={form.etiqueta}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 mb-5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200"
      >
        ➕ Agregar contacto
      </button>

    </form>
  );
}