// ============================================================
// ORDENAMIENTO BUBBLE SORT (Clase 9)
// Compara pares ADYACENTES y los intercambia si están
// desordenados; repite el recorrido hasta que ya no haya
// intercambios. En cada pasada el elemento más "grande"
// burbujea hacia el final.
// Complejidad en el peor caso: O(n²).
// ============================================================

// Compara dos textos en español (ignora mayúsculas y tildes: "Ángela" va con la A)
function compararTexto(a, b) {
  return String(a ?? "").localeCompare(String(b ?? ""), "es", {
    sensitivity: "base",
  });
}

// Bubble Sort genérico.
// - NO modifica el arreglo original (trabaja sobre una copia), porque en React
//   nunca se debe mutar el estado.
// - `comparar(a, b)` devuelve > 0 si `a` debe ir DESPUÉS de `b`.
// - Solo intercambia si es estrictamente mayor → es estable (los iguales
//   conservan su orden original).
export function bubbleSort(lista, comparar) {
  const arr = [...lista];
  const n = arr.length;

  for (let pasada = 0; pasada < n - 1; pasada++) {
    let huboIntercambio = false;

    // Tras cada pasada, los últimos `pasada` elementos ya están en su lugar
    for (let i = 0; i < n - 1 - pasada; i++) {
      if (comparar(arr[i], arr[i + 1]) > 0) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; // intercambio
        huboIntercambio = true;
      }
    }

    // Si en una pasada completa no se intercambió nada, ya está ordenado
    if (!huboIntercambio) break;
  }

  return arr;
}

// Opciones que se muestran en el <select> de la interfaz
export const OPCIONES_ORDEN = [
  { valor: "original", etiqueta: "Orden de llegada" },
  { valor: "nombre-asc", etiqueta: "Nombre (A → Z)" },
  { valor: "nombre-desc", etiqueta: "Nombre (Z → A)" },
];

// Ordena los contactos según el criterio elegido en la interfaz
export function ordenarContactos(contactos, criterio) {
  switch (criterio) {
    case "nombre-asc":
      return bubbleSort(contactos, (a, b) => compararTexto(a.nombre, b.nombre));
    case "nombre-desc":
      return bubbleSort(contactos, (a, b) => compararTexto(b.nombre, a.nombre));
    default:
      return [...contactos]; // "original": tal como llegaron de la API
  }
}
