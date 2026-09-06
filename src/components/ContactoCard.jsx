export default function ContactoCard({
  nombre,
  telefono,
  correo,
  etiqueta,
  onEliminar,
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
      <p className="text-gray-600 mb-3">
        ✉️ {correo}
      </p>

      {/* Etiqueta */}
      {etiqueta && (
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
          {etiqueta}
        </span>
      )}

      {/* Botón eliminar */}
      <div className="mt-2">
        <button
          type="button"
          onClick={() => onEliminar(correo)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
        >
          🗑️ Eliminar
        </button>
      </div>

    </article>
  );
}