import { OPCIONES_ORDEN } from "../utils/ordenamiento.js";
import { OPCIONES_POR_PAGINA } from "../utils/paginacion.js";

// Barra de búsqueda + selector de orden + selector de contactos por página
// + contador de resultados.
// Es un componente "controlado": el estado vive en App.jsx y llega por props.
export default function BarraBusqueda({
  busqueda,
  onBusqueda,
  orden,
  onOrden,
  contactosPorPagina,
  onContactosPorPagina,
  total,
  encontrados,
}) {
  const claseSelect =
    "w-full border border-gray-300 rounded-lg p-3 bg-white outline-none focus:ring-2 focus:ring-blue-500";
  const claseLabel = "block text-gray-700 text-sm font-semibold mb-1";

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-4 rounded-2xl shadow-md border border-gray-200">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Búsqueda */}
        <div className="flex-1">
          <label htmlFor="busqueda" className={claseLabel}>
            Buscar contacto
          </label>

          <div className="relative">
            <input
              id="busqueda"
              type="search"
              value={busqueda}
              onChange={(e) => onBusqueda(e.target.value)}
              placeholder="Nombre, teléfono, correo, empresa o etiqueta"
              className="w-full border border-gray-300 rounded-lg p-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {busqueda && (
              <button
                type="button"
                onClick={() => onBusqueda("")}
                aria-label="Borrar texto del buscador"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 px-2"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Orden */}
        <div className="sm:w-48">
          <label htmlFor="orden" className={claseLabel}>
            Ordenar por
          </label>

          <select
            id="orden"
            value={orden}
            onChange={(e) => onOrden(e.target.value)}
            className={claseSelect}
          >
            {OPCIONES_ORDEN.map((op) => (
              <option key={op.valor} value={op.valor}>
                {op.etiqueta}
              </option>
            ))}
          </select>
        </div>

        {/* Contactos por página (mini reto clase 10) */}
        <div className="sm:w-32">
          <label htmlFor="por-pagina" className={claseLabel}>
            Por página
          </label>

          <select
            id="por-pagina"
            value={contactosPorPagina}
            onChange={(e) => onContactosPorPagina(Number(e.target.value))}
            className={claseSelect}
          >
            {OPCIONES_POR_PAGINA.map((n) => (
              <option key={n} value={n}>
                {n} / pág.
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contador: cuántos contactos coinciden (de todos los que hay) */}
      <p className="text-xs text-gray-500 mt-3" aria-live="polite">
        {encontrados} de {total} {total === 1 ? "contacto" : "contactos"}
      </p>
    </div>
  );
}
