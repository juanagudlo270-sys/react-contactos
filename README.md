# Agenda ADSO v8 — Paginación (Clase 10)

Agenda de contactos en React + Vite + Tailwind conectada a una API REST simulada con JSON Server.
La v8 divide la lista en **páginas** (paginación en el cliente) sin romper el buscador ni el orden de
la v7. Conserva todo lo anterior (validaciones, estado "enviando", errores de API amigables, búsqueda lineal y Bubble Sort).

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

## Qué se agregó en la Clase 10 (paginación)

- **Dos estados nuevos** en `App.jsx`: `paginaActual` (empieza en 1) y `contactosPorPagina` (empieza en 3).
- **`totalPaginas`** = `Math.max(1, Math.ceil(contactosOrdenados.length / contactosPorPagina))`.
  Se recalcula solo, no es estado. `Math.ceil` redondea hacia arriba (7 contactos / 3 = 3 páginas).
- **`slice()`**: `indiceInicio = (paginaActual - 1) * contactosPorPagina`,
  `indiceFin = indiceInicio + contactosPorPagina` y
  `contactosPaginados = contactosOrdenados.slice(indiceInicio, indiceFin)`.
  La paginación se aplica **después** de buscar y ordenar.
- **`src/components/Paginador.jsx`** (reutilizable): "← Anterior", un botón por página y "Siguiente →",
  deshabilitados en los extremos, con la página activa resaltada.
- **Reinicio de página** con `useEffect` cuando cambian `busqueda`, `orden` o `contactosPorPagina`.
  Un segundo `useEffect` corrige la página si el total baja (por ejemplo, al eliminar el último
  contacto de la última página), para no quedar en una página vacía.
- **Mini reto 1:** selector visible "Por página" (2 / 3 / 5) en `BarraBusqueda.jsx`.
- **Mini reto 2:** texto "Página X de Y" junto al paginador.
- El contador de la barra ahora dice "N de M contactos" (coinciden N de M).
- Un contacto nuevo se agrega al final de la lista: en "Orden de llegada" queda en la última página.

## Qué se agregó en la Clase 9 (sigue vigente)

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
- `src/App.jsx` — estados `contactos`, `cargando`, `error`, `exito`, `busqueda`, `orden`, `paginaActual`, `contactosPorPagina` + GET / POST / DELETE
- `src/components/FormularioContacto.jsx` — formulario con validaciones, errores por campo y estado `enviando`
- `src/components/ContactoCard.jsx` — tarjeta de contacto
- `src/components/BarraBusqueda.jsx` — buscador, selector de orden, selector "Por página" y contador
- `src/components/Paginador.jsx` — controles de paginación reutilizables
- `src/utils/busqueda.js` — búsqueda lineal
- `src/utils/ordenamiento.js` — Bubble Sort y criterios de orden
- `src/utils/paginacion.js` — constantes de la paginación

## Commit sugerido para la Clase 10

(La guía de la clase 10 no indica un mensaje de commit; este sigue el patrón de las clases anteriores.)

```bash
git add .
git commit -m "Clase_10_Agenda_ADSO_v8_Paginacion"
git push origin main
```
