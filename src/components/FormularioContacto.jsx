import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  // Actualizar los campos
  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  // Enviar formulario
  const onSubmit = (e) => {
    e.preventDefault();

    // Validación
    if (
      !form.nombre.trim() ||
      !form.telefono.trim() ||
      !form.correo.trim()
    ) {
      alert("Completa Nombre, Teléfono y Correo");
      return;
    }

    // Agregar contacto
    onAgregar(form);

    // Limpiar formulario
    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      etiqueta: "",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
    >

      {/* Título */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Agregar contacto
      </h2>

      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Nombre *
        </label>

        <input
          name="nombre"
          placeholder="Ej: Carolina Pérez"
          value={form.nombre}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Teléfono */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Teléfono *
        </label>

        <input
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Correo */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Correo *
        </label>

        <input
          type="email"
          name="correo"
          placeholder="Ej: carolina@sena.edu.co"
          value={form.correo}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Etiqueta */}
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2">
          Etiqueta
        </label>

        <input
          name="etiqueta"
          placeholder="Ej: Compañera"
          value={form.etiqueta}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        ➕ Agregar contacto
      </button>

    </form>
  );
}