# Agenda ADSO v5 — API REST + JSON Server (Clase 7)

Agenda de contactos en React + Vite + Tailwind conectada a una API REST simulada con JSON Server.
Ya no usa `localStorage`: los datos se guardan en `db.json`.

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

## Estructura

- `db.json` — base de datos simulada
- `src/api.js` — único punto de contacto con el servidor (`listarContactos`, `crearContacto`, `eliminarContactoPorId`)
- `src/App.jsx` — estados `contactos`, `cargando`, `error` + GET / POST / DELETE
- `src/components/FormularioContacto.jsx` — formulario (incluye campo `empresa`, mini reto)
- `src/components/ContactoCard.jsx` — tarjeta de contacto

## Commit recomendado

```bash
git add .
git commit -m "Clase_7_Agenda_ADSO_v5_API"
git push origin main
```
