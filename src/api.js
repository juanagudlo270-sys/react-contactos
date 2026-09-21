// Base URL de la API local (JSON Server)
const API = "http://localhost:3001/contactos";

// GET — obtener todos los contactos
export async function listarContactos() {
  const res = await fetch(API);
  // Si la respuesta no es OK (>=400), lanzamos error
  if (!res.ok) throw new Error("Error al listar contactos");
  return res.json(); // ← devuelve array de contactos
}

// POST — crear un nuevo contacto
export async function crearContacto(data) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // objeto → JSON string
  });
  if (!res.ok) throw new Error("Error al crear el contacto");
  return res.json(); // ← contacto creado con id asignado
}

// DELETE — eliminar contacto por id
export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el contacto");
  return true; // éxito confirmado
}
