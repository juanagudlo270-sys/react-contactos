// ============================================================
// BÚSQUEDA LINEAL (Clase 9)
// Recorre los elementos UNO POR UNO, del primero al último, y
// se queda con los que coinciden. Complejidad: O(n).
// (No requiere que la lista esté ordenada, a diferencia de la
// búsqueda binaria.)
// ============================================================

// Pasa a minúsculas y quita tildes: "Ángela" y "angela" coinciden.
export function normalizar(texto) {
  return String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Campos del contacto donde se busca
const CAMPOS_BUSQUEDA = ["nombre", "telefono", "correo", "empresa", "etiqueta"];

// ¿El contacto tiene el texto en alguno de sus campos?
function contactoCoincide(contacto, textoNormalizado) {
  for (let i = 0; i < CAMPOS_BUSQUEDA.length; i++) {
    const valor = normalizar(contacto[CAMPOS_BUSQUEDA[i]]);
    if (valor.includes(textoNormalizado)) return true;
  }
  return false;
}

// Búsqueda lineal: devuelve un arreglo NUEVO con los contactos que coinciden.
// Si no hay texto, devuelve todos (una copia).
export function buscarContactos(contactos, texto) {
  const buscado = normalizar(texto);
  if (!buscado) return [...contactos];

  const resultado = [];
  for (let i = 0; i < contactos.length; i++) {
    if (contactoCoincide(contactos[i], buscado)) {
      resultado.push(contactos[i]);
    }
  }
  return resultado;
}
