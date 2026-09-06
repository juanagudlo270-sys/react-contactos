export default function ContactoCard({
  nombre,
  telefono,
  correo,
  etiqueta,
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">

      <p className="text-xl font-bold text-gray-800">
        {nombre}
      </p>

      <p className="text-gray-600 mt-2">
        📞 {telefono}
      </p>

      <p className="text-gray-600">
        ✉️ {correo}
      </p>

      <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
        {etiqueta}
      </span>

    </div>
  );
}