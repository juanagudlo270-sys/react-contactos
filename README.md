# Agenda ADSO v7 — Búsqueda y ordenamiento (Clase 9)

Agenda de contactos en React + Vite + Tailwind conectada a una API REST simulada con JSON Server.
La v7 suma un **buscador** (búsqueda lineal) y un **selector de orden** (Bubble Sort) sobre la
lista de contactos. Conserva todo lo de la v6 (validaciones, estado "enviando" y errores de API amigables).

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

## Qué se agregó en la Clase 9

- **Búsqueda lineal** (`src/utils/busqueda.js`): recorre los contactos uno por uno y conserva los
  que coinciden. Busca en nombre, teléfono, correo, empresa y etiqueta, sin distinguir mayúsculas
  ni tildes (`angela` encuentra a *Ángela*). Complejidad O(n).
- **Bubble Sort** (`src/utils/ordenamiento.js`): compara pares adyacentes e intercambia los
  desordenados, repitiendo el recorrido hasta que no haya cambios. Complejidad O(n²) en el peor
  caso. Trabaja sobre una **copia** (no muta el estado) y es estable.
- **`src/components/BarraBusqueda.jsx`**: campo de búsqueda, botón ✕ para limpiar, selector
  "Ordenar por" (orden de llegada / Nombre A → Z / Nombre Z → A) y contador "Mostrando X de Y".
- **`App.jsx`**: estados `busqueda` y `orden`; la lista visible se calcula en cada render
  (`buscarContactos` → `ordenarContactos`) sin tocar el estado `contactos`.
- Si nada coincide, se muestra un mensaje con un botón "Limpiar búsqueda".
- Al guardar un contacto nuevo la búsqueda se limpia, para que el nuevo siempre se vea.

## Qué se agregó en la Clase 8 (sigue vigente)

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
- `src/App.jsx` — estados `contactos`, `cargando`, `error`, `exito`, `busqueda`, `orden` + GET / POST / DELETE
- `src/components/FormularioContacto.jsx` — formulario con validaciones, errores por campo y estado `enviando`
- `src/components/ContactoCard.jsx` — tarjeta de contacto
- `src/components/BarraBusqueda.jsx` — buscador, selector de orden y contador
- `src/utils/busqueda.js` — búsqueda lineal
- `src/utils/ordenamiento.js` — Bubble Sort y criterios de orden

## Commit sugerido para la Clase 9

(La guía de la clase 9 no indica un mensaje de commit; este sigue el patrón de la clase 8.)

```bash
git add .
git commit -m "Clase_9_Agenda_ADSO_v7_Busqueda_Ordenamiento"
git push origin main
```
