# Agenda ADSO v6 — Validaciones, UX y errores controlados (Clase 8)

Agenda de contactos en React + Vite + Tailwind conectada a una API REST simulada con JSON Server.
En esta versión se agregan validaciones al formulario, mensajes de error claros, un estado
"enviando" para el botón y mensajes de error de API amigables.

## Cómo correrlo (dos terminales al mismo tiempo)

```bash
npm install
```

**Terminal 1 — API (puerto 3001):**

```bash
npm run api
# equivale a: json-server --watch db.json --port 3001
```

**Terminal 2 — React:**

```bash
npm run dev
```

Verifica la API en el navegador: <http://localhost:3001/contactos>

## Qué se agregó en la Clase 8

- **Validaciones** (`FormularioContacto.jsx` → `validarFormulario()`), usando `.trim()`:
  - Nombre obligatorio.
  - Teléfono obligatorio y **mínimo 7 caracteres** (mini reto).
  - Correo obligatorio y debe contener `@`.
- **Mensajes de error por campo**, en rojo justo debajo de cada input (estado `errores`).
- **Estado `enviando`**: el botón se desactiva y muestra "Guardando..." mientras se espera la API
  (evita el doble envío). Se reactiva con `finally`.
- **Errores de API amigables** (`App.jsx`): banner rojo global con un mensaje claro; el detalle
  técnico queda en `console.error`.
- **Mensaje de éxito (verde)** cuando el contacto se guarda correctamente (mini reto).
- Si la API falla al crear, el formulario **no borra** lo que el usuario escribió.

## Cómo probar los 3 escenarios

1. **Campos vacíos:** clic en "Agregar contacto" sin escribir nada → 3 mensajes de error.
2. **Correo sin @:** escribe `camila.sena.edu.co` → "El correo debe contener @."
3. **Servidor apagado:** detén `npm run api` (Ctrl + C), intenta agregar un contacto válido → banner rojo global.
4. **Botón "Guardando...":** con la API encendida, agrega un contacto válido (se ve un instante).
   Para capturarlo con calma: en DevTools → pestaña Network → throttling "Slow 4G/3G".

## Estructura

- `db.json` — base de datos simulada
- `src/api.js` — único punto de contacto con el servidor (`listarContactos`, `crearContacto`, `eliminarContactoPorId`)
- `src/App.jsx` — estados `contactos`, `cargando`, `error`, `exito` + GET / POST / DELETE
- `src/components/FormularioContacto.jsx` — formulario con validaciones, errores por campo y estado `enviando`
- `src/components/ContactoCard.jsx` — tarjeta de contacto

## Commit exacto que pide la clase

```bash
git add .
git commit -m "Clase_8_Agenda_ADSO_v6_Validaciones_UX"
git push origin main
```
