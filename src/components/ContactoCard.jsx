// ContactoCard.jsx
// Componente que muestra la tarjeta visual de un contacto.

export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onDelete,
}) {
  return (
    <article className="bg-white p-5 rounded-2xl shadow-md border border-gray-200">

      {/* Nombre */}
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        {nombre}
      </h3>

      {/* Teléfono */}
      <p className="text-gray-600 mb-2">
        📞 {telefono}
      </p>

      {/* Correo */}
      {correo && (
        <p className="text-gray-600 mb-3">
          ✉️ {correo}
        </p>
      )}

      {/* Etiqueta */}
      {etiqueta && (
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {etiqueta}
        </span>
      )}

      {/* Acciones */}
      <div className="mt-4">

        {/* Botón eliminar */}
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 active:bg-red-800 transition duration-200"
        >
          🗑️ Eliminar
        </button>

      </div>
    </article>
  );
}