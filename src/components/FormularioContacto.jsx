import { useState } from "react";

// Estado inicial del formulario (valores de cada campo)
const FORM_INICIAL = {
  nombre: "",
  telefono: "",
  correo: "",
  etiqueta: "",
  empresa: "", // ← campo del mini reto de la clase 7
};

// Estado inicial de los mensajes de error (uno por campo obligatorio)
const ERRORES_INICIALES = {
  nombre: "",
  telefono: "",
  correo: "",
};

// Longitud mínima del teléfono (mini reto de la clase 8)
const TELEFONO_MIN = 7;

export default function FormularioContacto({ onAgregar }) {
  // Valores de cada campo
  const [form, setForm] = useState(FORM_INICIAL);

  // Mensajes de error, uno por campo obligatorio
  const [errores, setErrores] = useState(ERRORES_INICIALES);

  // true mientras se está guardando en la API
  const [enviando, setEnviando] = useState(false);

  // Actualizar los campos
  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  // Revisa los 3 campos obligatorios. .trim() quita espacios al inicio/final,
  // así "   " no cuenta como un valor válido.
  // Devuelve true solo si ningún campo tiene error.
  function validarFormulario() {
    const nuevosErrores = { ...ERRORES_INICIALES };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.trim().length < TELEFONO_MIN) {
      // Mini reto: validación extra del teléfono
      nuevosErrores.telefono = `El teléfono debe tener mínimo ${TELEFONO_MIN} caracteres.`;
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // Enviar formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    // Evita un doble envío mientras se espera la respuesta del servidor
    if (enviando) return;

    const esValido = validarFormulario();
    if (!esValido) return;

    try {
      setEnviando(true);
      await onAgregar(form); // puede tardar (llamada a la API)

      // Solo se limpia si onAgregar terminó bien
      setForm(FORM_INICIAL);
      setErrores(ERRORES_INICIALES);
    } catch {
      // El mensaje de error global lo muestra App.jsx.
      // Aquí no limpiamos el formulario para que el usuario no pierda lo escrito.
    } finally {
      setEnviando(false); // pase lo que pase, reactivamos el botón
    }
  };

  // Clases del input: borde rojo si el campo tiene error
  const claseInput = (hayError) =>
    `w-full border rounded-lg p-3 outline-none focus:ring-2 ${
      hayError
        ? "border-red-400 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  return (
    // noValidate: desactiva la validación nativa del navegador (por el
    // type="email") para que se vean NUESTROS mensajes de error.
    <form
      onSubmit={onSubmit}
      noValidate
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
          aria-invalid={!!errores.nombre}
          className={claseInput(errores.nombre)}
        />

        {errores.nombre && (
          <p className="text-xs text-red-600 mt-1">{errores.nombre}</p>
        )}
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
          aria-invalid={!!errores.telefono}
          className={claseInput(errores.telefono)}
        />

        {errores.telefono && (
          <p className="text-xs text-red-600 mt-1">{errores.telefono}</p>
        )}
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
          aria-invalid={!!errores.correo}
          className={claseInput(errores.correo)}
        />

        {errores.correo && (
          <p className="text-xs text-red-600 mt-1">{errores.correo}</p>
        )}
      </div>

      {/* Empresa (mini reto clase 7) */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Empresa
        </label>

        <input
          name="empresa"
          placeholder="Ej: SENA"
          value={form.empresa}
          onChange={onChange}
          className={claseInput(false)}
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
          className={claseInput(false)}
        />
      </div>

      {/* Botón: se desactiva y cambia de texto mientras se guarda */}
      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        {enviando ? "Guardando..." : "➕ Agregar contacto"}
      </button>

    </form>
  );
}
