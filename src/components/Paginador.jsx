// Controles de paginación reutilizables (Clase 10):
// "← Anterior", un botón por cada número de página y "Siguiente →".
// Los extremos se deshabilitan solos. No guarda estado propio: la página
// actual vive en App.jsx y aquí solo se pide cambiarla con `onCambiarPagina`
// (que es el setPaginaActual: acepta un número o una función (p) => p ± 1).
export default function Paginador({
  paginaActual,
  totalPaginas,
  onCambiarPagina,
}) {
  const base =
    "px-3 py-2 rounded-lg border text-sm font-medium transition duration-200";
  const normal = "border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
  const activo = "border-blue-600 bg-blue-600 text-white";
  const deshabilitado =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white";

  return (
    <nav aria-label="Paginación" className="mt-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          disabled={paginaActual === 1}
          onClick={() => onCambiarPagina((p) => p - 1)}
          className={`${base} ${normal} ${deshabilitado}`}
        >
          ← Anterior
        </button>

        {/* [1, 2, 3, ..., totalPaginas] sin escribir un for */}
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onCambiarPagina(n)}
            aria-label={`Ir a la página ${n}`}
            aria-current={n === paginaActual ? "page" : undefined}
            className={`${base} ${n === paginaActual ? activo : normal}`}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          disabled={paginaActual === totalPaginas}
          onClick={() => onCambiarPagina((p) => p + 1)}
          className={`${base} ${normal} ${deshabilitado}`}
        >
          Siguiente →
        </button>
      </div>

      {/* Mini reto: "Página X de Y" junto al paginador */}
      <p className="mt-3 text-center text-sm text-gray-500">
        Página {paginaActual} de {totalPaginas}
      </p>
    </nav>
  );
}
